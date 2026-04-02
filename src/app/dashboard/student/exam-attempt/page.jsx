"use client";

import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { 
  Clock, 
  ShieldCheck, 
  Send, 
  HelpCircle, 
  FileText,
  AlertTriangle,
  ChevronRight,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExamAttempt({ searchParams }) {
  const examId = searchParams.examId;
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const timerRef = useRef(null);

  // 🛡️ Security: Disable Copy/Paste/Right-Click
  useEffect(() => {
    const handleDisable = (e) => e.preventDefault();
    document.addEventListener("copy", handleDisable);
    document.addEventListener("paste", handleDisable);
    document.addEventListener("contextmenu", handleDisable);
    return () => {
      document.removeEventListener("copy", handleDisable);
      document.removeEventListener("paste", handleDisable);
      document.removeEventListener("contextmenu", handleDisable);
    };
  }, []);

  // Fetch exam
  useEffect(() => {
    async function fetchExam() {
      try {
        const res = await fetch(`/api/exams/${examId}`);
        if (!res.ok) throw new Error("Exam not found");
        const data = await res.json();

        setExam(data);
        const now = new Date();
        const endTime = new Date(data.endTime);
        setTimeLeft(Math.floor((endTime - now) / 1000));
      } catch (err) {
        Swal.fire({ 
          icon: "error", 
          title: "Access Denied", 
          text: err.message,
          background: '#022c22',
          color: '#fff'
        });
      }
    }
    fetchExam();
  }, [examId]);

  // Timer Logic
  useEffect(() => {
    if (!exam || submitted || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        if (prev <= 300) setWarningMessage(`HURRY! ONLY ${formatTime(prev)} LEFT!`);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [exam, submitted, timeLeft]);

  const handleAnswerChange = (questionId, value) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (submitted || !exam || submitting) return;

    setSubmitting(true);
    clearInterval(timerRef.current);

    const payload = {
      examId,
      answers: Object.entries(answers).map(([qid, ans]) => ({
        questionId: qid,
        answer: ans,
      })),
    };

    try {
      const res = await fetch("/api/exam-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setSubmitted(true);
      Swal.fire({
        icon: "success",
        title: "Exam Completed",
        html: `<div className="text-emerald-900">Your Score: <b className="text-2xl">${data.score} / ${data.totalMarks}</b></div>`,
        confirmButtonColor: "#10b981",
        background: '#fff',
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message, background: '#022c22', color: '#fff' });
      setSubmitting(false);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!exam) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="font-black tracking-widest text-xs uppercase animate-pulse">Syncing Test Environment...</p>
    </div>
  );

  if (submitted) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center p-6 text-center">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-[3rem] shadow-2xl">
        <ShieldCheck className="w-20 h-20 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-emerald-950 mb-2">Submitted Successfully!</h2>
        <p className="text-emerald-600 font-medium mb-6">Your responses have been securely recorded.</p>
        <button onClick={() => window.location.href = "/dashboard/student"} className="bg-emerald-950 text-white px-8 py-3 rounded-2xl font-bold">Return to Dashboard</button>
      </motion.div>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 select-none pb-24">
      {/* Sticky Top Bar */}
      <nav className="sticky top-0 z-50 bg-emerald-950/80 backdrop-blur-xl border-b border-emerald-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
              <ShieldCheck className="text-emerald-400" size={20} />
            </div>
            <h1 className="text-sm font-black uppercase tracking-wider hidden sm:block">{exam.title}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl border-2 transition-all ${timeLeft < 300 ? 'bg-rose-500/10 border-rose-500 text-rose-500 animate-pulse' : 'bg-emerald-900/50 border-emerald-500/30 text-emerald-400'}`}>
              <Clock size={18} />
              <span className="font-mono text-xl font-black">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
            >
              {submitting ? "..." : "Submit"}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-10">
        <AnimatePresence>
          {warningMessage && (
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8 bg-rose-600 text-white p-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-rose-400/30">
              <AlertTriangle className="shrink-0" />
              <p className="font-black text-xs uppercase tracking-widest">{warningMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-8">
          {exam.questions.map((q, index) => (
            <motion.div 
              key={q._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-900/20 border border-emerald-800/50 rounded-[2.5rem] p-8 md:p-10 relative group hover:border-emerald-500/30 transition-all backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-emerald-500 text-emerald-950 flex items-center justify-center font-black text-xl">
                  {index + 1}
                </span>
                <div className="h-px w-8 bg-emerald-800"></div>
                <HelpCircle className="text-emerald-500/50" size={20} />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-tight">
                {q.questionText}
              </h3>

              {exam.examType === "MCQ" ? (
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt, idx) => {
                    const isSelected = answers[q._id] === opt;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerChange(q._id, opt)}
                        className={`flex items-center p-5 rounded-2xl border-2 transition-all text-left
                          ${isSelected 
                            ? 'bg-emerald-500 border-emerald-400 text-emerald-950 shadow-lg scale-[1.01]' 
                            : 'bg-emerald-950/40 border-emerald-800 text-emerald-100/70 hover:border-emerald-600'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all
                          ${isSelected ? 'border-emerald-950 bg-emerald-950' : 'border-emerald-800'}`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                        </div>
                        <span className="font-bold">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="relative">
                  <FileText className="absolute top-6 left-6 text-emerald-500/20" size={24} />
                  <textarea
                    rows={4}
                    className="w-full bg-emerald-950/50 border-2 border-emerald-800/50 rounded-[2rem] p-8 pl-16 text-emerald-50 focus:border-emerald-500 focus:outline-none transition-all"
                    placeholder="Type your answer here..."
                    value={answers[q._id] || ""}
                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <footer className="mt-20 mb-32 flex flex-col items-center">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="group relative px-20 py-6 bg-emerald-500 text-emerald-950 rounded-[2rem] font-black text-2xl uppercase tracking-tighter hover:bg-emerald-400 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] active:scale-95"
          >
            {submitting ? "Submitting..." : (
              <span className="flex items-center gap-3">
                Complete Exam <Send size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
            )}
          </button>
        </footer>
      </div>
    </main>
  );
}