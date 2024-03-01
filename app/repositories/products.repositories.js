function productsRepository(db) {
    const getAllProducts = () => {
      return db.products.findAll({
        include: [
            {
                model: db.productCategories
            }
        ]})
    }
    
    const findOneByName = (name) => {
        return db.products.findOne({
            where: {
                name
            },
            include: [
                {
                    model: db.productCategories,
                }
            ]
        })
    }

    const createProduct = (data, transaction) => {
        return db.products.create(data, transaction)
    }
  
    return {
        getAllProducts,
        findOneByName,
        createProduct,
    };
  }
  
  module.exports = productsRepository;