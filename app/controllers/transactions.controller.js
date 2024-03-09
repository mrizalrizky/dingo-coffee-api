const db = require('../models/index')
const transactionRepo = require('../repositories/transactions.repositories')(db)
const service = require('../utils/messageHandler')
const customerService = require('../services/customer.services')

const getAllTransactions = async (req, res) => {
    try {
        const data = await transactionRepo.getAllTransactions()

        console.log(data)
        const dataToDisplay = {
        }

        const successMsg = {
            "indonesian": "Berhasil mengambil data transaksi",
            "english": "Transaction data fetched successfully"
        }
        res.status(200).send(service.jsonSuccess(200, successMsg, data))
    } catch (error) {
        service.throwError(res, error)
    }
}

const createTransaction = async (req, res) => {
    const tr = await db.sequelize.transaction()
    try {
        const { invoice_number, invoice_amount, order_status_id } = req.body
        const customer = await customerService.getCurrentCustomer(req)
        const data = await transactionRepo.createTransaction(invoice_number, invoice_amount, order_status_id, customer.id, tr)

        const successMsg = {
            "indonesian": "Transaksi berhasil dibuat",
            "english": "Transaction created successfully"
        }
        await tr.commit()
        res.status(200).send(service.jsonSuccess(200, successMsg, data))
    } catch (error) {
        await tr.rollback()
        service.throwError(res, error)
    }
}

module.exports = {
    getAllTransactions,
    createTransaction
}