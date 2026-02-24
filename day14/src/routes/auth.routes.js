const express = require('express')
const authcontroller = require('../controller/auth.controller')


const authRouter = express.Router()


authRouter.post('/register',authcontroller.register)

authRouter.post('/login',authcontroller.login);


module.exports = authRouter

