const express = require('express')
const webpack = require('webpack')
const path = require('path') // NEW
const middleware = require('webpack-dev-middleware')

const webpackConfig = require('./config/webpack.dev')
const compiler = webpack(webpackConfig)
const app = express()
const port = process.env.PORT || 3000
const DIST_DIR = path.join(__dirname, '../dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(middleware(compiler, {
    publicPath: webpackConfig.output.publicPath
}), express.static(DIST_DIR))

app.use('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(path.join(compiler.outputPath, '/index.html'), (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        return res.end()
    })
})

// Auto Refresh
app.use(require('webpack-hot-middleware')(compiler))

app.get('/*', (req, res) => {
    res.sendFile(HTML_FILE) // EDIT
})
app.listen(port, function () {
    console.log('App listening on port: ' + port)
})