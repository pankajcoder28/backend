const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    user: {
        type : String
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true , 'postid is required']
    }
}, {timestamps: Date})

likeSchema.index({post:1 ,user:1},{unique:true})

const likeModel = mongoose.model('likes',likeSchema)

module.exports = likeModel