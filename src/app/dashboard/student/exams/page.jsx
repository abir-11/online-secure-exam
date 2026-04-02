"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ArrowRightCircle,
  Timer,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

export default function StudentExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();

        const now = new Date();
        const visibleExams = data.filter(
          (e) =>
            e.published &&
            new Date(e.endTime) > now
        );

        setExams(visibleExams);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
    const interval = setInterval(fetchExams, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="font-black tracking-widest text-xs uppercase animate-pulse">Syncing Exams...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 pb-20 pt-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.3em] mb-2">
              <ShieldCheck size={16} /> Secured Assessment Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Available <span className="text-emerald-500 text-shadow-glow">Exams</span>
            </h1>
          </div>
          <p className="text-emerald-500/60 font-bold text-sm bg-emerald-900/30 px-4 py-2 rounded-xl border border-emerald-800/50">
            Total Active: {exams.length}
          </p>
        </div>

        {exams.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-900/20 border-2 border-dashed border-emerald-800/50 rounded-[2.5rem] p-20 text-center"
          >
            <BookOpen className="w-16 h-16 text-emerald-800 mx-auto mb-4" />
            <p className="text-emerald-600 font-bold text-lg uppercase tracking-widest">No exams available currently.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam, index) => {
              const now = new Date();
              const start = new Date(exam.startTime);
              const end = new Date(exam.endTime);
              const isOngoing = now >= start && now <= end;
              const isUpcoming = now < start;

              return (
                <motion.div
                  key={exam._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-emerald-900/20 border border-emerald-800/50 rounded-[2.5rem] p-8 hover:border-emerald-500/40 transition-all group relative overflow-hidden backdrop-blur-sm"
                >
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6">
                    {isOngoing ? (
                      <span className="flex items-center gap-2 bg-emerald-500 text-emerald-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg shadow-emerald-500/20">
                        <span className="w-2 h-2 bg-emerald-950 rounded-full animate-ping"></span> Ongoing
                      </span>
                    ) : (
                      <span className="bg-emerald-900/50 text-emerald-500 border border-emerald-700/50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                        <Timer className="text-emerald-400" size={24} />
                      </div>
                      <h2 className="text-2xl font-black text-white leading-tight group-hover:text-emerald-400 transition-colors">
                        {exam.title}
                      </h2>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-emerald-100/60 font-bold text-sm uppercase tracking-tighter">
                        <Clock size={16} className="text-emerald-500" />
                        Duration: <span className="text-emerald-100">{exam.duration} Minutes</span>
                      </div>
                      <div className="flex items-center gap-3 text-emerald-100/60 font-bold text-sm uppercase tracking-tighter">
                        <Calendar size={16} className="text-emerald-500" />
                        {isUpcoming ? "Starts:" : "Started:"} <span className="text-emerald-100">{start.toLocaleDateString()} at {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      {isOngoing ? (
                        <Link
                          href={`/student/exam-attempt?examId=${exam._id}`}
                          className="flex items-center justify-between bg-emerald-500 hover:bg-emerald-400 text-emerald-950 p-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-500/10"
                        >
                          Join Session <ArrowRightCircle size={20} />
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="w-full flex items-center justify-center gap-2 bg-emerald-900/40 text-emerald-700 p-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-emerald-800/50 cursor-not-allowed"
                        >
                          Starts Soon <ChevronRight size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}