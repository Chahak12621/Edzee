# Quick Start Guide - Edzee Platform

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies (1 min)
```bash
cd d:\edzee
npm install
npm install @genkit-ai/ai @genkit-ai/googleai multer pdf-parse
```

### Step 2: Setup Environment Variables (1 min)

Create or update `.env` file in root:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/edzee
DB_NAME=edzee

# JWT
JWT_SECRET=your_super_secret_key_here

# Google Gemini API - GET FROM: https://makersuite.google.com/app/apikey
GOOGLE_API_KEY=your_google_api_key_here

# Server
PORT=5000
NODE_ENV=development
```

### Step 3: Start Backend (1 min)
```bash
npm run server
# Should see: Server Running on port 5000
```

### Step 4: Start Frontend (1 min)
Open **new terminal** in same folder:
```bash
npm run dev
# Should see: ▲ Next.js 16.0.3
# Ready in 5.2s
```

### Step 5: Access App (1 min)
1. Open browser: `http://localhost:3000`
2. Sign up or login
3. You're in! 🎉

---

## 📊 What's Working Now

✅ **Authentication**
- Login page (`/auth/login`)
- Signup page (`/auth/signup`)
- JWT token management

✅ **Dashboard Homepage** (`/dashboard/home`)
- Popular Quizzes section
- AI Learning Features grid
- Topics selector
- Subject Chatbots
- Progress tracking
- **Offline mode indicator** (top right)

✅ **AI Quiz Generator** (`/quiz/generate`)
- Upload text/PDF files
- Paste content directly
- Set difficulty & question count
- AI generates quizzes using Genkit
- **Works offline** (queues generation)

✅ **Subject Chatbots** (`/community/chat`)
- Math Bot
- Science Bot
- History Bot
- Language Bot
- Real-time conversation
- **Works offline** (messages stored locally)

✅ **Offline Mode**
- Automatic detection
- Local data storage (IndexedDB)
- Request queuing
- Auto-sync when online
- Status indicator in UI

---

## 🧪 Test It

### Test Quiz Generation
1. Go to `/quiz/generate`
2. Paste some text: "Photosynthesis is the process..."
3. Set 3 questions, Medium difficulty
4. Click "Generate Quiz with AI"
5. See AI-generated quiz!

### Test Chatbot
1. Go to `/dashboard/home`
2. Click a topic button (e.g., Mathematics)
3. Ask a question: "How do I solve quadratic equations?"
4. Get AI response with examples

### Test Offline Mode
1. **Method 1 (Browser)**: DevTools → Network → Offline
2. **Method 2 (System)**: Disconnect WiFi
3. Try generating a quiz - it queues
4. Go back online - auto-syncs!

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `app/dashboard/home/page.jsx` | Main dashboard |
| `app/quiz/generate/page.jsx` | Quiz generator |
| `app/community/chat/page.jsx` | Chatbot interface |
| `app/utils/offline-manager.js` | Offline logic |
| `app/utils/api-client.js` | API wrapper |
| `backend/controllers/aiController.js` | Genkit AI flows |
| `backend/routes/aiRoutes.js` | API endpoints |
| `SETUP_GUIDE.md` | Detailed setup |
| `OFFLINE_MODE_GUIDE.md` | Offline architecture |

---

## 🐛 Troubleshooting

### "Cannot find genkit"
```bash
npm install @genkit-ai/ai @genkit-ai/googleai --force
npm run server
```

### "API key error"
1. Get key from: https://makersuite.google.com/app/apikey
2. Add to `.env`: `GOOGLE_API_KEY=your_key`
3. Restart server: `npm run server`

### "Cannot generate quiz"
1. Make sure backend is running (`npm run server`)
2. Check `.env` has `GOOGLE_API_KEY`
3. Paste text content (not empty)
4. Check browser console for errors

### "Offline mode not working"
1. Open DevTools (F12)
2. Go to Storage → IndexedDB
3. Check if `EdzeeDB` exists
4. Clear cache: Storage → Clear site data

### Port 5000 already in use
```bash
# Use different port
PORT=5001 npm run server

# Update API_CLIENT baseURL to 5001
```

