const express = require('express')
const router = express.Router();

const userController = require('../controllers/useContrallers')
const handleUpload = require('../utility/uploadFIle')
const sendMailer = require('../controllers/nodeMailController')


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

// router.post('upload', handleUpload)
// router.post('/send-mail', userController.sendMail )

// router.post('/Pcreate', userProductController.creatProduct);

// router.post('/delete/:id', userController.deleteUser)




module.exports = router