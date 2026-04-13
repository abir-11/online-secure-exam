// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   ArrowLeft,
//   Users,
//   GraduationCap,
//   Trophy,
//   Award,
//   Search,
//   ChevronRight,
//   BarChart3,
//   Calendar,
//   TrendingUp,
// } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function StudentPerformancePage() {
//   const router = useRouter();
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [performanceData, setPerformanceData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/admin/reports/student-performance");
//       setPerformanceData(res.data);
//       setStudents(res.data.students || []);

//       if (res.data.performanceData && res.data.performanceData.length > 0) {
//         setSelectedStudent(res.data.performanceData[0]);
//       }
//     } catch (error) {
//       toast.error("Failed to load data");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectStudent = (studentId) => {
//     const student = performanceData?.performanceData?.find(
//       (s) => s.student.id === studentId,
//     );
//     setSelectedStudent(student);
//   };

//   const filteredStudents = students.filter(
//     (s) =>
//       s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.email.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const getScoreColor = (percentage) => {
//     const p = parseFloat(percentage);
//     if (p >= 80) return "text-green-600 bg-green-100";
//     if (p >= 60) return "text-blue-600 bg-blue-100";
//     if (p >= 40) return "text-yellow-600 bg-yellow-100";
//     return "text-red-600 bg-red-100";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#0D7C66] border-t-transparent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-emerald-950 p-4 md:p-6">
//       {/* Back Button */}
//       <button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 text-gray-600 hover:text-[#0D7C66] mb-4 md:mb-6 transition-colors"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         <span className="text-sm">Back to Reports</span>
//       </button>

//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] rounded-xl md:rounded-2xl p-5 md:p-6 mb-6 text-white">
//         <h1 className="text-xl md:text-2xl font-bold">
//           📊 Student Performance Report
//         </h1>
//         <p className="text-white/80 text-sm mt-1">
//           Detailed analysis of student exam results
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
//         <StatCard
//           icon={Users}
//           title="Total Students"
//           value={students.length}
//           color="bg-blue-50 text-blue-600"
//         />
//         <StatCard
//           icon={GraduationCap}
//           title="Exams Taken"
//           value={
//             performanceData?.performanceData?.reduce(
//               (sum, s) => sum + s.summary.totalExams,
//               0,
//             ) || 0
//           }
//           color="bg-green-50 text-green-600"
//         />
//         <StatCard
//           icon={Trophy}
//           title="Avg Score"
//           value={selectedStudent?.summary?.avgPercentage || "0"}
//           suffix="%"
//           color="bg-purple-50 text-purple-600"
//         />
//         <StatCard
//           icon={Award}
//           title="Total Gems"
//           value={selectedStudent?.summary?.totalGems || 0}
//           color="bg-yellow-50 text-yellow-600"
//         />
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 mb-6">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
//           <input
//             type="text"
//             placeholder="Search student by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
//           />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Student List */}
//         <div className="lg:w-1/3 bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="p-3 md:p-4 border-b bg-gray-50">
//             <h2 className="font-semibold text-sm md:text-base flex items-center gap-2">
//               <Users className="w-4 h-4 text-[#0D7C66]" />
//               Students ({filteredStudents.length})
//             </h2>
//           </div>
//           <div className="divide-y max-h-[400px] lg:max-h-[500px] overflow-y-auto">
//             {filteredStudents.map((student) => (
//               <button
//                 key={student.id}
//                 onClick={() => handleSelectStudent(student.id)}
//                 className={`w-full p-3 md:p-4 text-left hover:bg-gray-50 transition flex items-center justify-between ${
//                   selectedStudent?.student?.id === student.id
//                     ? "bg-[#0D7C66]/5 border-l-4 border-[#0D7C66]"
//                     : ""
//                 }`}
//               >
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-gray-800 text-sm md:text-base truncate">
//                     {student.name}
//                   </p>
//                   <p className="text-xs text-gray-500 truncate">
//                     {student.email}
//                   </p>
//                 </div>
//                 <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
//               </button>
//             ))}
//             {filteredStudents.length === 0 && (
//               <div className="p-6 text-center text-gray-500 text-sm">
//                 No students found
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Performance Details */}
//         <div className="lg:w-2/3 space-y-6">
//           {selectedStudent ? (
//             <>
//               {/* Student Profile */}
//               <div className="bg-gradient-to-r from-[#0D7C66]/10 to-[#41B3A2]/10 rounded-xl p-4 md:p-6">
//                 <div className="flex items-center gap-3 md:gap-4">
//                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0D7C66] flex items-center justify-center text-white text-lg md:text-xl font-bold">
//                     {selectedStudent.student.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h2 className="text-base md:text-lg font-bold text-gray-800">
//                       {selectedStudent.student.name}
//                     </h2>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {selectedStudent.student.email}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 md:mt-6">
//                   <div className="text-center">
//                     <p className="text-xs text-gray-500">Exams</p>
//                     <p className="text-lg md:text-xl font-bold text-[#0D7C66]">
//                       {selectedStudent.summary.totalExams}
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-xs text-gray-500">Avg Score</p>
//                     <p className="text-lg md:text-xl font-bold text-[#0D7C66]">
//                       {selectedStudent.summary.avgPercentage}%
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-xs text-gray-500">Pass Rate</p>
//                     <p className="text-lg md:text-xl font-bold text-[#0D7C66]">
//                       {selectedStudent.summary.passRate}%
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-xs text-gray-500">Gems</p>
//                     <p className="text-lg md:text-xl font-bold text-yellow-600">
//                       {selectedStudent.summary.totalGems}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Exam Results Table */}
//               <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//                 <div className="p-3 md:p-4 border-b bg-gray-50">
//                   <h2 className="font-semibold text-sm md:text-base flex items-center gap-2">
//                     <BarChart3 className="w-4 h-4 text-[#0D7C66]" />
//                     Exam Results
//                   </h2>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[500px]">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500">
//                           Exam
//                         </th>
//                         <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500">
//                           Score
//                         </th>
//                         <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500">
//                           Result
//                         </th>
//                         <th className="px-3 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500">
//                           Date
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y">
//                       {selectedStudent.examResults.map((result, i) => (
//                         <tr key={i} className="hover:bg-gray-50">
//                           <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium">
//                             {result.examTitle}
//                           </td>
//                           <td className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm">
//                             {result.score}/{result.totalMarks}
//                           </td>
//                           <td className="px-3 md:px-4 py-2 md:py-3">
//                             <span
//                               className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(result.percentage)}`}
//                             >
//                               {result.percentage}%
//                             </span>
//                           </td>
//                           <td className="px-3 md:px-4 py-2 md:py-3 text-xs text-gray-500">
//                             {new Date(result.date).toLocaleDateString()}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 {selectedStudent.examResults.length === 0 && (
//                   <div className="p-6 text-center text-gray-500 text-sm">
//                     No exam results found
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center">
//               <GraduationCap className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-300 mb-3 md:mb-4" />
//               <p className="text-gray-500 text-sm md:text-base">
//                 Select a student to view performance details
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Stat Card Component
// function StatCard({ icon: Icon, title, value, suffix = "", color }) {
//   return (
//     <div className={`${color} rounded-xl p-3 md:p-4 shadow-sm`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-xs md:text-sm opacity-80">{title}</p>
//           <p className="text-lg md:text-xl font-bold mt-1">
//             {value}
//             {suffix}
//           </p>
//         </div>
//         <Icon className="w-5 h-5 md:w-6 md:h-6 opacity-80" />
//       </div>
//     </div>
//   );
// }

