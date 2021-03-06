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

  //?????? JS_PATH_PROD ??????
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
          chunks: false, // ?????????????????????????????????
          colors: true, // ????????????????????????
        })
      );
      console.log(`${chalk.yellow("????????????, ????????????")}\n`);

      // await uploadFiles(config.output.path, '', cdnFolderName);
      await uploadFiles(config.output.path, '', cdnFolderName, /.map$/);

      // ??????map????????????????????????????????????
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
