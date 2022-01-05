const path = require('path');
const fs = require("fs");

const { SPARK_CONFIG_DIR_KEY, SPARK_CONFIG } = require('./scripts/constant');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");


module.exports = function (isProd) {
    const appPath = process.cwd();
    const sparkConfig = require(path.join(appPath, SPARK_CONFIG));
    const isEslint = fs.existsSync(`${appPath}/.eslintrc.js`);
    const cssReg = /\.(css|less)$/;
    // 处理相对路径
    SPARK_CONFIG_DIR_KEY.map((key) => {
        sparkConfig[key] = path.resolve(appPath, sparkConfig[key]);
    });

    const stylePlugins = [
        require("autoprefixer")({
            overrideBrowserslist: ["> 1%", "last 2 versions", "not ie <= 8"],
        })
    ];
    if (sparkConfig.PX2REM) {
        stylePlugins.push(
            require("postcss-px2rem-exclude")({
                remUnit: 100, // 注意算法，这是750设计稿，html的font-size按照750比例
                exclude: /node_modules/i,
            })
        );
    }
    const styleLoader = (cssOptions = {}) => {
        return [
            {
                loader: "style-loader",
            },
            isProd && {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: false,
                },
            },
            {
                loader: "css-loader",
                options: {
                    ...cssOptions,
                    importLoaders: 2, // 如果遇到css里面的 @import 执行后面两个loader。 不然如果import了less，css-loader是解析不了
                },

            },
            {
                loader: "postcss-loader",
                options: {
                    sourceMap: isProd,
                    plugins: stylePlugins,
                },
            },
            {
                loader: require.resolve("less-loader"),
                options: {
                    sourceMap: isProd,
                    lessOptions: {
                        modifyVars: {
                            "@RES_PATH": `"${isProd ? sparkConfig.RES_PATH_PROD + '/' : sparkConfig.RES_PATH}"`,
                        },
                    }
                },
            },
        ].filter(Boolean);
    };
    return {
        entry: sparkConfig.ENTRY,
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? "source-map" : "cheap-module-source-map",
        output: {
            path: path.resolve(__dirname, sparkConfig.OUTPUT_DIR),
            filename: "js/[name].js",
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
            alias: {
                "@src": path.resolve(__dirname, sparkConfig.SOURCE_DIR),
            },
        },
        module: {
            rules: [
                // 提前进行eslint, 默认从下往上，通过enforce pre提前
                isEslint && {
                    test: /\.js|jsx/,
                    enforce: "pre",
                    loader: "eslint-loader",
                    options: {
                        cache: true,
                        formatter: require("eslint-friendly-formatter"),
                        fix: true,
                        failOnError: true,
                        configFile: `${appPath}/.eslintrc.js`,
                    },
                    include: sparkConfig.SOURCE_DIR,
                },
                {
                    test: cssReg,
                    use: styleLoader(),
                    include: sparkConfig.SOURCE_DIR,
                },
                {
                    test: /\.(js|jsx)$/,
                    loader: require.resolve("babel-loader"),
                    exclude: [path.resolve("node_modules")],
                    options: {
                        presets: [
                            require("@babel/preset-env").default,
                            require("@babel/preset-react").default
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": false }],
                            require("@babel/plugin-transform-runtime").default,
                        ],
                        sourceType: 'unambiguous'
                    },
                },
                {
                    test: [/\.(jpg|jpeg|png|svg|bmp)$/, /\.(eot|woff2?|ttf|svg)$/],
                    loader: require.resolve("url-loader"),
                    options: {
                        name: "[path][name].[ext]", // name默认是加上hash值。这里做了更改，不让加
                        outputPath: "images",
                        limit: 10240, // url-loader处理图片默认是转成base64, 这里配置如果小于10kb转base64,否则使用file-loader打包到images文件夹下
                    },
                },
            ].filter(Boolean),
        },
        plugins: [
            isProd &&
            new MiniCssExtractPlugin({
                filename: "styles/[name].[hash].css",
            }),
            new HtmlWebpackPlugin({
                template: sparkConfig.TEMPLATE,
                minify: !sparkConfig.UNMINIFY_INDEX && isProd,
            }),
            new CleanWebpackPlugin({
                // cleanOnceBeforeBuildPatterns:['**/*', 'dist'] // 这里不用写 是默认的。 路径会根据output 输出的路径去清除
            }),
            new ProgressBarPlugin(),
        ].filter(Boolean),
        optimization: {
            minimize: isProd,
            minimizer: [
                // 替换的js压缩 因为uglifyjs不支持es6语法，
                new TerserPlugin({
                    cache: true,
                    sourceMap: isProd,
                    extractComments: false, // 提取注释
                    parallel: true, // 多线程
                    terserOptions: {
                        compress: {
                            pure_funcs: ["console.log"],
                        },
                    },
                }),
                // 压缩css
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.optimize\.css$/g,
                    cssProcessor: require("cssnano"),
                    cssProcessorPluginOptions: {
                        preset: ["default", { discardComments: { removeAll: true } }],
                    },
                    canPrint: true,
                }),
            ],
            // 修改文件的ids的形成方式，避免单文件修改，会导致其他文件的hash值变化，影响缓存
            moduleIds: "hashed",
            splitChunks: {
                chunks: "all",
                minSize: 30000, //小于这个限制的会打包进Main.js
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10, // 优先级权重，层级 相当于z-index。 谁值越大权会按照谁的规则打包
                        name: "vendors",
                    },
                },
            },
            // chunks 映射关系的 list单独从 app.js里提取出来
            runtimeChunk: {
                name: (entrypoint) => `runtime-${entrypoint.name}`,
            },
        },
    };



}