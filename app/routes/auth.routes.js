module.exports = (app) => {
  const router = require("express").Router();
  const authController = require("../controllers/auth.controller");

  router.post("/:type/login", authController.handleLogin);
  router.post("/:type/logout", authController.handleLogout);
  router.get("/:type/refresh-token", authController.handleRefreshToken);
  router.post("/register", authController.handleRegister);

  app.use("/api/auth", router);
};
