const Path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        index: "./src/ts/app.ts"
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    output: {
        path: Path.join(__dirname, "dist"),
        filename: 'js/[name].js',
        sourceMapFilename: 'js/[name].js.map',
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
            test: /\.(ts|tsx)?$/,
            use: {
                loader: 'awesome-typescript-loader'
            },
            exclude: /node_modules/
        }, {
            test: /.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{ from: 'src/resources' }]),
    ]
};
