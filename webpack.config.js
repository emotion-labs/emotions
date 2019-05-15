var $path = require("path");

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: {
        index: "./src/ts/app.ts"
    },
    output: {
        path: $path.join(__dirname, "dist"),
        filename: "app.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                    plugins: ["@babel/plugin-syntax-dynamic-import"]
                }
            }
        }, {
            test: /.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
        }]
    }
};
