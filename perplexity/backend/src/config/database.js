import mongoose from "mongoose";
import {configDotenv} from "dotenv";
configDotenv()

async function connectToDb() {
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("database is connected")
    })
}

export default connectToDb