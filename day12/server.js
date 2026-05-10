require('dotenv').config()
const express = require('./src/app')
const connectToDb = require('./src/config/database')

express.listen(3000,()=>{
    console.log('server is running on port 3000')
})

connectToDb()