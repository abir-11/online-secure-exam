// src/app/dashboard/admin/reports/page.jsx

"use client";

import { useRouter } from "next/navigation";
import {
  BarChart2,
  PieChart,
  FileText,
  Layers,
  TrendingUp,
} from "lucide-react";

export default function AdminReportsPage() {
  const router = useRouter();

  const reports = [
    {
      id: 1,
      name: "Student Performance",
      icon: BarChart2,
      description: "Overview of all students' scores",
      path: "/dashboard/admin/reports/student-performance",
      color: "from-teal-500 to-teal-600",
    },
    {
      id: 2,
      name: "Exam Reports",
      icon: FileText,
      description: "Detailed exam results",
      path: "/dashboard/admin/reports/exam-reports",
      color: "from-teal-500 to-teal-600",
    },
    {
      id: 3,
      name: "Batch Analytics",
      icon: PieChart,
      description: "Insights per batch",
      path: "/dashboard/admin/reports/batch-analytics",
      color: "from-teal-500 to-teal-600",
    },
    {
      id: 4,
      name: "Course Progress",
      icon: Layers,
      description: "Track course completion",
      path: "/dashboard/admin/reports/course-progress",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-950 p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
          Admin Reports
        </h1>
        <p className="text-emerald-200 text-sm md:text-base">
          View and manage all your reports from one place
        </p>
      </div>

      {/* Reports Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              onClick={() => router.push(report.path)}
              className="group cursor-pointer bg-gray-800 rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 md:p-6 flex flex-col items-center text-center transform hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r ${report.color} flex items-center justify-center mb-3 md:mb-4 shadow-md group-hover:shadow-lg`}
              >
                <report.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>

              {/* Report Name */}
              <h2 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                {report.name}
              </h2>

              {/* Report Description */}
              <p className="text-emerald-200 text-xs md:text-sm mb-3 md:mb-4">
                {report.description}
              </p>

              {/* View Report Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevents double navigation
                  router.push(report.path);
                }}
                className="px-4 md:px-6 py-1.5 md:py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg md:rounded-xl text-sm transition-all flex items-center gap-2"
              >
                View Report
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
