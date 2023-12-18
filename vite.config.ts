import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        include: ["**/?(*.)+(spec|test).[tj]s?(x)"],
    },
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
    },
})