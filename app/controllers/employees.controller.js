const db = require('../models/index')
const employeesRepo = require('../repositories/employees.repositories')(db)
const service = require('../utils/messageHandler')

const getAllEmployees = async (req, res) => {
    try {
        const data = await employeesRepo.getAllEmployees()

        const dataToDisplay = data.map(employee => ({
            name: employee.name,
            username: employee.username,
            phone_number: employee.phone_number,
            email: employee.email,
            employee_group: employee?.master_group?.name,
            group_roles: employee?.master_group?.employee_group_roles?.map(item => {
                return item.group_role.role_name
            })
        }))

        const successMsg = {
            "indonesian": "Berhasil mengambil data karyawan",
            "english": "Employee data fetched successfully"
        }
        res.status(200).send(service.jsonSuccess(200, successMsg, data))
    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = {
    getAllEmployees
}