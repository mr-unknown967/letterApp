import mongoose from 'mongoose';
import { Response, ResponseType } from './models/Response.js';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/letter');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export async function saveResponse(data: ResponseType) {
  try {
    const response = new Response(data);
    await response.save();
    return { success: true };
  } catch (error) {
    console.error('Error saving response:', error);
    return { success: false, error: 'Failed to save response' };
  }
}

export async function getResponses() {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });
    return { success: true, data: responses };
  } catch (error) {
    console.error('Error getting responses:', error);
    return { success: false, error: 'Failed to get responses' };
  }
}

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});
