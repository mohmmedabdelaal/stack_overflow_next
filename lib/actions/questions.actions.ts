'use server'
import {connectToDatabase} from "@/lib/mongoose";

export async  function createQuestions({params: any}) {
    try {
connectToDatabase()
0
    }catch (e) {
    console.log('errror', e.message)
    }
}