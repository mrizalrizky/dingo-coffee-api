function promoRepository(db) {
    const getAllPromo = () => {
      return db.promoDB.findAll({});
    };
  
    return {
        getAllPromo,
    };
  }
  
  module.exports = promoRepository;