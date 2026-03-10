"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye } from "lucide-react";

export default function InstructorAnalyticsPage() {
  const { data: session } = useSession();
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Fetch all exams for this instructor
  useEffect(() => {
    if (!session) return;

    const fetchExams = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [session]);

  // Fetch analytics for selected exam
  const fetchAnalytics = async (examId) => {
    if (!examId) return;

    setSelectedExamId(examId);
    setAnalytics(null);
    setAnalyticsLoading(true);

    try {
      // Force string format for safety
      const res = await fetch(`/api/instructor/analytics/${examId.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        console.error("Analytics fetch failed:", data);
        alert(data.message || "Failed to fetch analytics");
        setAnalytics(null);
      } else {
        setAnalytics(data);
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
      alert("Failed to fetch analytics");
      setAnalytics(null);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading exams...</p>;

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Instructor Analytics
      </h1>

      {/* Exam List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
          >
            <h2 className="text-lg font-semibold mb-3">{exam.title}</h2>
            <p>Type: {exam.type?.toUpperCase() || "-"}</p>
            <p>Duration: {exam.duration || "-"} minutes</p>
            <button
              className="mt-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md"
              onClick={() => fetchAnalytics(exam._id)}
            >
              <Eye size={16} />
              View Analytics
            </button>
          </div>
        ))}
      </div>

      {/* Analytics */}
      {analyticsLoading && <p>Loading analytics...</p>}

      {analytics && !analyticsLoading && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Exam Analytics</h2>

          <p>Average Score: {analytics.averageScore}</p>
          <p>Highest Score: {analytics.highestScore}</p>
          <p>Lowest Score: {analytics.lowestScore}</p>
          <p>Pass Count: {analytics.passCount}</p>
          <p>Fail Count: {analytics.failCount}</p>

          <h3 className="text-xl font-semibold mt-6 mb-2">
            Question-wise Accuracy
          </h3>

          {analytics.questionAccuracy.length === 0 ? (
            <p>No questions or submissions available for this exam.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.questionAccuracy}>
                <XAxis
                  dataKey="question"
                  tick={{ fontSize: 12 }}
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </main>
  );
}
