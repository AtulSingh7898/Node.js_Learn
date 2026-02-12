const mongoose = require('mongoose');

const mailUserModel = mongoose.Schema({
    email: {type:String, require:true},
    subject:{type:String},
    Message: {type:String}
},{timestamps: true})

module.exports = mongoose.model('mail', mailUserModel);


