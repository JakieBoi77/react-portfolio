import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 64,
            index: true,
        },
    },
    { versionKey: false },
);

const User = models["users"] || model("users", userSchema);

export default User;
