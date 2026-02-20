// src/routes/movie/movie.routes.ts
import { Router } from "express";
import { fetchMovies, fetchMovie } from "../../controllers";

const router = Router();

router.get("/", fetchMovies);          // GET all movies
router.get("/:id", fetchMovie);        // GET movie by id

export default router;
