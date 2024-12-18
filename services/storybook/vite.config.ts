/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  //@ts-ignore
  test: {
    globals: true,
    environment: "happy-dom",
    include: ["./stories/**/*.test.ts?(x)"],
  },
});
