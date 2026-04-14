import express from 'express'
import rungraph from '../src/ai/graph.ai.js'

const app = express()

app.get('/',async(req,res)=>{
  const result = await rungraph("write a code for factorial in js ")
  res.json(result)
})

export default app