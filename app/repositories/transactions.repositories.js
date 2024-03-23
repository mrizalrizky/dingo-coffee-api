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

  const findAllByStatus = (statusId) => {
    return db.transactions.findAll({
      raw: true,
      nested: true,
      attributes: [
        "invoice_number",
        "invoice_amount",
        "payment_method_id",
        "branch_id",
        "customer_id",
        "employee_id",
        [db.Sequelize.col(`order_status.status_name`), "order_status"],
      ],
      where: {
        order_status_id: statusId,
      },
      include: [
        {
          model: db.orderStatus,
          attributes: [],
        },
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
    findAllByStatus,
    updateStatusByInvoiceNumber,
  };
}

module.exports = transactionsRepository;
