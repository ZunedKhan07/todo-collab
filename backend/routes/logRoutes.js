import { Router } from "express";
import { getLastLogs } from "../controllers/logController.js";

const router = Router();

router.get("/", getLastLogs);

export default router;
