const express = require('express')

const app = express()
app.use(express.json())

app.listen(3000,()=>{
    console.log("i am running on port 3000 ")
})

module.exports = app