const jwt = require('jsonwebtoken')
const Imagekitpackage = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const postmodel = require('../models/post.model')
const likeModel = require('../models/likes.model')


const imagekit = new Imagekitpackage({
    privateKey: process.env.private_Key
});

async function createPostController(req,res){

 const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),'file'),
    fileName : "test"
 })


 const post = await postmodel.create({
    caption: req.body.caption,
    img_url : file.url,
    user : req.user.id
 })
  res.status(201).json({
    message:"post is created",
    post
  })

}

async function getPostcontroller(req,res){
 
  const userId = req.user.id
  const post = await postmodel.find({
    user: userId
 })

 res.status(200).json({
    message : "post is fetched"
 })

}

async function getDetailcontroller(req,res){
   
    const userId = req.user.id 
    const postId = req.params.postId

    const post = await postmodel.findById(postId)

    if(!post){
        return res.status(404).json({
            messsage : "post not found"
        })
    }

    const isvaliduser = post.user.toString() === userId

    if(!isvaliduser){
        return res.status(401).json({
            message : "user is not authorised for this post"
        })
    }

    res.status(200).json({
        message : "post fetched ",post
    })
}

async function likes(req,res) {
    const username = req.user.username
    const postId = req.params.postId

    const isPostavailable = await postmodel.findById(postId)
    if(!isPostavailable){
        return res.status(404).json({
            message : 'no post found'
        })
    }
    const like = await likeModel.create({
        postId,
        user: username
    })
    res.status(200).json({
        message : 'post is liked',
        like 
    })
}

async function dislike(req,res) {
    const username = req.user.username
    const postId = req.params.postId

    const isLiked = await likeModel.findOne({
        post : postId,
        user : username
    })
    if(!isLiked){
        return res.status(400).json({
            message : "post is didnt liked"
        })
    }
    
    await likeModel.findOneAndDelete({_id: isLiked._id})
    res.status(200).json({
        message : "post disliked "
    })
}

async function getFeed(req,res) {

    const user = req.user
    

    const post = await Promise.all((await postmodel.find().populate("user").sort({_id: -1}).lean())
    .map(async(post)=>{
        const isLiked = await likeModel.findOne({
            user: user.username,
            post : post._id
        })
        post.isLiked = isLiked
        return post
    }))

    res.status(200).json({
        message: "post fetched successfully",
        post
    })
}

module.exports = {
    createPostController,
    getPostcontroller,
    getDetailcontroller,
    likes,
    getFeed,
    dislike
}