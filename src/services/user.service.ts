import * as z from "zod";

import { UnexpectedError } from "@/errors/unexpected.error";
import { NotFoundError } from "@/errors/notfound.error";
import { UserInterface, UserServiceRequest, UserServiceResponse } from "@/interfaces/user.inteface";
import { User } from "@/models/user.model";
import { createUserSchema, deleteUserSchema, getOneUserSchema, updateUserSchema } from "@/schemas/user.schema";
import log from "@/utils/logger";
import { prismadb } from "@/utils/prismadb";

export class UserService implements UserInterface {

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
        
            const userCreated = await prismadb.user.create({
                data: {
                    username, email, password
                }
            })
            
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
        
            const userExists = await prismadb.user.findFirst({
                where: {
                    id: userId
                }
            });
            
            if (!userExists) {
                throw NotFoundError('[USER_SERVICE_UPDATE]: User not found');
            }
        
            const userUpdated = await prismadb.user.update({
                data: {
                    username,
                    email,
                    password
                },
                where: {
                    id: userId
                }
            });
            
            return new User(userUpdated);
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
        
            const user = await prismadb.user.findFirst({
                where: {
                    id: userId
                }
            });
            
            if (!user) {
                throw NotFoundError('[USER_SERVICE_GETONE]: User not found');
            }
            
            return new User(user);
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
            const users = await prismadb.user.findMany({
                orderBy: {
                    createdAt: "desc"
                }
            });
            
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
        
            const userExists = await prismadb.user.findFirst({
                where: {
                    id: userId
                }
            });
            
            if (!userExists) {
                throw NotFoundError('[USER_SERVICE_DELETE]: User not found');
            }
        
            const user = await prismadb.user.delete({
                where: {
                    id: userId
                }
            });
            
            return !!user;
        } catch (err : any) {
            log.error(err, `[USER_SERVICE_DELETE]`);
            
            if (err instanceof NotFoundError) {
                throw err;
            }
            
            throw UnexpectedError(err.message);
        }
        
    }

}