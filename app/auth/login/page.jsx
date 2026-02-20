"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 🔥 Firebase imports
import { auth, googleProvider } from "../../lib/firebase";

import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleGoogleLogin = async () => {
  try {
    setLoading(true);
    setError("");

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

   
    const token = await user.getIdToken();

   
    localStorage.setItem("token", token);

    
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      })
    );

    alert("Welcome back to Edzee!");
    router.replace("/dashboard/home"); 
  } catch (err) {
    console.error("Google login error:", err);
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

      {/* Login Card */}
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <div className="border-4 border-black p-10 rounded-lg w-full max-w-md shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Login to Edzee
          </h1>

          {error && (
            <div className="border-2 border-black p-3 mb-4 text-red-700 font-semibold">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition font-semibold disabled:bg-gray-600"
          >
            {loading ? "Signing in..." : "Continue with Google"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            New here?{" "}
            <Link
              href="/auth/signup"
              className="font-bold underline hover:no-underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
