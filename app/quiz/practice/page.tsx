"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "../../lib/firebase";
import { saveQuizAttempt } from "../../lib/saveQuizAttempt";

export default function QuizPracticePage() {
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("currentQuiz");
    if (saved) setQuiz(JSON.parse(saved));
    else router.push("/quiz/generate");
  }, []);

  const handleAnswerSelect = (idx: number) => {
    if (showAnswers) return;
    setUserAnswers({ ...userAnswers, [currentQuestion]: idx });
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (q.options[userAnswers[i]] === q.answer) correct++;
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const revealAnswers = () => {
    setShowAnswers(true);
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    const correctCount = quiz.questions.filter(
      (q, i) => q.options[userAnswers[i]] === q.answer
    ).length;

    setResults({
      score,
      correctAnswers: correctCount,
      totalQuestions: quiz.questions.length
    });

    setFinished(true);

    try {
      const user = auth.currentUser;
      if (!user) return;

      await saveQuizAttempt({
        userId: user.uid,
        quizId: quiz.id,
        title: quiz.title,
        subject: quiz.subject || "general",
        difficulty: quiz.difficulty,
        score,
        totalQuestions: quiz.questions.length
      });
    } catch (e) {
      console.error("Save failed:", e);
    }
  };

  if (!quiz) return null;

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="border-4 border-black p-8 text-center">
          <h1 className="text-3xl font-bold">Quiz Complete 🎉</h1>
          <p className="mt-4 text-xl">Score: {results.score}%</p>
          <Link href="/dashboard/analytics">
            <button className="mt-6 bg-black text-white px-6 py-3 rounded">
              View Analytics
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const q = quiz.questions[currentQuestion];

 return (
  <div className="min-h-screen bg-white text-black flex justify-center px-4 py-10">
    <div className="w-full max-w-2xl">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Question {currentQuestion + 1} / {quiz.questions.length}
        </h2>
        <div className="w-full bg-gray-200 h-2 rounded mt-2">
          <div
            className="bg-black h-2 rounded"
            style={{
              width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="border-4 border-black rounded-lg p-6 bg-white">
        <p className="mb-6 text-lg font-semibold">{q.question}</p>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt: string, idx: number) => {
            const selected = userAnswers[currentQuestion] === idx;
            const correct = showAnswers && opt === q.answer;
            const wrong = showAnswers && selected && opt !== q.answer;

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full text-left p-4 border-2 rounded-lg font-semibold transition
                  ${
                    correct
                      ? "bg-green-100 border-green-600"
                      : wrong
                      ? "bg-red-100 border-red-600"
                      : selected
                      ? "bg-black text-white border-black"
                      : "bg-white border-black hover:bg-gray-100"
                  }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showAnswers && (
          <div className="mt-6 p-4 border-2 border-black bg-gray-50 rounded">
            <b>Explanation:</b>
            <p className="mt-1">{q.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex justify-between items-center">
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="px-4 py-2 border-2 border-black rounded disabled:opacity-40"
          >
            Prev
          </button>

          {currentQuestion < quiz.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="px-6 py-2 bg-black text-white rounded"
            >
              Next
            </button>
          ) : !showAnswers ? (
            <button
              onClick={revealAnswers}
              className="px-6 py-2 bg-black text-white rounded"
            >
              Check Answers
            </button>
          ) : (
            <button
              onClick={finishQuiz}
              className="px-6 py-2 bg-black text-white rounded"
            >
              Finish Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);}