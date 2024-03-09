const db = require('../models/index')
const customerRepo = require('../repositories/customers.repositories')(db)
const service = require('../utils/messageHandler')

const getAllCustomers = async (req, res) => {
    try {
        const data = await customerRepo.getAllCustomers()

        const successMsg = {
            "indonesian": "Berhasil mengambil data pelanggan",
            "english": "Customer data fetched successfully"
        }
        res.status(200).send(service.jsonSuccess(200, successMsg, data))
    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = {
    getAllCustomers,
    // addBranch
}