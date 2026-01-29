import { Router } from "express";
import { authMiddleware } from "../../middlewares";
import { roleMiddleware } from "../../middlewares";

const router = Router();

/* =========================
   Protected Booking Route
========================= */
router.get(
  "/my-bookings",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "User bookings fetched",
      user: (req as any).user
    });
  }
);

/* =========================
   Admin Only Booking Route
========================= */
router.get(
  "/all-bookings",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  (req, res) => {
    res.json({
      success: true,
      message: "All bookings (admin)"
    });
  }
);

export default router;
