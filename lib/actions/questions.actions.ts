'use server';
import { connectToDatabase } from '@/lib/mongoose';
import Tag from '@/database/tag.model';
import {
  CreateQuestionParams, GetQuestionByIdParams,
} from '@/lib/actions/shared.types';
import User from '@/database/user.model';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';

export async function getQuestions(params: any) {
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