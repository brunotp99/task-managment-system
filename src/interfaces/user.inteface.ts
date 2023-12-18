import { User } from "@/models/user.model";

export interface UserServiceRequest {
    username: string
    email: string
    password: string
}

export type UserServiceResponse = User;

export interface UserInterface {
  create(user: UserServiceRequest): Promise<UserServiceResponse>;
  getOne(userId: string): Promise<UserServiceResponse>;
  getAll(): Promise<UserServiceResponse[]>;
  update(userId: string, updatedUser: UserServiceRequest): Promise<UserServiceResponse>;
  delete(userId: string): Promise<Boolean>;
}