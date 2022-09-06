const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",
    devServer: {
        hot: true, // 热更新
        open: true, // 编译完自动打开浏览器
        compress: false, // 关闭gzip压缩
        port: 9000, // 开启端口
        historyApiFallback: true, // 支持 history 路由重定向到 index.html 文件
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: "[path][name]_[local]",
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
                    "style-loader",
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
    stats: "errors-only", // webpack 在编译的时候只输出错误日志，终端更清爽
});
