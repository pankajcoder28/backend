const followModel = require('../models/follower.model')
const userModel = require('../models/user.model')

async function followUser(req,res){
    const followUsername = req.user.username 
    const followeeUsername = req.params.username
    const action = req.body.action || "send"

     if(followUsername == followeeUsername){
            return res.status(400).json({
                message : "you cannot follow yourself"
            })
        }
        const existingRequest = await followModel.findOne({
            follower : followUsername,
            followee : followeeUsername
        })

    if(action === "send"){
        if(existingRequest){
            return res.status(200).json({
                message : `Follow request already exists with status: ${existingRequest.status}`
            })
        }

    const isFolloweeExists = await userModel.findOne({
        username : followeeUsername
    })
    if(!isFolloweeExists){
        return res.status(404).json({
            message : "user you trying to follow doesnt exist"
        })
    }
    
    const followRecord = await followModel.create({
        follower : followUsername,
        followee : followeeUsername,
        status : "pending"
    })

    
   return res.status(201).json({
        message : `request sent to  ${followeeUsername}`,
        followRecord
    })
}
    if(action === "accept"){
        if(!existingRequest || existingRequest.status !== 'pending'){
            return res.status(404).json({
                message : 'no pending request found'
            })
        }
        existingRequest.status = 'accept';
        await existingRequest.save()
        return res.status(200).json({
            message : `${followUsername} request is accepted`
        })
    }

    if(action === 'reject'){
        if(!existingRequest || existingRequest.status !== 'pending'){
            return res.status(404).json({
                message : 'no pending request found'
            })
        }
        existingRequest.status = 'reject';
        await existingRequest.save()
        return res.status(200).json({
            message : `${followUsername} request is rejected`
        })
    }
    return res.status(400).json({ message: "Invalid action" });
}

async function unfollowUser(req,res){

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserfollowing = await followModel.findOne({
        follower: followerUsername,
        followee : followeeUsername
    })
    if(!isUserfollowing){
        return res.status(404).json({
            message : `you are not following this ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserfollowing._id)

    res.status(200).json({
        message : `${followeeUsername} is unfollowed`
    })
}


module.exports = {
    followUser,
    unfollowUser
}