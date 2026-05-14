const DEFAULT_JSON_BODY_LIMIT_BYTES = 10 * 1024;

type RateLimitEntry = {
    count: number;
    resetAt: number;
};

type GlobalWithRateLimits = typeof globalThis & {
    __portfolioRateLimits?: Map<string, RateLimitEntry>;
};

const globalForRateLimits = globalThis as GlobalWithRateLimits;
const rateLimitStore =
    globalForRateLimits.__portfolioRateLimits ??
    (globalForRateLimits.__portfolioRateLimits = new Map());

export class ApiRequestError extends Error {
    status: number;

    constructor(message: string, status = 400) {
        super(message);
        this.name = "ApiRequestError";
        this.status = status;
    }
}

export const jsonError = (error: unknown, fallbackMessage = "Bad request") => {
    if (error instanceof ApiRequestError) {
        return Response.json({ error: error.message }, { status: error.status });
    }

    return Response.json({ error: fallbackMessage }, { status: 500 });
};

export const checkRateLimit = (
    request: Request,
    {
        keyPrefix,
        limit,
        windowMs,
    }: {
        keyPrefix: string;
        limit: number;
        windowMs: number;
    },
) => {
    const now = Date.now();
    const clientIp = getClientIp(request);
    const key = `${keyPrefix}:${clientIp}`;
    const entry = rateLimitStore.get(key);

    if (!entry || entry.resetAt <= now) {
        rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
        cleanupRateLimitStore(now);
        return null;
    }

    entry.count += 1;

    if (entry.count <= limit) {
        return null;
    }

    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);

    return Response.json(
        { error: "Too many requests. Try again later." },
        {
            status: 429,
            headers: {
                "Retry-After": retryAfterSeconds.toString(),
            },
        },
    );
};

export const parseJsonObject = async (
    request: Request,
    maxBytes = DEFAULT_JSON_BODY_LIMIT_BYTES,
) => {
    requireContentLengthUnderLimit(request, maxBytes);

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
        throw new ApiRequestError(
            "Invalid Content-Type, expected application/json",
            415,
        );
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        throw new ApiRequestError("Malformed JSON body");
    }

    if (!isPlainObject(body)) {
        throw new ApiRequestError("Request body must be a JSON object");
    }

    return body;
};

export const requireContentLengthUnderLimit = (
    request: Request,
    maxBytes: number,
) => {
    const rawLength = request.headers.get("content-length");
    if (!rawLength) return;

    const contentLength = Number(rawLength);
    if (!Number.isFinite(contentLength) || contentLength < 0) {
        throw new ApiRequestError("Invalid Content-Length header", 400);
    }

    if (contentLength > maxBytes) {
        throw new ApiRequestError("Request body is too large", 413);
    }
};

export const readRequiredString = (
    body: Record<string, unknown>,
    key: string,
    {
        label,
        maxLength,
        pattern,
    }: {
        label: string;
        maxLength: number;
        pattern?: RegExp;
    },
) => {
    const value = body[key];

    if (typeof value !== "string") {
        throw new ApiRequestError(`${label} must be a string`);
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
        throw new ApiRequestError(`${label} is required`);
    }

    if (trimmedValue.length > maxLength) {
        throw new ApiRequestError(`${label} must be ${maxLength} characters or less`);
    }

    if (pattern && !pattern.test(trimmedValue)) {
        throw new ApiRequestError(`${label} is invalid`);
    }

    return trimmedValue;
};

export const readOptionalString = (
    body: Record<string, unknown>,
    key: string,
    {
        label,
        maxLength,
    }: {
        label: string;
        maxLength: number;
    },
) => {
    const value = body[key];

    if (value === undefined || value === null || value === "") {
        return undefined;
    }

    if (typeof value !== "string") {
        throw new ApiRequestError(`${label} must be a string`);
    }

    const trimmedValue = value.trim();

    if (!trimmedValue) {
        return undefined;
    }

    if (trimmedValue.length > maxLength) {
        throw new ApiRequestError(`${label} must be ${maxLength} characters or less`);
    }

    return trimmedValue;
};

export const readRequiredInteger = (
    body: Record<string, unknown>,
    key: string,
    {
        label,
        min,
        max,
    }: {
        label: string;
        min: number;
        max: number;
    },
) => {
    const rawValue = body[key];
    const value =
        typeof rawValue === "number"
            ? rawValue
            : typeof rawValue === "string"
              ? Number(rawValue.trim())
              : NaN;

    if (!Number.isInteger(value)) {
        throw new ApiRequestError(`${label} must be an integer`);
    }

    if (value < min || value > max) {
        throw new ApiRequestError(`${label} must be between ${min} and ${max}`);
    }

    return value;
};

export const parseDateString = (value: string, label: string) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

    if (!match) {
        throw new ApiRequestError(`${label} must use YYYY-MM-DD format`);
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        throw new ApiRequestError(`${label} is invalid`);
    }

    return date;
};

export const parseObjectId = (value: string, label = "ID") => {
    if (!/^[a-f\d]{24}$/i.test(value)) {
        throw new ApiRequestError(`${label} is invalid`);
    }

    return value;
};

const getClientIp = (request: Request) => {
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
        return forwardedFor.split(",")[0]?.trim() || "unknown";
    }

    return (
        request.headers.get("cf-connecting-ip") ??
        request.headers.get("x-real-ip") ??
        "unknown"
    );
};

const cleanupRateLimitStore = (now: number) => {
    if (rateLimitStore.size < 10000) return;

    for (const [key, entry] of rateLimitStore) {
        if (entry.resetAt <= now) {
            rateLimitStore.delete(key);
        }
    }
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        Object.getPrototypeOf(value) === Object.prototype
    );
};
