//Validate Middleware
    //Given a valid schema
        //It should go to the next request
    //Given an invalid schema
        //It should return a 400 error
    //Given an invalid request
        //It should return a 400 error

import { describe, expect, it, vitest } from "vitest";
import * as z from "zod";

import validate from "@/middlewares/validate-schema";

describe("Validate Middleware", () => {

    const testSchema = z.object({
        params: z.object({
            id: z.string()
        })
    })

    describe("Given a valid Zod Schema", () => {
    
        it("Should go to the next Request", () => {
        
            const req = {
                params: {
                    id: "test-id"
                }
            }
            
            const res = {
                send: vitest.fn(),
                json: vitest.fn(),
                status: vitest.fn().mockReturnThis()
            }
        
            const next = vitest.fn();
            
            //@ts-ignore
            validate(testSchema)(req, res, next);
            
            expect(next).toHaveBeenCalled();
        
        })
    
    });
    
    describe("Given an invalid Zod Schema", () => {
    
        it("Should return a '400' state and Error Messages", () => {
        
            const req = {
                params: {
                    id: "test-id"
                }
            }
            
            const res = {
                send: vitest.fn(),
                json: vitest.fn(),
                status: vitest.fn().mockReturnThis()
            }
        
            const next = vitest.fn();
            
            //@ts-ignore
            validate({})(req, res, next);
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(next).not.toHaveBeenCalled();
        
        })
    
    });
    
    describe("Given an invalid Request", () => {
    
        it("Should return a '400' state and Error Messages", () => {
        
            const req = {
                params: {
                    name: "test-name"
                }
            }
            
            const res = {
                send: vitest.fn(),
                json: vitest.fn(),
                status: vitest.fn().mockReturnThis()
            }
        
            const next = vitest.fn();
            
            //@ts-ignore
            validate(testSchema)(req, res, next);
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(next).not.toHaveBeenCalled();
        
        })
    
    })

})