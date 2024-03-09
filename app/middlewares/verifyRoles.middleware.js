const service = require('../utils/messageHandler')
const errResponse = new Error()

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if(!req.roles) {
                errResponse.code = 401
                errResponse.message = {
                    "indonesian": "Anda tidak memiliki akses",
                    "english": "You are not authorized"
                }
                throw errResponse
            }

            const rolesArr = [...allowedRoles]
            /*
                1. To compare the roles in request and the accepted/allowed roles to do some action
                2. If one of the value is true, then user is authorized, else not
            */
            const result = req.roles.map(role => rolesArr.includes(role)).find(val => val === true)
            if(!result) {
                errResponse.code = 401
                errResponse.message = {
                    "indonesian": "Anda tidak memiliki akses",
                    "english": "You are not authorized"
                }
                throw errResponse
            }
            next()
        } catch (error) {
            service.throwError(res, error)
        }
    }
}

module.exports = verifyRoles