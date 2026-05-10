const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userModel = require('../models/user.model')
const { response } = require('../app')
const crypto = require('crypto')

const authRouter = express.Router()

authRouter.post('/register', async(req,res)=>{
    const {name,email,password} = req.body
     
    const userEmailAlreadyExist =await userModel.findOne({email})
    if(userEmailAlreadyExist){
        return res.status(409).json({
            message:"email already exists "
        })
    }
    const hash = crypto.createHash('md5').update(password).digest('hex')

    const user = userModel.create({
        name , email, password:hash
    })

    const token = jwt.sign({id:user._id},process.env.jwt_secret)

    res.cookie('jwt_token',token)

  res.status(201).json({
    message:"user is created successfully"
  })
})

authRouter.post('/protected',(req,res)=>{
    console.log(req.cookies)

    res.status(200).json({
        message :'this is protected cookie'
    })
})

authRouter.post('/login',async (req,res)=>{
    const {email ,password} = req.body
    const user = await userModel.findOne({email})
    
    if(!user){
        return res.status(404).json({
            message:"invalid email"
        })
    }

    const ispasswordcorrect = user.password === crypto.createHash('md5').update(password).digest('hex') ;

    if(!ispasswordcorrect){
        return res.status(401).json({
            message : "invalid password"
        })
    }

    const token = jwt.sign({id: user._id},process.env.jwt_secret)

    res.cookie('jwt_token',token)

    res.status(200).json({
        message: "logged in successfully",
        user
    })
})

module.exports = authRouter