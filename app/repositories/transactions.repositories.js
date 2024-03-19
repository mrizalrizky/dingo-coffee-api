function transactionsRepository(db) {
  const getAllTransactions = () => {
    return db.transactions.findAll({});
  };

  const createTransaction = (
    invoice_number,
    invoice_amount,
    order_status_id,
    customer_id,
    transaction
  ) => {
    return db.transactions.create(
      {
        invoice_number,
        invoice_amount,
        order_status_id,
      },
      transaction
    );
  };

  const findOneByStatus = (status) => {
    return db.transaction.findOne({
      where: {
        status_name: status,
      },
    });
  };

  const findAllByStatus = (statusId) => {
    return db.transactions.findAll({
      attributes: [
        "invoice_number",
        "invoice_amount",
        "payment_method_id",
        "branch_id",
        "customer_id",
        "employee_id",
        "order_status_id",
      ],
      where: {
        order_status_id: statusId,
      },
      include: [
        {
          model: db.orderStatus,
          // attributes: [],
        },
        {
          model: db.
        }
      ],
    });
  };

  const updateStatusByInvoiceNumber = (invoice_number, status, tr) => {
    return db.transactions.update(
      { order_status_id: status },
      {
        where: {
          invoice_number,
        },
        transaction: tr,
      }
    );
  };

  return {
    getAllTransactions,
    createTransaction,
    findOneByStatus,
    findAllByStatus,
    updateStatusByInvoiceNumber,
  };
}

module.exports = transactionsRepository;
