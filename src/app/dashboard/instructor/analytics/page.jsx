"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

import {
  Eye,
  BarChart3,
  Trophy,
  TrendingUp,
  TrendingDown,
  ClipboardList,
  Activity,
  Loader2,
} from "lucide-react";

export default function InstructorAnalyticsPage() {
  const { data: session } = useSession();

  const [exams, setExams] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [examPerformance, setExamPerformance] = useState([]);

  const swalTheme = {
    background: "#022c22",
    color: "#fff",
    confirmButtonColor: "#10B981",
  };

  useEffect(() => {
    if (!session) return;

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        const examList = data.exams || [];
        setExams(examList);

        // Fetch performance for all exams in parallel
        const performancePromises = examList.map(async (exam) => {
          try {
            const resAnalytic = await fetch(`/api/instructor/analytics/${exam._id}`);
            const dataAnalytic = await resAnalytic.json();
            if (resAnalytic.ok) {
              const scorePercentage = exam.totalMarks > 0
                ? ((dataAnalytic.averageScore / exam.totalMarks) * 100).toFixed(1)
                : 0;
              return { exam: exam.title, score: Number(scorePercentage) };
            }
          } catch (err) {
            return null;
          }
        });

        const results = await Promise.all(performancePromises);
        setExamPerformance(results.filter(r => r !== null));
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [session]);

  const fetchAnalytics = async (examId) => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`/api/instructor/analytics/${examId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch analytics");
      setAnalytics(data);
      
      // Scroll to analytics section
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message, ...swalTheme });
    } finally {
      setAnalyticsLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="text-xl font-medium animate-pulse">Gathering Analytics...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Instructor <span className="text-emerald-400">Analytics</span>
            </h1>
            <p className="text-emerald-100/60 mt-1">Track student performance and exam metrics.</p>
          </div>
          <div className="bg-emerald-900/40 backdrop-blur-md border border-emerald-700/50 p-4 rounded-2xl flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-emerald-300/70 uppercase font-bold tracking-wider">Total Exams</p>
              <p className="text-2xl font-black text-white">{exams.length}</p>
            </div>
            <Activity className="text-emerald-400 w-8 h-8" />
          </div>
        </header>

        {/* Overall Performance Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-900/20 backdrop-blur-xl border border-emerald-700/30 p-6 rounded-3xl mb-12"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-400" />
            Average Success Rate per Exam (%)
          </h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={examPerformance} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#065f46" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#a7f3d0" hide />
                <YAxis dataKey="exam" type="category" stroke="#a7f3d0" width={100} fontSize={12} />
                <Tooltip 
                  cursor={{fill: 'rgba(16, 185, 129, 0.1)'}}
                  contentStyle={{ backgroundColor: '#064e3b', border: '1px solid #059669', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {examPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 50 ? '#10b981' : '#f43f5e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {exams.map((exam, idx) => (
            <motion.div
              key={exam._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-emerald-900/30 border border-emerald-700/40 p-6 rounded-2xl hover:border-emerald-400/50 transition-all group shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-800/50 rounded-xl">
                  <ClipboardList className="text-emerald-400" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-800 text-emerald-300 px-2 py-1 rounded">
                  {exam.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{exam.title}</h3>
              <div className="flex items-center gap-4 text-emerald-100/60 text-sm mb-6">
                <span className="flex items-center gap-1"><ClockIcon size={14}/> {exam.duration}m</span>
                <span className="flex items-center gap-1"><Trophy size={14}/> {exam.totalMarks} Marks</span>
              </div>
              <button
                onClick={() => fetchAnalytics(exam._id)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Eye size={18} /> View Detailed Analytics
              </button>
            </motion.div>
          ))}
        </div>

        {/* Detailed Analytics Section */}
        {analyticsLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-emerald-400" />
          </div>
        )}

        {analytics && !analyticsLoading && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 pb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={<TrendingUp className="text-emerald-400"/>} label="Average Score" value={analytics.averageScore} color="emerald" />
              <StatCard icon={<Trophy className="text-yellow-400"/>} label="Highest Score" value={analytics.highestScore} color="yellow" />
              <StatCard icon={<TrendingDown className="text-rose-400"/>} label="Lowest Score" value={analytics.lowestScore} color="rose" />
            </div>

            {/* Question Accuracy */}
            <div className="bg-emerald-900/30 border border-emerald-700/40 p-6 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="text-emerald-400" />
                Question-wise Accuracy
              </h2>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.questionAccuracy}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#065f46" vertical={false} />
                    <XAxis dataKey="question" stroke="#a7f3d0" fontSize={10} />
                    <YAxis stroke="#a7f3d0" fontSize={12} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#064e3b', border: '1px solid #059669', borderRadius: '12px' }}
                    />
                    <Bar dataKey="accuracy" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

// Helper Components
function StatCard({ icon, label, value, color }) {
  return (
    <div className={`bg-emerald-900/40 backdrop-blur-md border border-emerald-700/50 p-6 rounded-2xl flex items-center gap-5 shadow-xl`}>
      <div className={`p-4 bg-emerald-800/50 rounded-2xl`}>{icon}</div>
      <div>
        <p className="text-emerald-100/60 text-sm font-medium">{label}</p>
        <p className="text-3xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}

function ClockIcon({size}) {
  return <Activity size={size} />;
}