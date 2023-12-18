//Logger Utils
    //Using the logger function
        //It should console.log a message

import log from "@/utils/logger";
import { describe, expect, it, vitest } from "vitest";

describe("Logger Utils", () => {

    describe("Using the logger function", () => {
    
        it("Should return a log with the timestamp", () => {
            
            log.info = vitest.fn();
            log.info("Test");
            expect(log.info).toHaveBeenCalledWith(expect.stringContaining("Test"));
        
        })
    
    })

})