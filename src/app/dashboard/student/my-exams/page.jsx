"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Lock, 
  PlayCircle,
  Trophy,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

export default function MyExamsPage() {
  const [exams, setExams] = useState([]);
  const [submittedExams, setSubmittedExams] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/student/exams");
        const data = await res.json();

        const sortedExams = (data.exams || []).sort(
          (a, b) => new Date(b.startTime) - new Date(a.startTime),
        );
        setExams(sortedExams);

        const submittedRes = await fetch("/api/student/exams/submitted");
        if (submittedRes.ok) {
          const submittedData = await submittedRes.json();
          setSubmittedExams(new Set(submittedData.examIds || []));
        }
      } catch (err) {
        console.error("Failed to load exams or submissions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExams();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="font-black tracking-widest text-xs uppercase animate-pulse">Syncing Your Exams...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              My <span className="text-emerald-500">Exams</span>
            </h1>
            <p className="text-emerald-500/60 text-xs font-bold uppercase tracking-widest mt-1">Student Assessment Dashboard</p>
          </div>
          <ShieldCheck className="text-emerald-500 opacity-20" size={48} />
        </div>

        {/* 🌟 Static Demo Exam Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border border-emerald-500/30 p-6 rounded-[2.5rem] mb-12 flex flex-col sm:flex-row justify-between items-center backdrop-blur-md"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
              <Trophy className="text-emerald-950" size={28} />
            </div>
            <div>
              <h2 className="font-black text-white text-xl uppercase tracking-tight">Demo Practice</h2>
              <p className="text-emerald-400/70 text-sm font-medium">Warm up with static practice questions</p>
            </div>
          </div>
          <Link
            href="/dashboard/student/demo-exam"
            className="mt-4 sm:mt-0 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
          >
            Start Demo
          </Link>
        </motion.div>

        {/* 📋 Official Exam List */}
        {exams.length === 0 ? (
          <div className="p-12 bg-emerald-900/10 border-2 border-dashed border-emerald-800/50 rounded-[2.5rem] text-center">
            <BookOpen className="w-12 h-12 text-emerald-800 mx-auto mb-4" />
            <p className="text-emerald-600 font-bold uppercase tracking-widest text-sm">No official exams published yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {exams.map((exam, index) => {
              const now = new Date();
              const start = new Date(exam.startTime);
              const end = new Date(exam.endTime);
              const canAttend = now >= start && now <= end;
              const hasSubmitted = submittedExams.has(exam._id);

              return (
                <motion.div
                  key={exam._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-emerald-950/40 border-l-8 rounded-[2rem] p-6 flex flex-col sm:flex-row justify-between items-center transition-all group backdrop-blur-sm
                    ${hasSubmitted ? 'border-gray-600 bg-gray-900/20' : canAttend ? 'border-emerald-500 bg-emerald-900/20' : 'border-yellow-600 bg-yellow-900/10'}`}
                >
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <h2 className="font-black text-white text-lg group-hover:text-emerald-400 transition-colors">
                      {exam.title}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-100/50 uppercase tracking-tighter">
                        <Calendar size={14} className="text-emerald-500" />
                        {start.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-100/50 uppercase tracking-tighter">
                        <Clock size={14} className="text-emerald-500" />
                        {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 shrink-0">
                    {hasSubmitted ? (
                      <div className="flex items-center gap-2 bg-gray-800 text-gray-400 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest border border-gray-700">
                        <CheckCircle2 size={16} /> Attended
                      </div>
                    ) : canAttend ? (
                      <Link
                        href={`/dashboard/student/exam/${exam._id}`}
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20"
                      >
                        <PlayCircle size={16} /> Attend Now
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2 bg-yellow-900/30 text-yellow-500 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest border border-yellow-900/50">
                        <Lock size={16} /> Not Available
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}