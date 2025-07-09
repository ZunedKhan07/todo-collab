import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  smartAssignTask,
  manualAssignTask
} from "../controllers/taskController.js";

const router = Router();

router.post("/",protect, createTask);
router.get("/", getAllTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.put("/:id/smart-assign", protect, smartAssignTask);
router.put("/:id/assign", protect, manualAssignTask);

export default router;
