const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const redis = require('../config/cache')

async function authUser(req,res,next) {
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message : 'token not provided'
        })
    }

    const istokenBlacklisted = await redis.get(token)

    if(istokenBlacklisted){
        return res.status(401).json({
            message : "invalid token"
        })
    }

    try {
        const decoded = jwt.verify(token , process.env.jwt_secret) 
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message : 'invalid token'
        })
    }
}

module.exports = authUser