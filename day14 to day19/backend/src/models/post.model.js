const mongoose  = require('mongoose')
const users = require('../models/user.model')

const postSchema = new mongoose.Schema({
    caption : {
        type : String,
        default: ""
    },
    img_url: {
        type : String,
        required : [true,"image url is required to create a post"]
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : users,
        required : [true,'userid is required to create a post']
    }
})

const postModel = mongoose.model('posts',postSchema)

module.exports = postModel