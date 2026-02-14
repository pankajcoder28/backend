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

module.exports = app