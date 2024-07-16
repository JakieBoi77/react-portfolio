import connect from "@/lib/db";
import ShortURL from "@/lib/models/shorturl";

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const BASE = ALPHABET.length;

function encode(num: number): string {
  let encoded = "";
  while (num) {
    const remainder = num % BASE;
    num = Math.floor(num / BASE);
    encoded = ALPHABET[remainder].toString() + encoded;
  }
  return encoded;
}

export const POST = async (request: Request) => {
  try {
    // Connect to database
    await connect();

    // Check if the request body is in JSON format
    if (request.headers.get("Content-Type") !== "application/json") {
      throw new Error("Invalid Content-Type, expected application/json");
    }
    
    // Get request body
    const body = await request.json();

    // Create a URL from the Request Body
    const url = new URL(body.url);

    // Protocol must be HTTP or HTTPS
    if (url.protocol === "http:" || url.protocol === "https:") {
      // Query the database for the URL
      let record = await ShortURL.findOne({ url: url.href });

      // If the record does not exist
      if (!record) {

        // Generate a shorter ID for the short URL
        const shortId = encode(Math.floor(Math.random() * Date.now()));

        // Add URL to Database
        const shortURL = new ShortURL({ url: url.href, shortId });
        await shortURL.save();
        console.log("Sucessfully saved to database:", url.href, "->", shortId);
        // Update the record
        record = await ShortURL.findOne({ url: url.href });
      } else {
        console.log("URL already in database:", url.href);
      }
      
      // Send back the short URL data
      if (record) {
        return Response.json({ "original_url": record.url, "short_url": record.shortId });
      } else {
        return new Error("Record not found after saving")
      }
      
    } else {
      throw new Error("Invalid URL Protocol");
    }

  } catch (err: any) {
    console.error("Error: " + err);
    return new Response(err.message)
  }
}