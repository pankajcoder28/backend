const mongoose = require('mongoose')

async function connectToDb(){
    await mongoose.connect(process.env.mongo_url).then(()=>{
        console.log('database is connected')
    })
}

module.exports = connectToDb