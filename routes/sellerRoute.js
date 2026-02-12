const express = require('express');


// const express = require("express")
const router = express.Router();
const sellerController = require('../controllers/sellerController')

router.post('/creatProduct', sellerController.registerSeller);
router.post('/updateSeller/:id', sellerController.updateSeller);


module.exports = router