/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from "path";

export default defineConfig({
  test: {
    include: ["**/?(*.)+(e2e-spec).[tj]s?(x)"],
    clearMocks: true,
    environment: 'prisma', // Required
    environmentOptions: {
      adapter: 'psql',
      envFile: '.env.test',
      prismaEnvVarName: 'DATABASE_URL',  // Optional
      transformMode: "ssr",
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})