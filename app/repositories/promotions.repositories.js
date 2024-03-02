function promoRepository(db) {
    const getAllPromo = () => {
      return db.promoDB.findAll({});
      return db.promoDB.findAll({
        where: {
          merchant_voucher_flag: true,
        },
      })
    };
  
    return {
        getAllPromo,
    };
  }
  
  module.exports = promoRepository;