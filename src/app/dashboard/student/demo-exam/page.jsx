"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ShieldAlert, 
  RotateCcw, 
  LayoutDashboard,
  Trophy,
  Target
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const DEMO_QUESTIONS = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    id: 2,
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correctAnswer: "CSS",
  },
  {
    id: 3,
    question: "Which is a JavaScript framework?",
    options: ["React", "Laravel", "Django", "Flask"],
    correctAnswer: "React",
  }
];

export default function DemoExamPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [violations, setViolations] = useState(0);

  // 🛡️ Security Implementation
  useEffect(() => {
    const preventAction = (e) => {
      e.preventDefault();
      toast.error("Action disabled for security!", {
        style: { background: '#064e3b', color: '#fff', borderRadius: '12px' }
      });
    };

    const preventKeyboard = (e) => {
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 's')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        toast.error("Standard shortcuts are disabled.");
      }
    };

    document.addEventListener("copy", preventAction);
    document.addEventListener("paste", preventAction);
    document.addEventListener("contextmenu", preventAction);
    document.addEventListener("keydown", preventKeyboard);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations(prev => prev + 1);
        Swal.fire({
          icon: "warning",
          title: "Tab Switching Detected!",
          text: "This may affect your exam.",
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
        text: "Please stay on this tab.",
        background: '#dc2626',
        color: '#fff',
        confirmButtonColor: '#064e3b'
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("copy", preventAction);
      document.removeEventListener("paste", preventAction);
      document.removeEventListener("contextmenu", preventAction);
      document.removeEventListener("keydown", preventKeyboard);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleOptionChange = (qId, option) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    let currentScore = 0;
    DEMO_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-emerald-50/30 p-6 pt-28 select-none">
      <div className="max-w-4xl mx-auto font-sans">
        
        {/* Header Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black text-emerald-950 tracking-tight">
              Practice <span className="text-emerald-600">Module</span>
            </h1>
            <div className="flex items-center mt-2 text-emerald-600/70">
              <ShieldAlert size={16} className="mr-2" />
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Secure Exam Environment Active</p>
            </div>
          </motion.div>
          
          <Link href="/dashboard/student/my-exams" 
            className="flex items-center text-emerald-700 hover:text-emerald-900 font-bold transition-all px-5 py-2.5 rounded-xl hover:bg-white border border-transparent hover:border-emerald-100 group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Exit Practice
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div 
              key="exam-body"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Instructions */}
              <div className="bg-emerald-900 text-emerald-50 p-6 rounded-3xl shadow-xl shadow-emerald-900/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center shrink-0">
                    <Target className="text-emerald-400" />
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-90">
                  Welcome! This is a demo mode. Test your knowledge and get familiar with the 
                  interface. <strong>Selection, Copying, and Right-click are disabled.</strong>
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {DEMO_QUESTIONS.map((q, index) => (
                  <motion.div 
                    key={q.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm"
                  >
                    <div className="flex items-start mb-8 gap-4">
                      <span className="bg-emerald-100 text-emerald-700 w-10 h-10 rounded-2xl flex items-center justify-center font-black shrink-0">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-emerald-950 pt-1 leading-snug">
                        {q.question}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {q.options.map((option, i) => {
                        const isSelected = answers[q.id] === option;
                        return (
                          <button
                            key={i}
                            onClick={() => handleOptionChange(q.id, option)}
                            className={`flex items-center p-5 rounded-2xl border-2 text-left transition-all duration-200 outline-none
                              ${isSelected 
                                ? "bg-emerald-50 border-emerald-500 ring-4 ring-emerald-500/5 shadow-md" 
                                : "bg-white border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30"
                              }`}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all
                              ${isSelected ? "border-emerald-600 bg-emerald-600" : "border-gray-300"}`}>
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className={`text-lg ${isSelected ? "font-bold text-emerald-900" : "text-gray-700"}`}>
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pb-20">
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length !== DEMO_QUESTIONS.length}
                  className="px-12 py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xl hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
                >
                  Submit Practice Set
                </button>
              </div>
            </motion.div>
          ) : (
            /* Result Screen */
            <motion.div 
              key="result-screen"
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-emerald-100 text-center relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/5 rounded-full" />
              
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Trophy size={48} />
              </div>

              <h2 className="text-3xl font-black text-emerald-950 mb-2">Practice Completed!</h2>
              <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-8">Performance Analysis</p>

              <div className="flex flex-col items-center mb-10">
                <div className="text-8xl font-black text-emerald-900 mb-4 tabular-nums">
                  {score}<span className="text-3xl text-emerald-300"> / {DEMO_QUESTIONS.length}</span>
                </div>
                
                <div className="w-full max-w-sm h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                   <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${(score / DEMO_QUESTIONS.length) * 100}%` }}
                    className="h-full bg-emerald-500" 
                   />
                </div>
              </div>

              <p className="text-emerald-800/70 font-medium max-w-xs mx-auto leading-relaxed mb-10">
                {score === DEMO_QUESTIONS.length 
                  ? "Perfect! You have solid fundamentals." 
                  : "Good job! Review the mistakes to improve further."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setAnswers({});
                    setSubmitted(false);
                    setScore(0);
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-950 text-white rounded-2xl font-bold hover:bg-emerald-900 transition-all active:scale-95 shadow-lg"
                >
                  <RotateCcw size={18} /> Retry Exam
                </button>
                <Link
                  href="/dashboard/student/my-exams"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-50 text-emerald-700 rounded-2xl font-bold hover:bg-emerald-100 transition-all border border-emerald-200"
                >
                  <LayoutDashboard size={18} /> Back to Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}