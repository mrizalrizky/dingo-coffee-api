function customersRepository(db) {
    const getAllCustomers = () => {
      return db.customers.findAll({});
    };

    return {
      getAllCustomers
    };
  }
  
  module.exports = customersRepository;