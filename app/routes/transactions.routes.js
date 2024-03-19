module.exports = (app) => {
  const router = require("express").Router();
  const transactionController = require("../controllers/transactions.controller");
  const groupRoleConstant = require("../constants/groupRoles.constant");
  const verifyRoles = require("../middlewares/verifyRoles.middleware");

  router.post("/", transactionController.createTransaction);
  router.get("/", transactionController.getAllTransactions);
  router.get("/:status", transactionController.getAllTransactionByStatus);
  router.put("/", transactionController.updateTransactionStatus);

  app.use("/api/transactions", router);
};
