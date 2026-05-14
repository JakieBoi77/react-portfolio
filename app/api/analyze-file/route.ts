import {
    ApiRequestError,
    checkRateLimit,
    jsonError,
    requireContentLengthUnderLimit,
} from "@/lib/api-security";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_MULTIPART_BODY_BYTES = MAX_FILE_BYTES + 16 * 1024;

export const POST = async (request: Request) => {
    try {
        const rateLimitResponse = checkRateLimit(request, {
            keyPrefix: "file:analyze",
            limit: 10,
            windowMs: 60_000,
        });
        if (rateLimitResponse) return rateLimitResponse;

        requireContentLengthUnderLimit(request, MAX_MULTIPART_BODY_BYTES);

        const formData = await request.formData();
        const file = formData.get("upfile");

        if (!(file instanceof File)) {
            throw new ApiRequestError("File is required");
        }

        if (file.size > MAX_FILE_BYTES) {
            throw new ApiRequestError("File must be 5 MB or smaller", 413);
        }

        if (file.name.length > 255) {
            throw new ApiRequestError("File name must be 255 characters or less");
        }

        return Response.json({
            name: file.name,
            type: file.type,
            size: file.size,
        });
    } catch (err: any) {
        console.error("Error: " + err);
        return jsonError(err, "Internal server error");
    }
};
