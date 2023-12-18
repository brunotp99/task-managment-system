import { TaskProps } from "./task.model";

export interface UserProps {
    id: string
    username: string
    email: string
    password: string;
    
    tasks?: TaskProps[];
    
    createdAt?: Date;
    updatedAt?: Date;
}

export class User {

    private props : UserProps;
    
    constructor(props : UserProps) {
        this.props = props;
    }
    
    get id() : string {
        return this.props.id
    }
    
    get username() : string {
        return this.props.username
    }
    
    get email() : string {
        return this.props.email
    }
    
    get tasks() : TaskProps[] {
        return this.props.tasks ? this.props.tasks : []
    }
    
    toJSON() {
        const { id, username, email, tasks, createdAt, updatedAt } = this.props;
        return { id, username, email, tasks, createdAt, updatedAt };
    }

}