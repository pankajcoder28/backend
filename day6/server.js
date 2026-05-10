const express = require("./src/app")
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect("mongodb+srv://pankajpenu147_db_user:InAiXekfHSlJzpdt@cluster0.kvem4of.mongodb.net/day6").then(()=>{
        console.log("connected to database");
    })
}

connectToDb()