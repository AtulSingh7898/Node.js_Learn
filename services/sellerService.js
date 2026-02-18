const mongoose = require('mongoose');
const sellerModel = require('../Models/sellerModel');

const findSellerId = async(seller_gst)=>{
    return await sellerModel.findOne({seller_gst:seller_gst});
}

module.exports = {findSellerId};

