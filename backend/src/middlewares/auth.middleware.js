import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import { config } from '../config/config.js'

export const authenticateUser = async (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message: "unauthorised"})
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        
        const user = await userModel.findById(decoded.id)

        if(!user){
            return res.status.json({message: "unauthorised"})
        }

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'unauthorised'})
    }

    
}

export const authenticateSeller = async (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        res.status(401).json({message: "unauthorised"})
    }

    try {
        const decoded = jwt.verify(token,config.JWT_SECRET)

       const user = await userModel.findById(decoded.id)
        
       if(!user){
            res.status(401).json({message: "unauthorised"})
       }

       if(decoded.role !== 'seller'){
            res.status(403).json({message: 'forbidden'})
       }

       req.user = user
       next()
       
    } catch (error) {
        console.error(error)
        return res.status(401).json({message: 'unauthorised'})
    }
}