"use client";

import { useState } from "react";
import { FiAlertCircle, FiSend } from "react-icons/fi";
import Swal from "sweetalert2";

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

  // ✅ FIXED: No backend, store in localStorage
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] text-white px-4 sm:px-6 lg:px-12 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">
          Report an <span className="text-emerald-400">Issue</span>
        </h1>
        <p className="mt-4 text-gray-300">
          Facing a problem? Let us know and our team will resolve it quickly.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
              Support Information
            </h2>

            <p className="text-gray-300 mb-6">
              Our support team is here to help you with technical issues,
              exam-related problems, or general inquiries.
            </p>

            <div className="space-y-4 text-sm text-gray-300">
              <p>⚡ Response Time: Within 24 hours</p>
              <p>🛠 Available: 24/7 Support</p>
              <p>🔒 Secure & Confidential</p>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 text-emerald-400">
            <FiAlertCircle />
            <span>All issues are tracked securely</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full bg-white/10 border-white/20 text-white"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full bg-white/10 border-white/20 text-white"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full bg-white/10 border-white/20 text-white"
              required
            >
              <option value="" disabled className="bg-[#022c22] text-white">
                Select Issue Category
              </option>
              <option className="bg-[#022c22] text-white">Login Problem</option>
              <option className="bg-[#022c22] text-white">Exam Issue</option>
              <option className="bg-[#022c22] text-white">Payment Issue</option>
              <option className="bg-[#022c22] text-white">Technical Bug</option>
              <option className="bg-[#022c22] text-white">Other</option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="select select-bordered w-full bg-white/10 border-white/20 text-white"
              required
            >
              <option value="" disabled className="bg-[#022c22] text-white">
                Select Priority
              </option>
              <option className="bg-[#022c22] text-white">Low</option>
              <option className="bg-[#022c22] text-white">Medium</option>
              <option className="bg-[#022c22] text-white">High</option>
              <option className="bg-[#022c22] text-white">Critical</option>
            </select>

            <textarea
              name="message"
              placeholder="Describe your issue..."
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered w-full h-28 bg-white/10 border-white/20 text-white"
              required
            ></textarea>

            <button
              type="submit"
              className="btn w-full bg-emerald-500 hover:bg-emerald-600 border-none text-black font-semibold flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Report"} <FiSend />
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold">Need Immediate Help?</h2>
        <p className="text-gray-300 mt-2">
          Use our AI chatbot for instant support.
        </p>

        <button
          onClick={() => setChatOpen(true)}
          className="mt-6 px-6 py-3 bg-emerald-500 text-black font-semibold rounded-lg hover:scale-105 transition"
        >
          Open Chatbot
        </button>
      </div>

      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-[#022c22] border border-white/10 rounded-xl shadow-lg flex flex-col">
          <div className="p-3 border-b border-white/10 flex justify-between items-center">
            <span className="font-semibold text-emerald-400">Support Chat</span>
            <button onClick={() => setChatOpen(false)}>✕</button>
          </div>

          <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded ${
                  msg.from === "user"
                    ? "bg-emerald-500 text-black ml-auto"
                    : "bg-white/10 text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-2 py-1 rounded bg-white/10 text-white outline-none"
              placeholder="Type..."
            />
            <button
              onClick={sendMessage}
              className="bg-emerald-500 px-3 rounded text-black"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
