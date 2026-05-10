import express from 'express'
import rungraph from '../src/ai/graph.ai.js'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors({
  origin: "https://battel-arena.onrender.com",
  credentials: true,
  methods: ['GET','POST']
}))
app.use(express.static("./public"))

app.get('/',async(req,res)=>{
  const result = await rungraph("write a code for factorial in js ")
  res.json(result)
})

app.post('/invoke',async (req,res)=>{
  const {input} = req.body
  const result = await rungraph(input)

  res.status(200).json({
    success: true,
    message: "data fetched sucessfully",
    result
  })
})

export default app