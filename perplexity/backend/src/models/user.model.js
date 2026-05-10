import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username:{
        type : String ,
        require : true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type : String,
        require: true,
    },
    verified: {
        type: Boolean ,
        default: false
    }
}, {timestamps: true})

userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return
    }
    this.password = bcrypt.hash(this.password , 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password)
};

const userModel = mongoose.model('user',userSchema)

export default userModel