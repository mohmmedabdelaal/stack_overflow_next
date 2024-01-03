import mongoose from 'mongoose'

let isConnected = false;

export async function connectToDatabase() {
  mongoose.set('strictQuery',true);

  if(!process.env.MONGODB_URL) {
    console.log('Missing Mongodb URL')
  }
  if(isConnected) return;

  try {
    // @ts-ignore
    await  mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'devoverflow'
    })
    isConnected = true;
    console.log('Connected to MongoDB')
  }catch (e) {

  }
}