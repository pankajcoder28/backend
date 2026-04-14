import { StateSchema,  type GraphNode,StateGraph, START, END } from "@langchain/langgraph";
import z from "zod";
import { geminiModel,mistralaiModel,cohereModel } from "./model.ai.js";
import { createAgent,HumanMessage,providerStrategy} from "langchain";


const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_feedback: z.string().default(""),
        solution_2_feedback: z.string().default("")
    })
})

const solutionNode: GraphNode<typeof state> = async (state)=>{
    const[mistralaiResponce , cohereResponce] = await Promise.all([
        mistralaiModel.invoke(state.problem),
        cohereModel.invoke(state.problem)
    ])
    return{
        solution_1: mistralaiResponce.text,
        solution_2: cohereResponce.text
    }
}

const judgeNode: GraphNode<typeof state> = async (state)=>{
    const {problem,solution_1,solution_2} = state

    const judge = createAgent({
        model: geminiModel,
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
            solution_1_feedback: z.string(),
            solution_2_feedback: z.string()
        })),
        systemPrompt: `you are a judge that compares two solutions for a given problem and gives them a score from 0 to 10 and feedback. the problem is delimited by <problem> tags, the first solution is delimited by <solution_1> tags and the second solution is delimited by <solution_2> tags. you should give a higher score to the solution that better solves the problem and provide constructive feedback for both solutions.`
    })

    const judgeResponce = await judge.invoke({
        messages : [
            new HumanMessage(
                `problem: ${problem},
                solution 1: ${solution_1},
                solution 2: ${solution_2}`
            )
        ]
    })

    const {solution_1_score,solution_2_score,solution_1_feedback,solution_2_feedback} = judgeResponce.structuredResponse

    return{
        judge: {
            solution_1_score,
            solution_2_score,
            solution_1_feedback,
            solution_2_feedback
        }
    }
}

const graph = new StateGraph(state)
    .addNode("solution", solutionNode)
    .addNode("judge_node",judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution","judge_node")
    .addEdge("judge_node",END)
    .compile()

export default async function(problem: string){
    const result = await graph.invoke({
        problem: problem
    })
    return{
        result
    }
}