import connect from "@/lib/db";
import ShortURL from "@/lib/models/shorturl";
import { randomBytes } from "crypto";
import {
    ApiRequestError,
    checkRateLimit,
    jsonError,
    parseJsonObject,
    readRequiredString,
} from "@/lib/api-security";

export const POST = async (request: Request) => {
    try {
        const rateLimitResponse = checkRateLimit(request, {
            keyPrefix: "shorturl:create",
            limit: 20,
            windowMs: 60_000,
        });
        if (rateLimitResponse) return rateLimitResponse;

        // Connect to database
        await connect();

        // Get request body
        const body = await parseJsonObject(request);
        const inputUrl = readRequiredString(body, "url", {
            label: "URL",
            maxLength: 2048,
        });

        // Create a URL from the Request Body
        let url: URL;
        try {
            url = new URL(inputUrl);
        } catch {
            throw new ApiRequestError("Invalid URL");
        }

        // Protocol must be HTTP or HTTPS
        if (url.protocol === "http:" || url.protocol === "https:") {
            // Query the database for the URL
            let record = await ShortURL.findOne({ url: { $eq: url.href } });

            // If the record does not exist
            if (!record) {
                // Generate a shorter ID for the short URL
                const shortId = await generateUniqueShortId();

                // Add URL to Database
                const shortURL = new ShortURL({ url: url.href, shortId });
                await shortURL.save();
                console.log("Successfully saved shortened URL:", shortId);
                // Update the record
                record = await ShortURL.findOne({ url: { $eq: url.href } });
            } else {
                console.log("URL already in database:", record.shortId);
            }

            // Send back the short URL data
            if (record) {
                return Response.json({
                    original_url: record.url,
                    short_url: record.shortId,
                });
            } else {
                return Response.json(
                    { error: "Record not found after saving" },
                    { status: 500 },
                );
            }
        } else {
            throw new ApiRequestError("Invalid URL protocol");
        }
    } catch (err: any) {
        console.error("Error: " + err);
        return jsonError(err, "Internal server error");
    }
};

const generateUniqueShortId = async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
        const shortId = randomBytes(6).toString("base64url");
        const existingRecord = await ShortURL.exists({
            shortId: { $eq: shortId },
        });

        if (!existingRecord) {
            return shortId;
        }
    }

    throw new ApiRequestError("Could not generate a unique short URL", 500);
};
