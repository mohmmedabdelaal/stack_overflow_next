"use server"

import {ViewQuestionParams} from "@/lib/actions/shared.types";
import {connectToDatabase} from "@/lib/mongoose";
import Interaction from "@/database/interaction.model";
import QuestionModel from "@/database/question.model";

export async function viewQuestion(params: ViewQuestionParams){
    try{
        await connectToDatabase();
        const {questionId,userId} = params
        let interaction = await Interaction.findOne({ user: userId });

        if (!interaction) {
            // If no interaction record, create a new one
            interaction = await Interaction.create({
                user: userId,
                action: 'viewQuestion',
                question: questionId,
                createdAt: new Date(),
            });
        } else {
            // If interaction record exists, update the action and question
            interaction.action = 'viewQuestion';
            interaction.question = questionId;
            await interaction.save();
        }

        // Increment the view count for the question
        await QuestionModel.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

        return interaction;

    }catch (e) {
        console.log(e);
        throw e;
    }
}