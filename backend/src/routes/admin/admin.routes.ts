import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth/auth.middleware";
import { roleMiddleware } from "../../middlewares/role/role.middleware";

const router = Router();

// Only ADMIN can access
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin Dashboard"
    });
  }
);

export default router;
