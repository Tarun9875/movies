// src/models/Movie.model.ts
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    poster: String,
    duration: Number,
    language: String,
    rating: Number,
    releaseDate: Date,
    status: {
      type: String,
      enum: ["NOW_SHOWING", "UPCOMING"],
      default: "NOW_SHOWING"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
