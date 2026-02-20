"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Reset link sent to your email (feature coming soon)");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="w-full bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="font-semibold text-lg">Edzee</div>
        <Link href="/" className="text-white hover:text-gray-300">Back to Home</Link>
      </nav>

      <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-white">
        <div className="bg-white border-4 border-black p-10 rounded-lg w-full max-w-md shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>

          {message && (
            <div className="bg-white border-2 border-black text-black px-4 py-3 rounded mb-4">
              <p className="font-semibold">{message}</p>
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleReset}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-600 font-semibold"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link className="text-black font-bold underline hover:no-underline" href="/auth/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
