module.exports = (app) => {
    const router = require('express').Router()
    const promoController = require('../controllers/promotions.controller')

    router.get('/', promoController.getAllPromo)

    app.use('/api/promotions', router)
}