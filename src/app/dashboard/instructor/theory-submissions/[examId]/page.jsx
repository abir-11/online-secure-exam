"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  Mail, 
  GraduationCap 
} from "lucide-react";

export default function InstructorExamPage({ params }) {
  const { id } = params;
  const [exam, setExam] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/exams/${id}`);
        const examData = await res.json();
        setExam(examData);

        const subRes = await fetch(`/api/exam-attempts/${id}`);
        const subData = await subRes.json();
        setSubmissions(subData.attempts || []);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-emerald-950 flex items-center justify-center text-emerald-400 animate-pulse font-bold">Loading Stats...</div>;
  if (!exam) return <div className="min-h-screen bg-emerald-950 flex items-center justify-center text-rose-400 font-bold text-xl">Exam Not Found!</div>;

  return (
    <main className="min-h-screen bg-emerald-950 p-6 sm:p-10 pt-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Header */}
        <div className="bg-emerald-900/30 backdrop-blur-md border border-emerald-800/50 rounded-3xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">
                <GraduationCap size={16} /> Instructor Control
              </div>
              <h1 className="text-4xl font-black text-white leading-tight">{exam.title}</h1>
              <p className="text-emerald-100/40 text-sm mt-1">Manage and review all student responses for this exam.</p>
            </div>
            
            <div className="flex gap-4">
              <StatItem icon={<BookOpen size={18}/>} label="Questions" value={exam.questions?.length || 0} />
              <StatItem icon={<Users size={18}/>} label="Submissions" value={submissions.length} />
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
            Student Submissions
          </h2>

          <div className="grid gap-4">
            {submissions.map((s, idx) => (
              <motion.div
                key={s._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-emerald-900/20 border border-emerald-800/40 rounded-2xl p-5 hover:bg-emerald-900/40 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-950 border border-emerald-800 rounded-xl flex items-center justify-center text-emerald-400 font-bold group-hover:border-emerald-500 transition-colors">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-white font-bold text-lg">
                      <Mail size={14} className="text-emerald-500" />
                      {s.studentEmail}
                    </div>
                    <p className="text-emerald-100/30 text-xs mt-1">Attempt ID: {s._id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border flex items-center gap-2 ${
                    s.graded ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  }`}>
                    {s.graded ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {s.graded ? "Graded" : "Pending"}
                  </div>
                  
                  <button className="p-2 bg-emerald-800/50 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-emerald-950 transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatItem({ icon, label, value }) {
  return (
    <div className="bg-emerald-950/60 border border-emerald-800/50 px-5 py-3 rounded-2xl min-w-[140px] text-center">
      <div className="text-emerald-500 mb-1 flex justify-center">{icon}</div>
      <p className="text-emerald-100/30 text-[10px] font-black uppercase tracking-widest">{label}</p>
      <p className="text-white text-xl font-bold">{value}</p>
    </div>
  );
}