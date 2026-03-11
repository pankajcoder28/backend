const mongoose = require('mongoose')

const blacklistingSchema = new mongoose.Schema({
    token : {
        type : String,
        require : [true,'token is required']
    }
},
    {
        timestamps : true
    })

const blacklistingModel = mongoose.model('blacklists',blacklistingSchema)

module.exports = blacklistingModel