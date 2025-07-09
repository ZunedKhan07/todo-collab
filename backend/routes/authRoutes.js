import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  getAllUsers
} from "../controllers/authController.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.get("/all-users", protect, getAllUsers);

export default router;
