import { use } from "react"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

 async function sendTokenResponse(user,res,message){
    const token = await jwt.sign({id: user._id,role: user.role},config.JWT_SECRET,{expiresIn: "7d"})

    res.cookie("token",token)

    res.status(200).json({
        message,
        success: true,
        token,
        user:{
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            contact: user.contact,
            role: user.role
        }
    })
 }


export const register = async (req,res)=>{
    const{fullname,email,password,contact,isSeller} = req.body

    try {
        const existingUser = await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })
        if(existingUser){
            return res.status(400).json({message: "user already exist with this email"})
        }
        const user = userModel.create({
            fullname,contact,password,email,
            role: isSeller ? "seller": "buyer"
        })

        await sendTokenResponse(user,res,"user registered successfully");
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "server error"})
    }

}

export const login = async(req,res)=>{
    const{email,password}= req.body

    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({message: "user does not exist"})
        }
        const passMatch = await user.comparePassword(password)

        if(!passMatch){
            return res.status(401).json({message: "invalid credentials"})
        }

        await sendTokenResponse(user,res,"user loged in successfully")
    }
    catch(error){
        console.error(error)
        return res.status(500).json({message: "server error"})
    }
}   

export const googleCallback= async (req,res)=>{

    const {emails,id,displayName,photos} = req.user
    const email = emails[0].value
    const photo = photos[0].value

    let user = await userModel.findOne({email})

    if(!user){
        let user = await userModel.create({
            email,
            googleId: id,
            fullname: displayName
        })

        const token = jwt.sign({id: user._id,role: user.role},config.JWT_SECRET,{expiresIn: '7d'})

        res.cookie("token",token)

        res.redirect("http://localhost:5173/")

    }

    res.redirect("http://localhost:5173/")
}