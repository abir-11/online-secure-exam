"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Trophy, 
  Calendar, 
  ChevronRight, 
  Search, 
  Loader2, 
  Target, 
  FileCheck,
  LayoutDashboard,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

export default function StudentResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("/api/student/result");
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="font-black tracking-widest text-xs uppercase animate-pulse">Syncing Academic Records...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.4em] mb-4"
          >
            <LayoutDashboard size={16} /> Performance Analytics
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter"
          >
            Exam <span className="text-emerald-500 text-shadow-glow">Results.</span>
          </motion.h1>
          <p className="text-emerald-100/40 font-medium text-lg mt-2">Track your growth and certification milestones.</p>
        </div>

        {results.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-20 bg-emerald-900/10 border-2 border-dashed border-emerald-800/50 rounded-[3rem] text-center"
          >
            <Target className="w-16 h-16 text-emerald-800 mx-auto mb-4" />
            <p className="text-emerald-600 font-black uppercase tracking-widest text-sm">You have no results yet</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {results.map((r, index) => (
              <motion.div
                key={r.examId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-emerald-900/20 border border-emerald-500/10 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-xl hover:bg-emerald-900/40 hover:border-emerald-500/30 transition-all cursor-pointer overflow-hidden shadow-xl"
                onClick={() => router.push(`/dashboard/student/result/${r.examId}`)}
              >
                {/* Background Accent */}
                <div className="absolute right-0 top-0 h-full w-1 bg-emerald-500 group-hover:w-2 transition-all opacity-20"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-500/20">
                        {r.examCategory || r.examType?.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1.5 text-emerald-100/30 text-[10px] font-black uppercase tracking-widest">
                        <Clock size={12} /> {new Date(r.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-tight">
                      {r.title}
                    </h2>

                    <div className="flex items-center gap-4 text-emerald-100/40 text-xs font-bold italic">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} /> {new Date(r.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 md:gap-12 bg-emerald-950/40 p-6 rounded-[2rem] border border-emerald-500/5 group-hover:border-emerald-500/20 transition-all">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest mb-1">Status</p>
                      <div className={`text-lg font-black uppercase ${
                        r.status === "pending" ? "text-yellow-500 animate-pulse" : "text-emerald-400"
                      }`}>
                        {r.status === "pending" ? "Pending" : "Graded"}
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest mb-1">Score</p>
                      <p className="text-2xl font-black text-white">
                        {r.status === "pending" ? "--" : r.marksObtained}
                        <span className="text-emerald-100/20 text-sm ml-1">/ {r.totalMarks}</span>
                      </p>
                    </div>

                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-emerald-950 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-emerald-500/20">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}