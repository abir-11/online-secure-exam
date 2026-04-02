"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  User, 
  Trash2, 
  Layers, 
  Mail, 
  Search, 
  UserMinus, 
  ShieldCheck 
} from "lucide-react";

export default function ViewBatchesPage() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const swalTheme = {
    background: "#022c22",
    color: "#fff",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#334155",
  };

  useEffect(() => {
    async function fetchBatches() {
      try {
        const res = await fetch("/api/batches");
        const data = await res.json();
        setBatches(data);
      } catch (error) {
        console.error("Failed to fetch batches", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBatches();
  }, []);

  const handleDeleteStudent = async (batchId, studentEmail) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: `Remove ${studentEmail} from this batch?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      ...swalTheme
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await fetch("/api/batches/remove-students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId, studentEmail }),
      });

      if (res.ok) {
        setBatches((prev) =>
          prev.map((batch) =>
            batch._id === batchId
              ? { ...batch, students: batch.students.filter((s) => s !== studentEmail) }
              : batch,
          ),
        );

        Swal.fire({
          title: "Removed!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          ...swalTheme,
          confirmButtonColor: "#10B981"
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to remove student", "error");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="animate-pulse font-bold tracking-widest text-xs uppercase">Loading Batches...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 p-6 sm:p-10 pt-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl text-emerald-400 mb-4">
            <Layers size={40} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            Batch <span className="text-emerald-400">Management</span>
          </h1>
          <p className="text-emerald-100/40 font-medium max-w-md">
            Organize your students into batches and manage their access effectively.
          </p>
        </header>

        {/* Search/Stats Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-emerald-900/20 backdrop-blur-md border border-emerald-800/40 p-4 rounded-2xl">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-950 rounded-xl border border-emerald-800">
                <Users size={18} className="text-emerald-500" />
                <span className="text-white font-bold">{batches.length} <span className="text-emerald-100/30 text-xs">Batches</span></span>
             </div>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-700" size={18} />
            <input 
              type="text" 
              placeholder="Filter batches..." 
              className="w-full bg-emerald-950 border border-emerald-800 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Batches Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {batches.map((batch, idx) => (
              <motion.div
                key={batch._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-emerald-900/20 backdrop-blur-sm border border-emerald-800/40 rounded-[2rem] overflow-hidden flex flex-col hover:border-emerald-500/30 transition-all shadow-xl"
              >
                {/* Card Header */}
                <div className="p-6 bg-emerald-800/20 border-b border-emerald-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck size={20} />
                    </div>
                    <h2 className="font-black text-white text-lg tracking-tight uppercase">{batch.name}</h2>
                  </div>
                  <span className="text-[10px] font-black bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1.5 rounded-full uppercase tracking-tighter">
                    {batch.students?.length || 0} Members
                  </span>
                </div>

                {/* Card Body - Student List */}
                <div className="p-4 flex-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                  <div className="space-y-2">
                    {batch.students?.length > 0 ? (
                      batch.students.map((email) => (
                        <div
                          key={email}
                          className="flex items-center justify-between bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-800/30 p-3 rounded-2xl transition-all group/item"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-emerald-800/50 flex items-center justify-center text-emerald-500 shrink-0">
                              <User size={14} />
                            </div>
                            <span className="text-emerald-100/70 text-xs font-medium truncate italic">{email}</span>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteStudent(batch._id, email)}
                            className="p-2 text-rose-500/40 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all opacity-0 group-hover/item:opacity-100"
                            title="Remove Student"
                          >
                            <UserMinus size={16} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 text-emerald-100/20">
                        <User size={32} strokeWidth={1} className="mb-2" />
                        <p className="text-xs font-bold uppercase tracking-widest">No Students</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-emerald-950/30 text-center">
                   <p className="text-[10px] text-emerald-100/20 font-bold uppercase tracking-[0.2em]">Batch ID: {batch._id.slice(-6)}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #065f46;
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}