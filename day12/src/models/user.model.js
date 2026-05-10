const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    name :String,
    email : {
        type:String,
        unique: [true,"this email already exist"]
    },
    password : String
})

const usermodel = mongoose.model('users',userschema)

module.exports = usermodel