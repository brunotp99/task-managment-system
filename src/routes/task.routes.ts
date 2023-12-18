import { Router } from "express";

import validate from "@/middlewares/validate-schema";

import { createTaskSchema, deleteTaskSchema, getTaskSchema, updateTaskSchema } from "@/schemas/task.schema";
import { TaskService } from "@/services/task.service";
import { TaskController } from "@/controllers/task.controller";

const taskService = new TaskService();
const taskController = new TaskController(taskService);

const taskRoutes = Router();

taskRoutes.get("/:taskId", 
    validate(getTaskSchema),
    taskController.get
);

taskRoutes.post("/", 
    validate(createTaskSchema),
    taskController.create
);

taskRoutes.patch("/:taskId", 
    validate(updateTaskSchema),
    taskController.update
);

taskRoutes.delete("/:taskId", 
    validate(deleteTaskSchema),
    taskController.delete
);

export { taskRoutes };

