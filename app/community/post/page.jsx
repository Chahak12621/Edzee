"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function PostPage() {
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
        <div className="font-semibold text-lg">Edzee Community</div>
        <Link href="/dashboard/home" className="text-white hover:text-gray-300">Dashboard</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Create Post</h1>

        <div className="bg-white border-4 border-black p-8 rounded-lg">
          <p className="text-gray-700 text-center py-12">Create post feature coming soon!</p>
          <div className="text-center">
            <Link href="/dashboard/home">
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-bold">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
