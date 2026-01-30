//backend/src/controllers/movie/movie.controller.ts
import { Request, Response } from "express";
import { movieService } from "../../services";

export const fetchMovies = async (_req: Request, res: Response) => {
  const movies = await movieService.getAllMovies();
  res.json({ success: true, movies });
};

export const fetchMovie = async (req: Request, res: Response) => {
  const id = req.params.id as string; // ✅ FIX

  const movie = await movieService.getMovieById(id);
  res.json({ success: true, movie });
};
