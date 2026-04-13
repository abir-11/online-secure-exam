"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Eye,
  BarChart3,
  Trophy,
  TrendingUp,
  TrendingDown,
  ClipboardList,
  Activity,
} from "lucide-react";

export default function InstructorAnalyticsPage() {
  const { data: session } = useSession();

  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const [examPerformance, setExamPerformance] = useState([]);

  useEffect(() => {
    if (!session) return;

    const fetchExams = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/exams");
        const data = await res.json();

        const examList = data.exams || [];
        setExams(examList);

        const performance = [];

        for (const exam of examList) {
          try {
            const resAnalytics = await fetch(
              `/api/instructor/analytics/${exam._id}`,
            );
            const dataAnalytics = await resAnalytics.json();

            if (resAnalytics.ok) {
              const scorePercentage =
                exam.totalMarks && exam.totalMarks > 0
                  ? (
                      (dataAnalytics.averageScore / exam.totalMarks) *
                      100
                    ).toFixed(2)
                  : 0;

              performance.push({
                exam: exam.title,
                score: Number(scorePercentage),
              });
            }
          } catch (err) {
            console.error("Performance fetch error:", err);
          }
        }

        setExamPerformance(performance);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [session]);

  const fetchAnalytics = async (examId) => {
    if (!examId) return;

    setSelectedExamId(examId);
    setAnalytics(null);
    setAnalyticsLoading(true);

    try {
      const res = await fetch(`/api/instructor/analytics/${examId}`);
      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Analytics Error",
          text: data.message || "Failed to fetch analytics",
        });
        setAnalytics(null);
      } else {
        setAnalytics(data);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Failed to fetch analytics",
      });
      setAnalytics(null);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-emerald-400 text-lg font-semibold">
        Loading Exams...
      </div>
    );

  return (
    <main className="bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-teal-500/20 blur-[100px] rounded-full"></div>

      <div className="p-8 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="text-emerald-400" size={28} />
          <h1 className="text-3xl font-bold text-white">
            Instructor Analytics
          </h1>
        </div>

        {/* Overall Chart */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg mb-10 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="text-emerald-400" size={20} />
            Overall Exam Score Rate (%)
          </h2>

          {examPerformance.length === 0 ? (
            <p className="text-slate-400">No exam analytics available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                layout="vertical"
                data={examPerformance}
                margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(val) => `${val}%`}
                  stroke="#94a3b8"
                />
                <YAxis
                  type="category"
                  dataKey="exam"
                  tick={{ fill: "#cbd5f5", fontSize: 14 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid #334155",
                    color: "#fff",
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="score" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Exams Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-emerald-500 transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={18} className="text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">
                  {exam.title}
                </h2>
              </div>

              <p className="text-slate-300 text-sm">
                Type:{" "}
                <span className="font-medium">
                  {exam.type?.toUpperCase() || "-"}
                </span>
              </p>

              <p className="text-slate-300 text-sm">
                Duration:{" "}
                <span className="font-medium">
                  {exam.duration || "-"} minutes
                </span>
              </p>

              <button
                onClick={() => fetchAnalytics(exam._id)}
                className="mt-5 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition"
              >
                <Eye size={16} />
                View Analytics
              </button>
            </div>
          ))}
        </div>

        {/* Analytics Loading */}
        {analyticsLoading && (
          <div className="text-center text-slate-400">Loading analytics...</div>
        )}

        {/* Stats */}
        {analytics && !analyticsLoading && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 flex items-center gap-4">
                <TrendingUp className="text-emerald-400" size={30} />
                <div>
                  <p className="text-slate-400 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-white">
                    {analytics.averageScore}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 flex items-center gap-4">
                <Trophy className="text-yellow-400" size={30} />
                <div>
                  <p className="text-slate-400 text-sm">Highest Score</p>
                  <p className="text-2xl font-bold text-white">
                    {analytics.highestScore}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 flex items-center gap-4">
                <TrendingDown className="text-red-400" size={30} />
                <div>
                  <p className="text-slate-400 text-sm">Lowest Score</p>
                  <p className="text-2xl font-bold text-white">
                    {analytics.lowestScore}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
