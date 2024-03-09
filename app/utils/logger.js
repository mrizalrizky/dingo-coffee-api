const morgan = require('morgan')

const printLog = () => {
    return morgan('dev')
}

module.exports = {
    printLog
}