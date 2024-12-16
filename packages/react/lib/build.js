import run from "@pio-essential/webpack-config";
import pkg from "./package.json" assert { type: "json" };

run({
  entry: "src/index.ts",
  pkg,
  outputDir: "dist",
});
