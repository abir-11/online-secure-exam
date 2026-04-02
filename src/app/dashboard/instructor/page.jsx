// src/app/dashboard/instructor/page.jsx
"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  BookOpenIcon, 
  DocumentTextIcon, 
  UsersIcon, 
  ChartBarIcon 
} from "@heroicons/react/24/outline";

export default function InstructorDashboard() {
  const { data: session, status } = useSession();

  // 1. Handle Loading State (Prevents Crash)
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-400"></div>
          <p className="text-emerald-400 font-medium animate-pulse">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  // 2. Handle Unauthenticated State (Security fallback)
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950 p-6">
        <div className="bg-emerald-900/40 backdrop-blur-xl border border-red-500/30 p-8 rounded-3xl text-center shadow-lg">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
          <p className="text-emerald-100/70">Please log in to view the instructor dashboard.</p>
        </div>
      </div>
    );
  }

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const dashboardCards = [
    { title: "My Courses", icon: BookOpenIcon, count: "12 Active", color: "from-blue-500 to-cyan-400" },
    { title: "Manage Exams", icon: DocumentTextIcon, count: "5 Pending", color: "from-emerald-500 to-teal-400" },
    { title: "Students", icon: UsersIcon, count: "340 Enrolled", color: "from-purple-500 to-indigo-400" },
    { title: "Analytics", icon: ChartBarIcon, count: "View Stats", color: "from-orange-500 to-amber-400" },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-emerald-950 relative overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto relative z-10 mt-4 sm:mt-8"
      >
        {/* Header Section */}
        <div className="bg-emerald-900/40 backdrop-blur-xl border border-emerald-700/50 rounded-3xl p-8 mb-8 shadow-[0_8px_32px_rgb(0,0,0,0.5)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">{session?.user?.name || "Instructor"}</span>
            </h1>
            <p className="text-emerald-100/70 text-base">
              Here is what's happening with your classes today.
            </p>
          </div>
          <div className="bg-emerald-950/60 border border-emerald-800/60 px-5 py-3 rounded-xl flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgb(52,211,153)]"></div>
            <span className="text-emerald-100/90 font-medium capitalize">Role: {session?.user?.role || "Instructor"}</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-emerald-900/30 backdrop-blur-lg border border-emerald-700/40 rounded-2xl p-6 cursor-pointer shadow-lg hover:shadow-xl transition-all group overflow-hidden relative"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg text-white`}>
                  <card.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-emerald-100/60 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {card.count}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}