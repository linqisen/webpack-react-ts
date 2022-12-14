const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [
            "...",
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: "[hash:base64:8]",
                            },
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["autoprefixer"]],
                            },
                        },
                    },
                    "sass-loader",
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["autoprefixer"]],
                            },
                        },
                    },
                    "less-loader",
                ],
                include: /node_modules/,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "assets/css/[contenthash:8].css",
        }),
    ],
});
