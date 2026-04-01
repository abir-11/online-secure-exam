"use client";

import { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "Is SecureExam safe?",
    answer:
      "Yes, SecureExam uses AI-based proctoring, secure authentication, and encrypted data handling to ensure complete exam integrity.",
  },
  {
    question: "How does AI proctoring work?",
    answer:
      "Our system monitors webcam activity, browser behavior, and suspicious actions to detect cheating in real time.",
  },
  {
    question: "Can I conduct large-scale exams?",
    answer:
      "Absolutely! SecureExam is designed to handle thousands of students simultaneously without performance issues.",
  },
  {
    question: "Do students get instant results?",
    answer:
      "Yes, MCQ exams are evaluated instantly, and results are shown immediately after submission.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, you can start with a free trial to explore all the core features before upgrading.",
  },
  {
    question: "Can instructors manage question banks?",
    answer:
      "Yes, instructors can create, edit, and organize question banks with categories and marks distribution.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] text-white px-4 sm:px-6 lg:px-12 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">
          Frequently Asked <span className="text-emerald-400">Questions</span>
        </h1>
        <p className="mt-4 text-gray-300">
          Find answers to common questions about SecureExam.
        </p>

        {/* Search */}
        <div className="mt-8 flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
          <FiSearch className="text-gray-300" />
          <input
            type="text"
            placeholder="Search questions..."
            className="bg-transparent outline-none ml-2 w-full text-white placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto mt-12 space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden transition duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-white/10 transition"
              >
                <span className="font-medium">{faq.question}</span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-emerald-400" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-40 py-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-300 text-sm">{faq.answer}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-10">
            No matching questions found.
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold">Still have questions?</h2>
        <p className="text-gray-300 mt-2">Contact our support team anytime.</p>

        <button className="mt-6 px-6 py-3 bg-emerald-500 text-black font-semibold rounded-lg hover:scale-105 transition">
          Contact Support
        </button>
      </div>
    </div>
  );
}
