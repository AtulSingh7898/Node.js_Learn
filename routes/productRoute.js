const express = require("express")
const router = express.Router();
const productControll = require('../controllers/useProductController')

router.post('/creatProduct', productControll.creatProduct);


module.exports = router