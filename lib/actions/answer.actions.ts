'use server'
import {AnswerVoteParams, CreateAnswerParams, GetAnswersParams} from "@/lib/actions/shared.types";
import {connectToDatabase} from "@/lib/mongoose";
import Answer from "@/database/Answer.model";
import User from "@/database/user.model";
import Question from "@/database/question.model";
import {revalidatePath} from "next/cache";
import Interaction from "@/database/interaction.model";

export async function createAnswer(params: CreateAnswerParams){
    try {
        connectToDatabase();
        const {content, path, author,question} = params;
        // Ensure the user and the Question exist befor creating the answer


        // Create the answer
        const newAnswer = await Answer.create({
            content,
            author,
            question
        })
        /// update the question with the new answer
        const questionObject = await Question.findByIdAndUpdate(question, {
            $push: { answers: newAnswer._id}
        })

        await Interaction.create({
            user: author,
            action: 'answer',
            question,
            answer: newAnswer._id,
            tags: questionObject.tags
        })
        revalidatePath(path)
    }catch (e) {
        console.log(e);
    }
}

export async function getAllAnswers(params: GetAnswersParams) {
    try {
        connectToDatabase()
        const {questionId,page=1, pageSize=10 } = params
        const answers = await Answer.find({question: questionId}).
        populate({path: 'author', select: "_id clerkId name picture"}).
        sort({createdAt: -1})

        // console.log(`answerssss: ${{answers}}`)
        return {answers}
    }catch (e) {
        console.log(e);
        throw e;
    }
}
export async function upvoteAnswer(params: AnswerVoteParams) {
    try {
        connectToDatabase();

        const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

        let updateQuery = {};

        if(hasupVoted) {
            updateQuery = { $pull: { upvotes: userId }}
        } else if (hasdownVoted) {
            updateQuery = {
                $pull: { downvotes: userId },
                $push: { upvotes: userId }
            }
        } else {
            updateQuery = { $addToSet: { upvotes: userId }}
        }

        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });

        if(!answer) {
            throw new Error("Answer not found");
        }

        // Increment author's reputation
        
        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
    try {
        connectToDatabase();

        const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

        let updateQuery = {};

        if(hasdownVoted) {
            updateQuery = { $pull: { downvote: userId }}
        } else if (hasupVoted) {
            updateQuery = {
                $pull: { upvotes: userId },
                $push: { downvotes: userId }
            }
        } else {
            updateQuery = { $addToSet: { downvotes: userId }}
        }

        const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true });

        if(!answer) {
            throw new Error("Answer not found");
        }

        // Increment author's reputation

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
