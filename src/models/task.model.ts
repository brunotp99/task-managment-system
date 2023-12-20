import { compareDesc } from "date-fns";

export interface TaskProps {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    
    userId: string;
    
    createdAt?: Date;
    updatedAt?: Date;
}

export enum TaskStatus {
    Pending = "pending",
    Completed = "completed",
    InProgress = "in progress",
}

export class Task {

    private props : TaskProps;
    
    constructor(props : TaskProps) {
    
        if (!props.userId) {
            throw new Error("UserId is required.");
        }
        
        if (compareDesc( props.dueDate, new Date() ) !== -1) {
            throw new Error("Cannot due a task in the past.")
        }
        
        this.props = props;
    }
    
    get id() : string {
        return this.props.id
    }
    
    get title() : string {
        return this.props.title
    }
    
    get description() : string {
        return this.props.description
    }
    
    get dueDate() : Date {
        return this.props.dueDate
    }
    
    get status() : string {
        return this.props.status
    }
    
    get userId() : string {
        return this.props.userId
    }
    
    toJSON() {
        const { id, title, description, dueDate, status, userId } = this.props;
        return { id, title, description, dueDate, status, userId };
    }
    
}