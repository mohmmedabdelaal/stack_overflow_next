'use server'
import {connectToDatabase} from "@/lib/mongoose";
import User from "@/database/user.model";
import {
    CreateUserParams,
    DeleteUserParams,
    GetAllUsersParams,
    GetUserByIdParams,
    UpdateUserParams
} from "@/lib/actions/shared.types";
import {revalidatePath} from "next/cache";
import QuestionModel from "@/database/question.model";

export async function getUserById(params: any) {

    try {
        connectToDatabase()
        const {userId} = params
        const newUser = await User.findOne({clerkId: userId});
        return newUser;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export async function createUser(userData: CreateUserParams) {
    try {
        connectToDatabase();
        const user = await User.create(userData)
        return user;
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export async function updateUser(params: UpdateUserParams) {
    try {
        connectToDatabase();
        const {clerkId, updateData, path} = params
        await User.findOneAndUpdate({clerkId}, updateData, {
            new: true
        });
        revalidatePath(path)
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase()
        const {clerkId} = params;
        const user = await User.findOneAndDelete({clerkId})
        if (!user) throw new Error('User not found');
        // Delete user from database
        // and questions, answers, comments, etc.

        // get user question ids
        // const userQuestionIds = await Question.find({ author: user._id}).distinct('_id');

        // delete user questions
        // @ts-ignore
        await QuestionModel.deleteMany({author: user._id});

        // @ts-ignore
        const deletedUser = await User.findByIdAndDelete(user._id);
        return deletedUser;
    } catch (e) {
        console.log(e)
    }
}

export async function getAllUsers(params: GetAllUsersParams) {
    try {
        connectToDatabase();
        // const {page= 1, pageSize= 10, filter, searchQuery = ''} = params;
        const user = await User.find({}).sort({createdAt: -1})
        return {user};
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export async function getUserInfo(params: GetUserByIdParams) {
    try {
        connectToDatabase()
        const {userId} = params

        const user = await User.findOne({clerkId: userId})

        if (!user) {
            throw new Error('User not found');
        }

        const userInfo = {
            clerkId: user.clerkId,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            picture: user.picture,
            location: user.location,
            portfolioWebsite: user.portfolioWebsite,
            reputation: user.reputation,
            joinedAt: user.joinedAt,
            savedQuestions: user.savedQuestions
        }
        return userInfo;
    } catch (e) {
        console.log(e)
        throw e;
    }
}