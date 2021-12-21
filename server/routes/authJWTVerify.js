const jwt = require("jsonwebtoken")

function auth(req, res, next){

    const token = req.header("auth-token")
    if(!token) return res.status(401).json({ message: "Access denied" })

    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
        console.log("verified");
        req.user = verified
        next()
    }catch(error){
        res.stats(400).json({ message: "Invalid token" })
    }

}

module.exports = {
    auth
} 