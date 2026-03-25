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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate API
    setTimeout(() => {
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

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] text-white px-4 sm:px-6 lg:px-12 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">
          Report an <span className="text-emerald-400">Issue</span>
        </h1>
        <p className="mt-4 text-gray-300">
          Facing a problem? Let us know and our team will resolve it quickly.
        </p>
      </div>

      {/* Container */}
      <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
        {/* Info Section */}
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

        {/* Form Section */}
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
              <option value="" disabled>
                Select Issue Category
              </option>
              <option>Login Problem</option>
              <option>Exam Issue</option>
              <option>Payment Issue</option>
              <option>Technical Bug</option>
              <option>Other</option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="select select-bordered w-full bg-white/10 border-white/20 text-white"
              required
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
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
              className="btn w-full bg-emerald-500 hover:bg-emerald-600 border-none text-black font-semibold"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Report"} <FiSend />
            </button>
          </form>
        </div>
      </div>

      {/* Extra Section */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold">Need Immediate Help?</h2>
        <p className="text-gray-300 mt-2">
          Use our AI chatbot for instant support.
        </p>

        <button className="mt-6 px-6 py-3 bg-emerald-500 text-black font-semibold rounded-lg hover:scale-105 transition">
          Open Chatbot
        </button>
      </div>
    </div>
  );
}
