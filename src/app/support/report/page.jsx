"use client";

import { useState } from "react";
import { FiAlertCircle, FiSend, FiMessageCircle, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    priority: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/reportissue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Submitted!",
          text: "Your issue has been reported successfully.",
          icon: "success",
          confirmButtonColor: "#10b981",
          background: "#022c22",
          color: "#fff",
        });

        setFormData({
          name: "",
          email: "",
          category: "",
          priority: "",
          message: "",
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#10b981",
        background: "#022c22",
        color: "#fff",
      });
    }

    setLoading(false);
  };

  const getBotReply = (userText) => {
    const text = userText.toLowerCase();

    if (text.includes("login")) {
      return "If you're facing login issues, try resetting your password or check your credentials.";
    } else if (text.includes("exam")) {
      return "For exam issues, ensure stable internet and do not refresh the page during the test.";
    } else if (text.includes("payment")) {
      return "Payment issues are usually resolved within a few minutes. Please check your transaction history.";
    } else if (text.includes("bug") || text.includes("error")) {
      return "Thanks for reporting! Our technical team will investigate this issue.";
    } else if (text.includes("hello") || text.includes("hi")) {
      return "Hello! 😊 How can I assist you today?";
    } else if (text.includes("help")) {
      return "Sure! You can ask me about login, exam issues, or technical problems.";
    } else {
      return "I'm not fully sure, but you can submit the issue form and our team will help you.";
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const botReply = { from: "bot", text: getBotReply(input) };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
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
    <div className="min-h-screen bg-emerald-950 text-white px-4 sm:px-6 lg:px-12 py-20 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 drop-shadow-sm">
          Report an Issue
        </h1>
        <p className="text-emerald-100/80 text-lg font-medium">
          Facing a problem? Let us know and our team will resolve it quickly.
        </p>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto mt-16 grid md:grid-cols-5 bg-emerald-900/40 backdrop-blur-xl border border-emerald-700/50 rounded-3xl shadow-[0_8px_32px_rgb(0,0,0,0.4)] overflow-hidden relative z-10"
      >
        {/* Left Side: Info */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 bg-gradient-to-br from-emerald-900/80 to-emerald-950 p-10 flex flex-col justify-between border-r border-emerald-700/50"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-md">
              Support Info
            </h2>
            <p className="text-emerald-100/80 font-medium leading-relaxed mb-8">
              Our support team is here to help you with technical issues,
              exam-related problems, or general inquiries.
            </p>

            <div className="space-y-6 bg-emerald-950/50 p-6 rounded-2xl border border-emerald-700/30">
              <div className="flex items-center gap-3 text-emerald-100 font-medium">
                <span className="text-2xl">⚡</span>
                <p>Response Time: Within 24 hours</p>
              </div>
              <div className="flex items-center gap-3 text-emerald-100 font-medium">
                <span className="text-2xl">🛠</span>
                <p>Available: 24/7 Support</p>
              </div>
              <div className="flex items-center gap-3 text-emerald-100 font-medium">
                <span className="text-2xl">🔒</span>
                <p>Secure & Confidential</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 text-emerald-400 font-bold bg-emerald-900/40 p-4 rounded-xl border border-emerald-500/20">
            <FiAlertCircle size={24} />
            <span>All issues are tracked securely</span>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div variants={itemVariants} className="md:col-span-3 p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-emerald-100 mb-2 block">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-emerald-100 mb-2 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputStyles}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-emerald-100 mb-2 block">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`${inputStyles} appearance-none cursor-pointer`}
                  required
                >
                  <option value="" disabled className="text-gray-900 bg-white">
                    Select Issue Category
                  </option>
                  <option className="text-gray-900 bg-white">Login Problem</option>
                  <option className="text-gray-900 bg-white">Exam Issue</option>
                  <option className="text-gray-900 bg-white">Payment Issue</option>
                  <option className="text-gray-900 bg-white">Technical Bug</option>
                  <option className="text-gray-900 bg-white">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-emerald-100 mb-2 block">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={`${inputStyles} appearance-none cursor-pointer`}
                  required
                >
                  <option value="" disabled className="text-gray-900 bg-white">
                    Select Priority
                  </option>
                  <option className="text-gray-900 bg-white">Low</option>
                  <option className="text-gray-900 bg-white">Medium</option>
                  <option className="text-gray-900 bg-white">High</option>
                  <option className="text-gray-900 bg-white">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-emerald-100 mb-2 block">Issue Description</label>
              <textarea
                name="message"
                placeholder="Describe your issue in detail..."
                value={formData.message}
                onChange={handleChange}
                className={`${inputStyles} h-32 resize-none`}
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white font-bold rounded-xl shadow-[0_4px_20px_rgb(16,185,129,0.3)] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed border border-emerald-400/30"
            >
              {loading ? "Submitting..." : "Submit Report"} <FiSend />
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-20 relative z-10"
      >
        <h2 className="text-3xl font-bold text-emerald-100">Need Immediate Help?</h2>
        <p className="text-emerald-200/70 mt-2 font-medium">
          Use our AI chatbot for instant support and quick answers.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatOpen(true)}
          className="mt-6 px-8 py-3.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 font-bold rounded-xl border border-emerald-500/30 shadow-lg transition-all flex items-center gap-2 mx-auto backdrop-blur-sm"
        >
          <FiMessageCircle size={20} /> Open AI Chatbot
        </motion.button>
      </motion.div>

      {/* --- CHATBOT SECTION --- */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-emerald-950 border border-emerald-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-4 font-bold flex justify-between items-center shadow-md relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                SecureExam Support
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-72 overflow-y-auto space-y-3 bg-emerald-900/20 flex flex-col">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.from === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[85%] p-3 rounded-2xl text-sm font-medium leading-relaxed ${
                      msg.from === "user"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white self-end rounded-br-none shadow-md"
                        : "bg-emerald-900/80 border border-emerald-700/50 text-emerald-50 self-start rounded-bl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Chat Input */}
            <div className="flex border-t border-emerald-700/60 bg-emerald-950/80 p-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 p-2 bg-transparent outline-none text-white placeholder-emerald-400/50 text-sm font-medium"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white rounded-xl text-sm font-bold shadow-sm flex items-center justify-center"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}