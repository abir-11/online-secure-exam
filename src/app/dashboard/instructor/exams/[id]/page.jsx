"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  CheckCircle, 
  Clock, 
  FileText, 
  ChevronRight, 
  Mail, 
  GraduationCap,
  AlertCircle 
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
        setExam(examData.exam || examData);

        const subRes = await fetch(`/api/exam-attempts/${id}`);
        const subData = await subRes.json();
        setSubmissions(subData.attempts || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="animate-pulse font-medium">Loading Submissions...</p>
    </div>
  );

  if (!exam) return (
    <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-6">
      <div className="text-center bg-emerald-900/20 border border-emerald-800 p-10 rounded-3xl">
        <AlertCircle size={48} className="mx-auto text-rose-500 mb-4" />
        <h2 className="text-white text-xl font-bold">Exam Not Found</h2>
        <p className="text-emerald-100/50 mt-2">The exam might have been deleted or access is denied.</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 p-6 sm:p-10 relative overflow-hidden pt-24">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="bg-emerald-900/30 backdrop-blur-md border border-emerald-800/50 rounded-3xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">
                <GraduationCap size={16} />
                Instructor Dashboard
              </div>
              <h1 className="text-4xl font-black text-white">{exam.title}</h1>
            </div>
            
            <div className="flex gap-4">
              <StatCard 
                icon={<ListNumbers size={18} />} 
                label="Questions" 
                value={exam.questions?.length || 0} 
              />
              <StatCard 
                icon={<Users size={18} />} 
                label="Submissions" 
                value={submissions.length} 
              />
            </div>
          </div>
        </div>

        {/* Submissions Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FileText className="text-emerald-500" />
              {exam.examType === "Theoretical" ? "Student Submissions" : "MCQ Overview"}
            </h2>
          </div>

          {submissions.length === 0 ? (
            <div className="text-center py-20 bg-emerald-900/10 border border-dashed border-emerald-800/50 rounded-3xl">
              <Clock size={40} className="mx-auto text-emerald-800 mb-4" />
              <p className="text-emerald-100/40 font-medium text-lg">No students have submitted yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {submissions.map((s, idx) => (
                <motion.div
                  key={s._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-emerald-900/20 border border-emerald-800/40 rounded-2xl p-5 hover:bg-emerald-900/40 transition-all group shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20 font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-white font-bold text-lg">
                          <Mail size={14} className="text-emerald-500" />
                          {s.studentEmail}
                        </div>
                        <p className="text-emerald-100/40 text-sm mt-1">
                          Submitted on: {new Date(s.createdAt || Date.now()).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Grading Status */}
                      <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border ${
                        s.graded 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}>
                        {s.graded ? <CheckCircle size={14} /> : <Clock size={14} />}
                        {s.graded ? "GRADED" : "PENDING GRADE"}
                      </div>

                      <button className="p-2 bg-emerald-800/50 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-emerald-950 transition-all">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Answers Preview (Theoretical) */}
                  {exam.examType === "Theoretical" && (
                    <div className="mt-4 pt-4 border-t border-emerald-800/30">
                      <p className="text-emerald-400 text-xs font-black uppercase tracking-tighter mb-2">Answer Preview</p>
                      <p className="text-emerald-100/70 text-sm italic line-clamp-2 bg-emerald-950/50 p-3 rounded-lg border border-emerald-800/20">
                        {s.answers?.map((a) => a.answer).join(" | ") || "No answer provided"}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Helper Components
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-emerald-950/50 border border-emerald-800/50 px-5 py-3 rounded-2xl flex items-center gap-4 min-w-[140px]">
      <div className="text-emerald-500">{icon}</div>
      <div>
        <p className="text-emerald-100/30 text-[10px] font-black uppercase tracking-widest">{label}</p>
        <p className="text-white text-xl font-bold leading-none">{value}</p>
      </div>
    </div>
  );
}

function ListNumbers({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
    </svg>
  );
}