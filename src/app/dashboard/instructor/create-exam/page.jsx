"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardDocumentCheckIcon, CalendarDaysIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function CreateExamPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("mcq");
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [duration, setDuration] = useState(60);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common SweetAlert Theme (Matches your Batch Page)
  const swalTheme = {
    background: "#022c22",
    color: "#fff",
    confirmButtonColor: "#10B981",
    cancelButtonColor: "#ef4444",
  };

  useEffect(() => {
    fetch("/api/batches")
      .then((r) => r.json())
      .then((data) => setBatches(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!startTime || !duration) return;
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);
    const year = end.getFullYear();
    const month = String(end.getMonth() + 1).padStart(2, "0");
    const day = String(end.getDate()).padStart(2, "0");
    const hours = String(end.getHours()).padStart(2, "0");
    const minutes = String(end.getMinutes()).padStart(2, "0");
    setEndTime(`${year}-${month}-${day}T${hours}:${minutes}`);
  }, [startTime, duration]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (selectedBatches.length === 0) {
      return Swal.fire({ icon: "warning", title: "Select Batch", text: "Please assign at least one batch.", ...swalTheme });
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          type,
          duration: Number(duration),
          startTime,
          endTime,
          batchIds: selectedBatches,
          totalQuestions: type === "mcq" ? Number(totalQuestions) : 0,
        }),
      });

      if (res.ok) {
        Swal.fire({ icon: "success", title: "Exam Created", timer: 2000, showConfirmButton: false, ...swalTheme });
        setTitle("");
        setStartTime("");
        setSelectedBatches([]);
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to create exam");
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message, ...swalTheme });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleBatch = (id) => {
    setSelectedBatches(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen rounded-2xl p-4 sm:p-6 md:p-8 bg-emerald-950 relative overflow-hidden flex flex-col items-center">
      
      {/* Background Decorative Glows (Matching Batch Page) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-emerald-900/30 backdrop-blur-xl border border-emerald-700/40 rounded-3xl shadow-[0_8px_32px_rgb(0,0,0,0.4)] p-6 sm:p-10 relative z-10 mt-6 mb-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Create{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
              Exam
            </span>
          </h1>
          <p className="text-emerald-100/60 text-sm">Schedule a new assessment for your students.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-emerald-100/80 text-sm font-medium ml-1">Exam Title</label>
            <div className="relative">
              <ClipboardDocumentCheckIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/60" />
              <input
                type="text"
                required
                placeholder="e.g. Monthly MCQ Test"
                className="w-full pl-12 pr-4 py-3 bg-emerald-950/50 border border-emerald-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-white placeholder:text-emerald-100/30 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type */}
            <div className="space-y-1">
              <label className="text-emerald-100/80 text-sm font-medium ml-1">Exam Type</label>
              <select
                className="w-full px-4 py-3 bg-emerald-950/50 border border-emerald-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-white transition-all appearance-none cursor-pointer"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="mcq" className="bg-emerald-900">MCQ Exam</option>
                <option value="theory" className="bg-emerald-900">Theoretical</option>
              </select>
            </div>

            {/* Questions count */}
            {type === "mcq" && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
                <label className="text-emerald-100/80 text-sm font-medium ml-1">Total Questions</label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-3 bg-emerald-950/50 border border-emerald-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-white"
                  value={totalQuestions}
                  onChange={(e) => setTotalQuestions(e.target.value)}
                />
              </motion.div>
            )}
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <label className="text-emerald-100/80 text-sm font-medium ml-1 flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-emerald-400" /> Duration (Minutes)
            </label>
            <input
              type="number"
              required
              className="w-full px-4 py-3 bg-emerald-950/50 border border-emerald-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-white"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          {/* Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-emerald-100/80 text-sm font-medium ml-1">Start Date & Time</label>
              <input
                type="datetime-local"
                required
                className="w-full px-4 py-3 bg-emerald-950/50 border border-emerald-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-white [color-scheme:dark]"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-emerald-100/80 text-sm font-medium ml-1">Auto End Time</label>
              <input
                type="datetime-local"
                readOnly
                className="w-full px-4 py-3 bg-emerald-900/20 border border-emerald-800/50 rounded-xl text-emerald-300/50 cursor-not-allowed [color-scheme:dark]"
                value={endTime}
              />
            </div>
          </div>

          {/* Batch Selection */}
          <div className="space-y-2">
            <label className="text-emerald-100/80 text-sm font-medium ml-1 flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-emerald-400" /> Assign Batches
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl max-h-40 overflow-y-auto custom-scrollbar">
              {batches.map((b) => (
                <button
                  key={b._id}
                  type="button"
                  onClick={() => toggleBatch(b._id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                    selectedBatches.includes(b._id)
                      ? "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_10px_rgb(16,185,129,0.3)]"
                      : "bg-emerald-900/40 border-emerald-700/50 text-emerald-100/60 hover:border-emerald-500/50"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white font-bold rounded-xl shadow-[0_4px_20px_rgb(16,185,129,0.2)] transition-all duration-300 border border-emerald-300/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? "Processing..." : "Create & Publish Exam"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}