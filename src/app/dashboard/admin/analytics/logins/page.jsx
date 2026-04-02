"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, LogIn, Mail, Clock } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

export default function LoginsPage() {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogins();
  }, []);

  const fetchLogins = async () => {
    try {
      const response = await axios.get(
        "/api/admin/analytics/activities-by-type"
      );
      setLogins(response.data.data.logins);
    } catch (error) {
      console.error("Error fetching logins:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 p-6 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[25rem] h-[25rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/dashboard/admin/analytics"
            className="inline-flex items-center text-emerald-100/60 hover:text-emerald-300 mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Analytics
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="bg-emerald-800/80 p-3 rounded-xl border border-emerald-600/50 shadow-lg">
              <LogIn className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Recent Logins
              </h1>
              <p className="text-emerald-100/70 mt-1">
                Monitor all recent user authentication activities
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main List Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-emerald-900/30 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.2)] border border-emerald-800/50 backdrop-blur-md overflow-hidden"
        >
          {logins?.length === 0 ? (
            <div className="text-center py-16">
              <LogIn className="w-16 h-16 mx-auto text-emerald-800/80 mb-4 opacity-50" />
              <p className="text-emerald-100/60 text-lg">No logins recorded yet today</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-emerald-800/50"
            >
              {logins.map((login, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "rgba(6, 78, 59, 0.4)" }} // emerald-900/40 equivalent
                  className="p-5 transition-colors duration-300 group"
                >
                  <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                    
                    {/* User Info Left */}
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-emerald-800/80 border border-emerald-600/50 flex items-center justify-center shadow-inner group-hover:bg-emerald-700 transition-colors">
                        <span className="text-emerald-300 font-bold text-lg uppercase group-hover:text-white transition-colors">
                          {login.userName?.charAt(0) || "U"}
                        </span>
                      </div>
                      
                      {/* Text Details */}
                      <div>
                        <p className="font-bold text-white text-lg group-hover:text-emerald-300 transition-colors">
                          {login.userName || "Unknown User"}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                          <p className="text-sm text-emerald-100/70 flex items-center gap-1.5">
                            <Mail className="w-4 h-4 text-emerald-500" />
                            {login.userEmail}
                          </p>
                          <p className="text-xs text-emerald-100/30 hidden sm:block">•</p>
                          <p className="text-xs text-emerald-100/60 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-teal-500" />
                            {formatDate(login.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Role Badge Right */}
                    <div className="mt-2 sm:mt-0">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border backdrop-blur-sm ${
                        login.userRole?.toLowerCase() === 'admin' 
                          ? 'bg-teal-900/60 text-teal-300 border-teal-700/50'
                          : login.userRole?.toLowerCase() === 'instructor'
                          ? 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50'
                          : 'bg-green-900/40 text-green-300 border-green-800/50'
                      }`}>
                        {login.userRole || "Student"}
                      </span>
                    </div>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
}