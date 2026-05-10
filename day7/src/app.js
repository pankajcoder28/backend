const express = require("express")

const app = express()
app.use(express.json())

const notemodel = require("./models/notes.model")

app.post("/note",async(req,res)=>{
    const{title,description} = req.body

    const note = await notemodel.create({
        title,description
    })

    res.status(201).json({
        message : "notes created",
        note
    })
})

app.get("/note",async (req,res)=>{
   const note = await notemodel.find()

   res.status(200).json({
    message: "notes fetched",
    note
   })
})

module.exports = app