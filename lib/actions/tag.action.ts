'use server';
import { connectToDatabase } from '@/lib/mongoose';
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from '@/lib/actions/shared.types';

import Tag, { ITag } from '@/database/tag.model';
import Question from '@/database/question.model';
import User from '@/database/user.model';
import { getQuestionById } from '@/lib/actions/questions.actions';
import { _FilterQuery, FilterQuery } from 'mongoose';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId, limit = 3 } = params;
    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    // find interactions for the user and groups by tags
    const interactions = await Question.aggregate([
      { $match: { author: userId } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    // find the tags from the interactions
    const tags = await Tag.find({
      _id: { $in: interactions.map((i) => i._id) },
    });

    return { tags };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof Tag> = {};
    const searchRegQuery = new RegExp(searchQuery, 'i');

    if (searchQuery) {
      query.$or = [{ name: { $regex: searchRegQuery } }];
    }

    let sortOptions = {};
    switch (filter) {
      case 'popular':
        sortOptions = { questions: -1 };
        break;
      case 'recent':
        sortOptions = { createdAt: -1 };
        break;
      case 'name':
        sortOptions = { name: 1 };
        break;
      case 'old':
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }
    const tags = await Tag.find(query).sort(sortOptions);
    return { tags };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const { tagId, pageSize = 10, page = 1, searchQuery } = params;
    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findById(tagFilter)
      .populate({ path: 'questions', model: Question })
      .sort({ createdAt: -1 });

    const questions = await Question.find({ tags: tagId }).sort({
      createdAt: -1,
    });

    // For each question, get the detailed information including user details
    const questionsWithDetails = await Promise.all(
      questions.map(async (question) => {
        const detailedQuestion = await getQuestionById({
          questionId: question._id,
        });
        return detailedQuestion;
      })
    );

    if (!tag) {
      throw new Error('Tag not found');
    }
    // const questions = tag.questions;
    const tagTitle = tag.name;
    return { questions: questionsWithDetails, tagTitle };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getPopularTags() {
  try {
    connectToDatabase();
    const popularTags = await await Tag.aggregate([
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'tags',
          as: 'questions',
        },
      },
      { $unwind: '$questions' }, // Optionally unwind to get individual questions if needed
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          totalQuestions: { $sum: 1 }, // Count the number of questions for each tag
        },
      },
      { $sort: { totalQuestions: -1 } }, // Sort by question count in descending order
      { $limit: 5 }, // Get the top 5 tags
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
  }
}
