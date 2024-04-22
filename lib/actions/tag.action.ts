"use server";
import {connectToDatabase} from "@/lib/mongoose";
import {
    GetAllTagsParams,

    GetQuestionsByTagIdParams,
    GetTopInteractedTagsParams
} from "@/lib/actions/shared.types";
import UserModel from "@/database/user.model";
import Tag, {ITag} from "@/database/tag.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import {getQuestionById} from "@/lib/actions/questions.actions";
import {FilterQuery} from "mongoose";

export async function getTopInteractedTags(params:GetTopInteractedTagsParams) {
    try {
        connectToDatabase();
        const {userId, } = params;
        const user = await UserModel.findById(userId);
        if(!user) throw new Error(`User not found`);
        return [{_id: '1', name: 'javascript'}, {_id: '2', name:'css'}]

    }catch (e) {
        console.log(e);
        throw e;
    }
}

export async function getAllTags(params: GetAllTagsParams){
    try {
        connectToDatabase();
        const tags = await Tag.find({});
        return {tags};
    }catch (e) {
        console.log(e);
        throw  e;
    }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams){
    try {
        connectToDatabase();
        const {tagId , pageSize=10, page=1,searchQuery} = params
        const tagFilter: FilterQuery<ITag> = {_id: tagId}
        const tag = await Tag.findById(tagFilter).populate({ path: 'questions', model: Question }).sort({createdAt: -1})

        const questions = await Question.find({ tags: tagId }).sort({ createdAt: -1 });

        // For each question, get the detailed information including user details
        const questionsWithDetails = await Promise.all(
            questions.map(async (question) => {
                const detailedQuestion = await getQuestionById({ questionId: question._id });
                return detailedQuestion;
            })
        );

        if (!tag) {
            throw new Error('Tag not found');
        }
        // const questions = tag.questions;
        const tagTitle = tag.name;
        return {questions: questionsWithDetails,tagTitle}
    }catch (e) {
        console.log(e);
        throw e;
    }
}