import { Schema, model, models } from "mongoose";

const exerciseSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            match: /^[a-f\d]{24}$/i,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            maxlength: 64,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 280,
        },
        duration: {
            type: Number,
            required: true,
            min: 1,
            max: 100000,
        },
        date: Date,
    },
    { versionKey: false },
);

const Exercise = models["exercises"] || model("exercises", exerciseSchema);

export default Exercise;
