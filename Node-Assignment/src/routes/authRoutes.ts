import { Router } from "express";
import { register, login, refresh, logout, getProfile } from "../controllers/authController";
import { authGuard } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", authGuard, logout);
router.get("/profile", authGuard, getProfile);

export default router;
