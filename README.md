# Letter App

A special message application built with React, Express, and MongoDB.

## Project Structure

```
letter-main/
├── backend/          # Express.js backend
├── frontend/         # React frontend
└── shared/           # Shared types and schemas
```

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   RECEIVER_EMAIL=receiver_email
   SESSION_SECRET=your_session_secret
   VALID_USERNAMES=["username1","username2"]
   USER_DOB=YYYY-MM-DD
   VALID_EMAIL_PATTERN=^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
   MIN_NAME_LENGTH=1
   MAX_NAME_LENGTH=50
   MIN_MESSAGE_LENGTH=1
   MAX_MESSAGE_LENGTH=1000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_VALID_USERNAMES=["username1","username2"]
   VITE_USER_DOB=YYYY-MM-DD
   VITE_VALID_EMAIL_PATTERN=^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
   VITE_MIN_NAME_LENGTH=1
   VITE_MAX_NAME_LENGTH=50
   VITE_MIN_MESSAGE_LENGTH=1
   VITE_MAX_MESSAGE_LENGTH=1000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following environment variables in Render:
   - All variables from backend/.env
4. Set the build command: `npm install && npm run build`
5. Set the start command: `npm start`

### Frontend (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the following environment variables in Vercel:
   - All variables from frontend/.env
   - Update VITE_API_URL to point to your Render backend URL
4. Deploy!

## Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `EMAIL_USER`: Email address for sending notifications
- `EMAIL_PASS`: Email password or app-specific password
- `RECEIVER_EMAIL`: Email address to receive notifications
- `SESSION_SECRET`: Secret for session management
- `VALID_USERNAMES`: JSON array of valid usernames
- `USER_DOB`: Expected date of birth (YYYY-MM-DD)
### Optional
- `VALID_EMAIL_PATTERN`: Regex pattern for email validation
- `MIN_NAME_LENGTH`: Minimum length for names
- `MAX_NAME_LENGTH`: Maximum length for names
- `MIN_MESSAGE_LENGTH`: Minimum length for messages
- `MAX_MESSAGE_LENGTH`: Maximum length for messages

### Frontend (.env)
- `VITE_API_URL`: Backend API URL
- `VITE_VALID_USERNAMES`: JSON array of valid usernames
- `VITE_USER_DOB`: Expected date of birth (YYYY-MM-DD)
### Optional
- `VITE_VALID_EMAIL_PATTERN`: Regex pattern for email validation
- `VITE_MIN_NAME_LENGTH`: Minimum length for names
- `VITE_MAX_NAME_LENGTH`: Maximum length for names
- `VITE_MIN_MESSAGE_LENGTH`: Minimum length for messages
- `VITE_MAX_MESSAGE_LENGTH`: Maximum length for messages
