"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Users,
  TrendingUp,
  Award,
  Calendar,
  Search,
  ChevronRight,
  BarChart3,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
  ClipboardCheck,
  Target
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ExamReportsPage() {
  const router = useRouter();
  const [exams, setExams] = useState([]);
  const [allExams, setAllExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [examDetail, setExamDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllExams, setShowAllExams] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/reports/exam-reports");
      const examList = res.data.exams || [];
      setAllExams(examList);
      setExams(examList.slice(0, 5));
    } catch (error) {
      toast.error("Failed to load exams");
    } finally {
      setLoading(false);
    }
  };

  const fetchExamDetail = async (examId) => {
    try {
      setDetailLoading(true);
      setSelectedExam(examId);
      const res = await axios.get(`/api/admin/reports/exam-reports?examId=${examId}`);
      setExamDetail(res.data);
      setPagination(res.data.pagination || {});
    } catch (error) {
      toast.error("Failed to load exam details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = allExams.filter((exam) =>
      exam.title?.toLowerCase().includes(term.toLowerCase())
    );
    setExams(showAllExams ? filtered : filtered.slice(0, 5));
  };

  const getScoreColorClass = (p) => {
    if (p >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (p >= 60) return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    if (p >= 40) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-800 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 p-4 md:p-8 text-emerald-100/70 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium font-inter">Back to Reports</span>
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-800/50 rounded-lg border border-emerald-700/50">
            <ClipboardCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Exam <span className="text-emerald-400">Reports</span>
          </h1>
        </div>
        <p className="text-emerald-100/60 ml-12 italic">Analyze student performance and pass rate metrics</p>
      </motion.div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/60 w-5 h-5" />
        <input
          type="text"
          placeholder="Search exams by title..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-emerald-900/20 border border-emerald-800/50 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all backdrop-blur-md placeholder:text-emerald-700"
        />
      </div>

      {/* Exam List Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <AnimatePresence mode="popLayout">
          {exams.map((exam) => (
            <motion.div
              key={exam.id}
              variants={itemVariants}
              layout
              onClick={() => fetchExamDetail(exam.id)}
              className={`group p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                selectedExam === exam.id 
                ? "bg-emerald-800/40 border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.15)]" 
                : "bg-emerald-900/30 border-emerald-800/50 hover:border-emerald-600/50"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  exam.type === "mcq" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                }`}>
                  {exam.type === "mcq" ? "MCQ" : "Theoretical"}
                </div>
                <ChevronRight className={`w-5 h-5 transition-all ${selectedExam === exam.id ? "rotate-90 text-emerald-400" : "text-emerald-700 group-hover:text-emerald-400"}`} />
              </div>
              
              <h3 className="text-white font-bold text-lg leading-tight mb-4 group-hover:text-emerald-400 transition-colors line-clamp-1">
                {exam.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-950/40 p-2 rounded-xl border border-emerald-800/30 text-center">
                    <p className="text-[10px] text-emerald-500 uppercase font-bold">Pass Rate</p>
                    <p className="text-sm font-black text-emerald-100">{exam.passRate}%</p>
                </div>
                <div className="bg-emerald-950/40 p-2 rounded-xl border border-emerald-800/30 text-center">
                    <p className="text-[10px] text-emerald-500 uppercase font-bold">Avg. Score</p>
                    <p className="text-sm font-black text-emerald-100">{exam.averageScore}%</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detailed Analysis Section */}
      <AnimatePresence>
        {detailLoading ? (
          <div className="flex flex-col items-center py-20 bg-emerald-900/10 rounded-[2.5rem] border border-emerald-800/20">
            <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
            <p className="text-emerald-400 animate-pulse font-bold tracking-widest uppercase text-xs">Generating Report...</p>
          </div>
        ) : examDetail && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} title="Total Students" value={examDetail.stats.totalStudents} color="text-blue-400" bg="bg-blue-500/5" />
              <StatCard icon={TrendingUp} title="Avg Score" value={examDetail.stats.averageScore} suffix="%" color="text-emerald-400" bg="bg-emerald-500/5" />
              <StatCard icon={Award} title="Pass Rate" value={examDetail.stats.passRate} suffix="%" color="text-purple-400" bg="bg-purple-500/5" />
              <StatCard icon={Target} title="Total Marks" value={examDetail.exam.totalMarks} color="text-amber-400" bg="bg-amber-500/5" />
            </div>

            {/* Score Distribution Chart Area */}
            <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-md">
                <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                   <BarChart3 className="w-6 h-6 text-emerald-400" /> Grade Distribution
                </h2>
                <div className="space-y-6">
                    {[
                      { range: "0-20%", label: "Poor", color: "bg-rose-500" },
                      { range: "20-40%", label: "Below Average", color: "bg-orange-500" },
                      { range: "40-60%", label: "Average", color: "bg-amber-500" },
                      { range: "60-80%", label: "Good", color: "bg-blue-500" },
                      { range: "80-100%", label: "Excellent", color: "bg-emerald-500" },
                    ].map((item, i) => {
                      const count = examDetail.stats.distribution[i];
                      const percentage = examDetail.stats.totalStudents > 0 ? (count / examDetail.stats.totalStudents) * 100 : 0;
                      return (
                        <div key={i} className="group">
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-emerald-100/50 font-bold uppercase tracking-wider">{item.range} — {item.label}</span>
                            <span className="text-emerald-400 font-black">{count} Learners ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="h-2.5 w-full bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/30">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${percentage}%` }} 
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`h-full ${item.color} shadow-[0_0_15px_${item.color}40]`} 
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
            </div>

            {/* Student Performance Table */}
            <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
              <div className="p-8 border-b border-emerald-800/50 bg-emerald-900/40">
                <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tighter">
                  <FileText className="w-5 h-5 text-emerald-400" /> Individual Results
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-emerald-500/40 text-[10px] uppercase font-black tracking-[0.2em] bg-emerald-950/60">
                      <th className="px-8 py-5">Learner Profile</th>
                      <th className="px-8 py-5 text-center">Achievement</th>
                      <th className="px-8 py-5 text-center">Verdict</th>
                      <th className="px-8 py-5 text-right">Completion Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-800/30">
                    {examDetail.studentPerformance?.map((student, i) => (
                      <tr key={i} className="hover:bg-emerald-800/20 transition-all group">
                        <td className="px-8 py-5">
                          <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">{student.studentName}</p>
                          <p className="text-[11px] text-emerald-100/30 font-medium">{student.studentEmail}</p>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex flex-col items-center">
                            <span className={`px-4 py-1 rounded-lg text-xs font-black border ${getScoreColorClass(student.percentage)}`}>
                              {student.score} / {student.totalMarks} ({student.percentage}%)
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex justify-center">
                            {student.passed ? (
                              <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase">
                                <CheckCircle className="w-3.5 h-3.5" /> Verified Pass
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-rose-400 text-[10px] font-black bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 uppercase">
                                <XCircle className="w-3.5 h-3.5" /> Failed
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right text-xs text-emerald-100/40 font-mono">
                          {new Date(student.submittedAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Custom Stat Card Component
function StatCard({ icon: Icon, title, value, suffix = "", color, bg }) {
  return (
    <div className={`${bg} border border-emerald-800/50 p-6 rounded-[2rem] shadow-xl group hover:border-emerald-400/30 transition-all duration-500`}>
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-emerald-100/20 uppercase tracking-[0.15em]">{title}</p>
          <p className={`text-3xl font-black ${color}`}>
            {value}{suffix}
          </p>
        </div>
        <div className={`p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800/50 ${color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}