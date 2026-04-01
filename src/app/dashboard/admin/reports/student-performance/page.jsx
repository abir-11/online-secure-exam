"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Users,
  GraduationCap,
  Trophy,
  Award,
  Search,
  ChevronRight,
  BarChart3,
  Calendar,
  TrendingUp,
  UserCircle2,
  Sparkles,
  Zap
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function StudentPerformancePage() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/reports/student-performance");
      setPerformanceData(res.data);
      setStudents(res.data.students || []);

      if (res.data.performanceData && res.data.performanceData.length > 0) {
        setSelectedStudent(res.data.performanceData[0]);
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = (studentId) => {
    const student = performanceData?.performanceData?.find(
      (s) => s.student.id === studentId
    );
    setSelectedStudent(student);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreStyle = (percentage) => {
    const p = parseFloat(percentage);
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
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold tracking-tight">Back to Reports</span>
      </button>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-emerald-800/40 rounded-2xl border border-emerald-700/50 shadow-inner">
                <BarChart3 className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">
                Student <span className="text-emerald-400">Analytics</span>
            </h1>
        </div>
        <p className="text-emerald-100/40 ml-16 italic font-medium">Deep insights into individual learner growth</p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} title="Total Pool" value={students.length} color="text-blue-400" bg="bg-blue-500/5" />
        <StatCard icon={GraduationCap} title="Total Exams" value={performanceData?.performanceData?.reduce((sum, s) => sum + s.summary.totalExams, 0) || 0} color="text-emerald-400" bg="bg-emerald-500/5" />
        <StatCard icon={Trophy} title="Avg. Accuracy" value={selectedStudent?.summary?.avgPercentage || "0"} suffix="%" color="text-amber-400" bg="bg-amber-500/5" />
        <StatCard icon={Sparkles} title="Total Gems" value={selectedStudent?.summary?.totalGems || 0} color="text-purple-400" bg="bg-purple-500/5" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Student List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700 group-focus-within:text-emerald-400 transition-colors w-4 h-4" />
            <input
              type="text"
              placeholder="Find a learner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-emerald-900/20 border border-emerald-800/50 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all placeholder:text-emerald-800 text-sm"
            />
          </div>

          <div className="bg-emerald-900/10 border border-emerald-800/30 rounded-[2rem] overflow-hidden backdrop-blur-sm h-[500px] flex flex-col">
            <div className="p-5 border-b border-emerald-800/30 flex items-center justify-between">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Learner Roster</span>
                <span className="px-2 py-0.5 rounded bg-emerald-800 text-emerald-400 text-[10px]">{filteredStudents.length}</span>
            </div>
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              {filteredStudents.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleSelectStudent(student.id)}
                  className={`w-full p-5 text-left transition-all border-b border-emerald-800/10 flex items-center justify-between group ${
                    selectedStudent?.student?.id === student.id
                      ? "bg-emerald-800/30 border-l-4 border-l-emerald-400"
                      : "hover:bg-emerald-800/10"
                  }`}
                >
                  <div className="min-w-0">
                    <p className={`font-bold truncate transition-colors ${selectedStudent?.student?.id === student.id ? "text-white" : "text-emerald-100/60 group-hover:text-emerald-100"}`}>
                      {student.name}
                    </p>
                    <p className="text-[10px] text-emerald-100/30 truncate uppercase tracking-tighter">{student.email}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedStudent?.student?.id === student.id ? "text-emerald-400 translate-x-1" : "text-emerald-900"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content: Performance Analysis */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedStudent ? (
              <motion.div
                key={selectedStudent.student.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Profile Header Card */}
                <div className="bg-gradient-to-br from-emerald-800/40 to-emerald-950/60 border border-emerald-700/30 rounded-[2.5rem] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <UserCircle2 className="w-32 h-32 text-emerald-400" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                        <div className="w-20 h-20 rounded-3xl bg-emerald-400 flex items-center justify-center text-emerald-950 text-3xl font-black shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                            {selectedStudent.student.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight leading-none mb-2">
                                {selectedStudent.student.name}
                            </h2>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-emerald-100/40 text-xs font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-emerald-400" /> Professional Learner</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-emerald-400" /> Joined {new Date().getFullYear()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                        <ProfileMiniStat label="Completed" value={selectedStudent.summary.totalExams} sub="Exams" />
                        <ProfileMiniStat label="Precision" value={selectedStudent.summary.avgPercentage} sub="Accuracy %" />
                        <ProfileMiniStat label="Success" value={selectedStudent.summary.passRate} sub="Pass Rate %" />
                        <ProfileMiniStat label="Earnings" value={selectedStudent.summary.totalGems} sub="Gems" isGold />
                    </div>
                </div>

                {/* Performance Table */}
                <div className="bg-emerald-900/10 border border-emerald-800/30 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
                    <div className="p-6 border-b border-emerald-800/30 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <h3 className="font-bold text-white uppercase tracking-tighter text-sm">Exam History</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-emerald-950/50 text-[10px] font-black uppercase tracking-widest text-emerald-500/40">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Raw Score</th>
                                    <th className="px-6 py-4 text-center">Result</th>
                                    <th className="px-6 py-4 text-right">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-800/20">
                                {selectedStudent.examResults.map((result, i) => (
                                    <tr key={i} className="group hover:bg-emerald-800/20 transition-colors">
                                        <td className="px-6 py-5 font-bold text-emerald-100 text-sm">{result.examTitle}</td>
                                        <td className="px-6 py-5 text-emerald-100/50 text-sm font-mono">{result.score}/{result.totalMarks}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-tighter ${getScoreStyle(result.percentage)}`}>
                                                    {result.percentage}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right text-xs text-emerald-100/20 font-medium">
                                            {new Date(result.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {selectedStudent.examResults.length === 0 && (
                            <div className="p-12 text-center text-emerald-800 italic text-sm">No recorded exam activities</div>
                        )}
                    </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-emerald-900/5 border border-dashed border-emerald-800/50 rounded-[3rem] p-12 text-center">
                <div className="p-6 bg-emerald-900/30 rounded-full mb-6">
                    <UserCircle2 className="w-16 h-16 text-emerald-800" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Select a Learner</h3>
                <p className="text-emerald-100/30 max-w-xs text-sm font-medium">Please choose a student from the left panel to view their detailed performance analytics.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Stats Card
function StatCard({ icon: Icon, title, value, suffix = "", color, bg }) {
  return (
    <div className={`${bg} border border-emerald-800/50 p-5 rounded-3xl group hover:border-emerald-500/30 transition-all`}>
        <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-emerald-950 border border-emerald-800/50 ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">{title}</span>
        </div>
        <div className="flex items-baseline gap-0.5">
            <span className={`text-2xl font-black ${color}`}>{value}</span>
            {suffix && <span className="text-xs text-emerald-100/20 font-bold">{suffix}</span>}
        </div>
    </div>
  );
}

// Mini Stats for Profile
function ProfileMiniStat({ label, value, sub, isGold = false }) {
    return (
        <div className="bg-emerald-950/60 border border-emerald-800/50 p-4 rounded-2xl text-center">
            <p className="text-[10px] font-black text-emerald-500/40 uppercase tracking-tighter mb-1">{label}</p>
            <p className={`text-xl font-black ${isGold ? "text-amber-400" : "text-white"}`}>{value}</p>
            <p className="text-[9px] font-bold text-emerald-100/20 uppercase tracking-tighter">{sub}</p>
        </div>
    )
}