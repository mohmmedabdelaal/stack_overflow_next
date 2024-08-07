'use server';
import { connectToDatabase } from '@/lib/mongoose';
import Tag from '@/database/tag.model';
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  GetSavedQuestionsParams,
  QuestionVoteParams,
  ToggleSaveQuestionParams,
} from '@/lib/actions/shared.types';
import User from '@/database/user.model';
import Question from '@/database/question.model';
import { revalidatePath } from 'next/cache';
import { FilterQuery } from 'mongoose';
import Answer from '@/database/Answer.model';
import Interaction from '@/database/interaction.model';
// import { BADGE_CRITERIA } from '@/constants';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();
    const { pageSize = 10, page = 1, searchQuery, filter } = params;

    const skipAmount = (page - 1) * pageSize;
    const regexQuery = { $regex: new RegExp(searchQuery ?? '', 'i') };

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [{ title: regexQuery }, { content: regexQuery }];
    }

    let sortOptions = {};

    switch (filter) {
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'frequent':
        sortOptions = { views: -1 };
        break;
      case 'unanswered':
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }

    const totalQuestions = await Question.countDocuments(query);

    const questions = await Question.find(query)
      .sort(sortOptions)
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User });
    const isNext = totalQuestions > skipAmount + questions.length;
    return { questions, isNext };
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
    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      // findOneAndUpdate() mongoose property
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    // Mongoose property
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 5 }, // Add 10 reputation points
    });

    await Interaction.create({
      user: author,
      action: 'ask_question',
      question: question._id,
      tags: tagDocuments,
    });

    revalidatePath(path);
  } catch (e) {
    console.error(e);
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture',
      });

    return question;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { userId, questionId, hasdownVoted, hasupVoted, path } = params;
    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error("Couldn't find'");
    }

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 },
    });

    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasupVoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();
    const { userId, questionId, hasdownVoted, hasupVoted, path } = params;
    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $push: { downvotes: userId },
        $pull: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) {
      throw new Error('Could not find question');
    }
    revalidatePath(path);
  } catch (e) {
    console.log(e);
  }
}

export async function toggleSavedQuestions(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);
    const isSavedQuestion = user.saved.includes(questionId);

    if (isSavedQuestion) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    if (!user) {
      throw new Error('User not found');
    }

    revalidatePath(path);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getAllSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();
    const { clerkId, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : {};

    // if(searchQuery){
    //   query.$or = [{title: {$regex: }}]
    // }
    const user = await User.findOne({ clerkId }).populate({
      path: 'saved',
      match: query,
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: 'clerkId _id name picture' },
      ],
    });

    const savedQuestions = user.saved;
    return { questions: savedQuestions };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, path } = params;
    const deletedQuestion = await Question.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      throw new Error('Question not found');
    }
    await Answer.deleteMany({ question: deletedQuestion });

    await Interaction.deleteMany({ question: questionId });

    // 4. Optionally: Update author reputation (decrease by some amount)

    // 5. Revalidate the path
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function updateQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();
    const { title, content, questionId, path } = params;
    const question = await Question.findByIdAndUpdate(
      questionId,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!question) {
      throw new Error('Question not found');
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getHotQuestions() {
  try {
    connectToDatabase();
    const questions = await Question.find({})
      .sort({ views: -1 }) // Sort by views in descending order
      .limit(5) // Limit to top 5 questions
      .populate({
        path: 'tags',
        model: Tag,
        select: '_id name', // Select only _id and name fields for tags
      })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name picture', // Select only _id, clerkId, name, and picture fields for the author
      });

    return questions;
  } catch (error) {
    console.log(error);
  }
}

/// / GET reputation
