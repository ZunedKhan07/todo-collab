import express from "express";
import { getRecentLogs } from "../controllers/log.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ GET /api/v1/logs/recent
router.get("/recent", isAuthenticated, getRecentLogs);

export default router;
