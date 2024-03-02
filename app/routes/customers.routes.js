module.exports = (app) => {
    const router = require('express').Router()
    const customerRepo = require('../controllers/customers.controller')

    router.get('/', customerRepo.getAllCustomers)

    app.use('/api/customers', router)
}