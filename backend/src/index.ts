import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './storage.js';
import routes from './routes.js';

// Validate required environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'EMAIL_USER',
  'EMAIL_PASS',
  'RECEIVER_EMAIL',
  'SESSION_SECRET',
  'VALID_USERNAMES',
  'USER_DOB'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // Development
  'https://your-vercel-app.vercel.app' // Production - replace with your Vercel URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Letter API Server',
    endpoints: {
      submit: 'POST /api/submit',
      getResponses: 'GET /api/responses',
      track: {
        get: 'GET /api/track',
        post: 'POST /api/track'
      }
    }
  });
});

// Routes
app.use('/api', routes);

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Environment variables loaded:', {
      validNames: process.env.VALID_USERNAMES,
      userDOB: process.env.USER_DOB
    });
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});
