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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I am SecureExam AI. How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contactdb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully.",
          icon: "success",
          confirmButtonColor: "#10b981",
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
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  // simple AI response logic
  const handleChatSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    let botReply =
      "I'm here to help! Please ask about exams, features, or issues.";

    if (input.toLowerCase().includes("exam")) {
      botReply =
        "SecureExam allows you to create, manage, and monitor exams securely.";
    } else if (input.toLowerCase().includes("login")) {
      botReply = "Please use your registered email and password to login.";
    } else if (input.toLowerCase().includes("price")) {
      botReply =
        "We offer flexible pricing plans. Check the Pricing page for details.";
    } else if (input.toLowerCase().includes("cheat")) {
      botReply =
        "Our AI proctoring detects suspicious activities to prevent cheating.";
    }

    setMessages([...messages, userMessage, { sender: "bot", text: botReply }]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] text-white py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mt-10">Get in Touch</h1>
        <p className="text-gray-300 mt-2">
          Have questions about{" "}
          <span className="text-emerald-400 font-semibold">SecureExam</span>? We
          are here to help.
        </p>
      </div>

      {/* Contact Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-[#065f46] to-[#10b981] p-10">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-8 text-white/90">
            Fill out the form and our Team AlphaDevs will get back to you within
            24 hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FiPhone />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-sm opacity-90">+8801306979918</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMail />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm opacity-90">
                  malam2331103@bscse.uiu.ac.bd
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiMapPin />
              <div>
                <p className="font-semibold">Office</p>
                <p className="text-sm opacity-90">
                  Team AlphaDevs HQ <br /> Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          <p className="mt-16 text-sm opacity-80">
            © 2026 SecureExam by AlphaDevs.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="input input-bordered w-full bg-white/10 border-white/20 text-white"
                required
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="select select-bordered w-full bg-white/10 border-white/20 text-white"
                required
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="input input-bordered w-full bg-white/10 border-white/20 text-white"
              required
            />

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="input input-bordered w-full bg-white/10 border-white/20 text-white"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="textarea textarea-bordered w-full h-28 bg-white/10 border-white/20 text-white"
              required
            ></textarea>

            <button
              type="submit"
              className="btn w-full bg-emerald-500 hover:bg-emerald-600 border-none text-black font-semibold"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"} <FiSend />
            </button>
          </form>
        </div>
      </div>

      {/* CHATBOT BUTTON */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-emerald-500 p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        {chatOpen ? <FiX size={20} /> : <FiMessageCircle size={20} />}
      </button>

      {/* CHAT WINDOW */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-[#022c22] border border-white/10 rounded-xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-emerald-500 text-black p-3 font-semibold">
            SecureExam AI
          </div>

          <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-emerald-500 text-black self-end"
                    : "bg-white/10"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 bg-transparent outline-none text-white"
              placeholder="Ask something..."
            />
            <button
              onClick={handleChatSend}
              className="px-4 bg-emerald-500 text-black"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
