require('dotenv').config()
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.mongo_uri).then(()=>{
        console.log('database is connected')
    })
}

module.exports = connectToDb