import { Request, Response } from "express";
import Movie from "../../models/Movie.model";

// ================= CREATE =================
export const createMovie = async (req: Request, res: Response) => {
  const movie = await Movie.create({
    ...req.body,
    poster: req.file ? `/uploads/posters/${req.file.filename}` : "",
  });

  res.status(201).json({
    success: true,
    movie,
  });
};

// ================= GET ALL =================
export const getMovies = async (req: Request, res: Response) => {
  const movies = await Movie.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    movies,
  });
};

// ================= DELETE =================
export const deleteMovie = async (req: Request, res: Response) => {
  await Movie.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Movie deleted successfully",
  });
};

// ================= GET SINGLE =================
export const getSingleMovie = async (req: Request, res: Response) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }

  res.json({
    success: true,
    movie,
  });
};

// ================= UPDATE =================
export const updateMovie = async (req: Request, res: Response) => {
  const updateData: any = { ...req.body };

  // If new poster uploaded
  if (req.file) {
    updateData.poster = `/uploads/posters/${req.file.filename}`;
  }

  const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json({
    success: true,
    movie: updatedMovie,
  });
};