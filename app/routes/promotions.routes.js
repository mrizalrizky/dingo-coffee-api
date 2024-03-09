module.exports = (app) => {
    const router = require('express').Router()
    const promoController = require('../controllers/promotions.controller')

    router.get('/', promoController.getAllPromo)
    router.get('/customers', promoController.getCustomerVouchers)
    router.post('/redeem', promoController.redeemVoucher)

    app.use('/api/vouchers', router)
}