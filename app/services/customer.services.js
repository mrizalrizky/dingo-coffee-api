const db = require('../models/index')
const customerRepo = require('../repositories/customers.repositories')(db)

const getCurrentCustomer = async (req) => {
    const user = await customerRepo.findOneByIdentifier({ username: req.user })
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        active_flag: user.active_flag,
        user_points: user.points_balance,
        membership_qr_data: user.qr_code_data 
    }
}

module.exports = {
    getCurrentCustomer
}