import { Request, Response } from "express";

import { ErrorInterface } from "@/errors/interface.error";
import { InvalidEnumError } from "@/errors/invalid-enum.error";
import { UnexpectedError } from "@/errors/unexpected.error";
import { TaskInterface } from "@/interfaces/task.interface";
import { NotFoundError } from "@/errors/notfound.error";

export class TaskController {

    private taskService: TaskInterface;
  
    constructor(taskService: TaskInterface) {
      this.taskService = taskService;
      this.create = this.create.bind(this);
      this.get = this.get.bind(this);
      this.update = this.update.bind(this);
      this.delete = this.delete.bind(this);
    }

    async create(req: Request, res: Response) {
        try {
            const { title, description, dueDate, status, userId } = req.body;
            
            const task = await this.taskService.create({
                title, description, dueDate, status, userId
            });
            
            return res.status(200).json(task.toJSON());
        } catch (error : any) {
            if (error instanceof UnexpectedError || error instanceof InvalidEnumError) {
                const err = (error as ErrorInterface)
                return res.status(err.statusCode).send(`[TASK_CONTROLLER_CREATE]: "${err.message}"`)
            }
            return res.status(500).send(`[TASK_CONTROLLER_CREATE]: "${error}"`)
        }
    }
    
    async get(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            
            const task = await this.taskService.get(taskId);
            
            return res.status(200).json(task.toJSON());
        } catch (error : any) {
            if (error instanceof NotFoundError || error instanceof InvalidEnumError) {
                const err = (error as ErrorInterface)
                return res.status(err.statusCode).send(`[TASK_CONTROLLER_GET]: "${err.message}"`)
            }
            return res.status(500).send(`[TASK_CONTROLLER_GET]: "${error}"`)
        }
    }
    
    async update(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            const { title, description, dueDate, status, userId } = req.body;
            
            const task = await this.taskService.update(taskId, {
                title, description, dueDate, status, userId
            });
            
            return res.status(200).json(task.toJSON());
        } catch (error : any) {
            if (error instanceof NotFoundError || error instanceof InvalidEnumError) {
                const err = (error as ErrorInterface)
                return res.status(err.statusCode).send(`[TASK_CONTROLLER_UPDATE]: "${err.message}"`)
            }
            return res.status(500).send(`[TASK_CONTROLLER_UPDATE]: "${error}"`)
        }
    }
    
    async delete(req: Request, res: Response) {
        try {
            const { taskId } = req.params;
            
            const task = await this.taskService.delete(taskId);
            
            return res.status(200).json(task);
        } catch (error : any) {
            if (error instanceof NotFoundError) {
                const err = (error as ErrorInterface)
                return res.status(err.statusCode).send(`[TASK_CONTROLLER_DELETE]: "${err.message}"`)
            }
            return res.status(500).send(`[TASK_CONTROLLER_DELETE]: "${error}"`)
        }
    }
    
}