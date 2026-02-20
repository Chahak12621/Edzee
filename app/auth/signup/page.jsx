"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";

import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      await signInWithPopup(auth, googleProvider);

      alert("Welcome to Edzee!");
      router.push("/dashboard/home");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="w-full bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="font-semibold text-lg">Edzee</div>
        <Link href="/" className="hover:text-gray-300">
          Back to Home
        </Link>
      </nav>

      {/* Signup Card */}
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <div className="border-4 border-black p-10 rounded-lg w-full max-w-md shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Sign up for Edzee
          </h1>

          {error && (
            <div className="border-2 border-black p-3 mb-4 text-red-700 font-semibold">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition font-semibold disabled:bg-gray-600"
          >
            {loading ? "Signing in..." : "Continue with Google"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
