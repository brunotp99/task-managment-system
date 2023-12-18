//Task Controller
    //Task Create
        //Given a valid Task Object
            //It should return a 200 state and a Task Object
        //Given an invalid schema variable
            //It should return a 500 state and Error Message
    //Task Get
        //Given an existing Task
            //It should return a 200 state and a Task Object
        //Given an invalid id
            //It should return a 404 state and a Error Message
    //Task Update
        //Given a valid taskId and Task Object
            //It should return a 200 state and a TaskObject
        //Given a valid id and Invalid Task Object
            //It should return a 500 state and Zod Error
        //Given an invalid taskId
            //It should return a 404 state and NotFoundError

import { beforeEach, describe, expect, it, vitest } from "vitest";

import { TaskController } from "@/controllers/task.controller";
import { TaskServiceMock } from "@/mocks/task.mock";
import { dummyTaskId, taskPayload } from "../__utils__/payloads";

describe("Task Controller", () => {

    let taskService : TaskServiceMock;
    let taskController : TaskController;
    
    beforeEach(() => {
        taskService = new TaskServiceMock();
        taskService.reset();
        taskController = new TaskController(taskService);
    });

    describe("Task Create", () => {
    
        describe("Given a valid Task Object", () => {
        
            it("Should return a '200' state and a Task Object", async () => {
            
                const req = {
                    body: taskPayload
                };
                
                const res = {
                    send: vitest.fn(),
                    json: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await taskController.create(req, res);
                
                expect(res.status).toHaveBeenCalledWith(200); 
                expect(res.send).not.toHaveBeenCalled();
                
                const data = res.json.mock.calls[0][0];
                
                expect(data.title).toBe(taskPayload.title)
                expect(data.description).toBe(taskPayload.description)
                expect(data.dueDate).toBe(taskPayload.dueDate)
                expect(data.status).toBe(taskPayload.status)
                expect(data.userId).toBe(taskPayload.userId)
            
            })
        
        });
        
        describe("Given a missing schema value", () => {
        
            it("Should return a '500' state and a Error Message", async () => {
            
                const req = {
                    body: {
                        ...taskPayload,
                        status: "Not Exists",
                    }
                };
                
                const res = {
                    send: vitest.fn(),
                    json: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await taskController.create(req, res);
                
                expect(res.status).toHaveBeenCalledWith(500); 
                expect(res.json).not.toHaveBeenCalled();
                expect(res.send).toHaveBeenCalledWith(expect.stringContaining("Invalid enum value. Expected 'pending' | 'completed' | 'in progress', received 'Not Exists'\""))
       
            
            })
        
        });
    
    });
    
    describe("Task Get", () => {
    
        describe("Given that the user exists", () => {
        
            it("Should return a '200' state and a Task Object", async () => {
            
                const newTask = await taskService.create(taskPayload);
            
                const req = {
                    params: {
                        taskId: newTask.id
                    }
                };
                
                const res = {
                    send: vitest.fn(),
                    json: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await taskController.get(req, res);
                
                expect(res.status).toHaveBeenCalledWith(200); 
                expect(res.send).not.toHaveBeenCalled();
                
                 const data = res.json.mock.calls[0][0];
                
                expect(data.title).toBe(taskPayload.title)
                expect(data.description).toBe(taskPayload.description)
                expect(data.dueDate).toBe(taskPayload.dueDate)
                expect(data.status).toBe(taskPayload.status)
                expect(data.userId).toBe(taskPayload.userId)
                
            })
            
        })
        
        describe("Given an invalid taskId", () => {
        
            it("Should return a '404' state and an Error Message", async () => {
            
                const req = {
                    params: {
                        taskId: dummyTaskId
                    }
                };
                
                const res = {
                    send: vitest.fn(),
                    json: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await taskController.get(req, res);
                
                expect(res.status).toHaveBeenCalledWith(404); 
                expect(res.json).not.toHaveBeenCalled();

                expect(res.send).toHaveBeenCalledWith("[TASK_CONTROLLER_GET]: \"[TASK_SERVICE_GET]: Couldn't find the requested user.\"");
                
            })
            
        })
    
    })

})