# Edzee - AI-Powered Learning Platform 🎓

## 📌 Overview

Edzee is a comprehensive **AI-powered learning platform** built with Next.js, React, Express, MongoDB, and Google Genkit. It provides intelligent quiz generation, personalized learning paths, subject-specific chatbots, and full offline support.

**Key Tagline:** *"Learn Smarter, Not Harder - With AI-Powered Learning Paths & Offline Support"*

---

## ✨ Features

### 🧠 AI Learning Features
- **AI Quiz Generator** - Upload PDFs, text, or notes → AI generates custom quizzes
- **Learning Planner** - Get personalized 7-day learning roadmaps
- **Comprehension Practice** - Interactive exercises to deepen understanding
- **Interactive Tutoring** - Real-time conversation with AI tutors
- **Subject Chatbots** - Specialized bots for Math, Science, History, Language

### 📱 User Experience
- **Beautiful Dashboard** - Modern, responsive design
- **Progress Tracking** - Monitor learning journey
- **Social Learning** - Community feed and shared quizzes
- **Offline Mode** - Work offline, auto-sync when online
- **Local Storage** - IndexedDB for persistent data

### 🌐 Technical Features
- **Real-time AI** - Powered by Google Gemini API via Genkit
- **Secure Authentication** - JWT-based login/signup
- **Database** - MongoDB for persistent storage
- **Offline-First** - IndexedDB + Request queuing + Auto-sync
- **Scalable** - Production-ready architecture

---

## 🚀 Quick Start

### 1️⃣ Installation
```bash
cd d:\edzee
npm install
npm install @genkit-ai/ai @genkit-ai/googleai multer pdf-parse
```

### 2️⃣ Environment Setup
```bash
# Create .env file with:
GOOGLE_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

### 3️⃣ Run Application
```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev
```

### 4️⃣ Access
Open `http://localhost:3000` and sign up!

**Full guide:** See [QUICK_START.md](./QUICK_START.md)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js/React)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │  Quiz Gen    │  │  Chatbot     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬─────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
    ┌────▼─────┐              ┌────────▼────────┐
    │ API Client│              │  Offline Mode   │
    │(Online)   │              │  - IndexedDB    │
    │           │              │  - Sync Queue   │
    └────┬─────┘              └────────┬────────┘
         │                              │
    ┌────▼──────────────────────────────▼────┐
    │     EXPRESS SERVER (Backend)           │
    │  ┌──────────────┬──────────────────┐   │
    │  │ Auth Routes  │ AI Routes        │   │
    │  └──────────────┴──────────────────┘   │
    └────┬─────────────────────────┬────────┘
         │                         │
    ┌────▼──────┐      ┌──────────▼──────┐
    │  MongoDB   │      │ Genkit + Gemini │
    │  Database  │      │    AI Models    │
    └────────────┘      └─────────────────┘
```

---

## 🎯 Current Features (Completed)

✅ **Authentication**
- Login page (`/auth/login`)
- Signup page (`/auth/signup`)
- JWT token management

✅ **Dashboard Homepage** (`/dashboard/home`)
- Popular Quizzes showcase
- AI Learning Features grid (Quiz Gen, Learning Planner, Comprehension, Interaction)
- Topics selector (7 subjects)
- Subject Chatbots (Math, Science, History, Language)
- Progress tracking cards
- Offline mode indicator

✅ **AI Quiz Generator** (`/quiz/generate`)
- Upload text/PDF files
- Paste content directly
- Set difficulty & question count
- AI generates quizzes using Genkit
- Works offline (queues generation)

✅ **Subject Chatbots** (`/community/chat`)
- Math Bot, Science Bot, History Bot, Language Bot
- Real-time conversation with AI
- Examples & follow-up questions
- Works offline (messages stored locally)

✅ **Offline Mode**
- Automatic online/offline detection
- Local data storage (IndexedDB)
- Request queuing
- Auto-sync when online
- Status indicator in UI

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](./QUICK_START.md) | 5-minute setup |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Detailed setup & APIs |
| [OFFLINE_MODE_GUIDE.md](./OFFLINE_MODE_GUIDE.md) | Offline architecture |
| [DEPENDENCIES.md](./DEPENDENCIES.md) | Package management |

---

## 🎬 Quick Demo

```bash
# 1. Install
npm install @genkit-ai/ai @genkit-ai/googleai multer pdf-parse

# 2. Setup .env with Google API key

# 3. Start both servers
npm run start:both

# 4. Open browser
# → http://localhost:3000

# 5. Sign up and explore!
```

**Happy Learning! 🎓**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
