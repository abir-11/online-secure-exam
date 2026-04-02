"use client";

import { useEffect, useState } from "react";
import { 
  Trophy, 
  Calendar, 
  ChevronRight, 
  Loader2, 
  Target, 
  LayoutDashboard,
  Clock,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function StudentResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("/api/results");
        const data = await res.json();
        setResults(data || []);
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
      <p className="font-black tracking-widest text-xs uppercase animate-pulse">Fetching Academic Records...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-24 px-6 relative overflow-hidden">
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
            <LayoutDashboard size={16} /> Performance Tracking
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter"
          >
            My <span className="text-emerald-500">Results.</span>
          </motion.h1>
          <p className="text-emerald-100/40 font-medium text-lg mt-2">Review your scores and exam submissions.</p>
        </div>

        {results.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-20 bg-emerald-900/10 border-2 border-dashed border-emerald-800/50 rounded-[3rem] text-center"
          >
            <Target className="w-16 h-16 text-emerald-800 mx-auto mb-4" />
            <p className="text-emerald-600 font-black uppercase tracking-widest text-sm">No results found yet</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {results.map((r, index) => (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-emerald-900/20 border border-emerald-500/10 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-xl hover:bg-emerald-900/40 hover:border-emerald-500/30 transition-all overflow-hidden shadow-xl"
              >
                {/* Visual Accent */}
                <div className="absolute left-0 top-0 h-full w-1.5 bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                        Exam Entry
                      </span>
                      <div className="flex items-center gap-1.5 text-emerald-100/30 text-[10px] font-black uppercase tracking-widest">
                        <Clock size={12} /> {new Date(r.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      ID: <span className="text-emerald-500/60 font-mono text-xl">{r.examId}</span>
                    </h2>

                    <div className="flex items-center gap-4 text-emerald-100/40 text-xs font-bold">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-emerald-500" /> {new Date(r.submittedAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  {/* Score Display */}
                  <div className="flex items-center gap-8 bg-emerald-950/60 p-6 rounded-[2rem] border border-emerald-500/10 min-w-[200px] justify-center group-hover:border-emerald-500/30 transition-all">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest mb-1">Total Score</p>
                      <p className="text-3xl font-black text-white">
                        {r.score}
                        <span className="text-emerald-500/30 text-lg ml-1">/ {r.totalMarks}</span>
                      </p>
                    </div>
                    
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-emerald-950 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                      <Trophy size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Decoration */}
      <div className="mt-20 flex justify-center opacity-20">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">
           Academic Excellence <Target size={12} /> Secured
        </div>
      </div>
    </main>
  );
}