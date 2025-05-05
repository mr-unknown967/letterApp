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
app.use(cors({
  origin: [
    'https://letter-app-frontend-nine.vercel.app',
    'https://letterapp-frontend.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
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
