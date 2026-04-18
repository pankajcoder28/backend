import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGO_URI){
    throw new Error("mongo uri is not available in environment variable");   
}

if(!process.env.JWT_SECRET){
    throw new Error("jwt secret is not available in environment variable")
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}

