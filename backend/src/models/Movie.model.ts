
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    duration: Number,
    language: String,
    rating: Number,
    releaseDate: Date,
    status: {
      type: String,
      enum: ["NOW_SHOWING", "UPCOMING"],
      default: "NOW_SHOWING",
    },
    poster: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);