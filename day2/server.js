const express = require('express')

const server = express()

const notes = []

server.use(express.json())

server.post('/',(req,res)=>{
    notes.push(req.body)
    res.send('notes fetched')
})
server.get('/',(req,res)=>{
    res.send(notes)
})
server.listen(3000,(req,res)=>{
    console.log("server is running on port 3000")
})