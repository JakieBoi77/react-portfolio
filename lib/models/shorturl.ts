import { Schema, model, models } from "mongoose";

// Short URL Schema
const shortUrlSchema = new Schema({
  url: String,
  shortId: String
});

// Short URL Model
const ShortURL = models["short-urls"] || model("short-urls", shortUrlSchema);

export default ShortURL;