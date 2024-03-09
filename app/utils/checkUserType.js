const db = require('../models/index')
const employeeRepo = require('../repositories/employees.repositories')(db)
const customerRepo = require('../repositories/customers.repositories')(db)
const userTypeConstant = require('../constants/userType.constant')
const errResponse = new Error()

exports.checkUserType = (req) => {
    const userType = req.params.type

    if(userType === userTypeConstant.CUSTOMER) return { type: userTypeConstant.CUSTOMER, fileRepo: customerRepo }
    if(userType === userTypeConstant.EMPLOYEE) return { type: userTypeConstant.EMPLOYEE, fileRepo: employeeRepo }

    errResponse.code = 404
    errResponse.message = {
        "indonesian": "API tidak ditemukan",
        "english": "API not found"
    }
    throw errResponse
}