import { beforeEach, describe, expect, it } from "vitest";

import { UserServiceMock } from "@/mocks/user.mock";
import { updatedUserPayload, dummyUserId, userPayload } from "../__utils__/payloads";
import { User } from "@/models/user.model";
       
describe("User Service", () => {

    let userService : UserServiceMock;
    
    beforeEach(() => {
        userService = new UserServiceMock();
        userService.reset();
    });
    
    describe("User Create", () => {
        
        describe("Given a valid username, email and password", () => {
        
            it("Should return a User Object", async () => {
                              
                const user = await userService.create(userPayload);
                
                expect(user).toBeInstanceOf(User);
                
                expect(user.username).toBe(userPayload.username);
                expect(user.email).toBe(userPayload.email);
                expect(user).not.toHaveProperty("password");
                
            })
        
        });
        
        describe("Given a missing required attribute", () => {
        
            it("Should Throw a Zod Error", async () => {
                
                expect(async () => {
                    await userService.create({
                        ...userPayload,
                        password: ""
                    });
                }).rejects.toThrow();
                
            })
            
        })
        
    });
    
    describe("User Update", () => {
    
        describe("Given a valid id and user", () => {
        
            it("Should a User Object", async () => {
            
                const dummyUser = await userService.create(userPayload);
            
                const user = await userService.update(dummyUser.id, updatedUserPayload);
                
                expect(user).toBeInstanceOf(User);
                             
                expect(user.username).toBe(updatedUserPayload.username);
                expect(user.email).toBe(updatedUserPayload.email);
                expect(user).not.toHaveProperty("password");
                
                
            })
            
        });
        
        describe("Given a invalid id and a valid user", () => {
        
            it("Should Throw a Not Found Error", async () => {
            
                const id = "c85f37bd-67e5-429d-9c2f-46f34d404a6e";
        
                expect(async () => {
                    await userService.update(id, updatedUserPayload)
                }).rejects.toThrow()
                
            });
            
        });
        
        describe("Given a valid id and invalid user", () => {
        
            it("Should Throw a Zod Error", async () => {
            
                const dummyUser = await userService.create(userPayload);
            
                expect(async () => {
                    await userService.update(dummyUser.id, {
                        ...updatedUserPayload,
                        password: ""
                    })
                }).rejects.toThrow()
                
            })
            
        });
        
    
    })
    
    describe("User GetOne", () => {
    
        describe("Given a valid id", () => {
            
            it("Should return a User Object", async () => {
            
                const dummyUser = await userService.create(userPayload);
                
                const user = await userService.getOne(dummyUser.id);
                
                expect(user).toBeInstanceOf(User);
                
                expect(user.username).toBe(dummyUser.username);
                expect(user.email).toBe(dummyUser.email);
                expect(user).not.toHaveProperty("password");
                
                
            })
            
        });
        
        describe("Given an invalid id", () => {
        
            it("Should Throw a NotFoundError", async () => {
            
                expect(async () => {
                    await userService.getOne(dummyUserId)
                }).rejects.toThrow();
                
            })
        
        })
        
    });
    
    describe("User getAll", () => {
    
        describe("Given that at least one user exists", () => {
            
            it("Should return an array of User Object", async () => {
            
                await userService.create(userPayload);

                const users = await userService.getAll();
                
                expect(users).toBeInstanceOf(Array);
                expect(users.every(user => user instanceof User)).toBe(true);
                
            })
            
        });
        
        describe("Given that no users exists", () => {
        
            it("Should Throw a NotFoundError", async () => {
            
                expect(async () => {
                    await userService.getAll()
                }).rejects.toThrow();
                
            })
        
        })
        
    });
    
    describe("User Delete", () => {
    
        describe("Given a valid id", () => {
            
            it("Should return True Result", async () => {
            
                const dummyUser = await userService.create(userPayload);

                const res = await userService.delete(dummyUser.id);
                
                expect(res).toBeTruthy();
                
            })
            
        });
        
        describe("Given an invalid id", () => {
        
            it("Should Throw a NotFoundError", async () => {
            
                expect(async () => {
                    await userService.delete(dummyUserId)
                }).rejects.toThrow();
                
            })
        
        })
        
    });
})