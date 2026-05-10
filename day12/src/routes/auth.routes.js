const express = require('express')
const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const authRouter = express.Router()

authRouter.post('/register',async (req,res)=>{
    const{name , email, password} = req.body

    const isUserAlreadyExist =await usermodel.findOne({email})

     if(isUserAlreadyExist){
        return res.status(400).json({
            message : "this email already exist pls try another one."
        })
    }
    const user = usermodel.create({
        name,email,password
    })

    const token = jwt.sign({id:user._id},process.env.jwt_secret)

    res.cookie('jwt_token',token)

    res.status(201).json({
        message: "user registered successfully",
        token
    })
})

module.exports = authRouter
