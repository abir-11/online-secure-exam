"use client";

import { useEffect, useState } from "react";
import { UserPlus, Users, Mail, Layers } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { motion } from "framer-motion";

export default function AddStudentsPage() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [emails, setEmails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Common SweetAlert Theme (Matches your Dashboard)
  const swalTheme = {
    background: "#022c22",
    color: "#fff",
    confirmButtonColor: "#10B981",
    cancelButtonColor: "#ef4444",
  };

  useEffect(() => {
    fetch("/api/batches")
      .then((res) => res.json())
      .then((data) => setBatches(data))
      .catch((error) => {
        console.error("Failed to load batches", error);
        Swal.fire({
          icon: "error",
          title: "Failed to load batches",
          text: "Please refresh the page.",
          ...swalTheme
        });
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBatch) {
      return Swal.fire({ icon: "warning", title: "Batch Required", text: "Please select a batch", ...swalTheme });
    }

    if (!emails.trim()) {
      return Swal.fire({ icon: "warning", title: "Emails Required", text: "Please enter student emails", ...swalTheme });
    }

    const emailArray = emails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "");

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/batches/add-students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          batchId: selectedBatch,
          studentEmails: emailArray,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add students");
      }

      Swal.fire({
        icon: "success",
        title: "Students Added! 🎉",
        text: "Successfully assigned to the batch.",
        timer: 2000,
        showConfirmButton: false,
        ...swalTheme
      });

      setEmails("");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message, ...swalTheme });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen rounded-2xl p-4 sm:p-8 bg-emerald-950 relative overflow-hidden flex flex-col items-center">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-emerald-900/30 backdrop-blur-xl border border-emerald-700/40 rounded-3xl shadow-[0_8px_32px_rgb(0,0,0,0.4)] p-8 sm:p-12 relative z-10 mt-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="p-4 bg-emerald-800/50 rounded-2xl mb-4 border border-emerald-600/30">
            <Users className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Add <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">Students</span>
          </h1>
          <p className="text-emerald-100/60 text-sm">
            Quickly enroll multiple students via email addresses
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Batch Dropdown */}
          <div className="space-y-2">
            <label className="text-emerald-100/80 text-sm font-medium ml-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Select Target Batch
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 bg-emerald-950/50 border border-emerald-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-white appearance-none cursor-pointer transition-all"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="" className="bg-emerald-900">Choose a batch...</option>
                {batches.map((batch) => (
                  <option key={batch._id} value={batch._id} className="bg-emerald-900">
                    {batch.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400/60 font-bold">
                ↓
              </div>
            </div>
          </div>

          {/* Emails Input */}
          <div className="space-y-2">
            <label className="text-emerald-100/80 text-sm font-medium ml-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" /> Student Emails
            </label>
            <div className="relative">
              <textarea
                rows="4"
                placeholder="example1@mail.com, example2@mail.com..."
                className="w-full p-4 bg-emerald-950/50 border border-emerald-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-white placeholder:text-emerald-100/30 transition-all resize-none"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
            </div>
            <p className="text-[11px] text-emerald-400/60 ml-1">
              * Use commas to separate multiple email addresses.
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white font-bold rounded-xl shadow-[0_4px_20px_rgb(16,185,129,0.2)] transition-all duration-300 border border-emerald-300/20 disabled:opacity-50 mt-4"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a4 4 0 00-4 4H4z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Enroll Students Now
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}