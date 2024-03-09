const jwt = require("jsonwebtoken");
const service = require("../utils/messageHandler");
const errResponse = new Error();
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("AUTHHEADER", authHeader);
    if (!authHeader?.startsWith("Bearer ")) {
      (errResponse.code = 401),
        (errResponse.message = {
          indonesian: "Anda belum login",
          english: "You are not logged in",
        });
      throw errResponse;
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.DPOS_ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        (errResponse.code = 403),
          (errResponse.message = {
            indonesian: "Token tidak valid",
            english: "Invalid token",
          });
        throw errResponse;
      }
      req.user = decoded.username;
      req.roles = decoded.roles;
      next();
    });
  } catch (error) {
    service.throwError(res, error);
  }
};

module.exports = verifyJWT;
