const express = require("express")
const postController = require('../controller/post.controller')
const multer = require('multer')
const identifyUser = require("../middlewares/auth.middlewares")
const upload = multer({storage:multer.memoryStorage()})



const postRouter = express.Router()

postRouter.post('/',upload.single("img_url"),identifyUser,postController.createPostController)

postRouter.get('/',identifyUser,postController.getPostcontroller)

postRouter.get('/details/:postId',identifyUser,postController.getDetailcontroller)

postRouter.post('/likes/:postId',identifyUser,postController.likes)

module.exports = postRouter