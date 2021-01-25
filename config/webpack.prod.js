const {merge} = require('webpack-merge')
const base = require('./webpack.base')

const TercerWebpackPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge([base, {
    mode: 'production',
    output: {

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
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
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