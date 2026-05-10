import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'chat',
        require: true
    },
    content: {
        type: String , 
        require: true
    },
    role: {
        type: String ,
        enum: ['user','ai'],
        require: true
    }
}, {timestamps: true});

const messageModel = mongoose.model('message',messageSchema)

export default messageModel