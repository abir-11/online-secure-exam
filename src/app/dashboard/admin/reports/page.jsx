// "use client";

// import { useState, useEffect } from "react";
// import { BarChart2, PieChart, FileText, Users, Layers } from "lucide-react";

// export default function AdminReportsPage() {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     setReports([
//       {
//         id: 1,
//         name: "Student Performance",
//         icon: "BarChart2",
//         description: "Overview of all students' scores",
//       },
//       {
//         id: 2,
//         name: "Attendance",
//         icon: "Users",
//         description: "Track student attendance",
//       },
//       {
//         id: 3,
//         name: "Exam Reports",
//         icon: "FileText",
//         description: "Detailed exam results",
//       },
//       {
//         id: 4,
//         name: "Batch Analytics",
//         icon: "PieChart",
//         description: "Insights per batch",
//       },
//       {
//         id: 5,
//         name: "Course Progress",
//         icon: "Layers",
//         description: "Track course completion",
//       },
//     ]);
//   }, []);

//   const renderIcon = (iconName) => {
//     switch (iconName) {
//       case "BarChart2":
//         return (
//           <BarChart2 className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
//         );
//       case "PieChart":
//         return (
//           <PieChart className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
//         );
//       case "FileText":
//         return (
//           <FileText className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
//         );
//       case "Users":
//         return (
//           <Users className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
//         );
//       case "Layers":
//         return (
//           <Layers className="w-12 h-12 text-teal-600 mb-4 group-hover:scale-110 transition-transform" />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <main className="min-h-screen p-6 bg-primary dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
//             Admin Reports
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             View and manage all your reports from one place
//           </p>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {reports.map((report) => (
//             <div
//               key={report.id}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center group"
//             >
//               {renderIcon(report.icon)}
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
//                 {report.name}
//               </h2>
//               <p className="text-gray-500 dark:text-gray-300">
//                 {report.description}
//               </p>
//               <button className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105">
//                 View Report
//               </button>
//             </div>
//           ))}
//         </div>

//         {reports.length === 0 && (
//           <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
//             <Users className="mx-auto mb-4 w-12 h-12" />
//             <p>No reports available</p>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import {
  BarChart2,
  PieChart,
  FileText,
  Users,
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
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "Attendance",
      icon: Users,
      description: "Track student attendance",
      path: "#",
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      name: "Exam Reports",
      icon: FileText,
      description: "Detailed exam results",
      path: "#",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      name: "Batch Analytics",
      icon: PieChart,
      description: "Insights per batch",
      path: "#",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 5,
      name: "Course Progress",
      icon: Layers,
      description: "Track course completion",
      path: "#",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Admin Reports
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
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
              className="group cursor-pointer bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 md:p-6 flex flex-col items-center text-center transform hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r ${report.color} flex items-center justify-center mb-3 md:mb-4 shadow-md group-hover:shadow-lg`}
              >
                <report.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>

              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                {report.name}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4">
                {report.description}
              </p>

              <button className="px-4 md:px-6 py-1.5 md:py-2 bg-[#0D7C66] hover:bg-[#41B3A2] text-white rounded-lg md:rounded-xl text-sm transition-all flex items-center gap-2">
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
