const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: [true,'username already exist'],
        required : [true,'username is required']
    },
    email: {
        type : String ,
        unique : [true , 'email already exist'],
        required : [true,'email is required']
    },
    password : {
        type:String,
        required : [true,'password is required'],
        select : false
    },
    bio : String,
    profileImage :{
        type : String,
        default:"https://ik.imagekit.io/jtur09rkv/OIP.jpg"
    }

})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel