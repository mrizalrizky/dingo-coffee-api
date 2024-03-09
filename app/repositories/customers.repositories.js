function customersRepository(db) {
    const getAllCustomers = () => {
      return db.customers.findAll({
        include: [
          {
            model: db.customerFavorites,
            attributes: [
              'id',
              'product_id',
            ],
            include: [
              {
                model: db.products,
                attributes: [
                  'name'
                ],
                include: {
                  model: db.productCategories
                }
              }
            ]
          }
        ]
      });
    };
    
    const createCustomer = (data, transaction) => {
      return db.customers.create(data, transaction)
    }

    const updateDataByUsername = (username, dataToUpdate, transaction) => {
      return db.customers.update(dataToUpdate, {
        where: {
          username
        }
      }, transaction)
    }

    const findOneByIdentifier = (identifier) => {
      return db.customers.findOne({
        where: identifier
      })
    }

    return {
      getAllCustomers,
      createCustomer,
      updateDataByUsername,
      findOneByIdentifier,
    };
  }
  
  module.exports = customersRepository;