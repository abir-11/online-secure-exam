"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiBook, 
  FiShield, 
  FiUser, 
  FiBriefcase, 
  FiCode, 
  FiCheckCircle,
  FiAlertTriangle
} from "react-icons/fi";

export default function Documentation() {
  const [activeTab, setActiveTab] = useState("Introduction");

  const topics = [
    { name: "Introduction", icon: <FiBook size={18} /> },
    { name: "Admin Guide", icon: <FiShield size={18} /> },
    { name: "Instructor Guide", icon: <FiBriefcase size={18} /> },
    { name: "Student Guide", icon: <FiUser size={18} /> },
    { name: "LMS Integration", icon: <FiCode size={18} /> },
  ];

  // Framer Motion Variants
  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-[#c9ebd8] py-20 px-4 sm:px-6 flex justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#5FDC9E]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Sidebar */}
        <motion.aside
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-72 bg-[#024936] border border-[#035c44] rounded-3xl p-6 h-fit shadow-xl"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#5FDC9E] tracking-wide">SecureExam</h2>
            <p className="text-sm text-[#c9ebd8]/70 mt-1">Educational Platform Docs</p>
          </div>
          
          <ul className="space-y-3">
            {topics.map((topic) => (
              <li key={topic.name}>
                <button
                  onClick={() => setActiveTab(topic.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-left ${
                    activeTab === topic.name
                      ? "bg-[#5FDC9E] text-[#024936] shadow-[0_4px_15px_rgba(95,220,158,0.3)]"
                      : "text-[#c9ebd8] hover:bg-[#035c44] hover:text-[#5FDC9E]"
                  }`}
                >
                  {topic.icon}
                  {topic.name}
                </button>
              </li>
            ))}
          </ul>
        </motion.aside>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#024936] border border-[#035c44] rounded-3xl p-8 md:p-12 shadow-xl min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8"
            >
              <div className="border-b border-[#035c44] pb-6 mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#5FDC9E] mb-4 drop-shadow-sm">
                  {activeTab}
                </h1>
                <p className="text-[#c9ebd8]/80 text-lg">
                  {activeTab === "Introduction" && "A comprehensive overview of the SecureExam ecosystem."}
                  {activeTab === "Admin Guide" && "Learn how to manage institutions, users, and global platform settings."}
                  {activeTab === "Instructor Guide" && "Everything you need to create courses, exams, and monitor students."}
                  {activeTab === "Student Guide" && "A step-by-step guide on how to prepare for and take your online exams."}
                  {activeTab === "LMS Integration" && "Connect SecureExam with Moodle, Canvas, or Blackboard via API."}
                </p>
              </div>

              {/* --- 1. INTRODUCTION --- */}
              {activeTab === "Introduction" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">What is SecureExam?</h2>
                  <p className="leading-relaxed text-[#c9ebd8]/90">
                    SecureExam is an all-in-one educational platform designed for schools, colleges, and universities to conduct fair and transparent online assessments. It features a robust multi-role architecture:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-[#1e2925] p-5 rounded-xl border border-[#035c44]">
                      <FiShield className="text-[#5FDC9E] mb-3" size={28} />
                      <h3 className="text-white font-bold mb-2">Admins</h3>
                      <p className="text-sm text-[#c9ebd8]/80">Manage the entire institution, approve instructors, and configure global security policies.</p>
                    </div>
                    <div className="bg-[#1e2925] p-5 rounded-xl border border-[#035c44]">
                      <FiBriefcase className="text-[#5FDC9E] mb-3" size={28} />
                      <h3 className="text-white font-bold mb-2">Instructors</h3>
                      <p className="text-sm text-[#c9ebd8]/80">Create question banks, schedule exams, set AI proctoring rules, and review automated grading.</p>
                    </div>
                    <div className="bg-[#1e2925] p-5 rounded-xl border border-[#035c44]">
                      <FiUser className="text-[#5FDC9E] mb-3" size={28} />
                      <h3 className="text-white font-bold mb-2">Students</h3>
                      <p className="text-sm text-[#c9ebd8]/80">Enroll in courses, take secure proctored exams, and view grades upon publication.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 2. ADMIN GUIDE --- */}
              {activeTab === "Admin Guide" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Platform Management</h2>
                  <p>As an Admin, you have absolute control over the institutional workspace. Your primary responsibilities include:</p>
                  
                  <ul className="space-y-4 mt-4">
                    <li className="flex items-start gap-3 bg-[#1e2925] p-4 rounded-xl border border-[#035c44]">
                      <FiCheckCircle className="text-[#5FDC9E] shrink-0 mt-1" size={20} />
                      <div>
                        <strong className="text-white block">User Management:</strong>
                        <span className="text-[#c9ebd8]/80 text-sm">Approve instructor accounts, bulk import students via CSV, and handle role assignments.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-[#1e2925] p-4 rounded-xl border border-[#035c44]">
                      <FiCheckCircle className="text-[#5FDC9E] shrink-0 mt-1" size={20} />
                      <div>
                        <strong className="text-white block">Department & Course Setup:</strong>
                        <span className="text-[#c9ebd8]/80 text-sm">Create departments (e.g., Computer Science, BBA) and assign head instructors.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-[#1e2925] p-4 rounded-xl border border-[#035c44]">
                      <FiCheckCircle className="text-[#5FDC9E] shrink-0 mt-1" size={20} />
                      <div>
                        <strong className="text-white block">Global Security Settings:</strong>
                        <span className="text-[#c9ebd8]/80 text-sm">Set strictness levels for the entire institution (e.g., mandatory ID verification for all final exams).</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {/* --- 3. INSTRUCTOR GUIDE --- */}
              {activeTab === "Instructor Guide" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Creating & Managing Exams</h2>
                  <p>Instructors are the core of the academic process. Here is how to conduct a secure exam:</p>
                  
                  <div className="space-y-5">
                    <div className="border-l-2 border-[#5FDC9E] pl-4">
                      <h3 className="text-[#5FDC9E] font-bold text-lg mb-1">Step 1: Question Bank Preparation</h3>
                      <p className="text-sm">Create multiple-choice, short-answer, or descriptive questions. You can randomize question order to prevent cheating.</p>
                    </div>
                    <div className="border-l-2 border-[#5FDC9E] pl-4">
                      <h3 className="text-[#5FDC9E] font-bold text-lg mb-1">Step 2: Proctoring Configuration</h3>
                      <p className="text-sm">Toggle AI monitoring features. Enable <code className="bg-[#1e2925] px-1 rounded text-[#5FDC9E]">Camera Check</code>, <code className="bg-[#1e2925] px-1 rounded text-[#5FDC9E]">Tab Lockdown</code>, or <code className="bg-[#1e2925] px-1 rounded text-[#5FDC9E]">Audio Monitoring</code>.</p>
                    </div>
                    <div className="border-l-2 border-[#5FDC9E] pl-4">
                      <h3 className="text-[#5FDC9E] font-bold text-lg mb-1">Step 3: Live Monitoring & Grading</h3>
                      <p className="text-sm">Watch live feeds of students. The AI will automatically flag suspicious activities (e.g., "Multiple faces detected"). After the exam, review auto-graded MCQs.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 4. STUDENT GUIDE --- */}
              {activeTab === "Student Guide" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Taking Your Exam</h2>
                  <p>Prepare your environment to ensure a smooth, uninterrupted exam experience.</p>

                  <div className="bg-[#1e2925] p-5 rounded-xl border border-yellow-600/50 flex gap-4 mt-6">
                    <FiAlertTriangle className="text-yellow-500 shrink-0 text-2xl" />
                    <div>
                      <h3 className="text-yellow-500 font-bold mb-2">Important System Requirements</h3>
                      <ul className="list-disc list-inside text-sm text-[#c9ebd8]/80 space-y-1">
                        <li>A working Web Camera and Microphone.</li>
                        <li>Google Chrome, Edge, or Firefox (Latest Version).</li>
                        <li>Stable internet connection (at least 2 Mbps).</li>
                        <li>Do not exit full-screen mode during the exam.</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-[#5FDC9E] mt-6">Exam Day Checklist</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#024936] p-4 border border-[#035c44] rounded-lg text-sm">1. Login 15 minutes early.</div>
                    <div className="bg-[#024936] p-4 border border-[#035c44] rounded-lg text-sm">2. Complete ID Verification (Scan ID card).</div>
                    <div className="bg-[#024936] p-4 border border-[#035c44] rounded-lg text-sm">3. Allow Camera & Mic permissions.</div>
                    <div className="bg-[#024936] p-4 border border-[#035c44] rounded-lg text-sm">4. Keep your face clearly in the frame.</div>
                  </div>
                </div>
              )}

              {/* --- 5. LMS INTEGRATION --- */}
              {activeTab === "LMS Integration" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">API & Webhooks</h2>
                  <p>SecureExam can seamlessly integrate with your existing Learning Management System (LMS) to sync users, courses, and grades.</p>
                  
                  <h3 className="text-lg font-semibold text-[#5FDC9E] mt-6">Sync Student Grades</h3>
                  <p className="text-sm mb-3">Post graded exam results back to your LMS database automatically.</p>
                  
                  <div className="bg-[#1e2925] border border-[#035c44] p-5 rounded-xl overflow-x-auto">
                    <pre className="text-[#c9ebd8] font-mono text-sm leading-relaxed">
<span className="text-blue-400">POST</span> <span className="text-green-300">/api/v1/lms/sync-grades</span>{`\n`}
<span className="text-purple-400">Content-Type:</span> application/json
<span className="text-purple-400">Authorization:</span> Bearer YOUR_API_KEY{`\n\n`}
{`{\n`}
  <span className="text-blue-200">"courseId":</span> <span className="text-green-300">"CSE_101"</span>,
  <span className="text-blue-200">"examId":</span> <span className="text-green-300">"exm_442"</span>,
  <span className="text-blue-200">"results":</span> [
    {`{ `}<span className="text-blue-200">"studentId"</span>: <span className="text-green-300">"ST_01"</span>, <span className="text-blue-200">"score"</span>: <span className="text-orange-400">85</span> {`}`},
    {`{ `}<span className="text-blue-200">"studentId"</span>: <span className="text-green-300">"ST_02"</span>, <span className="text-blue-200">"score"</span>: <span className="text-orange-400">92</span> {`}`}
  ]
{`}`}
                    </pre>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}