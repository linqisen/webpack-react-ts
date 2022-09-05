const path = require("path");
const webpack = require("webpack");
const chalk = require("chalk");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const pkgJSON = require("../package.json");

module.exports = {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    output: {
        filename: "[name].[chunkhash:8].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@bable/preset-env",
                                    {
                                        corejs: { version: 3 },
                                        useBuiltIns: "usage",
                                    },
                                ],
                                "@babel/preset-react",
                            ],
                            plugins: ["@babel/plugin-transform-runtime"],
                        },
                    },
                    "ts-loader",
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 25 * 1024,
                    },
                },
                generator: {
                    filename: "assets/imgs/[name].[contenthash:8][ext]",
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: process.env.NODE_ENV === "development",
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            title: pkgJSON.name,
            meta: {
                description: {
                    type: "description",
                    content: pkgJSON.description,
                },
            },
            minify: "auto",
        }),
        // new ProgressBarPlugin({
        //     format: `  :msg [:bar] ${chalk.green.bold(
        //         ":precent"
        //     )} (:elapsed s)`,
        // }),
    ],
};
