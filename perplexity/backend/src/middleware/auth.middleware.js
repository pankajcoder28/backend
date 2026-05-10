import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
configDotenv()

export async function authUser(req,res,next) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: 'unauthorised',
            success: false,
            err: 'token is not provided'
        })    
    }


    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    if(!decoded){
        return res.status(401).json({
            message: 'unauthorised',
            success: false,
            err: 'token invalid'
        })    
    }

     req.user = decoded
    next()
}

export default authUser