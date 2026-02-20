# Edzee - AI-Powered Learning Platform 🎓

## 📌 Overview

Edzee is a comprehensive **AI-powered learning platform** built with Next.js, React, Express, MongoDB, and Groq API. It provides intelligent quiz generation, personalized learning paths, subject-specific chatbots, and comprehension practise.

**Key Tagline:** *"Learn Smarter, Not Harder - With AI-Powered Learning Paths"*

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

### 🌐 Technical Features
- **Real-time AI** - Powered by Groq API
- **Secure Authentication** - JWT-based login/signup
- **Database** - MongoDB for persistent storage
- **Scalable** - Production-ready architecture

---

## 🚀 Quick Start

### 1️⃣ Installation
```bash
cd d:\edzee
npm install
npm install groq-sdk multer pdf-parse
```

### 2️⃣ Environment Setup
```bash
# Create .env file with:
GROQ_API_KEY=your_groq_api_key
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
         ┌───────────────┴─┐
        │         API Client│              
    ┌────▼─────┐              
    │(Online)   │              
    │           │              
    └────┬─────┘              
         │                              │
    ┌────▼──────────────────────────────▼────┐
    │     EXPRESS SERVER (Backend)           │
    │  ┌──────────────┬──────────────────┐   │
    │  │ Auth Routes  │ AI Routes        │   │
    │  └──────────────┴──────────────────┘   │
    └────┬─────────────────────────┬────────┘
         │                         │
    ┌────▼──────┐      ┌──────────▼──────┐
    │  MongoDB   │      │ Genkit + Groq │
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


✅ **AI Quiz Generator** (`/quiz/generate`)
- Upload text/PDF files
- Paste content directly
- Set difficulty & question count
- AI generates quizzes using Genkit


✅ **Subject Chatbots** (`/community/chat`)
- Math Bot, Science Bot, History Bot, Language Bot
- Real-time conversation with AI
- Examples & follow-up questions



---

## 📚 Documentation
Readme.md

---

## 🎬 Quick Demo

```bash
# 1. Install
npm install groq-sdk

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
