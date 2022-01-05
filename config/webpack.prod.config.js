const path = require("path");
const chalk = require("chalk");
const fs = require('fs-extra');
const Webpack = require("webpack");
const WebpackMerge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.common.config");
const { uploadFiles } = require("spark-assets");

const isProd = true;
const { getCdnFolderName } = require("./scripts/utils");
const { SPARK_CONFIG } = require("./scripts/constant");
const HtmlJsToES5Plugin = require("./scripts/plugins/HtmlJsToES5Plugin");

const { DepReporter } =require('spark-log-event');

const sparkConfig = require('../sparkrc');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const webpackProdConfig = function (cdnFolderName, resPathProd) {

  return {
    output: {
      publicPath: `//yun.duiba.com.cn/spark/v2/${cdnFolderName}/`,
      filename: isProd ? "js/[name].[contenthash:8].js" : "js/[name].[contenthash:4].js",
    },
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, './scripts/loaders')]
    },
    module: {
      rules: [
        {
          test: /sparkrc\.js$/,
          exclude: [path.resolve("node_modules")],
          use: [
            {
              loader: 'replaceLoader',
              options: {
                arr: [
                  {
                    replaceFrom: /(MOCK_STATUS: true)|(MOCK_STATUS:true)|("MOCK_STATUS": true)|("MOCK_STATUS":true)/,
                    replaceTo: '"MOCK_STATUS": false'
                  },
                  {
                    replaceFrom: /(RES_PATH:'\/src\/assets\/')|(RES_PATH: '\/src\/assets\/')|("RES_PATH":"\/src\/assets\/")|("RES_PATH": "\/src\/assets\/")/,
                    replaceTo: `"RES_PATH":"${resPathProd}/"`
                  }
                ]

              }
            }
          ]
        }

      ]
    },
    plugins: [
      new Webpack.IgnorePlugin(/[\\/]mock[\\/]/),
      new ScriptExtHtmlWebpackPlugin({
        custom: {
          test: /\.js$/,
          attribute: 'crossorigin',
          value: 'anonymous'
        }
      }),
      new HtmlJsToES5Plugin(),
      new DepReporter()
    ],
    node: {
      crypto: 'empty'
    }
  };
};

const buildProd = async function () {

  const cdnFolderName = await getCdnFolderName();
  const appPath = process.cwd();
  const sparkConfig = require(path.join(appPath, SPARK_CONFIG));
  const _webpackProdConfig = await webpackProdConfig(cdnFolderName, sparkConfig.RES_PATH_PROD || '');

  //新增 JS_PATH_PROD 用作
  let newSparkCfg = Object.assign({}, sparkConfig);
  newSparkCfg['JS_PATH_PROD'] = `https://yun.duiba.com.cn/spark/v2/${cdnFolderName}/js`;
  const str = `module.exports =${JSON.stringify(newSparkCfg, null, 2)}`;
  fs.writeFileSync(path.join(appPath, SPARK_CONFIG), str);


  return new Promise((resolve, reject) => {
    const config = WebpackMerge(webpackBaseConfig(isProd), _webpackProdConfig);
    const compiler = Webpack(config);

    compiler.run(async (error, stats) => {
      if (error) {
        return reject(error);
      }
      console.log(
        stats.toString({
          chunks: false, // 使构建过程更静默无输出
          colors: true, // 在控制台展示颜色
        })
      );
      console.log(`${chalk.yellow("打包成功, 等待上传")}\n`);

      // await uploadFiles(config.output.path, '', cdnFolderName);
      await uploadFiles(config.output.path, '', cdnFolderName, /.map$/);

      // 上传map到不同路径，避免泄漏源码
      await uploadFiles(
          config.output.path + "/js",
          'js/map_123_map',
          cdnFolderName,
          /.(js|css|css\.map)$/
      );

      resolve();
    });

  });
};

buildProd();
