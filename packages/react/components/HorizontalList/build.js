import path from "path";
import { fileURLToPath } from "url";

import run from "@pio-essential/webpack-build-config";
import pkg from "./package.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageRoot = path.resolve(__dirname);
const srcPath = path.join(packageRoot, "src");

run({
  entry: "src/index.ts",
  pkg,
  outputDir: "dist",
  additionalConfig: {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@": srcPath,
      },
    },
  },
});
