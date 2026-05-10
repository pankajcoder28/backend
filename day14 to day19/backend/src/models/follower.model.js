const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower : {
        type : String
    },
    followee : {
        type : String
    },
    status: {
        type : String,
        default : "pending",
        enum : {
            values : ["pending", "accept","reject"],
            message : "status can only be pending , accept , reject"
        }
    }

},{timestamps:Date})

followSchema.index({follower:1,followee:1},{unique:true})

const followModel = mongoose.model('follower',followSchema)

module.exports = followModel