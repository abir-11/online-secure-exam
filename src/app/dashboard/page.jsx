// //dashboard/page.jsx
// "use client";

// import Link from "next/link";
// import { useSession } from "next-auth/react";

// export default function DashboardPage() {
//   const { data: session } = useSession();

//   return (
//     <main className="min-h-screen bg-gray-50 text-gray-800 p-6 mt-12">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-extrabold mb-12 text-center text-[#0D7C66]">
//           SecureExam Dashboard
//         </h1>

//         <div className="flex flex-col justify-center  p-4 bg-gray-50">
//           <div
//             className="max-w-md w-full mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200
//                   transform transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-2xl animate-fadeIn"
//           >
//             <h2 className="text-3xl font-bold mb-4 text-teal-600">
//               {session.user.role.charAt(0).toUpperCase() +
//                 session.user.role.slice(1) +
//                 " " +
//                 "Dashboard"}
//             </h2>
//             <p className="text-lg mb-2">
//               Welcome,{" "}
//               <span className="font-semibold">{session.user.name}</span>!
//             </p>
//             <p className="text-md text-gray-500">
//               <span className="font-bold">Role:</span>{" "}
//               <span className="font-medium">{session.user.role}</span>
//             </p>
//           </div>
//         </div>

//         {/* Instructor Panel */}
//         {session?.user?.role === "instructor" && (
//           <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <Card
//               href="/dashboard/instructor/create-batch"
//               title="Create Batch"
//             />
//             <Card
//               href="/dashboard/instructor/add-students"
//               title="Add Students"
//             />
//             <Card
//               href="/dashboard/instructor/create-exam"
//               title="Create Exam"
//             />
//             <Card
//               href="/dashboard/instructor/question-bank"
//               title="Question Bank"
//             />
//             <Card
//               href="/dashboard/instructor/exam-list"
//               title="Publish Exams"
//             />
//             <Card href="/dashboard/instructor/analytics" title="Analytics" />
//           </section>
//         )}

//         {/* Student Panel */}
//         {session?.user?.role === "student" && (
//           <section className="grid md:grid-cols-2 gap-8">
//             <Card href="/dashboard/student/my-exams" title="Available Exams" />
//             <Card href="/dashboard/student/result" title="View Results" />
//           </section>
//         )}
//       </div>
//     </main>
//   );
// }

// /* ====================== Reusable Card Component ====================== */
// function Card({ href, title }) {
//   return (
//     <Link
//       href={href}
//       className="bg-white shadow-lg border border-gray-200 rounded-xl p-8 flex flex-col justify-between
//                  hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
//     >
//       <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
//       <p className="text-gray-500 text-sm">
//         Click to manage <span className="font-medium">{title}</span>.
//       </p>
//     </Link>
//   );
// }

//...

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaFileAlt,
  FaTasks,
  FaChartLine,
  FaBookOpen,
} from "react-icons/fa";
import AdminDashboard from "./admin/page";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200 p-6 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-teal-800">
          SecureExam Dashboard
        </h1>

        {/* Welcome Card */}
        <div className="flex justify-center mb-12">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-200 transform transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-2xl animate-fadeIn">
            <h2 className="text-3xl font-bold mb-4 text-teal-700">
              {session.user.role.charAt(0).toUpperCase() +
                session.user.role.slice(1)}{" "}
              Dashboard
            </h2>
            <p className="text-lg mb-2">
              Welcome,{" "}
              <span className="font-semibold">{session.user.name}</span>!
            </p>
            <p className="text-md text-gray-600">
              <span className="font-bold">Role:</span>{" "}
              <span className="font-medium text-teal-700">
                {session.user.role}
              </span>
            </p>
          </div>
        </div>

        {/* admin panel */}
        {session?.user?.role === "admin" && <AdminDashboard></AdminDashboard>}
        {/* Instructor Panel */}
        {session?.user?.role === "instructor" && (
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card
              href="/dashboard/instructor/create-batch"
              title="Create Batch"
              icon={<FaChalkboardTeacher />}
            />
            <Card
              href="/dashboard/instructor/add-students"
              title="Add Students"
              icon={<FaUserGraduate />}
            />
            <Card
              href="/dashboard/instructor/create-exam"
              title="Create Exam"
              icon={<FaFileAlt />}
            />
            <Card
              href="/dashboard/instructor/question-bank"
              title="Question Bank"
              icon={<FaBookOpen />}
            />
            <Card
              href="/dashboard/instructor/exam-list"
              title="Publish Exams"
              icon={<FaTasks />}
            />
            <Card
              href="/dashboard/instructor/analytics"
              title="Analytics"
              icon={<FaChartLine />}
            />
          </section>
        )}

        {/* Student Panel */}
        {session?.user?.role === "student" && (
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            <Card
              href="/dashboard/student/my-exams"
              title="Available Exams"
              icon={<FaTasks />}
            />
            <Card
              href="/dashboard/student/result"
              title="View Results"
              icon={<FaFileAlt />}
            />
          </section>
        )}
      </div>
    </main>
  );
}

/* ====================== Reusable Card Component ====================== */
function Card({ href, title, icon }) {
  return (
    <Link
      href={href}
      className="bg-gradient-to-br from-teal-100 via-teal-50 to-white shadow-lg border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <div className="flex items-center gap-3 mb-4 text-teal-700 text-2xl">
        {icon} <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-gray-600 text-sm">
        Click to manage <span className="font-medium">{title}</span>.
      </p>
    </Link>
  );
}
