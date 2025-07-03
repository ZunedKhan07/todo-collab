import { Router } from "express";
import { 
         createTask,
         deleteTask,
         getAllTasks, 
         smartAssignTask, 
         updateTask
       } 
          from "../controllers/task.Controller";

const router = Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.put("/", updateTask);
router.delete("/:id", deleteTask);
router.post("/smart-assign", smartAssignTask)

export default router;