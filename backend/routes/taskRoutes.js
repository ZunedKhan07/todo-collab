import { Router } from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  smartAssignTask,
} from "../controllers/taskController.js";

const router = Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.put("/:id/smart-assign", smartAssignTask);

export default router;
