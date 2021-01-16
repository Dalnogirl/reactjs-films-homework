const developmentConfig = require('./config/webpack.dev')
const productionConfig = require('./config/webpack.prod')

const isDevelopment = process.env.NODE_ENV === 'development'
console.log(isDevelopment)

module.exports = () => (isDevelopment ? developmentConfig : productionConfig)
//module.exports = isDevelopment ?s developmentConfig : productionConfig