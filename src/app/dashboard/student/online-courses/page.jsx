"use client";

import Link from "next/link";
import { 
  BookOpen, 
  Gem, 
  Trophy, 
  ArrowRight, 
  Sparkles, 
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function OnlineCoursesPage() {
  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.4em] mb-4"
          >
            <LayoutDashboard size={18} /> Student Learning Hub
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4"
          >
            Expert <span className="text-emerald-500">Learning.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-100/60 font-medium text-xl max-w-2xl leading-relaxed"
          >
            Select a specialized category below to explore our world-class resources and advance your career.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Widget 1: Free Learning */}
          <CategoryCard 
            href="/dashboard/student/online-courses/free-resources"
            icon={<BookOpen size={32} />}
            title="Free Resources"
            description="Access carefully curated free learning materials to kickstart your journey with zero cost."
            color="text-blue-400"
            bgColor="bg-blue-500"
            delay={0.3}
          />

          {/* Widget 2: Premium Resources */}
          <CategoryCard 
            href="/dashboard/student/online-courses/premium-courses"
            icon={<Gem size={32} />}
            title="Premium Access"
            description="Unlock advanced courses, premium tutorials, and exclusive interactive content for experts."
            color="text-emerald-400"
            bgColor="bg-emerald-500"
            delay={0.4}
            isPremium
          />

          {/* Widget 3: Paid Exam */}
          <CategoryCard 
            href="/dashboard/student/online-courses/certification-exams"
            icon={<Trophy size={32} />}
            title="Get Certified"
            description="Ready to test your knowledge? Browse our industry-recognized certification exams."
            color="text-yellow-500"
            bgColor="bg-yellow-500"
            delay={0.5}
          />

        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-20 p-8 rounded-[2.5rem] bg-gradient-to-r from-emerald-900/40 to-transparent border border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <ShieldCheck className="text-emerald-500" size={32} />
            <p className="text-emerald-100/70 font-bold uppercase tracking-widest text-xs">
              All certifications are verified and industry-standard
            </p>
          </div>
          <div className="h-[1px] flex-grow bg-emerald-500/10 mx-8 hidden md:block"></div>
          <Sparkles className="text-emerald-800" />
        </motion.div>
      </div>
    </main>
  );
}

// Reusable Category Card Component
function CategoryCard({ href, icon, title, description, color, bgColor, delay, isPremium }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link 
        href={href}
        className="group relative block h-full bg-emerald-950/40 border border-emerald-800/50 p-10 rounded-[3rem] transition-all hover:bg-emerald-900/40 hover:border-emerald-500/40 overflow-hidden backdrop-blur-md"
      >
        {/* Glow Effect on Hover */}
        <div className={`absolute -right-8 -top-8 w-32 h-32 ${bgColor} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity`}></div>

        <div className={`w-16 h-16 rounded-[1.5rem] ${bgColor} flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
          <div className="text-emerald-950">
            {icon}
          </div>
        </div>

        {isPremium && (
          <span className="absolute top-10 right-10 flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-500/20">
            <Sparkles size={10} /> Exclusive
          </span>
        )}

        <h2 className="text-2xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
          {title}
        </h2>
        
        <p className="text-emerald-100/50 font-medium leading-relaxed mb-8">
          {description}
        </p>

        <div className={`flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] ${color} mt-auto`}>
          Explore Now <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}