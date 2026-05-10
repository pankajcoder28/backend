const express = require('express')

const app = express()
app.use(express.json())

const notes = []

app.get('/',(req,res)=>{
    res.send(notes)
})

app.post('/notes',(req,res)=>{
    notes.push(req.body)
    res.send("notes fetched")
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]
    res.send("note is deleted")
})

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].desc = req.body.desc
    res.send('modified')
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

module.exports = app