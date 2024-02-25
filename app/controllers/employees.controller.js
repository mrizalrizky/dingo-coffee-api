const db = require('../models/index')
const employeesRepo = require('../repositories/employees.repositories')(db)
const service = require('../services/messageHandler')

const getAllEmployees = async (req, res) => {
    try {
        const data = await employeesRepo.getAllEmployees()
        
        const dataToDisplay = data.map(item => {
            return {
                name: item?.name,
                username: item?.username,
                phone_number: item?.phone_number,
                email: item?.email,
            }
        })

        const successMsg = {
            "indonesian": "Berhasil mengambil data karyawan",
            "english": "Employee data fetched successfully"
        }
        res.status(200).send(service.jsonSuccess(200, successMsg, dataToDisplay))
    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = {
    getAllEmployees
}