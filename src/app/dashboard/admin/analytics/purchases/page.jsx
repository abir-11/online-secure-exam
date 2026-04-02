"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, Calendar, Mail } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get(
        "/api/admin/analytics/activities-by-type"
      );
      setPurchases(response.data.data.purchases);
    } catch (error) {
      console.error("Error fetching purchases:", error);
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
              <CreditCard className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Recent Purchases
              </h1>
              <p className="text-emerald-100/70 mt-1">
                Monitor all recent course enrollments and payments
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
          {purchases?.length === 0 ? (
            <div className="text-center py-16">
              <CreditCard className="w-16 h-16 mx-auto text-emerald-800/80 mb-4 opacity-50" />
              <p className="text-emerald-100/60 text-lg">No purchases recorded yet today</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-emerald-800/50"
            >
              {purchases.map((purchase, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "rgba(6, 78, 59, 0.4)" }}
                  className="p-5 transition-colors duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-emerald-800/80 border border-emerald-600/50 flex items-center justify-center shadow-inner group-hover:bg-emerald-700 transition-colors shrink-0 mt-1">
                      <span className="text-emerald-300 font-bold text-lg uppercase group-hover:text-white transition-colors">
                        {purchase.userName?.charAt(0) || "U"}
                      </span>
                    </div>

                    {/* Details Container */}
                    <div className="flex-1 min-w-0">
                      
                      {/* Name & Amount Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                        <p className="font-bold text-white text-lg group-hover:text-emerald-300 transition-colors truncate">
                          {purchase.userName || "Unknown User"}
                        </p>
                        {purchase.amount && (
                          <span className="text-lg font-extrabold text-teal-400 bg-teal-950/50 px-3 py-0.5 rounded-lg border border-teal-800/50">
                            ${purchase.amount}
                          </span>
                        )}
                      </div>

                      {/* Course Details */}
                      <p className="text-sm font-medium text-emerald-100/80 mb-2 truncate">
                        {purchase.courseName || purchase.details || "Course Enrollment"}
                      </p>

                      {/* Meta Info (Email & Date) */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <p className="text-xs text-emerald-100/60 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="truncate">{purchase.userEmail}</span>
                        </p>
                        <span className="text-emerald-100/30 hidden sm:inline">•</span>
                        <p className="text-xs text-emerald-100/60 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-teal-500" />
                          {formatDate(purchase.timestamp)}
                        </p>
                      </div>

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