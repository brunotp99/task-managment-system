//Task Routes
    //Post Route
        //Given a valid Task Object
            //It should return a 200 state and a Task Object
        //Given an invalid schema variable
            //It should return a 500 state and Error Message
    //Get Route
        //Given an existing Task
            //It should return a 200 state and a Task Object
        //Given an invalid id
            //It should return a 404 state and a Error Message
    //Patch Route
        //Given a valid taskId and Task Object
            //It should return a 200 state and a TaskObject
        //Given a valid id and Invalid Task Object
            //It should return a 500 state and Zod Error
        //Given an invalid taskId
            //It should return a 404 state and NotFoundError
    //Delete Route
        //Given a valid taskId
            //It should return a 200 state and a Boolean
        //Given an invalid TaskId
            //It should return a 404 state and a NotFoundError
        //Given an invalid UUID
            //It should return a 500 state and a Zod Error
            
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { prismadb } from "@/utils/prismadb";
import { app } from "@/app";
import { dummyTaskId, taskPayload, updatedTaskPayload, userPayload } from "../__utils__/payloads";
import { TaskService } from "@/services/task.service";
import { UserService } from "@/services/user.service";
import { User } from "@/models/user.model";
import exp from "constants";

describe("Task Routes", () => {

    let user : User;
    
    beforeAll(async () => {
        const userService = new UserService();
        user = await userService.create(userPayload);
    })

    beforeEach(async () => {
        await prismadb.task.deleteMany({});
    });
    
    describe("Post Route", () => {
    
        describe("Given a valid Task Object", () => {
            
            it("Should return a '200' state and a Task Object", async () => {
                
                const { statusCode, body } = await request(app)
                    .post(`/api/tasks`)
                    .send({
                        ...taskPayload,
                        userId: user.id
                    })
                
                expect(statusCode).toBe(200);
                expect(body.error).toBeFalsy();
                expect(body.id).toEqual(expect.any(String))
                expect(body.title).toBe(taskPayload.title)
                expect(body.description).toBe(taskPayload.description)
                expect(body.dueDate).toBe(taskPayload.dueDate.toISOString())
                expect(body.status).toBe(taskPayload.status)
                expect(body.userId).toBe(user.id)
            
            })
    
        });
        
        describe("Given an invalid Task Object", () => {
        
            it("Should return a '400' state Zod Error", async () => {
            
                const response = await request(app)
                    .post(`/api/tasks`)
                    .send({
                        ...taskPayload,
                        title: ""
                    })
            
                expect(response.status).toBe(400);

            })
        
        })
        
    
    });
    
    describe("Get Route", () => {
    
        describe("Given an existing Task", () => {
            
            it("Should return a '200' state and a Task", async () => {
            
                const taskService = new TaskService();
                const task = await taskService.create({
                    ...taskPayload,
                    userId: user.id
                });
                
                const { statusCode, body } = await request(app)
                    .get(`/api/tasks/${task.id}`)
                    
                expect(statusCode).toBe(200);
                expect(body.error).toBeFalsy();
                expect(body.id).toEqual(expect.any(String))
                expect(body.title).toBe(taskPayload.title)
                expect(body.description).toBe(taskPayload.description)
                expect(body.dueDate).toBe(taskPayload.dueDate.toISOString())
                expect(body.status).toBe(taskPayload.status)
                expect(body.userId).toBe(user.id)
                
            
            })
            
        });
        
        describe("Given an invalid Task Id", () => {
        
            it("Should return a '404' state", async () => {
            
                const { statusCode, body, text } = await request(app)
                .get(`/api/tasks/${dummyTaskId}`)
                
                expect(statusCode).toBe(404);
                expect(text).toBe("[TASK_CONTROLLER_GET]: \"[TASK_SERVICE_GET]: Couldn't find the requested user.\"")
            
            })
        
        })
    
    });
    
    describe("Patch Route", () => {
    
        describe("Given a valid TaskId and Task Object", () => {
        
            it("Should return a '200' state and an Updated Task Object", async () => {
                
                const taskService = new TaskService()
                const task = await taskService.create({
                    ...taskPayload,
                    userId: user.id
                });

                const { statusCode, body } = await request(app)
                    .patch(`/api/tasks/${task.id}`)
                    .send({
                        ...updatedTaskPayload,
                        userId: user.id
                    })
                    
                expect(statusCode).toBe(200);
                expect(body.error).toBeFalsy();
                expect(body.id).toEqual(expect.any(String))
                expect(body.title).toBe(updatedTaskPayload.title)
                expect(body.description).toBe(updatedTaskPayload.description)
                expect(body.dueDate).toBe(updatedTaskPayload.dueDate.toISOString())
                expect(body.status).toBe(updatedTaskPayload.status)
                expect(body.userId).toBe(user.id)
            
            })
        
        });
        
        describe("Given a valid TaskId and a invalid Task Object", () => {
        
            it("Should return a '400' state Zod Error", async () => {
            
                const taskService = new TaskService()
                const task = await taskService.create({
                    ...taskPayload,
                    userId: user.id
                });

                const { statusCode, text } = await request(app)
                    .patch(`/api/tasks/${task.id}`)
                    .send({
                        ...updatedTaskPayload,
                        title: "",
                        userId: user.id
                    });
                    
                expect(statusCode).toBe(400);
                expect(text).toEqual(expect.stringContaining("String must contain at least 1 character(s)"))
            
            })
        
        });
        
        describe("Given an invalid TaskId and a valid Task Object", () => {
        
            it("Should return a '404' state Not Found Error", async () => {
            

                const { statusCode, text } = await request(app)
                    .patch(`/api/tasks/${dummyTaskId}`)
                    .send({
                        ...updatedTaskPayload,
                        userId: user.id
                    });
                    
                expect(statusCode).toBe(404);
                expect(text).toEqual(expect.stringContaining("[TASK_SERVICE_UPDATE]: Couldn't find the requested user."))
            
            })
        
        })
    
    });
    
    describe("Delete Route", () => {
    
        describe("Given a valid TaskId", () => {
        
            it("Should return a '200' state and a True Boolean", async () => {
            
                const taskService = new TaskService()
                const task = await taskService.create({
                    ...taskPayload,
                    userId: user.id
                });

                const { statusCode, body } = await request(app)
                    .delete(`/api/tasks/${task.id}`)
                    
                expect(statusCode).toBe(200);
                expect(body).toBeTruthy();
            
            })
        
        });
        
        describe("Given an invalid TaskId", () => {
        
            it("Should return a '404' state and a Not Found Error", async () => {
            
                const { statusCode, text } = await request(app)
                    .delete(`/api/tasks/${dummyTaskId}`)
                    
                expect(statusCode).toBe(404);
                expect(text).toEqual(expect.stringContaining("[TASK_SERVICE_DELETE]: Couldn't find the requested task."));
            
            })
        
        });
        
        describe("Given an invalid UUID", () => {
        
            it("Should return a '400' state and a Zod Error", async () => {
            
                const { statusCode, text } = await request(app)
                    .delete(`/api/tasks/I-N-V-A-L-I-D`)
                    
                expect(statusCode).toBe(400);
                expect(text).toEqual(expect.stringContaining("Please, provide a valid UUID."));
            
            })
        
        })
    
    })
})