import express from 'express'
import useGraph from './services/graph.ai.service.js'

const app = express()

app.post('/usermsg',async (req,res)=>{
   await useGraph("write a factorial function in javascript")
})

export default app