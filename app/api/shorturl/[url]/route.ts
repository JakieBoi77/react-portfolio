import connect from "@/lib/db";
import ShortURL from "@/lib/models/shorturl";

export const GET = async (
    request: Request,
    { params }: { params: { url: string } },
) => {
    try {
        // Connect to database
        await connect();

        const shortId = params.url;

        // Get the record
        const record = await ShortURL.findOne({ shortId });
        console.log(record.url);

        if (record) {
            // Redirect to the original URL
            return Response.redirect(record.url);
        }

        // Not found
        return Response.json({ response: "Shortened URL not found" });
    } catch (err) {
        console.error(err);
    }
};
