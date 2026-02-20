# Edzee AI Learning Platform - Setup & Integration Guide

## 🎯 Overview

Edzee is a comprehensive AI-powered learning platform with the following features:

1. **AI Quiz Generator** - Upload PDFs/notes and generate custom quizzes
2. **Learning Planner** - Personalized learning paths using AI
3. **Comprehension Practice** - Interactive comprehension exercises
4. **Interactive Learning** - Real-time AI tutoring conversations
5. **Subject Chatbots** - Specialized bots for Math, Science, History, Language
6. **Offline Mode** - Full offline support with local storage and sync

---

## 📦 Installation & Setup

### 1. Install Dependencies

```bash
cd d:\edzee

# Install main dependencies
npm install

# Install AI and backend packages
npm install @genkit-ai/ai @genkit-ai/googleai multer pdf-parse dotenv jsonwebtoken bcryptjs

# Install dev dependencies
npm install --save-dev @types/express @types/node
```

### 2. Configure Environment Variables

Create/update `.env` file:

```env
# Database
MONGODB_URI=your_mongodb_connection_string
DB_NAME=edzee

# JWT
JWT_SECRET=your_jwt_secret_key

# Google Gemini API
GOOGLE_API_KEY=your_google_api_key

# Server
PORT=5000
NODE_ENV=development
```

### 3. Setup Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` as `GOOGLE_API_KEY`

---

## 🚀 Running the Application

### Development Mode (Both Frontend & Backend)

```bash
npm run start:both
```

### Individual Services

```bash
# Terminal 1: Backend server
npm run server

# Terminal 2: Next.js frontend (in another terminal)
npm run dev
```

Access the app at: `http://localhost:3000`

---

## 🏗️ Project Structure

```
edzee/
├── app/
│   ├── dashboard/home/page.jsx          # Main dashboard
│   ├── auth/                             # Authentication pages
│   ├── quiz/generate/page.jsx           # Quiz generator
│   ├── quiz/comprehension/page.jsx      # Comprehension practice
│   ├── quiz/multiplayer/page.jsx        # Interactive learning
│   ├── learningplanner/page.jsx         # Learning paths
│   ├── community/chat/page.jsx          # Chatbots & community
│   └── utils/
│       ├── offline-manager.js           # Offline handling
│       └── api-client.js                # API wrapper with offline support
├── backend/
│   ├── controllers/
│   │   ├── authController.js            # User authentication
│   │   └── aiController.js              # AI features with Genkit
│   ├── models/
│   │   ├── User.js
│   │   └── Quiz.js
│   └── routes/
│       ├── authRoutes.js
│       └── aiRoutes.js                  # AI endpoints
├── server/index.js                       # Express server
└── genkit.config.json                    # Genkit configuration
```

---

## 🧠 AI Features Architecture

### 1. Quiz Generation
**Endpoint:** `POST /api/quiz/generate`

```javascript
// Request
{
  "content": "Your study material...",
  "numQuestions": 5,
  "difficulty": "medium"  // easy, medium, hard
}

// Response
{
  "success": true,
  "data": {
    "questions": [
      {
        "question": "...",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "explanation": "..."
      }
    ]
  }
}
```

### 2. Learning Path Generation
**Endpoint:** `POST /api/quiz/learning-path`

```javascript
// Request
{
  "topic": "Machine Learning",
  "level": "beginner",  // beginner, intermediate, advanced
  "duration": 7  // days
}

// Response
{
  "success": true,
  "data": {
    "path": [
      {
        "day": 1,
        "topic": "Introduction to ML",
        "resources": ["Article 1", "Video 1"],
        "exercises": ["Exercise 1"]
      }
    ]
  }
}
```

### 3. Comprehension Practice
**Endpoint:** `POST /api/quiz/comprehension`

```javascript
// Request
{
  "topic": "World War II",
  "passage": "..."
}

// Response
{
  "success": true,
  "data": {
    "exercises": [
      {
        "type": "multiple_choice",
        "question": "...",
        "answerKey": "..."
      }
    ]
  }
}
```

### 4. Subject Chatbots
**Endpoint:** `POST /api/chat`

