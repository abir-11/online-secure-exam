"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { 
  ShieldCheck, 
  Clock, 
  Send, 
  HelpCircle, 
  FileText,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentExamPage({ params }) {
  const { examId } = params;
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    async function fetchExam() {
      try {
        const res = await fetch(`/api/exams/${examId}`);
        if (!res.ok) throw new Error("Exam not found or access denied");
        
        const data = await res.json();
        setExam(data);

        // Check if already submitted
        const attemptRes = await fetch(`/api/exam-attempts/${examId}`);
        const attemptData = await attemptRes.json();
        if (attemptRes.ok && attemptData.submitted) {
          setSubmitted(true);
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
          background: "#022c22",
          color: "#fff"
        });
      } finally {
        setLoading(false);
      }
    }
    fetchExam();
  }, [examId]);

  const handleAnswerChange = (questionId, value) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!exam || submitting) return;

    const result = await Swal.fire({
      title: "Confirm Submission?",
      text: "Do you want to submit your answers now?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#1e293b",
      background: "#022c22",
      color: "#fff"
    });

    if (!result.isConfirmed) return;

    setSubmitting(true);
    const payload = {
      examId: examId,
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
      if (!res.ok) throw new Error(data.message);

      Swal.fire({
        icon: "success",
        title: "Successfully Submitted",
        html: data.totalMarks != null ? `<p className="text-emerald-900 font-bold text-xl">Your Score: ${data.totalMarks}</p>` : "",
        confirmButtonColor: "#10b981",
      });

      setSubmitted(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.message,
        background: "#022c22",
        color: "#fff"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="font-black tracking-widest text-xs uppercase animate-pulse">Initializing Secured Exam...</p>
    </div>
  );

  if (!exam) return (
    <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-6">
      <div className="text-center bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
        <HelpCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <p className="text-emerald-100 text-lg font-bold">Exam data not found or access denied.</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 select-none pb-24">
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <nav className="sticky top-0 z-50 bg-emerald-950/80 backdrop-blur-xl border-b border-emerald-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
              <ShieldCheck className="text-emerald-400" size={20} />
            </div>
            <h1 className="text-sm font-black uppercase tracking-wider hidden sm:block">{exam.title}</h1>
          </div>

          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:bg-emerald-900"
            >
              {submitting ? "..." : "Finish Exam"}
            </button>
          )}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-10 relative z-10">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center bg-emerald-900/20 border border-emerald-500/30 p-12 rounded-[3rem] backdrop-blur-md">
            <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl font-black mb-2 text-white">Submission Recorded</h2>
            <p className="text-emerald-400/80 mb-8 font-medium">You have already completed this assessment. Well done!</p>
            <button onClick={() => window.location.href='/dashboard/student'} className="bg-emerald-500 text-emerald-950 px-10 py-3 rounded-2xl font-bold uppercase text-xs tracking-widest">Back to Dashboard</button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {exam.questions && exam.questions.length > 0 ? (
              exam.questions.map((q, index) => (
                <motion.div 
                  key={q._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-emerald-900/20 border border-emerald-800/50 rounded-[2.5rem] p-8 md:p-10 group hover:border-emerald-500/30 transition-all backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 rounded-2xl bg-emerald-500 text-emerald-950 flex items-center justify-center font-black text-xl">
                      {index + 1}
                    </span>
                    <div className="h-px w-8 bg-emerald-800"></div>
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
                            <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 transition-all
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
                        rows={5}
                        className="w-full bg-emerald-950/50 border-2 border-emerald-800/50 rounded-[2rem] p-8 pl-16 text-emerald-50 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-emerald-800"
                        placeholder="Structure your answer here..."
                        value={answers[q._id] || ""}
                        onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                      />
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-emerald-900/20 rounded-[3rem] border border-dashed border-emerald-800">
                <p className="text-emerald-500 font-bold uppercase tracking-widest text-sm">No questions available for this exam yet.</p>
              </div>
            )}

            {exam.questions && exam.questions.length > 0 && (
              <footer className="mt-20 mb-32 flex flex-col items-center">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="group relative px-20 py-6 bg-emerald-500 text-emerald-950 rounded-[2rem] font-black text-2xl uppercase tracking-tighter hover:bg-emerald-400 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] active:scale-95 disabled:bg-emerald-900 disabled:text-emerald-700"
                >
                  {submitting ? "Submitting..." : (
                    <span className="flex items-center gap-3">
                      Submit All <Send size={24} className="group-hover:translate-x-2 transition-transform" />
                    </span>
                  )}
                </button>
                <p className="mt-6 text-[10px] font-bold text-emerald-800 uppercase tracking-[0.4em]">Finalize assessment response</p>
              </footer>
            )}
          </div>
        )}
      </div>
    </main>
  );
}