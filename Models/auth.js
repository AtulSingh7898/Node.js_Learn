require('dotenv').config();
const jwt  = require('jsonwebtoken');


const protect = (req, res, next)=>{
    let tokens = req.headers.authorization;
    if(tokens && tokens.startsWith("Bearer")){
        const token = tokens.split(" ")[1];

        console.log(token)
        try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        console.log(decoded)
        req.user = decoded;
        next();
        } catch (error) {
            return res.status(500).json({message:"access Denied"});
        }
    }else{
        return res.status(500).json({message: "server Internal Error"});
    };

}

module.exports = {protect}