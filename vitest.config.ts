import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3000/api";

  // Make the backend URL available before test modules import client code.
  process.env.NEXT_PUBLIC_API_URL = apiUrl;

  return {
    plugins: [react()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./vitest.setup.ts",
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
      env: {
        ...env,
        NEXT_PUBLIC_API_URL: apiUrl,
      },
    },
  };
});
