const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

 async function register(req,res){
    const{username , email,password,bio,profileImage} = req.body
    
    const isuserExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isuserExist){
        return res.status(409).json({
            message : "user already exist" +(isuserExist.email == email? "email already exist" : "username already exist")
        })
    }
   
    const hash = await bcrypt.hash(password,10)
    
        const user =  userModel.create({
            username , email, password:hash,bio ,profileImage
        })

        const token = jwt.sign({id : user._id, username : user.username},process.env.jwt_secret)

        res.cookie("token",token)

        res.status(200).json({
            message : 'user registered successfully',
            user:{
                username,email,bio
            }
        })
}
async function login(req, res){
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        return res.status(404).json({
            message: username ? "username does not exist" : "email does not exist"
        });
    }

    const isUserPasswordCorrect = await bcrypt.compare(password,user.password)

    if (!isUserPasswordCorrect) {
        return res.status(409).json({ message: "invalid password" });
    }

    const token = jwt.sign({ id: user._id ,username: user.username }, process.env.jwt_secret, { expiresIn: '1d' });

    res.cookie('token', token);

    return res.status(200).json({ message: "user logged in successfully" });
}

module.exports = {register , login }
    
 


