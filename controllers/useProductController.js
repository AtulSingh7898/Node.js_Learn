
const {configDotenv} = require('dotenv');
const productService = require("../services/productService")
const productModel = require('../Models/productModel');

configDotenv();

const creatProduct = async (req, res) => {
  try {
    const inputData = req.body;
    console.log(Object.keys(inputData).length);
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "Provide Proper Data for Registration",
      });
    }
    const checkData = await productService.findProduct(inputData.product_code);

    console.log(checkData);
    if (checkData) {
      return res.json({
        status_code: 404,
        message: "User Exists Already",
      });
    }

    const storeDb = await productModel.create(inputData);
    console.log(storeDb);
    return res.json({
      status_code: 200,
      message: "Create Registered Successfully",
      data: storeDb,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status_code: 404,
      message: "server Internal Error",
    });
  }
};

module.exports = {creatProduct}