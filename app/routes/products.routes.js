module.exports = (app) => {
    const router = require('express').Router()
    const productsController = require('../controllers/products.controller')

    router.get('/', productsController.getAllProducts)
    router.get('/:name', productsController.getProductByName)
    router.post('/', productsController.createProduct)

    app.use('/api/products', router)
}