---

## 📱 Current Pages

| Page | Route | Status |
|------|-------|--------|
| Login | `/auth/login` | ✅ Complete |
| Signup | `/auth/signup` | ✅ Complete |
| Dashboard | `/dashboard/home` | ✅ Complete |
| Quiz Generator | `/quiz/generate` | ✅ Complete |
| Quiz Practice | `/quiz/practice` | 🔜 Next |
| Comprehension | `/quiz/comprehension` | 🔜 Next |
| Multiplayer | `/quiz/multiplayer` | 🔜 Next |
| Learning Planner | `/learningplanner` | 🔜 Next |
| Chatbot | `/community/chat` | ✅ Complete |
| Analytics | `/dashboard/analytics` | 🔜 Next |

---

## 🎯 Next Steps

1. **Implement Quiz Practice Page**
   - Display quiz questions
   - Track user answers
   - Show results with explanation

2. **Add File Upload Handler**
   - Parse PDF files (pdf-parse)
   - Extract text from documents

3. **Create Comprehension Practice**
   - Multiple exercise types
   - Interactive feedback

4. **Build Learning Planner UI**
   - Show 7-day roadmap
   - Track progress

5. **Add Analytics Dashboard**
   - Quiz performance stats
   - Learning path progress
   - Time spent

---

## 🌐 API Endpoints

### Quiz Generation
```
POST /api/quiz/generate
Body: {
  "content": "Study material...",
  "numQuestions": 5,
  "difficulty": "medium"
}
```

### Learning Path
```
POST /api/quiz/learning-path
Body: {
  "topic": "Python",
  "level": "beginner",
  "duration": 7
}
```

### Chatbot
```
POST /api/chat
Body: {
  "subject": "mathematics",
  "message": "How to solve X?",
  "context": []
}
```

---

## 💾 Offline Data Handling

Your offline system stores data in these locations:

**IndexedDB Stores:**
- `quizzes` - Generated quizzes
- `answers` - User answers
- `chatMessages` - Chat history
- `learningPaths` - Generated paths
- `syncQueue` - Pending requests

**When offline:**
- ❌ Can't generate new quizzes with AI
- ✅ Can view cached quizzes
- ✅ Can answer local quiz copies
- ✅ Can chat (queues messages)
- ✅ All changes auto-sync when online

---

## 🚀 Deployment Ready

The platform is structured for easy deployment:

```bash
# Build for production
npm run build

# Start production
npm start

# Or use the combined script
npm run start:both
```

Environment variables work with any hosting:
- Vercel
- Netlify  
- AWS
- Google Cloud
- Custom servers

---

## 📚 Learning Resources

- [Genkit Docs](https://firebase.google.com/docs/genkit)
- [Google Gemini API](https://ai.google.dev)
- [IndexedDB Guide](https://mdn.io/indexeddb)
- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react)

---

## 🎓 Features Summary

### Core Features
- ✅ User Authentication (Login/Signup)
- ✅ AI Quiz Generation (using Genkit)
- ✅ Subject-Specific Chatbots
- ✅ Offline Mode with auto-sync
- ✅ Local data storage (IndexedDB)
- ✅ Beautiful responsive UI

### Coming Soon
- 🔜 Learning Planner (personalized paths)
- 🔜 Comprehension Practice (exercises)
- 🔜 Multiplayer Interactions (live chat)
- 🔜 PDF Upload & Parsing
- 🔜 Progress Analytics
- 🔜 User Profiles & Settings

---

## 💬 Support

### Check These First:
1. Read SETUP_GUIDE.md for detailed setup
2. Check OFFLINE_MODE_GUIDE.md for offline questions
3. Look at console errors (F12 → Console)
4. Check server logs (terminal window)

### Common Issues:
- **Blank page?** → Check if frontend is running
- **API errors?** → Check if backend is running  
- **No data?** → Clear localStorage & refresh
- **Can't sync?** → Go online, refresh page

---

**Happy Learning! 🎓**

For detailed setup, see `SETUP_GUIDE.md`
For offline architecture, see `OFFLINE_MODE_GUIDE.md`
