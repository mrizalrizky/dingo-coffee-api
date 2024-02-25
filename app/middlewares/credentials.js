const allowedOrigins = require('../config/allowedOrigins.config')

const credentials = (req, res, next) => {
    const origin = req.headers.origin
    console.log('ORIGIN', origin, allowedOrigins);
    if(allowedOrigins.includes(origin)) {
        console.log('MASUK');
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials