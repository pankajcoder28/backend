const express = require('express')

const userRouter = express.Router()
const identifyUser = require('../middlewares/auth.middlewares')
const userController = require('../controller/user.controller')


userRouter.post('/follow/:username',identifyUser,userController.followUser)
userRouter.post('/unfollow/:username',identifyUser,userController.unfollowUser)

module.exports = userRouter