const baseConfig = require("./base.config");
const webpack = require("webpack");

const run = async ({ entry, pkg, outputDir, additionalConfig = {} }) => {
  const configs = ["cjs", "esm"].map((format) =>
    baseConfig({ entry, pkg, outputDir, format, additionalConfig })
  );

  return Promise.all(
    configs.map(
      (config) =>
        new Promise((resolve, reject) => {
          const compiler = webpack(config);

          if (config.watch) {
            // watch 모드 활성화
            compiler.watch({}, (err, stats) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                console.log(stats.toString({ colors: true }));
              }
            });
          } else {
            compiler.run((err, stats) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                console.log(stats.toString({ colors: true }));
                resolve();
              }
            });
          }
        })
    )
  );
};

module.exports = run;
