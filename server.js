const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./app/middlewares/verifyJwt.middleware.js");
const logger = require("./app/utils/logger.js");
const service = require("./app/utils/messageHandler.js");
const credentials = require("./app/middlewares/credentials.middleware.js");
const corsOptions = require("./app/config/corsOptions.config.js");
const db = require("./app/models/index.js");
const rateLimiter = require("./app/middlewares/rateLimiter.middleware.js");
require("dotenv").config();
app.use(logger.printLog());

app.use(credentials);

app.use(cors(corsOptions));
// app.use(rateLimiter);

// app.use((req, res, next) => {
//     console.log('REQ.IP', req.ip);
//     if(req.ip == process.env.FRONT_END_IP) next()
//     else res.status(403).send("Cannot find API domain")
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("./app/routes/auth.routes.js")(app);

app.get("/api/health-check", (req, res) => {
  res.status(200).send(
    service.jsonSuccess(200, {
      indonesian: `API berjalan dalam keadaan sehat pada port ${process.env.PORT}`,
      english: `API running on port ${process.env.PORT} is healthy`,
    })
  );
});

app.use("/api/seed-data", async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    const rolesData = await db.masterGroups.bulkCreate([
      { name: "Staff" },
      { name: "Supervisor" },
      { name: "Manager" },
      { name: "Admin" },
    ]);

    const productCategory = await db.productCategories.bulkCreate([
      { name: "Food" },
      { name: "Latte" },
    ]);

    const productsData = await db.products.bulkCreate([
      {
        name: "Coca Cola",
        description: "Deskripsi coca cola",
        price: 10000,
        product_category_id: 2,
      },
      {
        name: "Es teh manis",
        description: "Deskripsi es teh manis",
        price: 7000,
        product_category_id: 1,
      },
    ]);

    const groupRoles = await db.groupRoles.bulkCreate([
      {
        role_name: "VIEW_TRANSACTIONS",
        description: "This role is to view transactions",
      },
      {
        role_name: "VIEW_EMPLOYEES",
        description: "This role is to view employees",
      },
    ]);

    const employeeGroupRoles = await db.employeeGroupRoles.bulkCreate([
      {
        group_id: 1,
        group_role_id: 1,
      },
      {
        group_id: 1,
        group_role_id: 2,
      },
    ]);

    const orderStatus = await db.orderStatus.bulkCreate([
      {
        status_name: "Waiting Payment",
      },
      {
        status_name: "Order In Progress",
      },
    ]);

    await tr.commit();
    res.status(200).send("Data seeding succeed");
  } catch (error) {
    await tr.rollback();
    service.throwError(res, error);
  }
});

app.use(verifyJWT);
require("./app/routes/index.js")(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
