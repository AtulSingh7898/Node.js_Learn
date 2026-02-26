const { configDotenv } = require('dotenv');

const jwt = require('jsonwebtoken');

configDotenv();

const secret_key = process.env.SECRET_KEY_JWT;

const generateToken = (email, id)=>{
    // console.log('hii', email, id);
    return jwt.sign({
        email: email,
        id: id
    }, secret_key, {expiresIn: '30d'});

}

module.exports = generateToken