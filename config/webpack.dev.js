const webpack = require('webpack')
const {merge} = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')


module.exports = merge([base, {
    mode: 'development',
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].js',
        publicPath: '/',
    },
    entry: [
        //'react-hot-loader/patch',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        path.join(__dirname, '../src/index.js')],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader', options: {modules: true,}
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader', options: {modules: true,}
                    },
                ],
            },
        ]
    }
}])