const webpack = require('webpack')
const {merge} = require('webpack-merge')
const base = require('./webpack.base')


module.exports = merge([base, {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client'],
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