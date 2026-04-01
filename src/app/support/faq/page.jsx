"use client";

import { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-white px-4 sm:px-6 lg:px-12 py-20 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 drop-shadow-sm">
            Frequently Asked Questions
          </h1>
          <p className="text-emerald-100/80 max-w-2xl mx-auto text-lg md:text-xl font-medium mb-8">
            Find answers to common questions about SecureExam's features, security, and more.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-emerald-900/40 border border-emerald-700/50 rounded-2xl px-5 py-3.5 backdrop-blur-md shadow-inner focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400/50 transition-all max-w-2xl mx-auto">
            <FiSearch className="text-emerald-400 text-xl" />
            <input
              type="text"
              placeholder="Search questions..."
              className="bg-transparent outline-none ml-3 w-full text-white placeholder-emerald-300/50 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  variants={itemVariants}
                  key={faq.question} // Using question as key is safer if data is static
                  layout
                  className="bg-emerald-900/30 backdrop-blur-lg border border-emerald-700/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-emerald-900/50 transition-all"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-emerald-800/40 transition-colors group"
                  >
                    <span className="font-semibold text-lg text-emerald-50 group-hover:text-emerald-200 transition-colors">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`text-xl ${openIndex === index ? "text-emerald-400" : "text-emerald-300/50 group-hover:text-emerald-300"}`}
                    >
                      <FiChevronDown />
                    </motion.div>
                  </button>

                  {/* Answer Section */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-1 text-emerald-100/70 leading-relaxed font-medium">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-10 text-emerald-300/60 font-medium text-lg"
              >
                No matching questions found for "{search}"
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20 p-8 bg-emerald-900/20 border border-emerald-700/30 rounded-3xl backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold mb-3 text-emerald-100">Still have questions?</h2>
          <p className="text-emerald-200/70 mb-8 font-medium">
            Can't find the answer you're looking for? Contact our support team.
          </p>

          <Link href="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white font-bold rounded-xl shadow-[0_4px_20px_rgb(16,185,129,0.3)] transition-all border border-emerald-400/30"
            >
              Contact Support
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}