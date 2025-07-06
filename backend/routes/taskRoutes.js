import { Router } from "express";
import { 
         createTask,
         deleteTask,
         getAllTasks, 
         smartAssignTask, 
         updateTask
       } 
          from "../controllers/task.Controller.js";

const router = Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.put("/", updateTask);
router.delete("/:id", deleteTask);
router.put("/tasks/:id/smart-assign", smartAssignTask);

export default router;