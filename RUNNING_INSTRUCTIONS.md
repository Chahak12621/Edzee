# 🚀 Complete Guide: Running Your AI Learning Platform

## 📋 Project Overview

Your platform includes:
- ✅ AI Quiz Generator (with PDF/text upload)
- ✅ AI Learning Planner (7-day personalized plans)
- ✅ AI Comprehension Practice (5 exercise types)
- ✅ Subject Chatbots (Math, Science, History, Language)
- ✅ Offline Mode (IndexedDB with auto-sync)
- ✅ User Dashboard & Analytics
- ✅ Profile Management
- ✅ MongoDB Database Integration

---

## 🔧 Prerequisites

Before you start, ensure you have:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (running locally or Atlas) - [Download](https://www.mongodb.com/try/download/community)
3. **Google API Key** (for Genkit AI) - [Create](https://console.cloud.google.com/)
4. **Git** (optional) - [Download](https://git-scm.com/)

### Verify installations:
```bash
node --version      # Should show v18+
npm --version       # Should show 8+
mongod --version    # Should show version number
```

---

## 📦 Step 1: Install Dependencies

### 1.1 Navigate to project directory
```bash
cd d:\edzee
```

### 1.2 Install all npm packages
```bash
npm install
```

This will install all dependencies from `package.json`:
- **Frontend:** Next.js, React, TailwindCSS, React Icons
- **Backend:** Express, Mongoose, Multer, PDF-Parse
- **AI:** @genkit-ai/ai, @genkit-ai/googleai
- **Auth:** JWT, bcryptjs
- **Others:** CORS, dotenv, axios

### 1.3 Install backend-specific packages (if needed)
```bash
npm install @genkit-ai/ai @genkit-ai/googleai multer pdf-parse
```

---

## 🔑 Step 2: Environment Configuration

### 2.1 Create `.env.local` file in project root

Create a file named `.env.local` in `d:\edzee\` with the following content:

```env
# Google API (Required for AI features)
GOOGLE_API_KEY=your_google_api_key_here

# MongoDB Connection (Choose one)
MONGODB_URI=mongodb://localhost:27017/edzee
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edzee

# JWT Secret (For authentication)
JWT_SECRET=your_secret_key_12345678

# Server Port
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 2.2 Get Your Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the "Generative Language API"
4. Create an API key
5. Copy and paste it in `.env.local`

### 2.3 MongoDB Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB server
mongod
# Should show: waiting for connections on port 27017
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/edzee`
5. Add to `.env.local`

---

## ▶️ Step 3: Start the Application

### 3.1 Start MongoDB (if using local)

**In Terminal 1:**
```bash
mongod
```

Wait for: `waiting for connections on port 27017`

### 3.2 Start Backend Server

**In Terminal 2:**
```bash
cd d:\edzee
npm run server
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### 3.3 Start Frontend (Next.js)

**In Terminal 3:**
```bash
cd d:\edzee
npm run dev
```

You should see:
```
▲ Next.js 16.0.3
- Local: http://localhost:3000
```

---

## 🌐 Step 4: Access Your Application

Open your browser and go to:

**http://localhost:3000**

### Initial Page Flow:
1. **Homepage** → Shows all features overview
2. **Sign Up** → Create account at http://localhost:3000/auth/signup
3. **Dashboard** → http://localhost:3000/dashboard/home
4. **Profile** → http://localhost:3000/dashboard/profile
5. **Analytics** → http://localhost:3000/dashboard/analytics

---

## 📚 Available Routes

### Frontend Routes
```
/                           Homepage
/auth/login                 Login page
/auth/signup                Sign up page
/auth/reset-password        Password reset
/dashboard/home             Main dashboard
/dashboard/profile          User profile
/dashboard/analytics        Analytics & stats
/quiz/generate              Quiz generator
/quiz/practice              Practice quiz
/quiz/comprehension         Comprehension exercises
/quiz/multiplayer           Multiplayer quiz (coming soon)
/community/chat             Chat with bots
/community/feed             Community feed
/learningplanner            Learning planner
```

### Backend API Routes

**Authentication:**
```
POST   /api/auth/signup              Register
POST   /api/auth/login               Login
POST   /api/auth/refresh-token       Refresh JWT
```

**User Profile:**
```
GET    /api/user/profile             Get user profile
PUT    /api/user/profile             Update profile
GET    /api/user/analytics           Get analytics
PUT    /api/user/analytics           Update analytics
```

**AI Features:**
```
POST   /api/quiz/generate            Generate quiz from text
POST   /api/quiz/learning-path       Create learning plan
POST   /api/quiz/comprehension       Generate comprehension
POST   /api/chat                     Chat with bot
```

**Health Check:**
```
GET    /api/health                   Server status
```

---

## 🧪 Step 5: Test the Application

### 5.1 Test Sign Up
1. Go to http://localhost:3000/auth/signup
2. Enter: name, email, password
3. Click Sign Up
4. Should redirect to dashboard

### 5.2 Test Quiz Generator
1. Go to http://localhost:3000/quiz/generate
2. Paste text: "The capital of France is Paris..."
3. Select difficulty & number of questions
4. Click "Generate Quiz"
5. Quiz appears in 10-15 seconds

### 5.3 Test Chatbot
1. Go to http://localhost:3000/community/chat
2. Select "Mathematics Bot"
3. Type: "How do I solve 2x + 3 = 7?"
4. Bot responds with solution

### 5.4 Test Offline Mode
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Offline" checkbox
4. Try navigating pages - they work!
5. Uncheck "Offline" - data syncs automatically

### 5.5 Check Database
1. In MongoDB (local or Atlas)
2. Database: `edzee`
3. Collections: `users`, `quizzes`, `chats`
4. View created users/quizzes

---

## ⚙️ Backend File Structure Verification

### ✅ Models (Database Schemas)

**User Model** - `backend/models/User.js`
```javascript
Fields:
- name, email, password (auth)
- profileImage, bio (profile)
- totalQuizzesAttempted, averageScore, learningStreak (analytics)
- completedCourses, preferredSubjects (learning)
```

**Quiz Model** - `backend/models/Quiz.js`
```javascript
Fields:
- title, description, topic, difficulty
- questions (array of Q&A)
- creator (reference to User)
- attemptedBy (tracking attempts)
```

### ✅ Controllers (Business Logic)

**Auth Controller** - `backend/controllers/authController.js`
- signup(), login(), refreshToken()

**User Controller** - `backend/controllers/userController.js`
- getUserProfile()
- updateUserProfile()
- getUserAnalytics()
- updateAnalytics()

**AI Controller** - `backend/controllers/aiController.js`
- generateQuizFlow()
- generateLearningPathFlow()
- generateComprehensionFlow()
- subjectChatbotFlow()

### ✅ Routes (API Endpoints)

**Auth Routes** - `backend/routes/authRoutes.js`
- /api/auth/signup
- /api/auth/login
- /api/auth/refresh-token

**User Routes** - `backend/routes/userRoutes.js`
- /api/user/profile (GET, PUT)
- /api/user/analytics (GET, PUT)

**AI Routes** - `backend/routes/aiRoutes.js`
- /api/quiz/generate
- /api/quiz/learning-path
- /api/quiz/comprehension
- /api/chat

### ✅ Server Setup

**Server** - `server/index.js`
- Express middleware setup
- MongoDB connection
- Route registration
- Error handling
- Health check endpoint

### ✅ Database Config

**DB Config** - `backend/config/db.js`
- MongoDB URI with fallback logic
- Connection error handling
- Reconnection attempts

---

## 🔌 Offline Mode Explanation

Your app works without internet!

### How it works:

1. **Detection** - App detects internet connection status
2. **Caching** - Data stored in browser IndexedDB (5 object stores)
3. **Queuing** - Requests queued when offline
4. **Auto-Sync** - When online, data syncs to server

### Test it:
```javascript
// Files involved:
app/utils/offline-manager.js      // IndexedDB management
app/utils/api-client.js           // API wrapper with offline routing
```

### IndexedDB Structure:
```
Database: "edzee-db"
Stores:
- quizzes          (store generated quizzes)
- answers          (store quiz answers)
- learningPaths    (store learning plans)
- chatMessages     (store chat history)
- syncQueue        (store pending requests)
```

---

## 🚨 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
mongod

# Or use MongoDB Atlas connection string in .env.local
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/edzee
```

### "GOOGLE_API_KEY is missing"
```bash
# Make sure .env.local has GOOGLE_API_KEY
# Restart npm run dev (next.js caches env)
```

### "Port 3000 already in use"
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port:
npm run dev -- -p 3001
```

### "Port 5000 already in use"
```bash
# Change PORT in .env.local
PORT=5001
# Then restart backend
```

### "Quiz generation not working"
```bash
# Check:
1. GOOGLE_API_KEY is valid
2. API quota not exceeded
3. Check browser console for errors (F12)
4. Check server logs for API responses
```

### "Data not syncing offline"
```bash
# Check IndexedDB in DevTools:
1. F12 → Application → IndexedDB
2. Check if "edzee-db" exists
3. Check syncQueue has items
4. Go online and refresh page
```

---

## 📊 Quick Statistics

**Frontend Files:**
- 10+ React pages
- 5+ custom hooks
- 2 utility managers (offline & API)
- TailwindCSS styling

**Backend Files:**
- 3 models (User, Quiz, Chat)
- 4 controllers (Auth, User, AI, etc.)
- 3 route files
- 1 database config

**Total Dependencies:** 40+ npm packages
**Database:** MongoDB
**AI Engine:** Google Genkit
**Offline Storage:** IndexedDB (5 stores)

---

## 🎯 Next Steps

### To Deploy:
1. Use Vercel for frontend (Next.js optimal)
2. Use Railway/Heroku for backend
3. Use MongoDB Atlas for database
4. Set production environment variables

### To Extend:
1. Add more subject chatbots
2. Implement multiplayer quiz rooms
3. Add file upload processing
4. Build admin dashboard
5. Add payment system for paid courses

### To Optimize:
1. Add database indexing
2. Implement caching strategies
3. Optimize API response sizes
4. Add request rate limiting
5. Implement WebSocket for real-time features

---

## 📞 Support Commands

```bash
# Check all running processes
netstat -ano | findstr :3000      # Next.js
netstat -ano | findstr :5000      # Backend
netstat -ano | findstr :27017     # MongoDB

# View logs
# Frontend: Check browser console (F12)
# Backend: Check terminal running npm run server

# Test API health
curl http://localhost:5000/api/health

# Test database connection
# MongoDB shell will show connection status
```

---

## ✨ Features Summary

| Feature | Status | Location |
|---------|--------|----------|
| Quiz Generator | ✅ | /quiz/generate |
| Learning Planner | ✅ | /learningplanner |
| Comprehension Practice | ✅ | /quiz/comprehension |
| Chatbots | ✅ | /community/chat |
| Offline Mode | ✅ | (Global) |
| User Profile | ✅ | /dashboard/profile |
| Analytics | ✅ | /dashboard/analytics |
| Authentication | ✅ | /auth/* |
| Dashboard | ✅ | /dashboard/home |

---

## 🎓 Learning Resources

- **Next.js:** https://nextjs.org/docs
- **Express.js:** https://expressjs.com/
- **MongoDB:** https://docs.mongodb.com/
- **Genkit:** https://github.com/firebase/genkit
- **IndexedDB:** https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

---

**Your platform is ready to go! 🚀**

For any issues, check the browser console (F12) and server terminal for error messages.
