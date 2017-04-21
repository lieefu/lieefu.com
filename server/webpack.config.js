var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var config = {
    target: "node",
    entry: {
        server: ["./app.js"]
    },
    module: {
        loaders: [{
            test: /\.(txt|json|osgjs|osgt|bin)$/,
            loader: "file?name=[path][name].[ext]"
        }],
        noParse: ["/ws/"]
    },
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: "[name].js"
    }
}
module.exports = config;
