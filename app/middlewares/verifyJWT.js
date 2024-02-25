const jwt = require('jsonwebtoken')
const service = require('../services/messageHandler')
const errResponse = new Error()
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        if(!authHeader) {
            errResponse.code = 401,
            errResponse.message = {
                "indonesian": "Anda belum login",
                "english": "You are not logged in"
            }
            throw errResponse
        }

        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.BPOS_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                errResponse.code = 403,
                errResponse.message = {
                    "indonesian": "Token tidak valid",
                    "english": "Invalid token"
                }
                throw errResponse
            }
            req.user = decoded.username
            next()
        })
    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = verifyJWT