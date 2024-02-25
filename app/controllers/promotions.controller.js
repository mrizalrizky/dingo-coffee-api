const db = require('../models/index')
const promoRepo = require('../repositories/promotions.repositories')(db)
const service = require('../services/messageHandler')

const getAllPromo = async (req, res) => {
    try {
        const data = await promoRepo.getAllPromo()

        const successMsg = {
            "indonesian": "Berhasil mengambil data promo",
            "english": "Promo data fetched sucessfully"
        }
        res.status(200).send(service.jsonSuccess(200, successMsg, data))
    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = {
    getAllPromo
}