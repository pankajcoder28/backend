import { use } from "react"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

 async function sendTokenResponse(user,res,message){
    const token = await jwt.sign({id: user._id},config.JWT_SECRET,{expiresIn: "7d"})

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
        const existingUser = await userModel.findone({
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