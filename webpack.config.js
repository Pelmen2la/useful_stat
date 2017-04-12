var webpack = require('webpack');

module.exports = {
    context: __dirname + '/static/',
    entry: {
        dotstorming: './js/root/dotstorming.jsx',
        efficiency: './js/root/efficiency.jsx',
        fistVote: './js/root/fistVote.jsx',
        simpleVote: './js/root/simpleVote.jsx',
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
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: 'inline'
                        }
                    }
                ]
            }
        ]
    }
};