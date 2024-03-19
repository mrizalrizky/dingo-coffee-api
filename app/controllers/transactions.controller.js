const db = require("../models/index");
const transactionRepo = require("../repositories/transactions.repositories")(
  db
);
const service = require("../utils/messageHandler");
const customerService = require("../services/customer.services");
const {
  PAYMENT_PENDING,
  PAYMENT_SUCCESS,
  ORDER_OUTSTANDING,
  ORDER_IN_PROGRESS,
  ORDER_READY,
  ORDER_WAITING_PICKUP,
  ORDER_PICKED_UP,
  ORDER_ON_DELIVERY,
  ORDER_COMPLETED,
} = require("../constants/transactionStatus.constant");

const getAllTransactions = async (req, res) => {
  try {
    const data = await transactionRepo.getAllTransactions();

    console.log(data);
    const dataToDisplay = {};

    const successMsg = {
      indonesian: "Berhasil mengambil data transaksi",
      english: "Transaction data fetched successfully",
    };
    res.status(200).send(service.jsonSuccess(200, successMsg, data));
  } catch (error) {
    service.throwError(res, error);
  }
};

const createTransaction = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    const { invoice_number, invoice_amount, order_status_id } = req.body;
    // const customer = await customerService.getCurrentCustomer(req);
    const customerId = 1;
    const data = await transactionRepo.createTransaction(
      invoice_number,
      invoice_amount,
      order_status_id,
      customerId,
      tr
    );

    const successMsg = {
      indonesian: "Transaksi berhasil dibuat",
      english: "Transaction created successfully",
    };
    await tr.commit();
    res.status(200).send(service.jsonSuccess(200, successMsg, data));
  } catch (error) {
    await tr.rollback();
    service.throwError(res, error);
  }
};

const getAllTransactionByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    let statusId = 0;
    switch (status) {
      case "pending":
        statusId = PAYMENT_PENDING;
        break;
      case "success":
        statusId = PAYMENT_SUCCESS;
        break;
      case "outstanding":
        statusId = ORDER_OUTSTANDING;
        break;
      case "in-progress":
        statusId = ORDER_IN_PROGRESS;
        break;
      case "ready":
        statusId = ORDER_READY;
        break;
      case "waiting-pickup":
        statusId = ORDER_WAITING_PICKUP;
        break;
      case "picked-up":
        statusId = ORDER_PICKED_UP;
        break;

      case "on-delivery":
        statusId = ORDER_ON_DELIVERY;
        break;

      case "completed":
        statusId = ORDER_COMPLETED;
        break;

      default:
        break;
    }
    const orders = await transactionRepo.findAllByStatus(statusId);

    const successMsg = {
      indonesian: "Berhasil mengambil data transaksi",
      english: "Transaction data fetched successfully",
    };
    res.status(200).send(service.jsonSuccess(200, successMsg, orders));
  } catch (error) {
    service.throwError(res, error);
  }
};

const getUserTransactionByStatus = async (req, res) => {
  try {
  } catch (error) {}
};

const updateTransactionStatus = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    const { invoice_number, status } = req.body;

    const data = await transactionRepo.updateStatusByInvoiceNumber(
      invoice_number,
      status,
      tr
    );

    const successMsg = {
      indonesian: "Berhasil update data transaksi",
      english: "Transaction data updated successfully",
    };

    await tr.commit();
    res.status(200).send(service.jsonSuccess(200, successMsg, data));
  } catch (error) {
    await tr.rollback();
    service.throwError(res, error);
  }
};

module.exports = {
  getAllTransactions,
  createTransaction,
  getAllTransactionByStatus,
  getUserTransactionByStatus,
  updateTransactionStatus,
};
