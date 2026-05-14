import { Schema, model, models } from "mongoose";

const shortUrlSchema = new Schema({
    url: {
        type: String,
        required: true,
        maxlength: 2048,
        index: true,
    },
    shortId: {
        type: String,
        required: true,
        maxlength: 16,
        unique: true,
        index: true,
    },
});

const ShortURL = models["short-urls"] || model("short-urls", shortUrlSchema);

export default ShortURL;
