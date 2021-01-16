
const HtmlWebPackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
})

module.exports = {
    entry: ['./src/index.js',],
    output: {},
    plugins: [
        htmlPlugin,
    ],
    optimization: {},
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },


}