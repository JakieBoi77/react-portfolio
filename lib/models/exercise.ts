import { Schema, model, models } from "mongoose";

const exerciseSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: Date
}, {versionKey: false});

const Exercise = models["exercises"] || model("exercises", exerciseSchema);

export default Exercise;



