//User Controller
    //User Create
        //Given a username, email and password
            //It should return a status 200 and a new user
        //Given a missing required proprety
            //It should return a 500 state
    //User Update
        //Given a valid id and user
            //It should return a 200 status and the updated user
        //Given an invalid id
            //It should return a 500 state
        //Given a valid id and missing attributes
            //It should return a 500 state
    //User GetOne
        //Given a valid id
            //It should return a 200 state and the user object
        //Given an invalid id
            //It should return a 404 error
    //User GetAll
        //Given that at least one user exists
            //It should return a 200 state and a list of users
        //Given that there is no users
            //It should return a 404 error
    //User Delete
        //Given a valid id
            //It  should return a 200 state and a boolean
        //Given an invalid id
            //It should return a 404 error
    
import { UserController } from "@/controllers/user.controller";
import { UserServiceMock } from "@/mocks/user.mock";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import { updatedUserPayload, dummyUserId, userPayload } from "../__utils__/payloads";
import { User } from "@/models/user.model";
       
describe("User Controller", () => {

    let userService : UserServiceMock;
    let userController : UserController;
    
    beforeEach(() => {
        userService = new UserServiceMock();
        userService.reset();
        userController = new UserController(userService);
    });
    
    describe("User Create", () => {
        
        describe("Given a valid username, email and password", () => {
        
            it("Should return a status '200' and a User Object", async () => {
                
                const req = {
                    body: {
                        username: "TestUser",
                        email: "testuser@gmail.com",
                        password: "testpassword"
                    }
                };
                
                const res = {
                    json: vitest.fn(),
                    send: vitest.fn(),
                    status: vitest.fn().mockReturnThis(),
                }
                
                //@ts-ignore
                await userController.create(req, res);
                
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalled();
                
                const returnedUser = res.json.mock.calls[0][0];
                
                expect(returnedUser.username).toBe(req.body.username);
                expect(returnedUser.email).toBe(req.body.email);
                expect(returnedUser.password).toBe(undefined);
                
            })
        
        });
        
        describe("Given a missing required attribute", () => {
        
            it("Should return a 500 status and Internal Server Error", async () => {
                const req = {
                    body: {
                        username: "TestUser",
                        email: "testuser@gmail.com",
                        password: ""
                    }
                }
                
                const res = {
                    json: vitest.fn(),
                    send: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                }
                
                //@ts-ignore
                await userController.create(req, res);
                
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.send).toHaveBeenCalledWith(expect.stringContaining("Please, provide a password with at least 6 characters."))
                expect(res.json).not.toHaveBeenCalled();
            })
            
        })
        
    });
    
    describe("User Update", () => {
    
        describe("Given a valid id and user", () => {
        
            it("Should return a status '200' and a User Object", async () => {
            
                const dummyUser = await userService.create(userPayload);
                
                const req = {
                    params: {
                        id: dummyUser.id
                    },
                    body: {
                        username: updatedUserPayload.username,
                        email: updatedUserPayload.email,
                        password: updatedUserPayload.password
                    }
                };
                
                const res = {
                    json: vitest.fn(),
                    send: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await userController.update(req, res);
                
                expect(res.status).toHaveBeenCalledWith(200);
                
                const data = res.json.mock.calls[0][0];
                
                expect(data.username).toBe(updatedUserPayload.username);
                expect(data.email).toBe(updatedUserPayload.email);
                expect(data.password).toBe(undefined);
                
                
            })
            
        });
        
        describe("Given a invalid id and a valid user", () => {
        
            it("Should return a status '500' and Internal Server Error", async () => {
            
                const req = {
                    params: {
                        id: "c85f37bd-67e5-429d-9c2f-46f34d404a6e"
                    },
                    body: {
                        username: updatedUserPayload.username,
                        email: updatedUserPayload.email,
                        password: updatedUserPayload.password
                    }
                };
                
                const res = {
                    json: vitest.fn(),
                    send: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await userController.update(req, res);
                
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.send).toHaveBeenCalledWith("[USER_CONTROLLER_UPDATE]: \"[USER_SERVICE_UPDATE]: User not found\"")
                
            });
            
        });
        
        describe("Given a valid id and invalid user", () => {
        
            it("Should return a status '500' and Internal Server Error", async () => {
            
                const dummyUser = await userService.create(userPayload);
                
                const req = {
                    params: {
                        id: dummyUser.id
                    },
                    body: {
                        username: "",
                        email: updatedUserPayload.email,
                        password: updatedUserPayload.password
                    }
                };
                
                const res = {
                    json: vitest.fn(),
                    send: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await userController.update(req, res);
                
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.send).toHaveBeenCalledWith(expect.stringContaining('Please, provide a username with at least 3 characters.'))

                
            })
            
        });
        
    
    })
    
    describe("User GetOne", () => {
    
        describe("Given a valid id", () => {
            
            it("Should return a '200' state and a User Object", async () => {
            
                const dummyUser = await userService.create(userPayload);
                
                const req = {
                    params: {
                        id: dummyUser.id
                    },
                };
                
                const res = {
                    send: vitest.fn(),
                    json: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await userController.getOne(req, res);
                
                expect(res.status).toHaveBeenCalledWith(200);
                
                const data = res.json.mock.calls[0][0];
                
                expect(data.username).toBe(dummyUser.username);
                expect(data.email).toBe(dummyUser.email);
                expect(data.password).toBe(undefined);
                
                
            })
            
        });
        
        describe("Given an invalid id", () => {
        
            it("Should return a '404' state and a NotFoundError", async () => {
            
                const req = {
                    params: {
                        id: dummyUserId
                    },
                };
                
                const res = {
                    send: vitest.fn(),
                    json: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await userController.getOne(req, res);
                
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.send).toHaveBeenCalledWith("[USER_CONTROLLER_GETONE]: \"[USER_SERVICE_GETONE]: User not found\"")
                expect(res.json).not.toHaveBeenCalled();
                
            })
        
        })
        
    });
    
    describe("User getAll", () => {
    
        describe("Given that at least one user exists", () => {
            
            it("Should return a '200' state and an array of User Object", async () => {
            
                const dummyUser = await userService.create(userPayload);
                
                const req = {};
                
                const res = {
                    send: vitest.fn(),
                    json: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await userController.getAll(req, res);
                
                expect(res.status).toHaveBeenCalledWith(200);
                
                const users = res.json.mock.calls[0][0];
                
                const isArrayOfUsers = users.every((user : User) => user instanceof User);
                
                const data = res.json.mock.calls[0][0][0];
                
                expect(isArrayOfUsers).toBe(true)
                expect(data.username).toBe(dummyUser.username);
                expect(data.email).toBe(dummyUser.email);
                expect(data.password).toBe(undefined);
                
            })
            
        });
        
        describe("Given that no users exists", () => {
        
            it("Should return a '404' state and a NotFoundError", async () => {
            
                const req = {};
                
                const res = {
                    send: vitest.fn(),
                    json: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await userController.getAll(req, res);
                
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.send).toHaveBeenCalledWith("[USER_CONTROLLER_GETALL]: \"[USER_SERVICE_GETALL]: Users not found\"")
                expect(res.json).not.toHaveBeenCalled();
                
            })
        
        })
        
    });
    
    describe("User Delete", () => {
    
        describe("Given a valid id", () => {
            
            it("Should return a '200' state and a True Result", async () => {
            
                const dummyUser = await userService.create(userPayload);
                
                const req = {
                    params: {
                        id: dummyUser.id
                    },
                };
                
                const res = {
                    send: vitest.fn(),
                    json: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await userController.delete(req, res);
                
                expect(res.status).toHaveBeenCalledWith(200);
                
                const data = res.json.mock.calls[0][0];
                
                expect(data).toBe(true);
                
                
            })
            
        });
        
        describe("Given an invalid id", () => {
        
            it("Should return a '404' state and a NotFoundError", async () => {
            
                const req = {
                    params: {
                        id: dummyUserId
                    },
                };
                
                const res = {
                    send: vitest.fn(),
                    json: vitest.fn(),
                    status: vitest.fn().mockReturnThis()
                };
                
                //@ts-ignore
                await userController.delete(req, res);
                
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.send).toHaveBeenCalledWith("[USER_CONTROLLER_DELETE]: \"[USER_SERVICE_DELETE]: User not found\"")
                expect(res.json).not.toHaveBeenCalled();
                
            })
        
        })
        
    });
})