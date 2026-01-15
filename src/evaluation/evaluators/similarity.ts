import {z} from "zod";
import type {EvaluationResult} from "langsmith/evaluation";
import {ChatOpenAI} from "@langchain/openai"
import { loadPrompt } from "@Evalbox/utils/prompts.js"; 

//TODO: Refactor for better code organization after logic has been implemented

const EvalSchema = z.object({
    explanation: z.string().describe("A detailed explanation of the similarity score."),
    score: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
    ]).describe("A similarity score between 1 and 5, where 5 means highly similar and 1 means not similar at all."),
}).describe("Schema for evaluating similarity between two texts given an input.")


const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
}).withStructuredOutput(EvalSchema)


const SimilarityInstructions = loadPrompt("similarity") 

async function similarity({inputs, outputs, referenceOutputs}:
     {inputs: Record<string, any>, outputs: Record<string, any>, referenceOutputs: Record<string, any>}): Promise<EvaluationResult> {
    // Placeholder implementation
    const answer = `QUESTION: ${inputs.question}
    GROUND TRUTH ANSWER: ${referenceOutputs.answer}
    STUDENT ANSWER: ${outputs.answer}`

    const grade = await llm.invoke([{role: "system", content: SimilarityInstructions}, {role: "user", content: answer}])
    return {key: "similarity evaluation result",
        score: grade.score,
    };
}
