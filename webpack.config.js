const developmentConfig = require('./config/webpack.dev')
const productionConfig = require('./config/webpack.prod')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = () => (isDevelopment ? developmentConfig : productionConfig)
