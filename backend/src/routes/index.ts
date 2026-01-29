import { Router } from "express";
import authRoutes from "./auth/auth.route";
import bookingRoutes from "./booking/booking.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/booking", bookingRoutes);

export default router;
