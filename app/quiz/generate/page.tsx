"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiUpload } from "react-icons/fi";

export default function GenerateQuizPage() {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [quiz, setQuiz] = useState<any>(null);

  // ---------------- FILE UPLOAD ----------------
  const handleFileUpload = async (e: any) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setError("");

    if (uploadedFile.type === "text/plain") {
      const text = await uploadedFile.text();
      setContent(text);
    } else if (uploadedFile.type === "application/pdf") {
      setContent("📄 PDF selected. Content will be extracted automatically.");
    } else {
      setError("Please upload a PDF or TXT file only");
      setFile(null);
    }
  };

  // ---------------- PARSE PDF SERVER-SIDE ----------------
 const parsePDF = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/parse-pdf", {
      method: "POST",
      body: formData, 
    });
    
    const data = await res.json();
    if (res.ok) return data.text;
    else throw new Error(data.error || "PDF parse failed");
  } catch (err) {
    console.error(err);
    setError("Failed to parse PDF file.");
    return "";
  }
};

  // ---------------- GENERATE QUIZ ----------------
  const handleGenerateQuiz = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let finalContent = content;

      // PDF → TEXT via server
      if (file && file.type === "application/pdf") {
        finalContent = await parsePDF(file);
      }

      if (!finalContent || finalContent.length < 50) {
        setError("Content is too short to generate a quiz");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: finalContent,
          numQuestions,
          difficulty
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to generate quiz");
        setLoading(false);
        return;
      }

      const quizData = {
        id: Date.now(),
        title: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Quiz`,
        difficulty,
        questions: data.questions,
        createdAt: new Date(),
        totalQuestions: data.questions.length
      };

      localStorage.setItem("currentQuiz", JSON.stringify(quizData));
      setQuiz(quizData);
      setSuccess("🎉 Quiz generated successfully!");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while generating the quiz");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="w-full bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="font-semibold text-lg">Edzee</div>
        <Link href="/dashboard/home" className="hover:text-gray-300">
          Dashboard
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Generate Quiz with AI</h1>

        {error && (
          <div className="border-4 border-black p-4 mb-6 text-red-700 font-semibold">
            {error}
          </div>
        )}
        {success && (
          <div className="border-4 border-black p-4 mb-6 text-green-700 font-semibold">
            {success}
          </div>
        )}

        {!quiz ? (
          <form onSubmit={handleGenerateQuiz} className="space-y-6">
            <div>
              <label className="block font-bold mb-2">Upload PDF / TXT or Paste Text</label>
              <label className="flex items-center gap-3 p-4 border-2 border-dashed border-black rounded-lg cursor-pointer hover:bg-gray-50">
                <FiUpload className="text-2xl" />
                <span className="font-semibold">Upload PDF or TXT file</span>
                <input type="file" accept=".pdf,.txt" onChange={handleFileUpload} className="hidden" />
              </label>
              {file && <p className="mt-2 text-green-700 font-semibold">✓ {file.name}</p>}
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your study notes here..."
              className="w-full p-4 border-2 border-black rounded-lg min-h-48"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-bold mb-2 block">Number of Questions</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="w-full p-3 border-2 border-black rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold mb-2 block">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-3 border-2 border-black rounded-lg"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white p-4 rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-600"
            >
              {loading ? "Generating Quiz..." : "Generate Quiz"}
            </button>
          </form>
        ) : (
          <div className="border-4 border-black p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Quiz Ready 🎯</h2>
            <p><strong>Questions:</strong> {quiz.totalQuestions}</p>
            <p className="mb-6"><strong>Difficulty:</strong> {quiz.difficulty}</p>
            <Link href="/quiz/practice">
              <button className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800">
                Start Practicing
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}