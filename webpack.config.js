const path = require('path');

module.exports = {
    entry: {
        App: "./app/assets/scripts/App.js",
    },
    output: {
        path: path.resolve(__dirname, "./app"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}