'use server'

import {connectToDatabase} from "@/lib/mongoose";

export async  function createQuestions() {
    try {
    await  connectToDatabase();
    }catch (e){

    }
}