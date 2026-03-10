require("dotenv").config();
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    const tokens = req.headers.authorization;

    if (!tokens || !tokens.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }else{
    const token = tokens.split(" ")[1];
    console.log(token)

    }

    
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);

        req.user = decoded;
        console.log(decoded)
        next();
    } catch (err) {
        return res.status(401).json({ message: "Access denied" });
    }
};

module.exports = { protect };