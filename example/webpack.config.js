var path = require('path');
var assetsPath = path.resolve(__dirname, './public');

module.exports = {
    entry: "./example/src/index.js",
    devtool: "source-map",
    output: {
        path: assetsPath,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                  presets: ['es2015', 'react']
                }
             }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json']
    }
};
