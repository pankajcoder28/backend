const multer = require('multer')
const id3 = require('node-id3')
const storageService = require('../services/storage.service')
const songModel = require('../models/song.model')

async function uploadSong(req,res) {

    const songBufffer = req.file.buffer
    const {mood} = req.body

    const tag = id3.read(songBufffer)

    const [songFile,posterFile] = await Promise.all([

            storageService.uploadFile({
            buffer : songBufffer,
            filename : tag.title + "mp3",
            folder: "/cohort-2/moodify/songs"
        }),

        storageService.uploadFile({
            buffer : tag.image.imageBuffer ,
            filename: tag.title + ".jpg" ,
            folder: "/cohort-2/moodify/posters"
        })
    ])
    
    const song = await songModel.create({
        title : tag.title,
        url: songFile.url,
        profile: posterFile.url,
        mood
    })

    res.status(201).json({
        message : "song is created",
        song
    })
}

async function getSong(req,res) {
    const {mood} = req.query

    const song = await songModel.findOne({mood})

    res.status(200).json({
        message : 'song fetched successfully',
        song
    })
}
module.exports = {uploadSong,getSong}