var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    entry: {
        app: './public/index.jsx'
    },
    output: {
        path: path.join(__dirname, './public'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    },
    module: {
        loaders: [{
            test: /(\.jsx|\.js)$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css')
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ],
    resolve: {
        extensions: ['', '.js']
    }
}

module.exports = config;
