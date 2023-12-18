import { Task, TaskStatus } from "@/models/task.model";

export interface TaskServiceRequest {
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    userId: string;
}

export type TaskServiceResponse = Task;

export interface TaskInterface {
    create(task : TaskServiceRequest): Promise<TaskServiceResponse>;
    get(taskId : string): Promise<TaskServiceResponse>;
    update(taskId : string, updatedTask : TaskServiceRequest): Promise<TaskServiceResponse>;
    delete(taskId : string): Promise<Boolean>;
}