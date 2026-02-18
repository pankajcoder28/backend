const mongoose = require("mongoose")

const notesschema = new mongoose.Schema({
    title: String,
    description: String
})

const notesmodel = mongoose.model('notes',notesschema)

module.exports = notesmodel
