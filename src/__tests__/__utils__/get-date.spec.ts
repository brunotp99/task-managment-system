//GetDate Test Utils
    //Using the Future Date Function
        //It should return a future date
    //Using the Past Date Function
        //It should return a past date

import { describe, expect, it } from "vitest";

import { getFutureDate, getPastDate } from "./get-date";

        
describe("GetDate Test Utils", () => {

    describe("Using the Future Date Function", () => {
    
        it("Should return a date in the future", () => {
        
            const date = getFutureDate();
            expect(date.getFullYear()).toBeGreaterThan(new Date().getFullYear())
        
        })
    
    });
    
    describe("Using the Past Date Function", () => {
    
        it("Should return a date in the past", () => {
        
            const date = getPastDate();
            expect(date.getFullYear()).toBeLessThan(new Date().getFullYear())
        
        })
    
    })

})