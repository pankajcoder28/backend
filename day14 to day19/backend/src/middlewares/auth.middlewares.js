const jwt = require("jsonwebtoken")

async function identifyUser(req,res,next){
     const token = req.cookies.token
 
 if(!token){
    return res.status(401).json({
        message : "user id is required"
    })
 }

 let decoded;
 try{
      decoded = jwt.verify(token,process.env.jwt_secret)
 }
catch(err){
    return res.status(401).json({
        message: "user is unauthorised"
    })
}
 
 req.user = decoded
 next()

}

module.exports = identifyUser