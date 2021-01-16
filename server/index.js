const express = require('express')
const webpack = require('webpack')
const path = require('path') // NEW
const middleware = require('webpack-dev-middleware')

const webpackConfig = require('../config/webpack.dev')
const compiler = webpack(webpackConfig)
const app = express()
const port = process.env.PORT || 3000
const DIST_DIR = path.join(__dirname, '../dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(middleware(compiler), express.static(DIST_DIR))

// Auto Refresh
app.use(require('webpack-hot-middleware')(compiler))

app.get('/*', (req, res) => {
    res.sendFile(HTML_FILE) // EDIT
})
app.listen(port, function () {
    console.log('App listening on port: ' + port)
})