//responsive try

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  GraduationCap,
  Trophy,
  Award,
  Search,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function StudentPerformancePage() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/reports/student-performance");
      setPerformanceData(res.data);
      setStudents(res.data.students || []);

      if (res.data.performanceData?.length > 0) {
        setSelectedStudent(res.data.performanceData[0]);
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = (studentId) => {
    const student = performanceData?.performanceData?.find(
      (s) => s.student.id === studentId,
    );
    setSelectedStudent(student);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getScoreColor = (percentage) => {
    const p = parseFloat(percentage);
    if (p >= 80) return "text-green-600 bg-green-100";
    if (p >= 60) return "text-blue-600 bg-blue-100";
    if (p >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#0D7C66] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 p-3 sm:p-4 md:p-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-300 hover:text-white mb-4 md:mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Reports</span>
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 text-white">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
          📊 Student Performance Report
        </h1>
        <p className="text-white/80 text-xs sm:text-sm mt-1">
          Detailed analysis of student exam results
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard
          icon={Users}
          title="Total Students"
          value={students.length}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={GraduationCap}
          title="Exams Taken"
          value={
            performanceData?.performanceData?.reduce(
              (sum, s) => sum + s.summary.totalExams,
              0,
            ) || 0
          }
          color="bg-green-50 text-green-600"
        />
        <StatCard
          icon={Trophy}
          title="Avg Score"
          value={selectedStudent?.summary?.avgPercentage || "0"}
          suffix="%"
          color="bg-purple-50 text-purple-600"
        />
        <StatCard
          icon={Award}
          title="Total Gems"
          value={selectedStudent?.summary?.totalGems || 0}
          color="bg-yellow-50 text-yellow-600"
        />
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-3 md:p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg"
          />
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Student List */}
        <div className="lg:w-1/3 bg-white rounded-xl overflow-hidden">
          <div className="p-3 border-b bg-gray-50">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0D7C66]" />
              Students ({filteredStudents.length})
            </h2>
          </div>

          <div className="divide-y max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto">
            {filteredStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => handleSelectStudent(student.id)}
                className={`w-full p-3 text-left flex justify-between ${
                  selectedStudent?.student?.id === student.id
                    ? "bg-[#0D7C66]/10 border-l-4 border-[#0D7C66]"
                    : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{student.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {student.email}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-2/3 space-y-6">
          {selectedStudent ? (
            <>
              {/* Profile */}
              <div className="bg-white rounded-xl p-4">
                <h2 className="font-bold">{selectedStudent.student.name}</h2>
                <p className="text-sm text-gray-500">
                  {selectedStudent.student.email}
                </p>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {selectedStudent.examResults.map((r, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl">
                    <p className="font-medium text-sm">{r.examTitle}</p>
                    <p className="text-xs text-gray-500">
                      Score: {r.score}/{r.totalMarks}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getScoreColor(r.percentage)}`}
                    >
                      {r.percentage}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block bg-white rounded-xl overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs">Exam</th>
                      <th className="px-4 py-2 text-left text-xs">Score</th>
                      <th className="px-4 py-2 text-left text-xs">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudent.examResults.map((r, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2 text-sm">{r.examTitle}</td>
                        <td className="px-4 py-2 text-sm">
                          {r.score}/{r.totalMarks}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 text-xs rounded ${getScoreColor(r.percentage)}`}
                          >
                            {r.percentage}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="bg-white p-8 text-center rounded-xl">
              Select a student
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, suffix = "", color }) {
  return (
    <div className={`${color} rounded-xl p-3`}>
      <div className="flex justify-between">
        <div>
          <p className="text-xs">{title}</p>
          <p className="text-lg font-bold">
            {value}
            {suffix}
          </p>
        </div>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
