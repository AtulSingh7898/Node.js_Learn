const express = require('express');
const {configDotenv} = require('dotenv');

const sellerModel = require('../Models/sellerModel');
const sellerService = require('../services/sellerService');

configDotenv();

const registerSeller = async (req, res) => {
  try {
    const inputData = req.body;
    console.log(Object.keys(inputData).length);
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "Provide Proper Data for Registration",
      });
    }
    const checkData = await sellerService.findSellerId(inputData.seller_gst);

    console.log(checkData);
    if (checkData) {
      return res.json({
        status_code: 404,
        message: "User Exists Already",
      });
    }

    const storeDb = await sellerModel.create(inputData);
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

const updateSeller = async (req, res)=>{
    try{
      const id = req.params.id;
      if(Object.keys(req.body).length == 0){
          return res.json({
          status_code:204,
          message: "Please Enter some data",
          })
      }

      const updateData = await sellerModel.findByIdAndUpdate(id,req.body,({new:true, runValidators:true}));
      return res.json({
          status_code:201,
          message: "Seller Update Succesfully",
          data: updateData
      })
    }catch(err){
      return res.json({
            status_code:404,
            message: "server Internal Error",
      })
  }
}

module.exports = {registerSeller, updateSeller}