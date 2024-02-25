const db = require('../models/index')
const productsRepo = require('../repositories/products.repositories')(db)
const service = require('../services/messageHandler')

const getAllProducts = async (req, res) => {
    try {
        const data = await productsRepo.getAllProducts()

        const successMsg = {
            "indonesian:": "Berhasil mengambil data produk",
            "english": "Products data fetched successfully"
        }
        res.status(200).send(service.jsonSuccess(200, successMsg, data))
    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = {
    getAllProducts,
}