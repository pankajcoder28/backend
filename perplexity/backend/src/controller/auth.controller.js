import userModel from "../models/user.model.js"
import { sendEmail } from "../services/mail.service.js"
import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv';
import bcrypt from "bcryptjs";
configDotenv()

export async function register(req,res) {
    const {username , email , password} = req.body

    const isuserexist = await userModel.findOne(
       { $or : [{email},{username}]}
    )

    if(isuserexist){
        return res.status(400).json({
            message: 'user with this email or username already exists',
            success: false,
            err: "user already exist"
        })
    }

    const user = await userModel.create({username , email, password})

    const emailVerificationToken = jwt.sign({email}, process.env.JWT_SECRET)

    await sendEmail({
        to : email,
        subject : 'welcome to our app',
        html : `<h1>hi ${username}, welcome to our app. we are glad to have you on board!</h1>
        <p>please verify your email by clicking on the link below:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">verify email</a>
        <p>if you did not create an account, please ignore this email.</p>
        <p>best regards,</p>
        <p>the <b>perplexity team </b></p>
        `
    })


    res.status(201).json({
        message : 'user registered successfully',
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

export async function verifyEmail(req,res){
    const {token} = req.query

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findOne({email: decoded.email})

    if(!user){
        return res.status(400).json({
            message: 'invalid token',
            success: false,
            err: "invalid token"
        })
    }

    user.verified = true
    await user.save()

    const html = `<h1>hi ${user.username}, your email has been verified successfully!</h1>
    <p>you can now login to your account and start using our app.</p>
    <p>best regards,</p>
    <p>the <b>perplexity team </b></p>
    `
    res.send(html)
}

export async function login(req,res){
    const {email ,password} = req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message: 'invalid credentials',
            success: false,
            err: 'user not found'
        })
    }

    const ispasswordCorrect = bcrypt.compare(password,user.password)

    if(!ispasswordCorrect){
        return res.status(400).json({
            message: 'invalid credentials',
            success: false,
            err: 'invalid password'
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message : 'please verify email before login',
            success: false,
            err: 'email not verified'
        })
    }

    const token = jwt.sign({email: user.email , id: user._id},process.env.JWT_SECRET,{expiresIn: '7d'})

    res.cookie("token",token)

    res.status(200).json({
        message: 'user loggedin succesfully',
        success: true,
    })
}

export async function getMe(req,res) {
    const userId = req.user.id

    const user = await userModel.findById(userId).select("-password");

    if(!user){
        return res.status(404).json({
            message: 'user not found',
            success: false,
            err: 'user not found'
        })
    }
    res.status(200).json({
        message: 'user fetched',
        user,
        success: true
    })
}