const express = require("express");
const userModel = require("../Models/userModel");
const { configDotenv } = require("dotenv");
const bcrypt = require('bcrypt');


const userService = require('../services/userService')
const generateToken = require('../utility/createToken');
const { generateOTP } = require("../utility/generateOtp");
const  sendOtpFast2Sms = require('../utility/sendOtpFast2Sms');
const createPassword = require('../utility/CreatePassword')


configDotenv()



const register = async (req, res) => {
  try {
    let inputData = req.body;
    console.log(Object.keys(inputData).length);
    if (Object.keys(inputData).length === 0) {
      return res.json({
        status_code: 404,
        message: "Provide Proper Data for Registration",
      });
    }
    const checkData = await userService.findUser({email:inputData.email, mobile_number:inputData.mobile_number, aadhar_number:inputData.aadhar_number});

    console.log(checkData);
    if (checkData) {
      return res.json({
        status_code: 404,
        message: "User Exists Already",
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(inputData.password, salt)

    const newData =  {...inputData, password:hash};
    // console.log(newData);
    
    const storeDb = await userModel.create(newData);
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
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const inputData = req.body;
    if (Object.keys(inputData).length === 0) {
      return res.status(404).json({ message: "Provide Data to Login" });
    }
    const checkData = await userModel.findOne({ email: inputData.email });
    if (!checkData) {
      return res.status(404).json({ message: "Account Does not Exists" });
    }

      const isPasswordMatch = await bcrypt.compare(
      password,              
      checkData.password     
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(
      checkData.email,
      checkData._id
    );
    if (isPasswordMatch) {
      return res.status(200).json({ message: "Logged In Successfully", token: token });
    }
    if (checkData.password === inputData.password) {
      const token = generateToken.generateToken(checkData.email, checkData._id)

      console.log('token', token)
      return res.status(200).json({ message: "Logged In Successfully", token: token });
    } else {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
}

const sendMail =async(req, res)=>{
  const inputData = req.body;
  const mail = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { user: crd.user1 , pass: crd.pass1 },
  });
}


const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (Object.keys(req.body).length === 0) {
      return res.status(404).json({ message: "Provide Data to Login" });
    }

    const updateUser = await userModel.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
          return res.status(200).json({ message: "Updated Successfully", data:updateUser });
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "login With Unsuccessfull",
    });
  }
};




const loginWithOtp = async (req, res) => {
  try {
    const { mobile_number } = req.body;

    if (!mobile_number) {
      return res.status(400).json({ message: "Mobile number required" });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendOtpFast2Sms(mobile_number, otp);

    return res.status(200).json({
      message: "OTP sent successfully",
    });

  } catch (err) {
    return res.status(500).json({ message: "OTP sending failed" });
  }
};



const deleteUser = async (req,res) => {
  try {
    const id = req.params.id
    const deleteUser = await userModel.findByIdAndDelete(id)
    if(deleteUser) {
      return res.json({
      status_code: 200,
      message: "Deleted successfully",
     });
    } else {
        return res.json({
        status_code: 404,
        message: "User Not Found",
      }); 

   }
  }catch (err) {
    return res.json({
      status_code: 404,
      message: "Registered Unsuccessfull",
    });
  }
};

const uploadPDf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status_code: 400,
        message: "No File Uploaded",
      });
    }
    return res.json({
      status_code: 200,
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (err) {
    return res.json({
      status_code: 404,
      message: "Internal Server Error",
    });
  }
};





module.exports = { register, login, updateUser, deleteUser,loginWithOtp , uploadPDf};