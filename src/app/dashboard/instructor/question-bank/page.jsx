"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, 
  PlusCircle, 
  HelpCircle, 
  CheckCircle2, 
  FileText, 
  Lock, 
  Hash,
  ChevronDown,
  AlertTriangle
} from "lucide-react";

export default function QuestionBankPage() {
  const { data: session } = useSession();

  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);

  /* MCQ fields */
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [marks, setMarks] = useState(1);

  /* Theory fields */
  const [theoryQuestion, setTheoryQuestion] = useState("");
  const [theoryMarks, setTheoryMarks] = useState(10);

  const swalTheme = {
    background: "#022c22",
    color: "#fff",
    confirmButtonColor: "#10B981",
  };

  /* ---------------- Fetch Exams ---------------- */
  useEffect(() => {
    if (!session) return;
    fetch("/api/exams")
      .then((r) => r.json())
      .then((d) => setExams(d.exams || []))
      .catch(console.error);
  }, [session]);

  // Safe checks using Optional Chaining
  const canAddMCQ = selectedExam && selectedExam?.type === "mcq" && !selectedExam?.published && questionCount < (selectedExam?.totalQuestions || 999);
  const canAddTheory = selectedExam && selectedExam?.type === "theory" && !selectedExam?.published;

  /* ---------------- Add MCQ ---------------- */
  const handleAddMCQ = async (e) => {
    e.preventDefault();
    if (!selectedExam?._id) return;

    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examId: selectedExam._id,
        questionText,
        options,
        correctOption,
        marks,
      }),
    });

    const data = await res.json();
    await Swal.fire({
      icon: res.ok ? "success" : "error",
      title: res.ok ? "MCQ Added!" : "Error",
      text: data.message,
      timer: res.ok ? 1500 : undefined,
      ...swalTheme
    });

    if (res.ok) {
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectOption(0);
      setMarks(1);
      setQuestionCount((c) => c + 1);
    }
  };

  /* ---------------- Add Theory ---------------- */
  const handleAddTheory = async (e) => {
    e.preventDefault();
    if (!selectedExam?._id) return;

    const res = await fetch("/api/theory-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examId: selectedExam._id,
        questionText: theoryQuestion,
        marks: theoryMarks,
      }),
    });

    const data = await res.json();
    await Swal.fire({
      icon: res.ok ? "success" : "error",
      title: res.ok ? "Theory Added!" : "Error",
      text: data.message,
      ...swalTheme
    });

    if (res.ok) {
      setTheoryQuestion("");
      setTheoryMarks(10);
    }
  };

  return (
    <main className="min-h-screen bg-emerald-950 p-6 sm:p-10 relative overflow-hidden pt-24">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-10 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <Database size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Question <span className="text-emerald-400">Bank</span>
            </h1>
            <p className="text-emerald-100/40 font-medium text-sm italic">Build your exam paper one question at a time.</p>
          </div>
        </header>

        {/* Selector Card */}
        <div className="bg-emerald-900/20 backdrop-blur-md border border-emerald-800/40 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-6 md:items-end">
            <div className="flex-1">
              <label className="block text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">Select Exam Paper</label>
              <div className="relative group">
                <select
                  className="w-full bg-emerald-950/50 border border-emerald-800 text-emerald-50 p-4 rounded-xl appearance-none focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
                  onChange={(e) => {
                    const exam = exams.find((x) => x._id === e.target.value);
                    setSelectedExam(exam || null);
                    setQuestionCount(exam?.questionsCount || 0);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-emerald-950">-- Choose an Exam --</option>
                  {exams.map((e) => (
                    <option key={e._id} value={e._id} className="bg-emerald-950">
                      {e.title} ({e?.type?.toUpperCase()})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-700 pointer-events-none group-hover:text-emerald-400 transition-colors" size={20} />
              </div>
            </div>

            {selectedExam && (
              <div className="md:w-48 bg-emerald-800/10 border border-emerald-800/50 rounded-xl p-4 flex flex-col items-center">
                <p className="text-emerald-400/50 text-[10px] font-bold uppercase mb-1 tracking-tighter">Status Panel</p>
                <div className={`flex items-center gap-2 text-sm font-bold ${selectedExam?.published ? "text-amber-400" : "text-emerald-400"}`}>
                  {selectedExam?.published ? <Lock size={14} /> : <CheckCircle2 size={14} />}
                  {selectedExam?.published ? "Published" : "Draft Mode"}
                </div>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* MCQ SECTION */}
          {canAddMCQ && (
            <motion.form
              key="mcq-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleAddMCQ}
              className="bg-emerald-900/30 border border-emerald-500/10 rounded-[2.5rem] p-8 space-y-6 shadow-xl relative"
            >
              <div className="flex justify-between items-center pb-4 border-b border-emerald-800/50">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><PlusCircle size={20}/></div>
                  Add MCQ Question
                </h2>
                <div className="text-[10px] font-black bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/20 tracking-widest uppercase">
                  Progress: {questionCount} / {selectedExam?.totalQuestions || "∞"}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-emerald-100/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2 ml-1">Question Text</label>
                  <textarea
                    className="w-full bg-emerald-950/50 border border-emerald-800 rounded-2xl p-5 text-emerald-50 focus:border-emerald-500 outline-none transition-all h-28 text-lg"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Type your question here..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {options.map((opt, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-900 rounded-lg flex items-center justify-center text-emerald-500 font-bold text-[10px]">{i + 1}</div>
                      <input
                        className="w-full bg-emerald-950/30 border border-emerald-800 group-hover:border-emerald-700 rounded-xl p-4 pl-12 text-emerald-50 outline-none transition-all"
                        value={opt}
                        onChange={(e) => {
                          const arr = [...options];
                          arr[i] = e.target.value;
                          setOptions(arr);
                        }}
                        placeholder={`Option ${i + 1}`}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div>
                    <label className="flex items-center gap-2 text-emerald-100/40 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                      <CheckCircle2 size={12} className="text-emerald-500" /> Correct Index
                    </label>
                    <input
                      type="number" min={0} max={3}
                      value={correctOption}
                      onChange={(e) => setCorrectOption(Number(e.target.value))}
                      className="w-full bg-emerald-950 border border-emerald-800 rounded-xl p-4 text-emerald-50 outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-emerald-100/40 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                      <Hash size={12} className="text-emerald-500" /> Question Marks
                    </label>
                    <input
                      type="number" min={1}
                      value={marks}
                      onChange={(e) => setMarks(Number(e.target.value))}
                      className="w-full bg-emerald-950 border border-emerald-800 rounded-xl p-4 text-emerald-50 outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/10 uppercase tracking-[0.2em] text-xs">
                Save MCQ to Database
              </button>
            </motion.form>
          )}

          {/* THEORY SECTION */}
          {canAddTheory && (
            <motion.form
              key="theory-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleAddTheory}
              className="bg-emerald-900/30 border border-emerald-500/10 rounded-[2.5rem] p-8 space-y-6 shadow-xl"
            >
              <h2 className="text-xl font-bold text-white flex items-center gap-3 border-b border-emerald-800/50 pb-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><FileText size={20}/></div>
                Add Theory Question
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-emerald-100/40 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Full Question Description</label>
                  <textarea
                    className="w-full bg-emerald-950/50 border border-emerald-800 rounded-2xl p-5 text-emerald-50 focus:border-emerald-500 outline-none transition-all h-40 text-lg"
                    value={theoryQuestion}
                    onChange={(e) => setTheoryQuestion(e.target.value)}
                    placeholder="Enter detailed theory question..."
                    required
                  />
                </div>

                <div className="w-full md:w-1/3">
                  <label className="block text-emerald-100/40 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Assigned Marks</label>
                  <input
                    type="number" min={1}
                    value={theoryMarks}
                    onChange={(e) => setTheoryMarks(Number(e.target.value))}
                    className="w-full bg-emerald-950 border border-emerald-800 rounded-xl p-4 text-emerald-50 outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <button className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/10 uppercase tracking-[0.2em] text-xs">
                Save Theory Question
              </button>
            </motion.form>
          )}

          {/* LOCKED STATE */}
          {selectedExam?.published && (
            <motion.div 
              key="locked-state"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-500/5 border border-rose-500/20 rounded-[2rem] p-10 flex flex-col items-center text-center text-rose-400"
            >
              <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
                <Lock size={32} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest mb-2">Editor Locked</h3>
              <p className="text-sm opacity-60 max-w-xs">This exam is already published and live. You cannot add or modify questions now.</p>
            </motion.div>
          )}

          {/* NO SELECTION STATE */}
          {!selectedExam && (
            <div className="text-center py-24 border border-dashed border-emerald-800/50 rounded-[3rem] bg-emerald-900/5">
              <HelpCircle size={64} className="mx-auto text-emerald-900 mb-4 opacity-40 animate-pulse" />
              <p className="text-emerald-100/20 font-bold uppercase tracking-[0.3em] text-xs">Please select an exam to proceed</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}