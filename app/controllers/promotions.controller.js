const db = require('../models/index')
const promoRepo = require('../repositories/promotions.repositories')(db)
const service = require('../utils/messageHandler')
const customerService = require('../services/customer.services')

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

const getCustomerVouchers = async (req, res) => {
    try {
        const vouchers = await promoRepo.getCustomerVouchers()
        const currentUser = await customerService.getCurrentCustomer(req)
        
        const data = vouchers.map(item => {
            return {
                promo_name: item.promo_name,
                promo_description: item.promo_description,
                promo_min_points: item.minimum_points,
                can_redeem: (item.active_flag && (currentUser.user_points >= item.minimum_points)) ? true : false
            }
        })

        res.status(200).send(service.jsonSuccess(200, null, data))

        /* 
            Response :
            {
                "promo_image": "/img/test.jpg",
                "promo_name": "Beli 1 gratis 1",
                "promo_description": "lorem ipsum asd"
                "promo_min_points": 60,
                "can_redeem": false

            }
        */
    } catch (error) {
        service.throwError(res, error)
    }
}

const redeemVoucher = async (req, res) => {
    try {

        const { promo_id } = req.body
        
        
    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = {
    getAllPromo,
    getCustomerVouchers,
    redeemVoucher,
}