//User Model
    //Given valid user data
        //Should return a User Object
        //Should not store the user password
        //Should allow to access id, username, email and tasks
        //Should return tasks as an array of Tasks

import { User } from "@/models/user.model";
import { describe, expect, it } from "vitest";
import { taskPayload, userPayload } from "../__utils__/payloads";
import { Task } from "@/models/task.model";

describe("User Model", () => {

    describe("Given a valid user data", () => {
        
        it("Should return a User Object", () => {
        
            const user = new User(userPayload);
            
            expect(user).toBeInstanceOf(User);
        
        });
        
        it("Should not store the user password", () => {
        
            const user = new User(userPayload);
            expect(user).not.toHaveProperty("password");
        
        });
        
        it("Should allow to access id, username, email and tasks", () => {
        
            const user = new User(userPayload);
            expect(user.id).toBe(userPayload.id)
            expect(user.username).toBe(userPayload.username)
            expect(user.email).toBe(userPayload.email)
            expect(user.tasks).toEqual([])
            
        
        })
        
        it("Should return tasks as an array of TasksProps", () => {
        
            const user = new User({
                ...userPayload,
                tasks: [taskPayload]
            });

            expect(user.tasks[0]).toBe(taskPayload)
            expect(user.tasks[0].title).toBe(taskPayload.title)
            expect(user.tasks[0].description).toBe(taskPayload.description)
            expect(user.tasks[0].dueDate).toBe(taskPayload.dueDate)
            expect(user.tasks[0].status).toBe(taskPayload.status)
            expect(user.tasks[0].userId).toBe(taskPayload.userId)
        
        })
    
    })

})