import mongoose from "mongoose";
import { config } from "./config.js";

export async function connectDb(){
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("database is connected successfully")
    }
    catch(error){
        console.error('database is not connected',error)
        throw new Error("databse is not connected")
    }
    
}