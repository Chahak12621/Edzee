"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LearningPlannerPage() {
  const router = useRouter();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("beginner");
  const [duration, setDuration] = useState(7);

  useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Current Token:", token); 
  if (!token) {
    console.log("No token found, redirecting...");
    router.push("/auth/login");
    return; 
  }
  }, []);

  const generatePlan = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic , I'll build a nice strategy for you.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/learning-path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level, duration: parseInt(duration) })
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("API Error:", data);
        setPlan(`Error: ${data.error || "Failed to generate plan"}`);
        return;
      }
      console.log("API Response:", data);
      const learningPath = data.path || data.plan;
      
      // Parse if it's a string
      let parsedPlan = learningPath;
      if (typeof learningPath === 'string') {
        try {
          parsedPlan = JSON.parse(learningPath);
        } catch (e) {
          parsedPlan = learningPath;
        }
      }
      
      setPlan(parsedPlan);
    } catch (err) {
      console.error("Failed to generate plan:", err);
      setPlan(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="w-full bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="font-semibold text-lg">Prep Strategy Maker</div>
        <Link href="/dashboard/home" className="text-white hover:text-gray-300">Dashboard</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Learning Strategy and Resources</h1>

        <div className="bg-white border-4 border-black p-8 rounded-lg">
          <div className="mb-6">
            <label className="block font-bold mb-2">Enter Topic or Skill</label>
            <input
              type="text"
              placeholder="e.g., Machine Learning, Spanish Grammar, Piano Basics..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 border-2 border-black rounded-lg bg-white text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-bold mb-2">Difficulty Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 border-2 border-black rounded-lg bg-white text-black"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2">Duration (Days)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 border-2 border-black rounded-lg bg-white text-black"
              />
            </div>
          </div>

          <button
            onClick={generatePlan}
            disabled={loading}
            className="w-full bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-600 font-bold text-lg mb-8"
          >
            {loading ? "Generating Plan..." : "Generate Learning Plan"}
          </button>

          {plan && (
            <div className="bg-linear-to-b from-blue-50 to-white border-2 border-black p-8 rounded-lg">
              {typeof plan === 'string' && plan.startsWith('Error') ? (
                <div className="bg-red-100 border-2 border-red-500 p-4 rounded-lg">
                  <p className="text-red-700 font-bold">{plan}</p>
                </div>
              ) : typeof plan === 'object' && plan.title ? (
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-black">{plan.title}</h2>
                  <div className="mb-8">
                    {plan.days && plan.days.map((dayPlan) => (
                      <div key={dayPlan.day} className="bg-white border-l-4 border-blue-500 p-4 mb-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-black mb-2">{dayPlan.title}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-black mb-2">📋 Tasks:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {dayPlan.tasks && dayPlan.tasks.map((task, idx) => (
                                <li key={idx} className="text-gray-700">{task}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-black mb-2">📚 Resources:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {dayPlan.resources && dayPlan.resources.map((resource, idx) => (
                                <li key={idx} className="text-gray-700">{resource}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-2">⏱️ Duration: {dayPlan.duration} minutes</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-black">Your Plan</h2>
                  <pre className="bg-white p-4 rounded border border-gray-300 overflow-auto text-sm text-gray-700">
                    {typeof plan === 'string' ? plan : JSON.stringify(plan, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
