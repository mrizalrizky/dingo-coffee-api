function transactionsRepository(db) {
    const getAllTransactions = () => {
      return db.transactions.findAll({});
    };

    const createTransaction = (invoice_number, invoice_amount, order_status_id, customer_id, transaction) => {
      console.log("ASDDD",invoice_number, invoice_amount, order_status_id, customer_id)
      return db.transactions.create({
        invoice_number,
        invoice_amount,
        order_status_id,
        customer_id
      }, transaction)
    }

    return {
      getAllTransactions,
      createTransaction
    };
  }
  
  module.exports = transactionsRepository;