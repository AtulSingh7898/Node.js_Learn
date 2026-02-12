const nodemailer = require('nodemailer');

        

const transporters = nodemailer.createTransport({
    secure:true,
    host:'smtp.gmail.com',
    port:465,
    auth:{
        user: 'maniharatul@gmail.com',
        pass:'clephpjrztxfesbw'

    }
})

module.exports = {transporters}