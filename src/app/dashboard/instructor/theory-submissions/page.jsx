"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  FileText, 
  Calendar, 
  Users, 
  Clock, 
  Layers,
  Search
} from "lucide-react";

export default function TheorySubmissionsListPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/instructor/exam-list?type=theory");
        const data = await res.json();
        const sorted = (data.exams || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setExams(sorted);
      } catch (err) {
        console.error("Failed to load exams:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExams();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="animate-pulse font-bold tracking-widest text-xs uppercase">Loading Theory Exams...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 p-6 sm:p-10 pt-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-emerald-500 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-2">
              <Layers size={14} /> Instructor Panel
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Theory <span className="text-emerald-400">Submissions</span>
            </h1>
            <p className="text-emerald-100/40 font-medium mt-1">Select an exam to start reviewing student scripts.</p>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700 group-focus-within:text-emerald-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search exams..." 
              className="bg-emerald-900/20 border border-emerald-800 text-white pl-12 pr-6 py-3 rounded-2xl outline-none focus:border-emerald-500 transition-all w-full md:w-64"
            />
          </div>
        </header>

        {exams.length === 0 ? (
          <div className="text-center py-24 bg-emerald-900/10 border border-dashed border-emerald-800 rounded-[2.5rem]">
            <FileText size={48} className="mx-auto text-emerald-900 mb-4" />
            <p className="text-emerald-100/30 text-lg font-medium">No theory exams found in your records.</p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-hidden bg-emerald-900/20 backdrop-blur-md border border-emerald-800/50 rounded-3xl shadow-2xl">
              <table className="min-w-full text-left">
                <thead className="bg-emerald-800/30 border-b border-emerald-800/50">
                  <tr>
                    <th className="px-8 py-5 text-emerald-400 text-xs font-black uppercase tracking-widest">Exam Title</th>
                    <th className="px-8 py-5 text-emerald-400 text-xs font-black uppercase tracking-widest">Target Batches</th>
                    <th className="px-8 py-5 text-emerald-400 text-xs font-black uppercase tracking-widest">Schedule</th>
                    <th className="px-8 py-5 text-right text-emerald-400 text-xs font-black uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-800/30">
                  {exams.map((exam, index) => (
                    <motion.tr 
                      key={exam._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-emerald-500/[0.03] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 font-bold">
                            {exam.title.charAt(0)}
                          </div>
                          <span className="text-white font-bold text-lg">{exam.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-wrap gap-2">
                          {exam.batchNames?.length > 0 ? (
                            exam.batchNames.map(b => (
                              <span key={b} className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-1 rounded-md font-bold uppercase">
                                {b}
                              </span>
                            ))
                          ) : (
                            <span className="text-emerald-100/20 italic text-sm">No batches</span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-emerald-100/60 text-xs">
                            <Calendar size={12} className="text-emerald-500" />
                            {new Date(exam.startTime).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-emerald-100/30 text-[10px] font-bold">
                            <Clock size={12} />
                            {new Date(exam.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(exam.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Link
                          href={`/dashboard/instructor/theory-submissions/${exam._id}`}
                          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-5 py-2.5 rounded-xl font-black text-xs transition-all shadow-lg shadow-emerald-500/10 group-hover:-translate-x-1"
                        >
                          MANAGE SCRIPT <ChevronRight size={14} />
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD LAYOUT */}
            <div className="md:hidden space-y-4">
              {exams.map((exam, idx) => (
                <motion.div
                  key={exam._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-emerald-900/20 border border-emerald-800/50 p-6 rounded-3xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-3 bg-emerald-500/10 text-emerald-500 rounded-bl-2xl">
                    <FileText size={18} />
                  </div>
                  
                  <h2 className="text-xl font-black text-white mb-4 pr-8">{exam.title}</h2>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center gap-3 text-emerald-100/60">
                      <Users size={16} className="text-emerald-500" />
                      <span>{exam.batchNames?.join(", ") || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-100/60">
                      <Calendar size={16} className="text-emerald-500" />
                      <span>{new Date(exam.startTime).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/instructor/theory-submissions/${exam._id}`}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-emerald-950 py-4 rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    View Submissions <ChevronRight size={18} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}