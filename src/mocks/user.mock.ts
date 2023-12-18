import { v4 as uuidv4 } from "uuid"

import { UserInterface, UserServiceRequest, UserServiceResponse } from "@/interfaces/user.inteface";
import { User, UserProps } from "@/models/user.model";
import { createUserSchema, deleteUserSchema, getOneUserSchema, updateUserSchema } from "@/schemas/user.schema";
import log from "@/utils/logger";
import { UnexpectedError } from "@/errors/unexpected.error";
import { NotFoundError } from "@/errors/notfound.error";

export class UserServiceMock implements UserInterface {

    private users: UserProps[] = [];

    async create(user: UserServiceRequest) : Promise<UserServiceResponse> {
    
        try {
        
            const {username, email, password} = user;
            
            createUserSchema.parse({
                body: {
                    username, 
                    email, 
                    password
                }
            });
            
            const userCreated = {
                id: uuidv4(),
                username, 
                email, 
                password,
                tasks: [],
                createdAt: new Date(),
                updatedAt: new Date()
            }
        
            this.users.push(userCreated)
            
            return new User(userCreated);
        } catch (err : any) {
            log.error(err, `[USER_SERVICE_CREATE]`);
            throw UnexpectedError(err.message);
        }
    
    }
    
    async update(userId : string, user : UserServiceRequest) : Promise<UserServiceResponse> {

        try {
   
            const {username, email, password} = user;
            
            updateUserSchema.parse({
                params: {
                    id: userId
                },
                body: {
                    username, email, password
                }
            })
            
            const userIndex = this.users.findIndex((u) => u.id === userId);

            if (userIndex === -1) {
              throw NotFoundError('[USER_SERVICE_UPDATE]: User not found');
            }
        
            this.users[userIndex] = { 
                ...this.users[userIndex],
                username,
                email,
                password
            }
            
            return new User(this.users[userIndex]);
        } catch (err : any) {
            log.error(err, `[USER_SERVICE_UPDATE]`);
            
            if (err instanceof NotFoundError) {
                throw err;
            }
            
            throw UnexpectedError(err.message);
        }
        
    }
    
    async getOne(userId : string) : Promise<UserServiceResponse> {
        try {
        
            getOneUserSchema.parse({
                params: {
                    id: userId
                }
            });
        
            const user = this.users.findIndex((user) => user.id === userId);
            
            if (user === -1) {
                throw NotFoundError('[USER_SERVICE_GETONE]: User not found');
            }
            
            return new User(this.users[user]);
        } catch (err : any) {
            log.error(err, `[USER_SERVICE_GETONE]`);
            
            if (err instanceof NotFoundError) {
                throw err;
            }
            
            throw UnexpectedError(err.message);
        }
    }
    
    async getAll() : Promise<UserServiceResponse[]> {
        try {
            const users = this.users;
            
            if (!users || users.length === 0) {
                throw NotFoundError('[USER_SERVICE_GETALL]: Users not found');
            }
            
            return users.map((user) => new User(user));
        } catch (err : any) {
            log.error(err, `[USER_SERVICE_GETALL]`);
            
            if (err instanceof NotFoundError) {
                throw err;
            }
            
            throw UnexpectedError(err.message);
        }
    }
    
    async delete(userId : string) : Promise<Boolean> {
    
        try {
        
            deleteUserSchema.parse({
                params: {
                    id: userId
                }
            });
        
            const userExists = this.users.findIndex((user) => user.id === userId);

            
            if (userExists === -1) {
                throw NotFoundError('[USER_SERVICE_DELETE]: User not found');
            }
        
            this.users.slice(userExists, 1);
            
            return true;
        } catch (err : any) {
            log.error(err, `[USER_SERVICE_DELETE]`);
            
            if (err instanceof NotFoundError) {
                throw err;
            }
            
            throw UnexpectedError(err.message);
        }
        
    }
    
    reset(): void {
        this.users = [];
    }

}