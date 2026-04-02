"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  LayoutDashboard, GraduationCap, FileText, PlusCircle, 
  Database, CheckSquare, BarChart3, ArrowRight, 
  Sparkles, Zap, ShieldCheck, TrendingUp 
} from "lucide-react";
import AdminDashboard from "./admin/page";

// --- Framer Motion Variants for Smooth Entrance ---
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  // --- Dynamic Content Configuration ---
  const menuConfig = {
    instructor: [
      { href: "/dashboard/instructor/create-batch", title: "Batch Engine", desc: "Launch new learning tracks", icon: PlusCircle, color: "from-blue-500 to-emerald-400", tag: "Management" },
      { href: "/dashboard/instructor/add-students", title: "Enrolment", desc: "Scale your student base", icon: GraduationCap, color: "from-emerald-400 to-teal-500", tag: "Users" },
      { href: "/dashboard/instructor/create-exam", title: "Assessment Hub", desc: "Create high-integrity exams", icon: FileText, color: "from-teal-500 to-cyan-500", tag: "Exams" },
      { href: "/dashboard/instructor/question-bank", title: "Knowledge Base", desc: "Centralized question assets", icon: Database, color: "from-cyan-500 to-blue-600", tag: "Storage" },
      { href: "/dashboard/instructor/exam-list", title: "Exam Control", desc: "Monitor & go-live status", icon: CheckSquare, color: "from-blue-600 to-indigo-500", tag: "Live" },
      { href: "/dashboard/instructor/analytics", title: "Growth Analytics", desc: "Deep dive into performance", icon: BarChart3, color: "from-indigo-500 to-emerald-500", tag: "Insights" },
    ],
    student: [
      { href: "/dashboard/student/my-exams", title: "My Assessments", desc: "Launch your active exams", icon: Zap, color: "from-emerald-400 to-teal-600", tag: "Active" },
      { href: "/dashboard/student/result", title: "Report Card", desc: "View detailed performance", icon: TrendingUp, color: "from-teal-600 to-blue-500", tag: "Results" },
    ]
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show"
      className="min-h-screen bg-emerald-950 text-emerald-50 p-4 md:p-8 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-emerald-800/50 pb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Sparkles size={18} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.3em]">System Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              Welcome back, <span className="text-white">{session?.user?.name?.split(' ')[0]}</span>
            </h1>
          </div>
          
          <div className="bg-emerald-900/40 backdrop-blur-md border border-emerald-700/50 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-xl">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest">Access Level</span>
              <span className="text-sm font-semibold flex items-center gap-1.5 capitalize">
                <ShieldCheck size={14} className="text-emerald-400" /> {role}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-emerald-800" />
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">
              {session?.user?.name?.charAt(0)}
            </div>
          </div>
        </motion.div>

        {/* --- Content Logic --- */}
        {role === "admin" ? (
          <AdminDashboard />
        ) : (
          <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuConfig[role]?.map((card, idx) => (
              <InteractiveCard key={idx} {...card} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// --- High-End Interactive Card Component ---
function InteractiveCard({ href, title, desc, icon: Icon, color, tag }) {
  return (
    <motion.div variants={item}>
      <Link href={href} className="group block h-full">
        <div className="relative h-full bg-emerald-900/20 backdrop-blur-sm border border-emerald-800/50 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-emerald-900/40 hover:border-emerald-500/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
          
          {/* Gradient Border Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500" />

          {/* Card Top: Tag & Icon */}
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
              <Icon size={24} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
              {tag}
            </span>
          </div>

          {/* Card Content */}
          <div className="relative z-10 space-y-3">
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-emerald-100/40 text-sm leading-relaxed font-medium">
              {desc}
            </p>
          </div>

          {/* Card Footer: Action Indicator */}
          <div className="mt-8 flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest relative z-10">
            <span className="group-hover:mr-2 transition-all duration-300">Open Module</span>
            <ArrowRight size={14} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>

          {/* Decorative Mesh background */}
          <div className="absolute bottom-[-20%] right-[-10%] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
            <Icon size={180} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}