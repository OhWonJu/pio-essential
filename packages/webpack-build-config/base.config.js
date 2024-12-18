const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({
  entry = "src/index.ts",
  pkg,
  outputDir = "dist",
  format = "cjs",
  additionalConfig = {},
}) => {
  const isDev = process.argv.includes("--dev");
  const isWatch = process.argv.includes("--watch");

  const externalDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    "react", // React 외부 종속성 추가
    "react-dom", // ReactDOM 외부 종속성 추가
  ];

  const filenameExtension = format === "esm" ? ".js" : ".cjs";
  const libraryTarget = format === "esm" ? "module" : "commonjs2";
  const devtool = isDev ? "source-map" : false;

  return {
    mode: isDev ? "development" : "production",
    entry: path.resolve(entry),
    output: {
      path: path.resolve(outputDir),
      filename: `index${filenameExtension}`,
      libraryTarget,
      environment: format === "esm" ? { module: true } : undefined,
      module: format === "esm" ? true : undefined,
    },
    experiments: format === "esm" ? { outputModule: true } : undefined,
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    externals: externalDeps.reduce((acc, dep) => {
      if (format === "cjs") {
        acc[dep] =
          "react" === dep || "react-dom" === dep ? dep : "commonjs " + dep;
      } else {
        acc[dep] =
          "react" === dep || "react-dom" === dep ? dep : "import " + dep;
      }
      return acc;
    }, {}),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.module\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  namedExport: false,
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "index.css",
      }),
    ],
    devtool,
    watch: isWatch,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000,
    },
    ...additionalConfig,
  };
};
