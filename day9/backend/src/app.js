const express = require("express")
const notesmodel = require('./models/notes.model')
const cors = require('cors')
const path = require('path')



const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))

app.post('/api/note',async(req,res)=>{
    const{title,description} = req.body

    const note = await notesmodel.create({
        title,description
    })

    res.status(201).json({
        message : "notes are created",
        note
    })
})

app.get('/api/note',async(req,res)=>{
    const note =await notesmodel.find()

    res.status(200).json({
        message : "notes fetched",
        note
    })
})

app.delete('/api/note/:id',async(req,res)=>{
    const id = req.params.id

    const note = await notesmodel.findByIdAndDelete(id)

    res.status(200).json({
        message : "note deleted ",
        note
    })
})

app.patch('/api/note/:id',async (req,res)=>{
    const id = req.params.id
    const {title,description} = req.body
    await notesmodel.findByIdAndUpdate(id,{title,description}) 

    res.status(200).json({
        message : "notes updated"
    })
})

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','/public/index.html'))  
})
module.exports = app