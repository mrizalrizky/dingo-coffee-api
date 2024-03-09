module.exports = (app) => {
    const router = require('express').Router()
    const transactionController = require('../controllers/transactions.controller')
    const groupRoleConstant = require('../constants/groupRoles.constant')
    const verifyRoles = require('../middlewares/verifyRoles.middleware')
    
    router.post('/', transactionController.createTransaction)
    router.get('/', transactionController.getAllTransactions)

    app.use('/api/transactions', router)
}