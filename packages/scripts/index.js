#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

if (args[0] === "init") {
  import(path.resolve(__dirname, "./initial.js"));
} else if (args[0] === "add") {
  import(path.resolve(__dirname, "./copy.js"));
} else {
  console.error("Usage: npx pio-essential <init|add>");
  process.exit(1);
}
