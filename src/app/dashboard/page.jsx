// "use client";

// import Link from "next/link";

// export default function DashboardPage() {
//   const stats = [
//     { title: "Total Exams", value: 24 },
//     { title: "Students", value: 320 },
//     { title: "Completed Exams", value: 180 },
//     { title: "Pending Exams", value: 12 },
//   ];

//   const activities = [
//     "New exam created: Web Development Midterm",
//     "Student Rahim submitted Database Exam",
//     "Admin updated question bank",
//     "New student registered",
//   ];

//   return (
//     <main className="min-h-screen bg-gray-900 text-gray-200 p-2 mt-10">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <h1 className="text-3xl font-bold mb-6">Common Static Dashboard</h1>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition"
//             >
//               <h2 className="text-lg text-gray-400">{stat.title}</h2>
//               <p className="text-2xl font-bold mt-2">{stat.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="bg-gray-800 p-6 rounded-xl mb-10">
//           <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
//           <div className="flex flex-wrap gap-4">
//             <Link
//               href="/create-exam"
//               className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-black font-medium"
//             >
//               Create Exam
//             </Link>

//             <Link
//               href="/students"
//               className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-black font-medium"
//             >
//               View Students
//             </Link>

//             <Link
//               href="/question-bank"
//               className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg text-black font-medium"
//             >
//               Question Bank
//             </Link>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-gray-800 p-6 rounded-xl">
//           <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
//           <ul className="space-y-3">
//             {activities.map((activity, index) => (
//               <li
//                 key={index}
//                 className="border-b border-gray-700 pb-2 text-gray-300"
//               >
//                 {activity}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 p-2 mt-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">
          Welcome to SecureExam Dashboard
        </h1>

        {/* Instructor Testing Panel */}
        {session?.user?.role === "instructor" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/dashboard/instructor/create-batch"
              className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              Create Batch
            </Link>

            <Link
              href="/dashboard/instructor/add-students"
              className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              Add Students to Batch
            </Link>

            <Link
              href="/dashboard/instructor/create-exam"
              className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              Create Exam
            </Link>

            <Link
              href="/dashboard/instructor/question-bank"
              className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              Add Questions
            </Link>

            <Link
              href="/dashboard/instructor/exam-list"
              className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              Publish Exam
            </Link>

            <Link
              href="/dashboard/instructor/analytics"
              className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              View Analytics
            </Link>
          </div>
        )}

        {/* Student Panel */}
        {session?.user?.role === "student" && (
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/dashboard/student/my-exams"
              className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              View Available Exams
            </Link>

            <Link
              href="/dashboard/student/results"
              className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >
              View Results
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
