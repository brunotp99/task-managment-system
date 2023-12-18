//PrismaDB Utils
    //It should return a instance of PrismaClient

import { describe, expect, it } from "vitest";
import { PrismaClient } from "@prisma/client";

import { prismadb } from "@/utils/prismadb";

describe("PrismaDB Utils", () => {

    it("Should return a instance of PrismaClient", () => {
    
        expect(prismadb).toBeInstanceOf(PrismaClient)
    
    })

})