```javascript
// Request
{
  "subject": "mathematics",  // math, science, history, language
  "message": "How do I solve quadratic equations?",
  "context": []  // previous conversation
}

// Response
{
  "success": true,
  "data": {
    "response": "Detailed explanation...",
    "examples": ["Example 1", "Example 2"],
    "followUpQuestions": ["Q1", "Q2"]
  }
}
```

---

## 🌐 Offline Mode Implementation

### How It Works

1. **Detection**: Automatically detects online/offline status
2. **Storage**: Uses IndexedDB to store all data locally
3. **Queueing**: Queues requests when offline
4. **Syncing**: Auto-syncs when connection is restored

### Using Offline Manager

```javascript
import { offlineManager } from "@/app/utils/offline-manager";

// Check status
const { isOffline, mode } = offlineManager.getStatus();

// Store quiz locally
await offlineManager.storeQuiz(quizData);

// Get local quizzes
const quizzes = await offlineManager.getLocalQuizzes();

// Queue data for sync
await offlineManager.queueForSync("/api/endpoint", data);

// Auto-syncs when online
```

### Using API Client with Offline Support

```javascript
import { apiClient } from "@/app/utils/api-client";

// Automatically handles offline mode
const result = await apiClient.generateQuiz(content, options);

// In offline mode:
// - Queues the request
// - Stores it locally
// - Syncs when online

// GET requests use cache when offline
```

---

## 📱 Frontend Components

### Dashboard Homepage
- **Location**: `app/dashboard/home/page.jsx`
- **Features**: Quiz showcase, Topics grid, AI features, Progress tracking
- **Offline Support**: Shows offline indicator, caches data

### Quiz Generator
- **Location**: `app/quiz/generate/page.jsx`
- **Features**: File upload, Text input, Difficulty selection
- **Offline**: Queues generation, runs when online

### Subject Chatbots
- **Location**: `app/community/chat/page.jsx`
- **Features**: Subject selection, Real-time chat, Examples & suggestions
- **Subjects**: Math, Science, History, Language

---

## 🔒 Data Structure

### Quiz Model
```javascript
{
  _id: ObjectId,
  title: String,
  topic: String,
  questions: [{
    question: String,
    options: [String],
    correctAnswer: String,
    explanation: String
  }],
  difficulty: String,
  creator: String,
  duration: Number,
  imageUrl: String,
  rating: Number,
  price: Number,
  createdAt: Date
}
```

### Chat Messages (Local Storage)
```javascript
{
  id: Number,
  botType: String,
  message: String,
  response: String,
  timestamp: Date,
  examples: [String],
  followUpQuestions: [String]
}
```

---

## 🔄 API Integration Flow

```
Frontend (React)
    ↓
API Client (offline-aware)
    ↓
Online? → Yes → Express Server → Genkit → Gemini API
    ↓
    No → IndexedDB (cache/queue)
    ↓
    Auto-sync when online
```

---

## 🛠️ Troubleshooting

### Genkit Not Working
```bash
# Clear cache
rm -rf .genkit

# Reinstall
npm install @genkit-ai/ai @genkit-ai/googleai --force
```

### Offline Mode Issues
- Clear IndexedDB: DevTools → Storage → IndexedDB
- Check localStorage for cached data
- Verify offline-manager.js is imported

### API Not Responding
1. Check server is running: `npm run server`
2. Verify PORT in `.env` (default 5000)
3. Check CORS settings in `server/index.js`

### Missing API Key
```bash
# Make sure in .env
GOOGLE_API_KEY=your_key_here

# Restart server after adding key
npm run server
```

---

## 🚀 Next Steps

1. **Implement Learning Planner Page** (`app/learningplanner/page.jsx`)
2. **Build Comprehension Practice UI** (`app/quiz/comprehension/page.jsx`)
3. **Create Chat Interface** (`app/community/chat/page.jsx`)
4. **Add File Upload Handler** (PDF parsing with pdf-parse)
5. **Setup Analytics** (`app/dashboard/analytics/page.jsx`)
6. **Add User Progress Tracking** (Database integration)

---

## 📚 Resources

- [Google Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Gemini API Guide](https://ai.google.dev/tutorials/get_started_web)
- [IndexedDB Web API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs in terminal
3. Check browser console for frontend errors
4. Verify all environment variables are set

Happy Learning! 🎓
