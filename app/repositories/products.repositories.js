function productsRepository(db) {
    const getAllProducts = () => {
      return db.productsDB.findAll({});
    };
    
    const findOneByName = (name) => {
        return db.productsDB.findOne({
            where: {
                name
            }
        })
    }

    const createProduct = (data, transaction) => {
        return db.productsDB.create(data, transaction)
    }
  
    return {
        getAllProducts,
        findOneByName,
        createProduct,
    };
  }
  
  module.exports = productsRepository;