const db = require('../models/index')
const employeeRepo = require('../repositories/employees.repositories')(db)

const getCurrentEmployee = async (req) => {
    const user = await employeeRepo.findOneByIdentifier({ username: req.user })
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        active_flag: user.active_flag,
    }
}

const findOneByIdentifierWithRoles = async (identifier) => {
    const user = await employeeRepo.findOneByIdentifier(identifier)
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        active_flag: user.active_flag,
        roles: user?.master_group?.employee_group_roles?.map(item => {
            return item.group_role.role_name
        })
    }
} 

module.exports = {
    getCurrentEmployee,
    findOneByIdentifierWithRoles
}