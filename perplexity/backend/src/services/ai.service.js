import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatMistralAI} from '@langchain/mistralai'
import { AIMessage, createAgent, HumanMessage, SystemMessage, tool} from "langchain";
import { configDotenv } from "dotenv";
import * as z from "zod"
import { searchInternet } from "./internet.service.js";


configDotenv()

const geminimodel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
});

const mistralmodel = new ChatMistralAI({
  model: 'mistral-small-latest',
  apiKey: process.env.MISTRAL_API_KEY
})

const searchInternetTool = tool(
  searchInternet,
  {
    name: "searchInternet",
    description: "use this tool to get the latest information from the internet.",
    schema: z.object({
      query: z.string().describe("the search query to look up on the internet.")
    })
  }
)

const agent = createAgent({
  model: geminimodel,
  tools: [searchInternetTool]
})

export async function generateResponse(messages) {
  const response = await agent.invoke({
    messages:[ new SystemMessage(`you are a helpful and precise assistant for anwering questions .if you don't know the answer, just say so., if the question requires information from the internet, use the searchInternet tool to get the latest information from the internet and then answer based on the search results.`) , ...(messages.map(msg => {
    if(msg.role == 'user'){
      return new HumanMessage(msg.content)
    }else if(msg.role == 'ai'){
      return new AIMessage(msg.content)
    }
  }))]
  });
  return response.messages[response.messages.length - 1].text ;
}

export async function generateTitle(message) {
  const response = await mistralmodel.invoke([
      new SystemMessage('You are a helpful assistant that generates concise and relevant titles for the chat conversation. user will provide you with the chat conversation and you will generate a title that captures the essence of the discussion in 2-4 words. The title should be concise, informative, and relevant to the content of the conversation.'),
      new HumanMessage(`generate a title for a chat conversation based on the following first message : ${message}`)

  ])

  return response.text;
}

