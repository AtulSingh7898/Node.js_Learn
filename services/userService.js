const mongoose = require('mongoose');
const userModel = require("../Models/userModel")


const findUser = async({email, mobile, aadhar})=>{
     await userModel.findOne({
         $or: [
        { email: email },
        { mobile_number:mobile},
        { aadhar_number:aadhar},
      ]
      });
}

module.exports = {findUser}

