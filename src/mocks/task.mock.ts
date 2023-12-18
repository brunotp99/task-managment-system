import { v4 as uuidv4 } from "uuid";

import { InvalidEnumError } from "@/errors/invalid-enum.error";
import { UnexpectedError } from "@/errors/unexpected.error";
import { TaskInterface, TaskServiceRequest, TaskServiceResponse } from "@/interfaces/task.interface";
import { Task, TaskProps, TaskStatus } from "@/models/task.model";
import { createTaskSchema, deleteTaskSchema, getTaskSchema, updateTaskSchema } from "@/schemas/task.schema";
import { NotFoundError } from "@/errors/notfound.error";

export class TaskServiceMock implements TaskInterface {

    private tasks: TaskProps[] = [];

    async create(task: TaskServiceRequest) : Promise<TaskServiceResponse> {
    
        try {
            
            const { title, description, dueDate, status, userId } = task;
            
            createTaskSchema.parse({
                body: {
                    title, description, dueDate, status, userId
                }
            });
            
            const taskStatus = Object.values(TaskStatus).find(
                (value) => value.toLowerCase() === status
            );
            
            if (taskStatus === undefined) {
                throw InvalidEnumError(`[TASK_SERVICE_CREATE]: Invalid status string: ${status}`);
            }
            
            const createdTask = {
                id: uuidv4(),
                title, 
                description, 
                dueDate, 
                status: taskStatus, 
                userId
            };
            
            this.tasks.push(createdTask)
            
            if (!createdTask) {
                throw UnexpectedError("[TASK_SERVICE_CREATE]: Something went wrong while creating a new task.");
            }
            
            return new Task(createdTask);
            
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
            
            const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
            
            if (taskIndex === -1) {
                throw NotFoundError("[TASK_SERVICE_GET]: Couldn't find the requested user.");
            }
            
            return new Task(this.tasks[taskIndex]);
            
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
            
            const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
            
            if (taskIndex === -1) {
                throw NotFoundError("[TASK_SERVICE_GET]: Couldn't find the requested user.");
            }
            
            const taskStatus = Object.values(TaskStatus).find(
                (value) => value.toLowerCase() === status
            );
            
            if (taskStatus === undefined) {
                throw InvalidEnumError(`[TASK_SERVICE_CREATE]: Invalid status string: ${status}`);
            }
            
        
            this.tasks[taskIndex] = { 
                ...this.tasks[taskIndex],
                title,
                description,
                dueDate,
                status: taskStatus,
                userId
            }
            
            return new Task(this.tasks[taskIndex]);
            
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
            
            const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
            
            if (taskIndex === -1) {
                throw NotFoundError("[TASK_SERVICE_GET]: Couldn't find the requested user.");
            }
            
            const beforeSize = this.tasks.length;
            this.tasks.slice(taskIndex, 1);
            const afterSize = this.tasks.length;
            
            
            return beforeSize === afterSize;
            
        } catch (error : any) {
            throw error;
        }
    }
    
    reset(): void {
        this.tasks = [];
    }
    
}