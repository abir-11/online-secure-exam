"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { 
  Clock, 
  ShieldCheck, 
  Send, 
  HelpCircle, 
  FileText,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentExamPage() {
  const { examId } = useParams();
  const router = useRouter();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");
  const timerRef = useRef(null);
  const [violations, setViolations] = useState(0);

  // 🛡️ Security: Disable Copy/Paste/Right-Click
  useEffect(() => {
    const handleDisable = (e) => e.preventDefault();
    document.addEventListener("copy", handleDisable);
    document.addEventListener("paste", handleDisable);
    document.addEventListener("cut", handleDisable);
    document.addEventListener("contextmenu", handleDisable);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations(prev => prev + 1);
        Swal.fire({
          icon: "warning",
          title: "Tab Switching Detected!",
          text: "Please stay on this exam tab. Multiple violations may result in exam termination.",
          background: '#dc2626',
          color: '#fff',
          confirmButtonColor: '#064e3b'
        });
      }
    };

    const handleBlur = () => {
      setViolations(prev => prev + 1);
      Swal.fire({
        icon: "warning",
        title: "Focus Lost!",
        text: "Please keep this window in focus.",
        background: '#dc2626',
        color: '#fff',
        confirmButtonColor: '#064e3b'
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("copy", handleDisable);
      document.removeEventListener("paste", handleDisable);
      document.removeEventListener("cut", handleDisable);
      document.removeEventListener("contextmenu", handleDisable);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // Fetch Exam Data
  useEffect(() => {
    if (!examId) return;
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/student/exam/${examId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load exam");

        setExam(data.exam);
        setQuestions(data.questions || []);
        setTimeLeft(data.exam.duration * 60);

        const subRes = await fetch(`/api/student/exam/${examId}/submitted`);
        if (subRes.ok) {
          const subData = await subRes.json();
          setHasSubmitted(subData.submitted);
        }
      } catch (err) {
        Swal.fire({ icon: "error", title: "Oops!", text: err.message, background: '#064e3b', color: '#fff' });
        router.push("/dashboard/student");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [examId, router]);

  // Timer Logic
  useEffect(() => {
    if (hasSubmitted || timeLeft <= 0 || loading) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true);
          return 0;
        }
        if (prev <= 300) setWarningMessage(`CRITICAL: ${formatTime(prev)} REMAINING!`);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [hasSubmitted, timeLeft, loading]);

  const handleSelect = (questionId, value) => {
    if (hasSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (auto = false) => {
    if (hasSubmitted || submitting) return;
    if (!auto) {
      const result = await Swal.fire({
        title: "Submit Exam?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#1e293b",
        background: "#022c22",
        color: "#fff"
      });
      if (!result.isConfirmed) return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/student/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId, answers }),
      });
      const data = await res.json();
      setHasSubmitted(true);
      clearInterval(timerRef.current);
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: `Exam submitted. Score: ${data.score}`,
        confirmButtonColor: "#10b981",
        background: "#022c22",
        color: "#fff"
      });
      router.push("/dashboard/student/result");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: "Submission failed", background: "#022c22", color: "#fff" });
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-emerald-400 font-black tracking-widest text-xs uppercase animate-pulse">Syncing Exam Paper...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 select-none pb-24">
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Sticky Top Bar */}
      <nav className="sticky top-0 z-50 bg-emerald-950/80 backdrop-blur-xl border-b border-emerald-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
              <ShieldCheck className="text-emerald-400" size={20} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-black uppercase tracking-wider">{exam.title}</h1>
              <p className="text-[10px] text-emerald-500/60 font-bold tracking-[0.2em]">PROTECTED SESSION</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl border-2 transition-all shadow-lg ${timeLeft < 300 ? 'bg-rose-500/10 border-rose-500 text-rose-500 animate-pulse' : 'bg-emerald-900/50 border-emerald-500/30 text-emerald-400'}`}>
              <Clock size={18} />
              <span className="font-mono text-xl font-black">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={() => handleSubmit(false)}
              disabled={submitting || hasSubmitted}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-900 text-emerald-950 px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
            >
              {submitting ? "..." : "Finish"}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 relative z-10 pt-10">
        {/* Warning Alert */}
        <AnimatePresence>
          {warningMessage && (
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8 bg-rose-600 text-white p-4 rounded-2xl flex items-center gap-3 shadow-2xl shadow-rose-900/40 border border-rose-400/30">
              <AlertTriangle className="shrink-0" />
              <p className="font-black text-xs uppercase tracking-widest">{warningMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Questions Grid */}
        <div className="space-y-8">
          {questions.map((q, index) => (
            <motion.div 
              key={q._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-900/20 border border-emerald-800/50 rounded-[2.5rem] p-8 md:p-10 relative group hover:border-emerald-500/30 transition-all backdrop-blur-sm"
            >
              {/* Question Meta */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-emerald-500 text-emerald-950 flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/20">
                    {index + 1}
                  </span>
                  <div className="h-px w-8 bg-emerald-800"></div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{q.marks} Points</span>
                </div>
                <HelpCircle className="text-emerald-800 group-hover:text-emerald-500 transition-colors" size={20} />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-10 leading-tight">
                {q.questionText}
              </h3>

              {exam.type === "mcq" ? (
                <div className="grid grid-cols-1 gap-4">
                  {q.options.map((opt, idx) => {
                    const isSelected = answers[q._id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(q._id, idx)}
                        disabled={hasSubmitted}
                        className={`group relative flex items-center p-6 rounded-3xl border-2 transition-all text-left
                          ${isSelected 
                            ? 'bg-emerald-500 border-emerald-400 text-emerald-950 shadow-2xl shadow-emerald-500/20 scale-[1.02]' 
                            : 'bg-emerald-950/40 border-emerald-800 text-emerald-100/70 hover:border-emerald-600 hover:bg-emerald-900/40'
                          }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 mr-5 flex items-center justify-center shrink-0 transition-all
                          ${isSelected ? 'border-emerald-950 bg-emerald-950' : 'border-emerald-800'}`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                        </div>
                        <span className="text-lg font-bold">{opt}</span>
                        {isSelected && <ChevronRight className="absolute right-6 text-emerald-950" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="relative">
                  <FileText className="absolute top-6 left-6 text-emerald-500/20" size={24} />
                  <textarea
                    rows={8}
                    className="w-full bg-emerald-950/50 border-2 border-emerald-800/50 rounded-[2rem] p-8 pl-16 text-emerald-50 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-emerald-800"
                    placeholder="Enter your detailed response here..."
                    value={answers[q._id] || ""}
                    onChange={(e) => handleSelect(q._id, e.target.value)}
                    disabled={hasSubmitted}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Submit */}
        <footer className="mt-20 mb-32 flex flex-col items-center">
          <div className="w-24 h-1 bg-emerald-900 rounded-full mb-10 opacity-30"></div>
          <button
            onClick={() => handleSubmit(false)}
            disabled={submitting || hasSubmitted}
            className="group relative px-20 py-6 bg-emerald-500 text-emerald-950 rounded-[2rem] font-black text-2xl uppercase tracking-tighter hover:bg-emerald-400 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] active:scale-95 disabled:bg-emerald-900 disabled:text-emerald-700 disabled:shadow-none"
          >
            {hasSubmitted ? "Session Ended" : submitting ? "Processing..." : (
              <span className="flex items-center gap-3">
                Complete Exam <Send size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
            )}
          </button>
          <p className="mt-6 text-[10px] font-bold text-emerald-800 uppercase tracking-[0.4em]">Secure Submission Channel</p>
        </footer>
      </div>
    </main>
  );
}