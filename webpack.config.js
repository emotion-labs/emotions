const Path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    // devtool: "source-map",
    devtool: false,
    entry: {
        index: "./src/ts/app.ts"
    },
    output: {
        path: Path.join(__dirname, "dist"),
        filename: "app.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    compact: true,
                    presets: ["@babel/preset-env"],
                    plugins: ["@babel/plugin-syntax-dynamic-import"]
                }
            }
        }, {
            test: /.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/resources' }
        ])
    ]
};
