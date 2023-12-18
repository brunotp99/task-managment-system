//Task Model
    //Given a valid task dats
        //Should return a Task Object
        //Should allow to access id, title, description, dueDate, status and userId
    //Given a missing userId
        //Should throw a Error
    //Given an invalid date
        //Should throw a Error

import { describe, expect, it } from "vitest";
        
import { Task } from "@/models/task.model";
import { taskPayload } from "../__utils__/payloads";
import { getPastDate } from "../__utils__/get-date";

        
describe("Task Model", () => {

    describe("Given a valid Task Data", () => {
    
        it("Should return a Task Object", () => {
        
            const task = new Task(taskPayload);
            expect(task).toBeInstanceOf(Task);
        
        });
        
        it("Should allow to access id, title, description, dueDate, status and UserId", () => {
        
            const task = new Task(taskPayload);
            expect(task.id).toBe(taskPayload.id)
            expect(task.title).toBe(taskPayload.title)
            expect(task.description).toBe(taskPayload.description)
            expect(task.dueDate).toBe(taskPayload.dueDate)
            expect(task.status).toBe(taskPayload.status)
            expect(task.userId).toBe(taskPayload.userId)
        
        })
    
    });
    
    describe("Given a missing UserId", () => {
    
        it("Should throw a Error Expection", () => {
        
            expect(() => {
                new Task({
                    ...taskPayload,
                    userId: ""
                })
            }).toThrow();
            
        })
    
    });
    
    describe("Given an invalid Date", () => {
    
        it("Should throw a Error Expection", () => {
        
            expect(() => {
                new Task({
                    ...taskPayload,
                    dueDate: getPastDate()
                })
            }).toThrow();
            
        })
    
    })

})