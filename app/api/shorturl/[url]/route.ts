import connect from "@/lib/db";
import ShortURL from "@/lib/models/shorturl";
import {
    ApiRequestError,
    checkRateLimit,
    jsonError,
} from "@/lib/api-security";

type RouteContext = { params: Promise<{ url: string }> };

export const GET = async (
    request: Request,
    { params }: RouteContext,
) => {
    try {
        const rateLimitResponse = checkRateLimit(request, {
            keyPrefix: "shorturl:redirect",
            limit: 120,
            windowMs: 60_000,
        });
        if (rateLimitResponse) return rateLimitResponse;

        // Connect to database
        await connect();

        const { url: shortId } = await params;
        if (!/^[A-Za-z0-9_-]{1,16}$/.test(shortId)) {
            throw new ApiRequestError("Short URL ID is invalid");
        }

        // Get the record
        const record = await ShortURL.findOne({ shortId: { $eq: shortId } });

        if (record) {
            // Redirect to the original URL
            return Response.redirect(record.url);
        }

        // Not found
        return Response.json(
            { response: "Shortened URL not found" },
            { status: 404 },
        );
    } catch (err) {
        console.error(err);
        return jsonError(err, "Internal server error");
    }
};
