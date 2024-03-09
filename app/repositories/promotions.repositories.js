function promoRepository(db) {
    const getAllPromo = () => {
      return db.masterPromotions.findAll({
        where: {
          merchant_voucher_flag: true,
        },
      })
    };

    const getCustomerVouchers = () => {
      return db.masterPromotions.findAll({
        raw: true,
        where: {
          customer_voucher_flag: true
        }
      })
    }

    const findOneById = (promoId) => {
      return db.masterPromotions.findByPk(promoId)
    }
  
    return {
        getAllPromo,
        getCustomerVouchers,
        findOneById
    };
  }
  
  module.exports = promoRepository;