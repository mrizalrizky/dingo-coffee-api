const jwt = require('jsonwebtoken')

exports.generateAccessToken = (payload, options) => {
    return jwt.sign(payload, process.env.DPOS_ACCESS_TOKEN_SECRET, options)
}

exports.generateRefreshToken = (payload, options) => {
    return jwt.sign(payload, process.env.DPOS_REFRESH_TOKEN_SECRET, options)
}