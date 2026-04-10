import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue,ReducedValue, StateGraph, START, END } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import { mistralModel,cohereModel,geminiModel} from "./models.service.js";
import { createAgent,providerStrategy } from "langchain";
import { z} from 'zod'

const state = new StateSchema({
    messages: MessagesValue,
    solution_1 : new ReducedValue(z.string().default(""),{
        reducer: (current,next)=>{
            return next
        }
    }),
    solution_2: new ReducedValue(z.string().default(""),{
        reducer: (current,next)=>{
            return next
        }
    }),
    judge_recommendation: new ReducedValue(z.object().default({
        solution_1_score: 0,
        solution_2_score: 0,
    }),{
        reducer: (current , next)=>{
            return next
        }
    })
})


const solutionNode: GraphNode<typeof state> = async (state)=>{
    
    const[mistral_solution , cohere_solution]= await Promise.all([
        mistralModel.invoke(state.messages[0].text),
        cohereModel.invoke(state.messages[0].text)
    ])
    return{
        solution_1: mistral_solution.text,
        solution_2: cohere_solution.text
    } 
}

const judgeNode: GraphNode<typeof state> = async (state)=>{
    const {solution_1,solution_2} = state

    const judge = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
        }))
    })

    const judge_response = await judge.invoke({
        messages: [
            new HumanMessage(`Judge the following two solutions and give a score between 0 to 10 for each solution. Solution 1: ${solution_1} , Solution 2: ${solution_2}`)
        ]}
    )

    return {
        judge_recommendation: judge_response
    }

}

const graph = new StateGraph(state)
    .addNode("solution",solutionNode)
    .addNode("judge",judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution","judge")
    .addEdge("judge",END)
    .compile();

    export default async function(usermessage: string){
       const result = await graph.invoke({
        messages: [new HumanMessage(usermessage)]
       })
       console.log(result)
       return result.messages
    }





