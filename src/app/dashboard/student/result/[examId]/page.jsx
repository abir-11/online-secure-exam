"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Award, 
  Calendar, 
  BookOpen, 
  Loader2,
  Trophy,
  Target
} from "lucide-react";
import { motion } from "framer-motion";

export default function ExamDetailPage() {
  const { examId } = useParams();
  const router = useRouter();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await fetch(`/api/student/result`);
        const data = await res.json();
        const exam = data.results.find((r) => r.examId === examId);
        setResult(exam || null);
      } catch (err) {
        console.error("Failed to fetch exam details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [examId]);

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="font-black tracking-widest text-xs uppercase animate-pulse">Calculating Score...</p>
    </div>
  );

  if (!result) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center p-6 text-center">
      <XCircle className="text-red-500 w-16 h-16 mb-4" />
      <h2 className="text-white text-2xl font-black mb-6">Result Not Found</h2>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-6 py-3 bg-emerald-800 text-emerald-100 rounded-2xl hover:bg-emerald-700 transition-all font-bold"
      >
        <ArrowLeft size={18} /> Go Back
      </button>
    </div>
  );

  const percentage = result.totalMarks > 0 ? ((result.marksObtained / result.totalMarks) * 100).toFixed(2) : 0;
  const passBoundary = 50;
  const passed = percentage >= passBoundary;

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] ${passed ? 'bg-emerald-500/10' : 'bg-red-500/5'} blur-[120px] rounded-full pointer-events-none`}></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Top Navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-500/60 hover:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Results
        </button>

        {/* Hero Result Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative p-8 md:p-12 rounded-[3rem] border backdrop-blur-xl shadow-2xl mb-12 ${
            passed ? 'bg-emerald-900/20 border-emerald-500/20' : 'bg-red-950/10 border-red-500/10'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  passed ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                  {result.examCategory || result.examType?.toUpperCase()}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-100/30 text-[10px] font-black uppercase tracking-widest">
                  <Calendar size={12} /> {new Date(result.submittedAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                {result.title}
              </h1>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex flex-col">
                  <span className="text-emerald-100/40 text-[10px] font-black uppercase tracking-[0.2em]">Status</span>
                  <span className={`font-black text-lg ${passed ? 'text-emerald-400' : 'text-red-500'}`}>
                    {passed ? "PASSED" : "FAILED"}
                  </span>
                </div>
                <div className="w-[1px] h-10 bg-emerald-800/50"></div>
                <div className="flex flex-col">
                  <span className="text-emerald-100/40 text-[10px] font-black uppercase tracking-[0.2em]">Grading</span>
                  <span className="font-black text-lg text-white">
                    {result.status === "graded" ? "Graded" : "Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Circle */}
            <div className="relative group self-center md:self-auto">
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 flex flex-col items-center justify-center transition-transform group-hover:scale-105 ${
                passed ? 'border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]' : 'border-red-500/20 bg-red-500/5 shadow-[0_0_50px_-12px_rgba(239,68,68,0.2)]'
              }`}>
                <span className="text-3xl md:text-4xl font-black text-white leading-none">{percentage}%</span>
                <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest mt-1">Score</span>
              </div>
              <div className="absolute -bottom-3 -right-3 p-3 bg-emerald-500 rounded-2xl text-emerald-950 shadow-xl">
                <Trophy size={20} />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-emerald-500/10">
            <StatBox icon={<Target size={14}/>} label="Marks" value={`${result.marksObtained} / ${result.totalMarks}`} />
            <StatBox icon={<Award size={14}/>} label="Pass Mark" value={`${passBoundary}%`} />
            <StatBox icon={<BookOpen size={14}/>} label="Questions" value={Object.keys(result.answersWithMarks).length} />
            <StatBox icon={<Clock size={14}/>} label="Time" value={new Date(result.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} />
          </div>
        </motion.div>

        {/* Questions Breakdown */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-emerald-500 uppercase tracking-widest ml-2 flex items-center gap-2">
             Detailed Analysis <Sparkles size={16} />
          </h2>
          {Object.entries(result.answersWithMarks).map(([qid, ans], index) => {
            const isCorrect = ans.awarded === ans.maxMarks && ans.maxMarks > 0;
            const partial = ans.awarded > 0 && ans.awarded < ans.maxMarks;

            return (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={qid}
                className={`bg-emerald-900/10 border p-6 md:p-8 rounded-[2rem] transition-all hover:bg-emerald-900/20 ${
                  isCorrect ? 'border-emerald-500/20' : partial ? 'border-yellow-500/20' : 'border-red-500/20'
                }`}
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-lg font-bold text-white leading-tight">
                    <span className="text-emerald-500/40 mr-2 font-mono">Q{index + 1}.</span> {ans.questionText}
                  </h3>
                  <div className={`px-4 py-1 rounded-xl text-[10px] font-black shrink-0 ${
                    isCorrect ? 'bg-emerald-500 text-emerald-950' : partial ? 'bg-yellow-500 text-yellow-950' : 'bg-red-500 text-white'
                  }`}>
                    {ans.awarded} / {ans.maxMarks}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                    <p className="text-emerald-100/40 text-[10px] font-black uppercase tracking-widest mb-1">Your Response</p>
                    <p className="text-white font-medium">{ans.answer || "No answer provided"}</p>
                  </div>

                  {result.examType === "mcq" && ans.correctAnswer && (
                    <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                      <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                        <CheckCircle2 size={10} /> Correct Solution
                      </p>
                      <p className="text-emerald-100 font-medium">{ans.correctAnswer}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function StatBox({ icon, label, value }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 text-emerald-500/50 text-[10px] font-black uppercase tracking-widest mb-1">
        {icon} {label}
      </div>
      <div className="text-white font-bold">{value}</div>
    </div>
  );
}

function Clock({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function Sparkles({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}