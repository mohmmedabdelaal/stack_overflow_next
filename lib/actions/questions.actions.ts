'use server';
import { connectToDatabase } from '@/lib/mongoose';
import Tag from '@/database/tag.model';
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  GetSavedQuestionsParams,
  QuestionVoteParams,
  ToggleSaveQuestionParams,
} from '@/lib/actions/shared.types';
import User from '@/database/user.model';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User }).sort({createdAt: -1});
    return { questions };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function createQuestions(params: CreateQuestionParams) {
  try {
    connectToDatabase();
    const { title, author, tags, content, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocument = [];
    for (const tag of tags) {
      const exitingTags = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, 'i') },
        },
        {
          $setOnInsert: { name: tag },
          $push: { question: question._id },
        },
        {
          upsert: true,
          new: true,
        }
      );
      tagDocument.push(exitingTags._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocument } },
    });

    revalidatePath(path);
  } catch (e) {
    console.error(e);
  }
}

export async function getQuestionById(params:GetQuestionByIdParams){
  try {
    connectToDatabase();
    const {questionId} = params
    const question = await Question.findById(questionId).populate({ path: 'tags', model: Tag, select: '_id name'}).populate({path:'author',model:User, select: '_id clerkId picture name '})
    return question
  }catch (e) {
    console.log(e);
  }
}

export async function upvoteQuestion(params: QuestionVoteParams){
  try {
    connectToDatabase()
    const {userId,questionId,hasdownVoted,hasupVoted,path} = params
  let updateQuery = {};
    if(hasupVoted){
      updateQuery = {$pull: {upvotes: userId}}
    }else if(hasdownVoted){
      updateQuery = {
        $pull: {downvotes: userId},
        $push: {upvotes: userId}
      }
    }else{
      updateQuery = {$addToSet: {upvotes: userId}}
    }

    const question = await Question.findByIdAndUpdate(questionId,updateQuery,{new: true});
    if(!question){
      throw new Error("Couldn't find'")
    }

    revalidatePath(path)
  }catch (e){
    console.log(e);
  }
}

export async function downvoteQuestion(params: QuestionVoteParams){
  try {
    connectToDatabase()
    const {userId,questionId,hasdownVoted,hasupVoted,path} = params
 let updateQuery = {} ;
    if(hasdownVoted){
      updateQuery = {$pull: {downvotes: userId}}
    }else if(hasupVoted){
      updateQuery = {$push: {downvotes: userId}, $pull: {upvotes: userId}}
    }else{
      updateQuery = {$addToSet:{downvotes: userId}}
    }

    const question = await Question.findByIdAndUpdate(questionId,updateQuery,{new: true});
    if(!question){
      throw new Error('Could not find question')
    }
    revalidatePath(path);
  }catch (e){
    console.log(e);
  }
}

export async function saveQuestion(params: ToggleSaveQuestionParams) {
    try {
      connectToDatabase();
    const {userId,questionId,path} = params;
      const user = await User.findById({clerkId: userId})
      const isSavedQuestion = user.saved.includes(questionId);

      let updatedUser;
      if(isSavedQuestion){
        await User.findByIdAndUpdate(userId, {$pull: {saved: questionId}}, {new:true})
      }else{
        await User.findByIdAndUpdate(userId,{$addToSet: {saved:questionId}}, {new:true})
      }

      if(!user){
        throw new Error('User not found')
      }

    revalidatePath(path);
    }catch (e) {
      console.log(e);
      throw  e;
    }
}