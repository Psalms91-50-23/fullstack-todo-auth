const jwt = require("jsonwebtoken")

function auth(req, res, next){
    //since our login sends the token to header, we can verify it as the middleware, check if token matches when we retrieve from header
    const token = req.header("auth-token")
    if(!token) return res.status(401).json({ message: "Access denied, No Token" })
    try{
        //test if token matches our JWT_TOKEN_SECRET in .env file
        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, decoded) => {
            if(error) throw new Error(error)
            req.user = decoded
            next()
        })
    }catch(error){
        res.status(400).json({ message: "Invalid token" })
    }
}

module.exports = {
    auth
} 