import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  // Prevent unknown field queries
  mongoose.set('strictQuery', true);
  if (!process.env.MONGODB_URL) {
    return console.log('MISSING MONGODB_URL');
  }

  if (isConnected) {
    console.log('Connecting to MONGODB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL,{
      dbName: 'devoverflow'
    });

    isConnected = true;

    console.log('MongoDB is connected');
  } catch (error) {
    console.log('MongoDB connection failed', error.message);
  }
};
