const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const sellerService = require('../services/sellerService')
const sellerModel = require('../Models/sellerModel')
const generateToken = require('../utility/createToken');

const createSeller = async (req,res) => {

    try {
     let inputData = req.body;
        if (Object.keys(inputData).length === 0) {
          return res.json({
            status_code: 404,
            message: "Provide Proper Data for Registration",
          });
        }
        const checkData = await sellerService.findSeller({
          email: inputData.email,
          mobile: inputData.mobile_number,
          aadhar: inputData.aadhar_number,
        });

        
        console.log(checkData);
        if (checkData) {
          return res.json({
            status_code: 404,
            message: "Seller Exists Already",
          });
        }
    
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(inputData.password, salt);
    
        const newData = { ...inputData, password: hash };
        console.log(newData);
    
        const storeDb = await sellerModel.create(newData);
        console.log(storeDb);
        return res.json({
          status_code: 200,
          message: "Registered Successfully",
          data: storeDb,
        });
      } catch (err) {
        console.log(err);
        return res.json({
          status_code: 404,
          message: "Registered Unsuccessfull",
        });
      }
}

const getAllProductsOfASeller = async (req,res) => {
    try {
        const id = req.params.id
        console.log('id', id)
        const getData = await sellerService.getAllProductWithSellerDetails(id)
        console.log('getData', getData)
        res.send(getData)

    } catch(err) {
        console.log(err);
        return res.json({
          status_code: 404,
          message: "Internal Server Error",
        });
    }
}


const sellerLogin = async (req,res) => {
    try {
      const {email, password} = req.body;
      if(Object.keys(req.body).length ===0){
        return res.status(401).json({message:"please Enter the email and password"
        });
      }
      const user = await sellerModel.findOne({email});
      if(!user){
        return res.status(409).json({message:"Before Login to register"
        });
      }
      
      const IsMatchPass = await bcrypt.compare(password, user.password);
      if(!IsMatchPass){
        return res.status(402).json({message:"Please Enter the correct password"
        });
      }

      const token = await generateToken(email,user.id);

      return res.status(200).json({message:"User Login succefully", token:token});



    } catch(err) {
      console.log(err)
       return res.status(500).json({message:"Server Internal Error"
        });

    }
    
}

const updateSeller = async (req,res) => {
    try {
      const id = req.params.id;
      if(Object.keys(req.body).length === 0){
        return res.status(404).json({message:"Please Enter the passowrd",
       });

      }
      const deleteUser = await sellerModel.findByIdAndUpdate(id, req.body, {new:true, isValidate:true});
      if(!deleteUser){
        return res.status(409).json({message:"Does Not delete user",
        });
      }
      return res.status(201).json({message:"User Update Successfully",
      });
    } catch(err) {
      return res.status(500).json({message:"Server Internal Error"
        });
    }
    
}

const deleteSeller = async (req,res) => {
    try {
      const id = req.params.id;
      const DeletUser = await sellerModel.findByIdAndDelete(id);
      return res.status(200).json({message:"Server Internal Error"
        });

    } catch(err) {
      return res.status(500).json({message:"Server Internal Error"
      });
    }
    
}

const getAllSellers = async (req,res) => {
    try {

    } catch(err) {

    }
    
}

const getSellerById = async (req,res) => {
    try {

    } catch(err) {

    }

}
module.exports = {createSeller,getAllProductsOfASeller, sellerLogin, updateSeller, deleteSeller, getAllSellers, getSellerById}