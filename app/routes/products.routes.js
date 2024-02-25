module.exports = (app) => {
    const router = require('express').Router()
    const productsController = require('../controllers/products.controller')

    router.get('/', productsController.getAllProducts)

    app.use('/api/products', router)
}