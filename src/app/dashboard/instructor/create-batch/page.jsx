"use client";

import { useState, useEffect } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateBatchPage() {
  const [batchName, setBatchName] = useState("");
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Added submitting state

  // Common SweetAlert Theme Config
  const swalTheme = {
    background: "#022c22", // emerald-950
    color: "#fff",
    confirmButtonColor: "#10B981", // emerald-500
    cancelButtonColor: "#ef4444", // red-500
  };

  const fetchBatches = async () => {
    try {
      const res = await fetch("/api/batches");
      const data = await res.json();
      // Ensure data is an array before setting
      if (Array.isArray(data)) {
        setBatches(data);
      } else {
        setBatches([]);
      }
    } catch (err) {
      console.error("Failed to fetch batches:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleAddBatch = async () => {
    if (!batchName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Input",
        text: "Please enter a valid batch name.",
        timer: 2000,
        showConfirmButton: false,
        ...swalTheme,
      });
      return;
    }

    if (isSubmitting) return; // ✅ Prevent multiple submissions
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: batchName }),
      });
      const data = await res.json();

      if (res.ok) {
        setBatchName("");
        fetchBatches();
        Swal.fire({
          icon: "success",
          title: "Batch Added",
          text: data.message || "Batch created successfully",
          timer: 2000,
          showConfirmButton: false,
          ...swalTheme,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Failed to add batch",
          ...swalTheme,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to add batch due to server error",
        ...swalTheme,
      });
    } finally {
      setIsSubmitting(false); // ✅ Reset submission state
    }
  };

  const handleDeleteBatch = async (id) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this batch deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      ...swalTheme,
    });

    if (!result.isConfirmed) return;

    try {
      // Optimistic UI update: Remove instantly for better UX
      const previousBatches = [...batches];
      setBatches((prev) => prev.filter((b) => (b._id || b.id) !== id));

      const res = await fetch(`/api/batches?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: data.message || "Batch deleted successfully",
          timer: 2000,
          showConfirmButton: false,
          ...swalTheme,
        });
      } else {
        // Revert UI if API fails
        setBatches(previousBatches);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "Failed to delete batch",
          ...swalTheme,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Failed to delete batch",
        ...swalTheme,
      });
      fetchBatches(); // Refetch on unexpected error to sync state
    }
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-emerald-950 rounded-2xl relative overflow-hidden flex flex-col items-center">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full bg-emerald-900/40 backdrop-blur-xl border border-emerald-700/50 rounded-3xl shadow-[0_8px_32px_rgb(0,0,0,0.5)] p-6 sm:p-10 relative z-10 mt-10"
      >
        <div className="text-center sm:text-left mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Batch{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
              Management
            </span>
          </h1>
          <p className="text-emerald-100/70 text-sm sm:text-base">
            Create and organize new batches for your students effortlessly.
          </p>
        </div>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="e.g., HSC Batch 2024"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isSubmitting) handleAddBatch();
              }}
              disabled={isSubmitting} // Disable while loading
              className="w-full px-5 py-4 bg-emerald-950/60 border border-emerald-700/60 rounded-xl focus:bg-emerald-900/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all text-white placeholder-gray-400 shadow-inner text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            onClick={handleAddBatch}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white font-bold px-8 py-4 rounded-xl shadow-[0_4px_20px_rgb(16,185,129,0.3)] transition-all duration-300 border border-emerald-300/30 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              <>
                <PlusIcon className="w-6 h-6" />
                <span>Create Batch</span>
              </>
            )}
          </motion.button>
        </div>

        {/* List Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Existing Batches
              {!isLoading && (
                <span className="bg-emerald-800/80 text-emerald-300 text-xs py-1 px-3 rounded-full border border-emerald-600/50 transition-all">
                  {batches.length} Total
                </span>
              )}
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-400"></div>
            </div>
          ) : batches.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-12 bg-emerald-950/40 border border-dashed border-emerald-700/50 rounded-2xl"
            >
              <p className="text-emerald-100/50 font-medium">No batches found. Create one above!</p>
            </motion.div>
          ) : (
            <motion.ul className="space-y-3" layout>
              <AnimatePresence>
                {batches.map((b) => (
                  <motion.li
                    layout
                    key={b._id || b.id} // Added fallback key just in case
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-emerald-950/50 border border-emerald-800/50 p-4 rounded-xl shadow-sm hover:border-emerald-600/50 hover:bg-emerald-900/50 transition-colors group"
                  >
                    <span className="text-white font-semibold mb-3 sm:mb-0 text-lg flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgb(45,212,191,0.8)]"></span>
                      {b.name}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteBatch(b._id || b.id)}
                      className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 hover:border-red-500 px-4 py-2.5 rounded-lg shadow-sm transition-all duration-300 w-full sm:w-auto justify-center font-medium text-sm"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Delete
                    </motion.button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}