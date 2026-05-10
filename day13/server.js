const express = require('./src/app')
const connectToDb = require('./src/config/database')

connectToDb()
express.listen(3000,()=>{
    console.log("server is running on port 3000")
})