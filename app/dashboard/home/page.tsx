"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function DashboardHome() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) router.push("/auth/login");

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const cards = [
    { title: "Generate Quiz", href: "/quiz/generate", desc: "Create quizzes from PDF or text" },
    { title: "AI Subject Chat", href: "/community/chat", desc: "Chat with AI tutors subject-wise" },
    { title: "Strategy Builder", href: "/learningplanner", desc: "Personalised learning strategy" },
    { title: "Comprehension", href: "/quiz/comprehension", desc: "Reading & understanding practice" },
    { title: "Analytics", href: "/dashboard/analytics", desc: "Track your quiz performance" },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="bg-black text-white px-8 py-4 flex justify-between">
        <h1 className="font-bold text-xl">Edzee</h1>
        <button onClick={logout} className="font-semibold hover:text-gray-300">
          Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h2 className="text-4xl font-bold mb-10">Welcome, {user.displayName}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Link key={i} href={c.href}>
              <div className="border-4 border-black p-6 rounded-xl hover:shadow-xl transition">
                <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                <p className="text-gray-700 text-sm">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}