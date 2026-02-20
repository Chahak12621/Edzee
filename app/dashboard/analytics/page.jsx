"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { FiTrendingUp, FiBook, FiTarget, FiClock, FiBarChart, FiPieChart } from "react-icons/fi";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "../../lib/firebase";
export default function AnalyticsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    } else if (user) {
      fetchAnalytics();
    }
  }, [user, loading, router]);

 const fetchAnalytics = async () => {
  try {
    const q = query(
      collection(db, "quizAttempts"),
      where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);
    const attempts = snapshot.docs.map(doc => doc.data());

    const totalAttempts = attempts.length;
    const completedQuizzes = attempts.length;

    const averageScore =
      attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts || 0;

    // Subject Stats
    const subjectMap = {};
    attempts.forEach(a => {
      if (!subjectMap[a.subject]) {
        subjectMap[a.subject] = { count: 0, total: 0 };
      }
      subjectMap[a.subject].count++;
      subjectMap[a.subject].total += a.score;
    });

    const subjectStats = Object.keys(subjectMap).map(key => ({
      _id: key,
      count: subjectMap[key].count,
      avgScore: Math.round(subjectMap[key].total / subjectMap[key].count)
    }));

    // Difficulty Stats
    const difficultyMap = {};
    attempts.forEach(a => {
      if (!difficultyMap[a.difficulty]) {
        difficultyMap[a.difficulty] = { count: 0, total: 0 };
      }
      difficultyMap[a.difficulty].count++;
      difficultyMap[a.difficulty].total += a.score;
    });

    const difficultyStats = Object.keys(difficultyMap).map(key => ({
      _id: key,
      count: difficultyMap[key].count,
      avgScore: Math.round(difficultyMap[key].total / difficultyMap[key].count)
    }));

    const recentQuizzes = attempts
      .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
      .slice(0, 5)
      .map(a => ({
        title: a.title,
        subject: a.subject,
        score: a.score,
        date: new Date(a.createdAt.seconds * 1000)
      }));

    setAnalytics({
      totalQuizzes: new Set(attempts.map(a => a.quizId)).size,
      completedQuizzes,
      totalAttempts,
      averageScore: Math.round(averageScore),
      subjectStats,
      difficultyStats,
      recentQuizzes
    });

  } catch (err) {
    console.error(err);
  }
  setLoadingAnalytics(false);
};
  if (loading || loadingAnalytics) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!user || !analytics) return null;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-black text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Edzee</h1>
          <button
            onClick={() => router.push('/dashboard/home')}
            className="px-4 py-2 bg-white text-black rounded-lg border-2 border-black hover:bg-gray-200 transition font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border-4 border-black p-6 rounded-lg text-center shadow-lg">
            <FiBook className="text-4xl mx-auto mb-3" />
            <div className="text-3xl font-bold">{analytics.totalQuizzes}</div>
            <div className="text-sm text-gray-600">Total Quizzes</div>
          </div>
          <div className="bg-white border-4 border-black p-6 rounded-lg text-center shadow-lg">
            <FiTarget className="text-4xl mx-auto mb-3" />
            <div className="text-3xl font-bold">{analytics.completedQuizzes}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white border-4 border-black p-6 rounded-lg text-center shadow-lg">
            <FiTrendingUp className="text-4xl mx-auto mb-3" />
            <div className="text-3xl font-bold">{analytics.averageScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
          <div className="bg-white border-4 border-black p-6 rounded-lg text-center shadow-lg">
            <FiClock className="text-4xl mx-auto mb-3" />
            <div className="text-3xl font-bold">{analytics.totalAttempts}</div>
            <div className="text-sm text-gray-600">Total Attempts</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Subject Performance */}
          <div className="bg-white border-4 border-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FiPieChart />
              Subject Performance
            </h2>
            <div className="space-y-4">
              {analytics.subjectStats.map(stat => (
                <div key={stat._id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium capitalize">{stat._id}</span>
                      <span className="text-sm text-gray-600">{stat.avgScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-black h-2 rounded-full"
                        style={{ width: `${stat.avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-gray-600">
                    {stat.count} quizzes
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Performance */}
          <div className="bg-white border-4 border-black p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FiBarChart />
              Difficulty Performance
            </h2>
            <div className="space-y-4">
              {analytics.difficultyStats.map(stat => (
                <div key={stat._id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium capitalize">{stat._id}</span>
                      <span className="text-sm text-gray-600">{stat.avgScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-black h-2 rounded-full"
                        style={{ width: `${stat.avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-gray-600">
                    {stat.count} quizzes
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white border-4 border-black p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Quiz Attempts</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left py-3 px-4 font-bold">Quiz Title</th>
                  <th className="text-left py-3 px-4 font-bold">Subject</th>
                  <th className="text-left py-3 px-4 font-bold">Score</th>
                  <th className="text-left py-3 px-4 font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentQuizzes.map((quiz, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-4">{quiz.title}</td>
                    <td className="py-3 px-4 capitalize">{quiz.subject}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        quiz.score >= 80 ? 'bg-green-100 text-green-800' :
                        quiz.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quiz.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(quiz.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mt-8 bg-white border-4 border-black p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
              <h3 className="font-bold mb-2">Strengths</h3>
              <ul className="text-sm space-y-1">
                <li>• Strong performance in Mathematics</li>
                <li>• Good understanding of basic concepts</li>
                <li>• Consistent improvement over time</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
              <h3 className="font-bold mb-2">Areas for Improvement</h3>
              <ul className="text-sm space-y-1">
                <li>• Practice more hard-level questions</li>
                <li>• Focus on History topics</li>
                <li>• Time management in quizzes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
