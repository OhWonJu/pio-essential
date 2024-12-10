#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initProject = () => {
  try {
    console.log("Initializing @pio-essential...");

    console.log("Installing tailwind-merge and clsx...");
    execSync("yarn add -D tailwindcss postcss autoprefixer", {
      stdio: "inherit",
    });

    execSync("yarn add tailwind-merge clsx ", { stdio: "inherit" });

    console.log("Initializing TailwindCSS...");
    execSync("npx tailwindcss init -p", { stdio: "inherit" });

    const utilsDir = path.resolve(__dirname, "../src/lib");
    if (!fs.existsSync(utilsDir)) {
      fs.mkdirSync(utilsDir, { recursive: true });
    }

    const utilsPath = path.join(utilsDir, "utils.ts");
    const utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

    fs.writeFileSync(utilsPath, utilsContent, "utf-8");
    console.log("Created utils.ts with cn function.");

    console.log("Project initialized successfully.");
  } catch (error) {
    console.error("Error initializing project:", error);
  }
};

initProject();
