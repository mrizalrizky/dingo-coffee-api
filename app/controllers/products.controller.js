const db = require("../models/index");
const productsRepo = require("../repositories/products.repositories")(db);
const service = require("../utils/messageHandler");
const errResponse = new Error();

const getAllProducts = async (req, res) => {
  try {
    console.log("GET ALL PRODUCTS MASUK");
    const data = await productsRepo.getAllProducts();

    const successMsg = {
      "indonesian:": "Berhasil mengambil data produk",
      english: "Products data fetched successfully",
    };
    res.status(200).send(service.jsonSuccess(200, successMsg, data));
  } catch (error) {
    service.throwError(res, error);
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const data = await productsRepo.findOneByName(name);

    const successMsg = {
      indonesian: "Berhasil mengambil data produk",
      english: "Product data fetched successfully",
    };

    res.status(200).send(service.jsonSuccess(200, successMsg, data));
  } catch (error) {
    service.throwError(res, error);
  }
};

const createProduct = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    const {
      product_name,
      product_description,
      product_price,
      product_category,
    } = req.body;

    const data = await productsRepo.createProduct({
      name: product_name,
      description: product_description,
      price: product_price,
      product_category_id: product_category,
    });

    if (!data) {
      errResponse.code = 500;
      errResponse.message = {
        indonesian: "Gagal menambahkan produk",
        english: "Failed to create product",
      };

      throw errResponse;
    }

    const dataToDisplay = {
      product_name: data?.name,
      product_description: data?.description,
      product_price: data?.price,
    };

    const successMsg = {
      indonesian: "Berhasil menambahkan produk",
      english: "Product created successfully",
    };

    await tr.commit();

    res.status(200).send(service.jsonSuccess(200, successMsg, dataToDisplay));
  } catch (error) {
    service.throwError(res, error);
    await tr.rollback();
  }
};

module.exports = {
  getAllProducts,
  getProductByName,
  createProduct,
};
