import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  getUserTasks,
} from "../controllers/task-controller";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);
router.get("/user/:userId", getUserTasks);

export default router;
