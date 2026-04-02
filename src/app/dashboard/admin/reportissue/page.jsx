"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertCircle, 
  Clock, 
  Mail, 
  Tag, 
  Filter, 
  RefreshCw, 
  User,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function AdminReportIssuePage() {
  const [reportissues, setReportIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchReportIssues();
  }, []);

  const fetchReportIssues = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reportissue");
      const data = await res.json();
      if (data.success) setReportIssues(data.reportissues);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = filter === "All" 
    ? reportissues 
    : reportissues.filter(r => r.priority === filter);

  return (
    <div className="min-h-screen bg-emerald-950 p-4 md:p-8 text-emerald-100/70 relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 relative z-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-800/50 rounded-lg border border-emerald-700/50">
            <ShieldAlert className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            User Report <span className="text-emerald-400">Issues</span>
          </h1>
        </div>
        <p className="text-emerald-100/60 ml-12">Monitor and manage issues reported by platform users.</p>
      </motion.div>

      {/* Stats & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 relative z-10">
        <div className="flex gap-2 bg-emerald-900/40 p-1 rounded-xl border border-emerald-800/50 backdrop-blur-sm">
          {["All", "High", "Medium", "Low"].map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === p 
                ? "bg-emerald-600 text-white shadow-lg" 
                : "text-emerald-100/60 hover:text-emerald-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        
        <button 
          onClick={fetchReportIssues}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-900/40 border border-emerald-800/50 rounded-xl hover:bg-emerald-800/60 transition-all text-emerald-300 group"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          Refresh
        </button>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-emerald-800 border-t-emerald-400 rounded-full animate-spin mb-4" />
          <p className="text-emerald-100/50 animate-pulse">Loading reports...</p>
        </div>
      ) : filteredReports.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-emerald-900/20 border border-emerald-800/50 rounded-2xl p-12 text-center"
        >
          <div className="w-16 h-16 bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-700/30">
            <AlertCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-white font-semibold text-lg">All clear!</h3>
          <p className="text-emerald-100/50">No report issues found in this category.</p>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredReports.map((report) => (
              <motion.div
                key={report._id}
                variants={itemVariants}
                layout
                className="group bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-800/50 hover:border-emerald-500/30 rounded-2xl p-5 transition-all shadow-[0_4px_20px_rgb(0,0,0,0.2)]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-800/80 flex items-center justify-center border border-emerald-700/50">
                      <User className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <h2 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {report.name}
                      </h2>
                      <p className="text-xs text-emerald-100/50 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-emerald-500" />
                        {report.email}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                    report.priority === 'High' ? 'bg-red-900/20 border-red-800 text-red-400' :
                    report.priority === 'Medium' ? 'bg-amber-900/20 border-amber-800 text-amber-400' :
                    'bg-emerald-900/40 border-emerald-800 text-emerald-400'
                  }`}>
                    {report.priority}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-emerald-950/50 p-2 rounded-lg border border-emerald-800/30 flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-100/70">{report.category}</span>
                  </div>
                  <div className="bg-emerald-950/50 p-2 rounded-lg border border-emerald-800/30 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-100/70">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="relative bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/50 group-hover:bg-emerald-950/60 transition-colors">
                  <p className="text-emerald-100/80 text-sm leading-relaxed italic">
                    "{report.message}"
                  </p>
                </div>
                
                <div className="mt-4 flex justify-end">
                   <button className="text-xs font-semibold text-emerald-400 flex items-center gap-1 hover:underline">
                      Mark as Resolved <ChevronRight className="w-3 h-3" />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}