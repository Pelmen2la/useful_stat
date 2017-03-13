var webpack = require('webpack');

module.exports = {
    context: __dirname + '/static/',
    entry: ['./js/root/efficiency.jsx'],
    output: { path: __dirname + '/static/', filename: 'efficiency.js'},
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};