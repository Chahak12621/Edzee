"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function MultiplayerPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="w-full bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="font-semibold text-lg">Edzee Multiplayer</div>
        <Link href="/dashboard/home" className="text-white hover:text-gray-300">Dashboard</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Multiplayer Quiz</h1>

        <div className="bg-white border-4 border-black p-8 rounded-lg">
          <p className="text-gray-700 text-center py-12">Real-time multiplayer quizzes coming soon!</p>
          <div className="text-center">
            <Link href="/quiz/practice">
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-bold">
                Try Solo Practice
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
