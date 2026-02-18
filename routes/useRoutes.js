const express = require('express')
const router = express.Router();

const userController = require('../controllers/useContrallers')
const handleUpload = require('../utility/uploadFIle')
const sendMailer = require('../controllers/nodeMailController');
const mailModel = require('../Models/mailModel');


router.get('/', (req,res) => {
    res.send('Hello Bhopal')

})



router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/login-with-otp', userController.loginWithOtp)
router.post('/update/:id', userController.updateUser)
router.delete("/delete/:id", userController.deleteUser);
router.post('/upload', handleUpload.single("file"), userController.uploadPDf)
router.post('/sendmailer',sendMailer.sendMaileruser);
router.post('/deletemail/:id', sendMailer.deletMailUser);
// router.post('/seller')



module.exports = router