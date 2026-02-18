const express = require('express');


// const express = require("express")
const router = express.Router();
const sellerController = require('../controllers/sellerController')

router.post('/creatProduct', sellerController.registerSeller);
router.post('/updateSeller/:id', sellerController.updateSeller);
router.post('/loginSeller',sellerController.loginSeller)
router.delete('/deleteUser/:id', sellerController.deleteSellerUser);


module.exports = router