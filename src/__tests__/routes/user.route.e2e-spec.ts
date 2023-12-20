//User Routes
    //GetOne Route
        //Given that at the requested user exists
            //It should return a 200 state and a User
        //Given that the requested User does not exists
            //It should return a 404 state
    //GetAll Route
        //Given that at least one User exists
            //It should return a 200 state and an Array of Users
        //Given that no user exists
            //It should return a 404 state
    //Post Route
        //Given a valid user object
            //It should return a 200 state and User Object
        //Given an invalid user object
            //It should return a 400 state
    //Patch Route
        //Given a valid id and user
            //It should return a 200 status and the updated user
        //Given an invalid id
            //It should return a 500 state
        //Given a valid id and missing attributes
            //It should return a 500 state
    //Delete Route
        //Given a valid id
            //It  should return a 200 state and a boolean
        //Given an invalid id
            //It should return a 404 error
    
import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { UserService } from "@/services/user.service";
import { dummyUserId, updatedUserPayload, userPayload } from "../__utils__/payloads";
import { app } from "@/app";
import { prismadb } from "@/utils/prismadb";
        
describe("User Routes", () => {

    beforeEach(async () => {
        await prismadb.user.deleteMany({});
    });

    describe("GetOne Route", () => {
    
        describe("Given that the requested User exists", () => {
            it("Should return a '200' state and a User Object", async () => {
                
                const userService = new UserService();
                const user = await userService.create(userPayload);
                
                const response = await request(app)
                    .get(`/api/users/${user.id}`)
                
                expect(response.status).toBe(200);
                expect(response.body.error).toBeFalsy();
                expect(response.body.id).toBe(user.id)
                expect(response.body.username).toBe(user.username)
                expect(response.body.email).toBe(user.email)
                expect(response.body.password).toBe(undefined)

            
            })
        });
        
        describe("Given that the requested User doesn't exist", () => {
            it("Should return a '404' state", async () => {
                
                const response = await request(app)
                    .get(`/api/users/${dummyUserId}`)
                
                expect(response.status).toBe(404);

            })
        })
        
    });
    
    describe("GetAll Route", () => {
    
        describe("Given that at least one User exists", () => {
            it("Should return a '200' state and an Array of User Object", async () => {
                
                const userService = new UserService();
                const user = await userService.create(userPayload);
                
                const response = await request(app)
                    .get(`/api/users`)
                
                expect(response.status).toBe(200);
                expect(response.body.error).toBeFalsy();
                expect(response.body[0].id).toBe(user.id)
                expect(response.body[0].username).toBe(user.username)
                expect(response.body[0].email).toBe(user.email)
                expect(response.body[0].password).toBe(undefined)

            })
        });
        
        describe("Given that no Users Exists", () => {
            it("Should return a '404' state", async () => {
                
                const response = await request(app)
                    .get(`/api/users`)
                
                expect(response.status).toBe(404);

            })
        });
        
    });
    
    describe("Post Route", () => {
    
        describe("Given a valid User Object", () => {
            it("Should return a '200' state and the User Object", async () => {
                
                  const response = await request(app)
                    .post(`/api/users`)
                    .send(userPayload)
                
                expect(response.status).toBe(200);
                expect(response.body.error).toBeFalsy();
                expect(response.body.id).toEqual(expect.any(String))
                expect(response.body.username).toBe(userPayload.username)
                expect(response.body.email).toBe(userPayload.email)
                expect(response.body.password).toBe(undefined)

            })
        });
        
        describe("Given an invalid User Object", () => {
            it("Should return a '400' state", async () => {
                
                const response = await request(app)
                    .post(`/api/users`)
                    .send({
                        ...userPayload,
                        password: ""
                    })
                
                expect(response.status).toBe(400);

            })
        });
        
    });
    
    describe("Patch Route", () => {
        
        describe("Given a valid id and User Object", () => {
        
            it("Should return a '200' state and an Updated User", async () => {
            
                const userService = new UserService();
                const user = await userService.create(userPayload);
                
                const response = await request(app)
                    .patch(`/api/users/${user.id}`)
                    .send(updatedUserPayload)
                    
                expect(response.status).toBe(200);
                expect(response.body.username).toBe(updatedUserPayload.username)
                expect(response.body.email).toBe(updatedUserPayload.email)
                expect(response.body.password).toBe(undefined)
            
            })
        
        });
        
        describe("Given an invalid id and a valid User Object", () => {
        
            it("Should return a '404' state", async () => {
            
                
                const response = await request(app)
                    .patch(`/api/users/${dummyUserId}`)
                    .send(updatedUserPayload)
                    
                expect(response.status).toBe(404);
            
            })
        
        });
        
        describe("Given an valid id and an invalid User Object", () => {
        
            it("Should return a '400' Zod Error state", async () => {
            
                const userService = new UserService();
                const user = await userService.create(userPayload);
                
                const response = await request(app)
                    .patch(`/api/users/${user.id}`)
                    .send({
                        ...updatedUserPayload,
                        username: ""
                    })
                    
                expect(response.status).toBe(400);
            
            })
        
        })
        
    });
    
    describe("Delete Route", () => {
    
        describe("Given that the requested User exists", () => {
            it("Should return a '200' state and a True Boolean", async () => {
                
                const userService = new UserService();
                const user = await userService.create(userPayload);
                
                const response = await request(app)
                    .delete(`/api/users/${user.id}`)
                
                expect(response.status).toBe(200);
                expect(response.body).toBeTruthy();
            
            })
        });
        
        describe("Given that the requested User doesn't exist", () => {
            it("Should return a '404' state", async () => {
                
                const response = await request(app)
                    .get(`/api/users/${dummyUserId}`)
                
                expect(response.status).toBe(404);

            })
        })
        
    });

})