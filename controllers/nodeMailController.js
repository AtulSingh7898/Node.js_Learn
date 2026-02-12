// const nodemailer = require('nodemailer');
// const transporters = nodemailer.createTransport({
//     secure:true,
//     host:'smtp.gmail.com',
//     port:465,
//     auth:{
//         user: 'maniharatul@gmail.com',
//         pass:'clephpjrztxfesbw'

//     }
// })
const useMailModel = require('../Models/mailModel');
const transportersSevice = require('../services/mailService')

const sendMaileruser = async(req, res)=>{
    try{

        function sendMail(to, sub, msg){
        transportersSevice.transporters.sendMail({
        to:to,
        subject:sub,
        html:msg
        });
        console.log("mail sended");
    }

        let inputData = req.body;
        if(Object.keys(inputData).length == 0){
            return res.json({
            status_code:500,
            message: "server internal error"
        })
        }
        const newData = await useMailModel.findOne({
            $or:[
                {email:inputData.email}
            ]
        })
        if(newData){
            return res.json({
                status_code: 409,
                message: "User Already Exist"
            })
        }
        console.log(newData)

        const DataDb = await useMailModel.create(inputData);
        console.log(DataDb)
        
        if(DataDb){
            // sendMail("zerocode7898@gmail.com","This message to make the send main through ", "The message send successfully , enjoy each every time");
           sendMail(inputData.email,inputData.subject, inputData.message);

            return res.json({
            status_code:200,
            message: "Successfully to send Mail",
            data:DataDb
        })
        }

    }catch(err){
        console.log(err)
        return res.json({
            status_code:500,
            message: "server internal error"
        })
    }
}

const deletMailUser = async(req,res)=>{
    try{
        
    }catch(err){
        console.log(err)
        return res.json({
            status_code:5000, 
            message:"Internal Server error",

        })
    }

}
module.exports = {sendMaileruser, deletMailUser}

