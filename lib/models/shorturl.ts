import { Schema, model, models } from "mongoose";

const shortUrlSchema = new Schema({
  url: String,
  shortId: String
});

const ShortURL = models["short-urls"] || model("short-urls", shortUrlSchema);

export default ShortURL;