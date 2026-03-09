const express  = require("express")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/authMiddleware")
const blacklist = require("../utils/blacklist")

const router = express.Router()

const SECRET = "masai-secret"
const USER = {
    username: "admin",
    password: 'admin123'
}

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    if(username !== USER.username || password !== USER.password){
        return res.status(401).json({message: "Invalid Credentials"})
    }

    const token = jwt.sign(
        {username},
        SECRET,
        {expiresIn: "1h"}
    )

    res.status(200).json({token})
});

router.get("/profile", authMiddleware, (req, res)=>{
    res.status(200).json({
        username: req.user.username,
        message: "Welcome to dashboard",
        loginTime: new Date()
    })
})

router.post("/logout", (req, res) =>{
    const authHeader = req.headers.authorization;


    if(!authHeader){
        return res.status(401).json({message: "Token missing"})
    }

    const token = authHeader.split(" ")[1]

    blacklist.push(token)
    res.status(200).json({
        message: "logged out successfully"
    })
})

module.exports = router;