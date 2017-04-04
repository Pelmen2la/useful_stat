var webpack = require('webpack');

module.exports = {
    context: __dirname + '/static/',
    entry: {
        dotstorming: './js/root/dotstorming.jsx',
        efficiency: './js/root/efficiency.jsx',
        yesNo: './js/root/yesNo.jsx',
        index: './js/index.js'
    },
    output: { path: __dirname + '/static/dist/js/', filename: '[name].js'},
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};