import { Schema, model } from "mongoose";

// Short URL Schema
const shortUrlSchema = new Schema({
  url: String
});

// Short URL Model
const ShortURL = model("short-urls", shortUrlSchema);

export const POST = async (request: Request) => {

}