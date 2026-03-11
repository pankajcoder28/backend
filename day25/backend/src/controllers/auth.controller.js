const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')
const redis = require('../config/cache')


async function registerUser(req,res) {
    const{username , email ,password} = req.body

    const isUserAvailable = await userModel.findOne({
        $or : [{email},{username}]
    })

    if(isUserAvailable){
        return res.status(400).json({
            message : 'user already exist'
        })
    }

    const hash = await bcrypt.hash(password , 10)

    const user = await userModel.create({
        username,email,password:hash
    })

    const token = jwt.sign({id : user._id ,username : user.username}, process.env.jwt_secret ,{expiresIn : '1d'})

    res.cookie('token',token)

    return res.status(201).json({
        message : "user registered succesfully"
    })
}

async function loginUser(req,res) {
    const {username ,password , email } = req.body

    const user = await userModel.findOne({
        $or : [{email} ,{username}]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message : 'invalid credentials'
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password , user.password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message : 'invalid credentials'
        })
    }
    
    const token = jwt.sign({id : user._id ,username : user.username}, process.env.jwt_secret ,{expiresIn : '1d'})

    res.cookie('token',token)

    return res.status(200).json({
        message : 'user loggedin successfully',
        user : {
            id : user._id,
            email: user.email,
            username : user.username    
        }
    })
}

async function getMe(req,res) {
    const user = await userModel.findById(req.user.id)

    return res.status(200).json({
        message : 'user details fetched',user
    })
}

async function logoutUser(req,res) {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token , Date.now().toString())

    return res.status(200).json({
        message : 'logout successfully'
    })
}
module.exports = {registerUser , loginUser, getMe, logoutUser}
