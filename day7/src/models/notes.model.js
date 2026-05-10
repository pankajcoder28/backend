const mongoose = require('mongoose')

const noteschema = new mongoose.Schema({
    title:String,
    description:String,
})

const notemodel = mongoose.model("notes",noteschema)

module.exports = notemodel