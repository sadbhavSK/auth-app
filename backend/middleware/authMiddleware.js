const jwt = require('jsonwebtoken');
const blacklist = require("../utils/blacklist")

const SECRET = "masai-secret";

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: "Token missing"})
    }
    const token = authHeader.split(" ")[1]
    if(blacklist.includes(token)){
        return res.status(403).json({message: "Token invalidated"})
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({message: "Invalid or Expired token"})
        }

        req.user = decoded;
        next()
    })
}
module.exports = authMiddleware;