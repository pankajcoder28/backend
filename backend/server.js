import app from './src/app.js'
import { connectDb } from './src/config/db.js';



const port = process.env.PORT || 3000;

   app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })

connectDb()