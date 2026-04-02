"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart2,
  PieChart,
  FileText,
  Layers,
  TrendingUp,
  ChevronRight,
  LayoutDashboard,
  Zap
} from "lucide-react";

export default function AdminReportsPage() {
  const router = useRouter();

  const reports = [
    {
      id: 1,
      name: "Student Performance",
      icon: BarChart2,
      description: "In-depth analysis of individual and group scores",
      path: "/dashboard/admin/reports/student-performance",
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-400",
      border: "border-blue-500/30",
    },
    {
      id: 3,
      name: "Exam Reports",
      icon: FileText,
      description: "Detailed breakdown of exam metrics and results",
      path: "/dashboard/admin/reports/exam-reports",
      color: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-400",
      border: "border-purple-500/30",
    },
    {
      id: 4,
      name: "Batch Analytics",
      icon: PieChart,
      description: "Comparative insights across different student batches",
      path: "/dashboard/admin/reports/batch-analytics",
      color: "from-amber-500/20 to-amber-600/20",
      iconColor: "text-amber-400",
      border: "border-amber-500/30",
    },
    {
      id: 5,
      name: "Course Progress",
      icon: Layers,
      description: "Monitor curriculum coverage and completion rates",
      path: "/dashboard/admin/reports/course-progress",
      color: "from-emerald-500/20 to-emerald-600/20",
      iconColor: "text-emerald-400",
      border: "border-emerald-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-950 p-6 md:p-12 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/20 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />

      {/* Breadcrumb / Top Bar */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-2 text-emerald-500/60 text-xs font-black uppercase tracking-[0.2em] mb-4">
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-emerald-400">Intelligence Reports</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-3">
              Admin <span className="text-emerald-400">Reports Center</span>
            </h1>
            <p className="text-emerald-100/40 font-medium max-w-xl">
              Access real-time data visualization and comprehensive analytics to monitor institutional growth and student success.
            </p>
          </div>
          <div className="hidden md:block">
             <div className="px-4 py-2 bg-emerald-900/30 border border-emerald-800/50 rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400/70 text-xs font-bold uppercase tracking-widest">Live System Status</span>
             </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(report.path)}
              className="group relative cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${report.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-xl`} />
              
              <div className={`relative bg-emerald-900/20 backdrop-blur-md border ${report.border} hover:border-emerald-400/50 rounded-[2.5rem] p-8 h-full flex flex-col md:flex-row items-center md:items-start gap-8 transition-all duration-300`}>
                
                {/* Icon Container */}
                <div className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-3xl bg-emerald-950 border border-emerald-800/50 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-2xl`}>
                  <report.icon className={`w-10 h-10 md:w-12 md:h-12 ${report.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      {report.name}
                    </h2>
                    <span className="hidden md:inline-block px-2 py-0.5 rounded bg-emerald-800/50 text-emerald-400 text-[10px] font-black uppercase tracking-tighter self-center">
                        Active
                    </span>
                  </div>
                  <p className="text-emerald-100/40 text-sm font-medium mb-6 leading-relaxed">
                    {report.description}
                  </p>

                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <button className="px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                      Explore Data
                      <Zap className="w-3 h-3 fill-current" />
                    </button>
                    <div className="p-2.5 rounded-xl border border-emerald-800 text-emerald-800 group-hover:text-emerald-400 group-hover:border-emerald-400/30 transition-all">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-emerald-900/50 flex justify-between items-center opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Analytics Engine v2.0</p>
          <div className="flex gap-4">
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
          </div>
      </div>
    </div>
  );
}