import express from 'express';

const router = express.Router();
import { paginationMiddleware } from "../middlewares/shared.middleware";
import { getAllTasks, getTask, createTask, updateTask, deleteTask }  from "../controllers/tasks.controller";
import { filterTasksMiddleware } from "../middlewares/tasks.middleware";
import { authenticateToken } from "../middlewares/authentication.middleware";

router.get("/tasks",authenticateToken,filterTasksMiddleware,paginationMiddleware, getAllTasks);
router.get("/task/:id",authenticateToken, getTask);
router.post("/task",authenticateToken, createTask);
router.put("/task/:id",authenticateToken, updateTask);
router.delete("/task/:id",authenticateToken, deleteTask);

export default router;
