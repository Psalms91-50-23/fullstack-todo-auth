const jwt = require("jsonwebtoken")

function auth(req, res, next){
    //since our logen sends the token to header, we can verify it as the middleware, check if token matches when we retrieve from header
    const token = req.header("auth-token")
    if(!token) return res.status(401).json({ message: "Access denied" })

    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
        // console.log("req.user ",req.user);
        console.log("verified", verified);
        //creating user object in req and assigning it to verified value
        req.user = verified
        console.log("req.user ",req.user);
        next()
    }catch(error){
        res.stats(400).json({ message: "Invalid token" })
    }

}

module.exports = {
    auth
} 