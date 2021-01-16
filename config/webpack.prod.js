
const {merge} = require('webpack-merge')
const base = require('./webpack.base')
const path = require('path')
const TercerWebpackPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge([base, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '/../build'),
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin,
        new MiniCssExtractPlugin
    ],
    optimization: {
        minimize: true,
        minimizer: [new TercerWebpackPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
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
        ],
    },
}])