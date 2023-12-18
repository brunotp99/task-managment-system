import { beforeEach, describe, expect, it, vitest } from "vitest";

import { TaskController } from "@/controllers/task.controller";
import { TaskServiceMock } from "@/mocks/task.mock";
import { dummyTaskId, taskPayload, updatedTaskPayload, userPayload } from "../__utils__/payloads";
import { Task } from "@/models/task.model";

describe("Task Service", () => {

    let taskService : TaskServiceMock;
    
    beforeEach(() => {
        taskService = new TaskServiceMock();
        taskService.reset();
    });

    describe("Task Create", () => {
    
        describe("Given a valid Task Object", () => {
        
            it("Should return a Task Object", async () => {
            
                const task = await taskService.create(taskPayload);
                
                expect(task).toBeInstanceOf(Task); 

                expect(task.title).toBe(taskPayload.title)
                expect(task.description).toBe(taskPayload.description)
                expect(task.dueDate).toBe(taskPayload.dueDate)
                expect(task.status).toBe(taskPayload.status)
                expect(task.userId).toBe(taskPayload.userId)
            
            })
        
        });
        
        describe("Given a missing schema value", () => {
        
            it("Should Throw a Error Message", async () => {
            
                expect(async () => {
                    await taskService.create({
                        ...taskPayload,
                        title: "",
                    })
                }).rejects.toThrow();
                        
            })
        
        });
    
    });
    
    describe("Task Get", () => {
    
        describe("Given that the user exists", () => {
        
            it("Should return a Task Object", async () => {
            
                const newTask = await taskService.create(taskPayload);
                
                const task = await taskService.get(newTask.id);
                
                expect(task).toBeInstanceOf(Task); 

                expect(task.title).toBe(taskPayload.title)
                expect(task.description).toBe(taskPayload.description)
                expect(task.dueDate).toBe(taskPayload.dueDate)
                expect(task.status).toBe(taskPayload.status)
                expect(task.userId).toBe(taskPayload.userId)
                
            })
            
        })
        
        describe("Given an invalid taskId", () => {
        
            it("Should Throw an Error Message", async () => {
                        
                expect(async () => {
                    await taskService.get(dummyTaskId)
                }).rejects.toThrow();
                
            })
            
        })
    
    });
    
    describe("Task Update", () => {
    
        describe("Given a valid taskId and Task Object", () => {
        
            it("Should return a Task Object", async () => {
            
                const dummyTask = await taskService.create(taskPayload);

                const task = await taskService.update(dummyTask.id, updatedTaskPayload);
                
                expect(task).toBeInstanceOf(Task);
                
                expect(task.title).toBe(updatedTaskPayload.title)
                expect(task.description).toBe(updatedTaskPayload.description)
                expect(task.dueDate).toBe(updatedTaskPayload.dueDate)
                expect(task.status).toBe(updatedTaskPayload.status)
            
            })
        
        });
        
        describe("Given a valid taskId and invalid Task Object", () => {
        
            it("Should Throw a Zod Error", async () => {
            
                const dummyTask = await taskService.create(taskPayload);

                expect(async () => {
                    await taskService.update(dummyTask.id, {
                        ...updatedTaskPayload,
                        title: ""
                    })
                }).rejects.toThrow();
                
            })
        
        });
        
        describe("Given a invalid taskId and valid Task Object", () => {
        
            it("Should Throw a Not Found Error", async () => {

                expect(async () => {
                    await taskService.update(dummyTaskId, updatedTaskPayload)
                }).rejects.toThrow();
                
            })
        
        })
    
    });
    
    describe("Task Delete", () => {
    
        describe("Given a valid taskId", () => {
        
            it("Should return True Boolean", async () => {
            
                const dummyTask = await taskService.create(taskPayload);
            
                const res = await taskService.delete(dummyTask.id);
                
                expect(res).toBeTruthy();
            
            })
        
        });
        
        describe("Given an invalid taskId", () => {
        
            it("Should Throw a Not Found Error", async () => {
            
                expect(async () => {
                    await taskService.delete(dummyTaskId)
                }).rejects.toThrow();
            })
        
        });
        
        describe("Given a invalid UUID", () => {
        
            it("Should Throw a Zod Error", async () => {
            
                expect(async () => {
                    await taskService.delete("I-N-V-A-L-I-D")
                }).rejects.toThrow();
   
            })
        
        })
    
    })

})