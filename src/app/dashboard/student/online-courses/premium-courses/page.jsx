"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import PaymentModal from "@/components/PaymentModal";
import { 
  Gem, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Loader2,
  Crown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PremiumCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (course) => {
    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    setSelectedCourse(null);
  };

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="font-black tracking-widest text-xs uppercase animate-pulse">Unlocking Premium Access...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.3em] mb-3">
              <Crown size={16} className="text-yellow-500" /> Exclusive Experience
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
              Premium <span className="text-emerald-500 text-shadow-glow">Resources</span>
            </h1>
            <p className="text-emerald-100/60 font-medium text-lg">
              Unlock professional-grade mastery with top-tier courses.
            </p>
          </motion.div>

          <Link 
            href="/dashboard/student/online-courses"
            className="group flex items-center gap-3 px-6 py-3 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-400 border border-emerald-800/50 rounded-2xl transition-all font-bold text-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Categories
          </Link>
        </div>

        {/* Courses Section Container */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 bg-emerald-900/20 w-fit px-6 py-3 rounded-2xl border border-emerald-500/20 backdrop-blur-md shadow-xl shadow-black/20"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0">
              <Gem className="text-emerald-950" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight leading-none">VIP Curriculum</h2>
              <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-widest mt-1">Exclusive Interactive Content</p>
            </div>
          </motion.div>
          
          {courses.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-900/10 border-2 border-dashed border-emerald-800/50 p-20 rounded-[3rem] text-center backdrop-blur-sm"
            >
              <Sparkles className="w-12 h-12 text-emerald-800 mx-auto mb-4" />
              <p className="text-emerald-600 font-black uppercase tracking-widest text-sm">No premium courses available at the moment</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Note: Ensure CourseCard internally matches Emerald Theme, or pass props to style it */}
                  <CourseCard
                    course={course}
                    onBuyNow={handleBuyNow}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal with Animate Presence */}
      <AnimatePresence>
        {showPaymentModal && selectedCourse && (
          <PaymentModal 
            course={selectedCourse} 
            onClose={handlePaymentClose} 
            itemType="course" 
          />
        )}
      </AnimatePresence>

      {/* Bottom Tagline */}
      <div className="mt-20 flex flex-col items-center">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-[10px] uppercase tracking-[0.5em] mb-4">
          <ShieldCheck size={14} /> Secured Premium Access <ShieldCheck size={14} />
        </div>
      </div>
    </main>
  );
}