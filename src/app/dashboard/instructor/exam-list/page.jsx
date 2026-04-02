"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { motion, AnimatePresence } from "framer-motion";

import {
  FileText,
  Clock,
  ListChecks,
  BookOpen,
  Users,
  Calendar,
  Eye,
  Send,
  ExternalLink,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function ExamListPage() {
  const { data: session } = useSession();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(false);

  const swalTheme = {
    background: "#022c22",
    color: "#fff",
    confirmButtonColor: "#10B981",
    cancelButtonColor: "#ef4444",
  };

  useEffect(() => {
    if (!session) return;
    async function fetchExams() {
      setLoading(true);
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch exams", ...swalTheme });
      } finally {
        setLoading(false);
      }
    }
    fetchExams();
  }, [session]);

  const handlePublish = async (examId) => {
    const result = await Swal.fire({
      title: "Publish this exam?",
      text: "Students will be notified and MCQs cannot be edited after publishing.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, publish it!",
      ...swalTheme
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch("/api/exams/publish", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId }),
      });
      const data = await res.json();

      Swal.fire({
        icon: res.ok ? "success" : "error",
        title: res.ok ? "Published! 🎉" : "Error",
        text: data.message,
        ...swalTheme
      });

      if (res.ok) {
        setExams((prev) => prev.map((e) => e._id === examId ? { ...e, published: true, status: "published" } : e));
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed", text: "Failed to publish exam", ...swalTheme });
    }
  };

  const handleViewQuestions = async (examId) => {
    if (selectedExam?._id === examId) {
      setSelectedExam(null);
      return;
    }
    setQuestionLoading(true);
    try {
      const res = await fetch(`/api/exams/${examId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load");
      setSelectedExam(data.exam || data);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Error loading questions", ...swalTheme });
    } finally {
      setQuestionLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="animate-pulse font-medium">Fetching Exams...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 p-6 sm:p-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-5%] right-[-5%] w-[35rem] h-[35rem] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            Exam <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">Management</span>
          </h1>
          <p className="text-emerald-100/60 font-medium">Create, publish, and monitor your assessments.</p>
        </header>

        {exams.length === 0 ? (
          <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-3xl p-20 text-center">
            <AlertCircle size={48} className="mx-auto text-emerald-700 mb-4" />
            <p className="text-emerald-100/40 text-lg">No exams found in your database.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {exams.map((exam, idx) => {
              const calculatedTotalMarks = exam.totalMarks ?? (exam.questions?.reduce((sum, q) => sum + (q.marks || 1), 0) || "-");
              const isSelected = selectedExam?._id === exam._id;

              return (
                <motion.div
                  key={exam._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-emerald-900/30 backdrop-blur-md border border-emerald-800/40 rounded-3xl p-6 hover:border-emerald-500/40 transition-all flex flex-col shadow-xl"
                >
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${exam.published ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`}>
                      {exam.published ? <CheckCircle size={12}/> : <Clock size={12}/>}
                      {exam.published ? "Published" : "Draft"}
                    </div>
                    <span className="text-emerald-100/30 text-[10px] font-mono">ID: {exam._id.slice(-6)}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-4 line-clamp-1">{exam.title || "Untitled Exam"}</h2>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <InfoItem icon={<FileText size={14}/>} label="Type" value={exam.type?.toUpperCase()} />
                    <InfoItem icon={<Clock size={14}/>} label="Time" value={`${exam.duration || 0}m`} />
                    <InfoItem icon={<ListChecks size={14}/>} label="Questions" value={exam.questionsCount || 0} />
                    <InfoItem icon={<BookOpen size={14}/>} label="Total Marks" value={calculatedTotalMarks} />
                  </div>

                  <div className="space-y-2 mb-6 border-t border-emerald-800/50 pt-4">
                    <div className="flex items-center gap-2 text-xs text-emerald-100/60">
                      <Users size={14} className="text-emerald-400"/>
                      <span className="font-medium truncate">{exam.batchNames?.join(", ") || "No batches"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-100/60">
                      <Calendar size={14} className="text-emerald-400"/>
                      <span>{exam.startTime ? new Date(exam.startTime).toLocaleDateString() : "No Date"}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    <button
                      onClick={() => handleViewQuestions(exam._id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${isSelected ? "bg-emerald-400 text-emerald-950" : "bg-emerald-800 text-emerald-100 hover:bg-emerald-700"}`}
                    >
                      {questionLoading && isSelected ? <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin"></div> : <Eye size={16} />}
                      {isSelected ? "Close Preview" : "Preview"}
                    </button>

                    <button
                      disabled={exam.published}
                      onClick={() => {
                        if (exam.published) return;
                        window.open(`/dashboard/instructor/exam/${exam._id}/questions`, "_blank");
                      }}
                      className="p-2.5 bg-emerald-800 text-emerald-100 hover:bg-emerald-700 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Edit Questions"
                    >
                      <ExternalLink size={18} />
                    </button>

                    {!exam.published && (
                      <button
                        onClick={() => handlePublish(exam._id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/20"
                      >
                        <Send size={16} /> Publish
                      </button>
                    )}
                  </div>

                  {/* Collapsible Questions Preview */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-4 border-t border-emerald-800/50 space-y-3">
                          <h3 className="text-emerald-400 text-xs font-black uppercase tracking-widest">Question Preview</h3>
                          {selectedExam.questions?.length === 0 ? (
                            <p className="text-emerald-100/40 text-xs italic text-center py-2">No questions added yet.</p>
                          ) : (
                            <ul className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                              {selectedExam.questions.map((q, i) => (
                                <li key={q._id} className="text-[11px] bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/30">
                                  <div className="text-white font-medium mb-1">{i + 1}. {q.questionText}</div>
                                  <div className="flex justify-between text-emerald-400/60 font-bold uppercase tracking-tighter">
                                    <span>Marks: {q.marks ?? 1}</span>
                                    <span>Ans: {exam.type === "mcq" ? (q.correctOption ?? "-") : "Manual"}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

// Helper component for clean layout
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-emerald-400/60">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-emerald-50 text-xs font-semibold">{value || "-"}</span>
    </div>
  );
}