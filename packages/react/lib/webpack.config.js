const createWebpackConfig = require("@pio/webpack-config");
const pkg = require("./package.json");

module.exports = createWebpackConfig({
  entry: "./src/index.ts",
  pkg,
});
