"use client";

import { useState } from "react";
import Link from "next/link";

export default function ComprehensionPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const generate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");

    const res = await fetch("/api/comprehension", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passage: text }),
    });

    const data = await res.json();
    setResult(data.result || "Something went wrong");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="bg-black text-white px-8 py-4 flex justify-between">
        <h1 className="font-bold text-lg">Edzee – Comprehension</h1>
        <Link href="/dashboard/home">Dashboard</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <h2 className="text-4xl font-bold mb-6">AI Comprehension Practice</h2>

        <textarea
          className="w-full border-4 border-black p-4 rounded-lg min-h-40"
          placeholder="Paste passage here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={generate}
          disabled={loading}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg font-bold"
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>

        {result && (
          <pre className="mt-8 border-4 border-black p-6 rounded-lg whitespace-pre-wrap">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}