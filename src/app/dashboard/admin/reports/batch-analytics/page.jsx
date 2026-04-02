"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Layers,
  Users,
  GraduationCap,
  TrendingUp,
  Award,
  Search,
  ChevronRight,
  Eye,
  Star,
  RefreshCw,
  LayoutDashboard
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

export default function BatchAnalyticsPage() {
  const router = useRouter();
  const [batches, setBatches] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batchDetail, setBatchDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllBatches, setShowAllBatches] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/reports/batch-analytics");
      const batchList = res.data.batches || [];
      setAllBatches(batchList);
      setBatches(batchList.slice(0, 5));
    } catch (error) {
      toast.error("Failed to load batches");
    } finally {
      setLoading(false);
    }
  };

  const fetchBatchDetail = async (batchId) => {
    try {
      setDetailLoading(true);
      setSelectedBatch(batchId);
      const res = await axios.get(`/api/admin/reports/batch-analytics?batchId=${batchId}`);
      setBatchDetail(res.data);
      setPagination(res.data.pagination || {});
    } catch (error) {
      toast.error("Failed to load batch details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = allBatches.filter((batch) =>
      batch.name?.toLowerCase().includes(term.toLowerCase())
    );
    setBatches(showAllBatches ? filtered : filtered.slice(0, 5));
  };

  const getScoreColor = (p) => {
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Reports</span>
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-800/50 rounded-lg border border-emerald-700/50">
            <LayoutDashboard className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Batch <span className="text-emerald-400">Analytics</span>
          </h1>
        </div>
        <p className="text-emerald-100/60 ml-12">Detailed performance insights per batch</p>
      </motion.div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search batches by name..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-emerald-900/20 border border-emerald-800/50 rounded-2xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all backdrop-blur-sm"
        />
      </div>

      {/* Batch Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <AnimatePresence mode="popLayout">
          {batches.map((batch) => (
            <motion.div
              key={batch.id}
              variants={itemVariants}
              layout
              onClick={() => fetchBatchDetail(batch.id)}
              className={`group p-5 rounded-2xl border transition-all cursor-pointer shadow-lg ${
                selectedBatch === batch.id 
                ? "bg-emerald-800/40 border-emerald-400/50 shadow-emerald-500/10" 
                : "bg-emerald-900/30 border-emerald-800/50 hover:border-emerald-600/50"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-950/50 rounded-lg">
                  <Layers className="w-5 h-5 text-emerald-400" />
                </div>
                <ChevronRight className={`w-5 h-5 text-emerald-600 group-hover:text-emerald-400 transition-all ${selectedBatch === batch.id ? "rotate-90" : ""}`} />
              </div>
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-emerald-400 transition-colors">{batch.name}</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-100/50 bg-emerald-950/30 p-2 rounded-md">
                  <Users className="w-3 h-3 text-emerald-500" /> {batch.totalStudents} Students
                </div>
                <div className="flex items-center gap-2 text-emerald-100/50 bg-emerald-950/30 p-2 rounded-md">
                  <TrendingUp className="w-3 h-3 text-emerald-500" /> {batch.avgScore}% Avg
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detail Section */}
      <AnimatePresence>
        {detailLoading ? (
          <div className="flex flex-col items-center py-20">
            <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mb-4" />
            <p className="text-emerald-100/40">Fetching batch details...</p>
          </div>
        ) : batchDetail && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative z-10">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} title="Students" value={batchDetail.stats.totalStudents} color="text-blue-400" bg="bg-blue-500/5" />
              <StatCard icon={GraduationCap} title="Exams" value={batchDetail.stats.totalExams} color="text-emerald-400" bg="bg-emerald-500/5" />
              <StatCard icon={TrendingUp} title="Avg Score" value={batchDetail.stats.avgScore} suffix="%" color="text-purple-400" bg="bg-purple-500/5" />
              <StatCard icon={Award} title="Gems" value={batchDetail.stats.totalGems} color="text-amber-400" bg="bg-amber-500/5" />
            </div>

            {/* Performance Table */}
            <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="p-6 border-b border-emerald-800/50 bg-emerald-900/40 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" /> Performance Leaderboard
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-emerald-400/50 text-[10px] uppercase tracking-widest bg-emerald-950/50">
                      <th className="px-6 py-4 font-semibold">Student Information</th>
                      <th className="px-6 py-4 font-semibold">Exams</th>
                      <th className="px-6 py-4 font-semibold">Avg Score</th>
                      <th className="px-6 py-4 font-semibold">Pass Rate</th>
                      <th className="px-6 py-4 font-semibold">Gems</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-800/30">
                    {batchDetail.studentPerformance?.map((student, i) => (
                      <tr key={i} className="hover:bg-emerald-800/20 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">{student.studentName}</p>
                          <p className="text-xs text-emerald-100/40">{student.studentEmail}</p>
                        </td>
                        <td className="px-6 py-4 text-emerald-100/60 font-medium">{student.totalExams}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(student.avgPercentage)}`}>
                            {student.avgPercentage}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(student.passRate)}`}>
                            {student.passRate}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                            <Star className="w-4 h-4 fill-amber-400/20" />
                            {student.totalGems}
                          </div>
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

function StatCard({ icon: Icon, title, value, suffix = "", color, bg }) {
  return (
    <div className={`${bg} border border-emerald-800/50 p-5 rounded-2xl shadow-lg hover:border-emerald-700/50 transition-all group`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-medium text-emerald-100/40 uppercase tracking-wider mb-1">{title}</p>
          <p className={`text-2xl font-black ${color}`}>
            {value}{suffix}
          </p>
        </div>
        <div className={`p-3 rounded-xl bg-emerald-950/50 ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}