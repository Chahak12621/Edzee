"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/user/profile", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      setProfile(data.profile || {});
      setFormData(data.profile || {});
    } catch (err) {
      console.error("Failed to load profile:", err);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setProfile(user);
      setFormData(user);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      setProfile(formData);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to save profile");
    }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><p>Loading...</p></div>;

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="w-full bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="font-semibold text-lg">Edzee Profile</div>
        <Link href="/dashboard/home" className="text-white hover:text-gray-300">Dashboard</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Your Profile</h1>

        <div className="bg-white border-4 border-black p-8 rounded-lg">
          {!editMode ? (
            <div>
              <div className="mb-6">
                <p className="text-sm text-gray-700 font-semibold">Name</p>
                <p className="text-2xl font-bold">{profile?.name || "Not set"}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-700 font-semibold">Email</p>
                <p className="text-lg">{profile?.email || "Not set"}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-700 font-semibold">Bio</p>
                <p className="text-lg">{profile?.bio || "No bio added"}</p>
              </div>

              <button
                onClick={() => setEditMode(true)}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-bold"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block font-bold mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border-2 border-black rounded-lg bg-white text-black"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border-2 border-black rounded-lg bg-white text-black"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Bio</label>
                <textarea
                  value={formData.bio || ""}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-3 border-2 border-black rounded-lg bg-white text-black min-h-32"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-bold"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-3 border-2 border-black rounded-lg hover:bg-gray-100 transition font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
