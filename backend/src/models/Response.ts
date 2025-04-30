import mongoose from 'mongoose';
import { z } from 'zod';

// Zod schema for validation
export const ResponseSchema = z.object({
  additionalInfo: z.string().min(1, 'Message is required')
});

export type ResponseType = z.infer<typeof ResponseSchema>;

// Mongoose schema for database
const responseSchema = new mongoose.Schema({
  additionalInfo: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Response = mongoose.model('Response', responseSchema); 