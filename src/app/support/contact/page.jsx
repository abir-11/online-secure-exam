"use client";

import { useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiSend,
  FiMessageCircle,
  FiX,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const CHATBASE_IFRAME_SRC =
  "https://www.chatbase.co/chatbot-iframe/mlVmdAsdNmahpwHhIdeW_";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // chat widget
  const [chatOpen, setChatOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contactdb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully.",
          icon: "success",
          confirmButtonColor: "#10b981",
          background: "#022c22",
          color: "#fff",
        });

        setFormData({
          name: "",
          role: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: result.error || "Failed to send message.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          background: "#022c22",
          color: "#fff",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#022c22",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const inputStyles =
    "w-full bg-emerald-950/60 border border-emerald-700/60 rounded-xl px-4 py-3 text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/50 transition-all shadow-inner";

  return (
    <div className="min-h-screen bg-emerald-950 text-white py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 drop-shadow-sm">
          Get in Touch
        </h1>
        <p className="text-emerald-100/80 text-lg font-medium max-w-xl mx-auto">
          Have questions about{" "}
          <span className="text-emerald-400 font-bold">SecureExam</span>? We are
          here to help.
        </p>
      </motion.div>

      {/* Contact Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid md:grid-cols-5 bg-emerald-900/40 backdrop-blur-xl border border-emerald-700/50 rounded-3xl shadow-[0_8px_32px_rgb(0,0,0,0.4)] overflow-hidden relative z-10"
      >
        {/* Left Side (Info) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 bg-gradient-to-br from-emerald-900/80 to-emerald-950 p-10 flex flex-col justify-between border-r border-emerald-700/50"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-md">
              Contact Info
            </h2>
            <p className="mb-10 text-emerald-100/80 font-medium leading-relaxed">
              Fill out the form and Team AlphaDevs will get back to you within 24
              hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-emerald-800/50 rounded-full flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-lg border border-emerald-600/30">
                  <FiPhone size={20} />
                </div>
                <div>
                  <p className="font-bold text-white">Phone</p>
                  <p className="text-sm text-emerald-200/80 mt-1">
                    +8801306979918
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-emerald-800/50 rounded-full flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-lg border border-emerald-600/30">
                  <FiMail size={20} />
                </div>
                <div>
                  <p className="font-bold text-white">Email</p>
                  <p className="text-sm text-emerald-200/80 mt-1">
                    malam2331103@bscse.uiu.ac.bd
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-emerald-800/50 rounded-full flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-lg border border-emerald-600/30">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <p className="font-bold text-white">Office</p>
                  <p className="text-sm text-emerald-200/80 mt-1">
                    Team AlphaDevs HQ <br /> Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-16 text-sm text-emerald-400/60 font-medium">
            © 2026 SecureExam by AlphaDevs.
          </p>
        </motion.div>

        {/* Right Side (Form) */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 p-10 lg:p-14"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-emerald-100 mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputStyles}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-emerald-100 mb-2 block">
                  I am a
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`${inputStyles} appearance-none cursor-pointer`}
                  required
                >
                  <option value="" disabled className="text-gray-900">
                    Select role
                  </option>
                  <option value="Student" className="text-gray-900">
                    Student
                  </option>
                  <option value="Teacher" className="text-gray-900">
                    Teacher
                  </option>
                  <option value="Admin" className="text-gray-900">
                    Admin
                  </option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-emerald-100 mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={inputStyles}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-emerald-100 mb-2 block">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className={inputStyles}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-emerald-100 mb-2 block">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className={`${inputStyles} h-32 resize-none`}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white font-bold rounded-xl shadow-[0_4px_20px_rgb(16,185,129,0.3)] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed border border-emerald-400/30"
            >
              {loading ? "Sending..." : "Send Message"} <FiSend />
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* --- CHATBOT SECTION --- */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-400 text-white p-4 rounded-full shadow-[0_0_20px_rgb(16,185,129,0.5)] transition-shadow z-[95] border border-emerald-300/30"
      >
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="fixed bottom-20 right-6 w-80 sm:w-96 bg-[#022c22] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden z-[90] h-[520px] max-h-[65vh]"
          >
            <div className="bg-emerald-500 text-black p-3 font-semibold flex items-center justify-between">
              <span>SecureExam AI</span>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="p-1 rounded hover:bg-emerald-600/60 transition-colors"
                aria-label="Close chat"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 bg-[#022c22]">
              <iframe
                src={CHATBASE_IFRAME_SRC}
                width="100%"
                style={{ height: "100%", border: 0 }}
                frameBorder="0"
                title="SecureExam Support Chatbot"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

