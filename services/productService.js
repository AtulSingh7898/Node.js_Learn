// const mongoose = require('mongoose');
// const productModel = require("../Models/products")


// const findProduct = async(product_code)=>{
//     return await productModel.findProduct({product_code: product_code});
// }

// module.exports = {findProduct}

const mongoose = require('mongoose')
const productModel = require('../Models/productModel')

const findProduct = async ( product_code ) => {
   return await productModel.findOne({ product_code: product_code })
}



module.exports = {findProduct}