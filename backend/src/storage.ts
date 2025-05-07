import mongoose from 'mongoose';
import { Response, ResponseType } from './models/Response.js';

// Configure mongoose connection options
const mongooseOptions = {
  maxPoolSize: 10,
  minPoolSize: 5,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
  heartbeatFrequencyMS: 10000,
  retryWrites: true,
  retryReads: true,
  connectTimeoutMS: 10000,
  family: 4 // Use IPv4, skip trying IPv6
};

// Cache for MongoDB connection
let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/letter', mongooseOptions);
    isConnected = true;
    console.log('Connected to MongoDB');

    // Handle connection errors
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });

    // Handle disconnection
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });

    // Handle reconnection
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
      isConnected = true;
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    process.exit(1);
  }
}

// Cache for responses
const responseCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function saveResponse(data: ResponseType) {
  try {
    const response = new Response(data);
    await response.save();
    
    // Clear cache after saving new response
    responseCache.clear();
    
    return { success: true };
  } catch (error) {
    console.error('Error saving response:', error);
    return { success: false, error: 'Failed to save response' };
  }
}

export async function getResponses() {
  try {
    // Check cache first
    const cachedResponses = responseCache.get('responses');
    if (cachedResponses) {
      return { success: true, data: cachedResponses };
    }

    const responses = await Response.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    // Cache the responses
    responseCache.set('responses', responses);
    
    // Clear cache after TTL
    setTimeout(() => {
      responseCache.delete('responses');
    }, CACHE_TTL);

    return { success: true, data: responses };
  } catch (error) {
    console.error('Error getting responses:', error);
    return { success: false, error: 'Failed to get responses' };
  }
}
