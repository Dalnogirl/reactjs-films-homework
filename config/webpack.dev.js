const webpack = require('webpack')
const {merge} = require('webpack-merge')
const base = require('./webpack.base')


module.exports = merge([base, {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client'],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
}])