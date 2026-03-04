const express = require('express')
const authcontroller = require('../controller/auth.controller')
const identifyer = require('../middlewares/auth.middlewares')


const authRouter = express.Router()


authRouter.post('/register',authcontroller.register)

authRouter.post('/login',authcontroller.login);

authRouter.post('/get-me',identifyer, authcontroller.getme)



module.exports = authRouter

