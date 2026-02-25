import { Router } from "express";
import {
  getMovies,
  getSingleMovie,
  updateMovie,
  createMovie,
  deleteMovie,
} from "../../controllers/movie/movie.controller";
import { upload } from "../../config/multer";

const router = Router();

// 🔥 IMPORTANT: "/" first
router.get("/", getMovies);

// 🔥 THIS MUST EXIST
router.get("/:id", getSingleMovie);

router.post("/", upload.single("poster"), createMovie);

router.put("/:id", upload.single("poster"), updateMovie);

router.delete("/:id", deleteMovie);

export default router;