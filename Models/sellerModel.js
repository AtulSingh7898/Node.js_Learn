const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    seller_name: {type:String, require:true},
    seller_gst: {type:String, require:true, unique:true},
    seller_email: {type:String,unique:true},
    mobile_number:{type:Number, unique:true},
    shope_name: {type:String},
    selling_category:{type:String},
    sale_description:{type:String}

},{timestamps:true})

module.exports = mongoose.model('sellers', sellerSchema);