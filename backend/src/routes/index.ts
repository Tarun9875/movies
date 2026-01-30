//backend/src/routes/index.ts
import { Router } from "express";
import authRoutes from "./auth/auth.route";
import bookingRoutes from "./booking/booking.route";
import movieRoutes from "./movie/movie.routes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/booking", bookingRoutes);
router.use("/movies", movieRoutes);

export default router;
