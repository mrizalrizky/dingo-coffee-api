module.exports = (app) => {
    const paymentController = require('../controllers/payment.controller')
    const router = require('express').Router()

    router.get('/check-status/:invoice_number', paymentController.checkStatus)

    router.post('/checkout', paymentController.checkoutOrder)

    app.use('/api/payment', router)
}