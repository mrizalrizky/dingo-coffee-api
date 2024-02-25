const morgan = require('morgan')

// https://www.npmjs.com/package/morgan
const printLog = () => {
    return morgan('dev')
}

module.exports = {
    printLog
}