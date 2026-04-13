// "use client";

// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import {
//   FaChalkboardTeacher,
//   FaUserGraduate,
//   FaFileAlt,
//   FaTasks,
//   FaChartLine,
//   FaBookOpen,
// } from "react-icons/fa";
// import AdminDashboard from "./admin/page";

// export default function DashboardPage() {
//   const { data: session } = useSession();

//   return (
//     <main className="min-h-screen  bg-primary pt-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-extrabold mb-12 text-center text-teal-800">
//           SecureExam Dashboard
//         </h1>

//         {/* Welcome Card */}
//         <div className="flex justify-center mb-12">
//           <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-200 transform transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-2xl animate-fadeIn">
//             <h2 className="text-3xl font-bold mb-4 text-teal-700">
//               {session.user.role.charAt(0).toUpperCase() +
//                 session.user.role.slice(1)}{" "}
//               Dashboard
//             </h2>
//             <p className="text-lg mb-2">
//               Welcome,{" "}
//               <span className="font-semibold">{session.user.name}</span>!
//             </p>
//             <p className="text-md text-gray-600">
//               <span className="font-bold">Role:</span>{" "}
//               <span className="font-medium text-teal-700">
//                 {session.user.role}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* admin panel */}
//         {session?.user?.role === "admin" && <AdminDashboard></AdminDashboard>}

//         {/* Instructor Panel */}
//         {session?.user?.role === "instructor" && (
//           <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//             <Card
//               href="/dashboard/instructor/create-batch"
//               title="Create Batch"
//               icon={<FaChalkboardTeacher />}
//             />
//             <Card
//               href="/dashboard/instructor/add-students"
//               title="Add Students"
//               icon={<FaUserGraduate />}
//             />
//             <Card
//               href="/dashboard/instructor/create-exam"
//               title="Create Exam"
//               icon={<FaFileAlt />}
//             />
//             <Card
//               href="/dashboard/instructor/question-bank"
//               title="Question Bank"
//               icon={<FaBookOpen />}
//             />
//             <Card
//               href="/dashboard/instructor/exam-list"
//               title="Publish Exams"
//               icon={<FaTasks />}
//             />
//             <Card
//               href="/dashboard/instructor/analytics"
//               title="Analytics"
//               icon={<FaChartLine />}
//             />
//           </section>
//         )}

//         {/* Student Panel */}
//         {session?.user?.role === "student" && (
//           <section className="grid md:grid-cols-2 gap-8 mb-12">
//             <Card
//               href="/dashboard/student/my-exams"
//               title="Available Exams"
//               icon={<FaTasks />}
//             />
//             <Card
//               href="/dashboard/student/result"
//               title="View Results"
//               icon={<FaFileAlt />}
//             />
//             <Card
//               href="/dashboard/student/notifications"
//               title="Notifications"
//               icon={<FaFileAlt />}
//             />
//             <Card
//               href="/dashboard/student/online-courses"
//               title="Online Courses"
//               icon={<FaFileAlt />}
//             />
//           </section>
//         )}
//       </div>
//     </main>
//   );
// }

// /* ====================== Reusable Card Component ====================== */
// function Card({ href, title, icon }) {
//   return (
//     <Link
//       href={href}
//       className="bg-gradient-to-br from-teal-100 via-teal-50 to-white shadow-lg border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
//     >
//       <div className="flex items-center gap-3 mb-4 text-teal-700 text-2xl">
//         {icon} <h2 className="text-xl font-semibold">{title}</h2>
//       </div>
//       <p className="text-gray-600 text-sm">
//         Click to manage <span className="font-medium">{title}</span>.
//       </p>
//     </Link>
//   );
// }

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
  FaBell,
  FaLaptop,
  FaWallet,
  FaTrophy,
} from "react-icons/fa";
import AdminDashboard from "./admin/page";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-emerald-950 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-emerald-600/40 to-teal-500/40 backdrop-blur-md border border-emerald-700/50 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {session?.user?.name}!
              </h1>
            </div>
            <div className="flex gap-3">
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl text-sm">
                {session?.user?.role}
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl text-sm">
                📅{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
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
            <Card
              href="/dashboard/student/notifications"
              title="Notification"
              icon={<FaBell />}
            />
            <Card
              href="/dashboard/student/online-courses"
              title="Online Courses"
              icon={<FaLaptop />}
            />
            <Card
              href="/dashboard/student/payment-history"
              title="Payment History"
              icon={<FaWallet />}
            />
            <Card
              href="/dashboard/student/awards"
              title="Awards"
              icon={<FaTrophy />}
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
      className="bg-emerald-900/30 backdrop-blur-md border border-emerald-700/50 rounded-2xl p-6 flex flex-col justify-between hover:bg-emerald-800/40 hover:border-emerald-500/50 transition-all duration-300 shadow-lg text-white"
    >
      <div className="flex items-center gap-3 mb-4 text-emerald-400 text-2xl">
        {icon} <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-emerald-100/70 text-sm">
        Click to manage <span className="font-medium">{title}</span>.
      </p>
    </Link>
  );
}
