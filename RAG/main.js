import { PDFParse } from "pdf-parse";
import fs from 'fs';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone'
import dotenv, { configDotenv } from 'dotenv'
configDotenv()

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });       

const index = pc.index('cohort-2-rag')

let dataBuffer = fs.readFileSync('story.pdf')

const parser = new PDFParse({
    data: dataBuffer
})

const data = await parser.getText()
console.log(data)

const embedding = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

const spliter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 0
})

const chunks = await spliter.splitText(data.text)
const docs = await embedding.embedDocuments(chunks)

const result = await index.upsert({
    records: docs.map((doc,i)=>({
        id: `doc-${i}`,
        values: doc.embedding,
        metadata: {
            text : doc.text
        }
    }))
})

console.log(chunks)
console.log(docs)
console.log(result)

