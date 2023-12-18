import { InvalidEnumError } from "@/errors/invalid-enum.error";
import { NotFoundError } from "@/errors/notfound.error";
import { UnexpectedError } from "@/errors/unexpected.error";
import { TaskInterface, TaskServiceRequest, TaskServiceResponse } from "@/interfaces/task.interface";
import { Task, TaskStatus } from "@/models/task.model";
import { createTaskSchema, deleteTaskSchema, getTaskSchema, updateTaskSchema } from "@/schemas/task.schema";
import { prismadb } from "@/utils/prismadb";

export class TaskService implements TaskInterface {

    async create(task: TaskServiceRequest): Promise<TaskServiceResponse> {
        
        try {
            
            const { title, description, dueDate, status, userId } = task;
            
            createTaskSchema.parse({
                body: {
                    title, description, dueDate, status, userId
                }
            });
            
            const createdTask = await prismadb.task.create({
                data: {
                    title,
                    description,
                    dueDate,
                    status,
                    userId
                }
            });
            
            if (!createdTask) {
                throw UnexpectedError("[TASK_SERVICE_CREATE]: Something went wrong while creating a new task.");
            }
            
            const taskStatus = Object.values(TaskStatus).find(
                (value) => value.toLowerCase() === createdTask.status
            );

            if (taskStatus === undefined) {
                throw InvalidEnumError(`[TASK_SERVICE_CREATE]: Invalid status string: ${createdTask.status}`);
            }
            
            return new Task({
                ...createdTask,
                status: taskStatus
            });
            
        } catch (error : any) {
            throw error;
        }
        
    }
    
    async get(taskId: string): Promise<TaskServiceResponse> {
        try {
        
            getTaskSchema.parse({
                params: {
                    taskId
                }
            });
            
            const task = await prismadb.task.findFirst({
                where: {
                    id: taskId
                }
            })
            
            if (!task) {
                throw NotFoundError("[TASK_SERVICE_GET]: Couldn't find the requested user.");
            }
            
            const taskStatus = Object.values(TaskStatus).find(
                (value) => value.toLowerCase() === task.status
            );
            
            if (taskStatus === undefined) {
                throw InvalidEnumError(`[TASK_SERVICE_GET]: Invalid status string: ${task.status}`);
            }
            
            return new Task({
                ...task,
                status: taskStatus
            });
            
        } catch (error : any) {
            throw error
        }
    }
    
    async update(taskId: string, updatedTask: TaskServiceRequest): Promise<TaskServiceResponse> {
        try {
            const { title, description, dueDate, status, userId } = updatedTask;
            
            updateTaskSchema.parse({
                params: {
                    taskId,
                },
                body: {
                    title, description, dueDate, status, userId
                }
            });
            
            const taskExists = await prismadb.task.findFirst({
                where: {
                    id: taskId
                }
            })
            
            if (!taskExists) {
                throw NotFoundError("[TASK_SERVICE_UPDATE]: Couldn't find the requested user.");
            }
            
            const taskStatus = Object.values(TaskStatus).find(
                (value) => value.toLowerCase() === status
            );
            
            if (taskStatus === undefined) {
                throw InvalidEnumError(`[TASK_SERVICE_UPDATE]: Invalid status string: ${status}`);
            }
            
            const task = await prismadb.task.update({
                data: {
                    title,
                    description,
                    dueDate,
                    status,
                    userId
                },
                where: {
                    id: taskId
                }
            });
            
            return new Task({
                ...task,
                status: status,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt
            });
            
        } catch (error : any) {
            throw error
        }
    }
    
    async delete(taskId: string): Promise<Boolean> {
        try {
        
            deleteTaskSchema.parse({
                params: {
                    taskId
                }
            });
            
            const taskExists = await prismadb.task.findFirst({
                where: {
                    id: taskId
                }
            })
            
            if (!taskExists) {
                throw NotFoundError("[TASK_SERVICE_DELETE]: Couldn't find the requested user.");
            }
            
            const task = await prismadb.task.delete({
                where: {
                    id: taskId
                }
            });
            
            return !!task;
            
        } catch (error : any) {
            throw error;
        }
    }

}