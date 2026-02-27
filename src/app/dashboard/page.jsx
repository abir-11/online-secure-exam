// "use client";

// import Link from "next/link";
// import { useSession } from "next-auth/react";

// export default function DashboardPage() {
//   const { data: session } = useSession();

//   return (
//     <main className="min-h-screen bg-gray-900 text-gray-200 p-2 mt-10">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-10">
//           Welcome to SecureExam Dashboard
//         </h1>

//         {/* Instructor Testing Panel */}
//         {session?.user?.role === "instructor" && (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <Link
//               href="/dashboard/instructor/create-batch"
//               className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
//             >
//               Create Batch
//             </Link>

//             <Link
//               href="/dashboard/instructor/add-students"
//               className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
//             >
//               Add Students to Batch
//             </Link>

//             <Link
//               href="/dashboard/instructor/create-exam"
//               className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
//             >
//               Create Exam
//             </Link>

//             <Link
//               href="/dashboard/instructor/question-bank"
//               className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
//             >
//               Add Questions
//             </Link>

//             <Link
//               href="/dashboard/instructor/exam-list"
//               className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
//             >
//               Publish Exam
//             </Link>

//             <Link
//               href="/dashboard/instructor/analytics"
//               className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
//             >
//               View Analytics
//             </Link>
//           </div>
//         )}

//         {/* Student Panel */}
//         {session?.user?.role === "student" && (
//           <div className="grid md:grid-cols-2 gap-6">
//             <Link
//               href="/dashboard/student/my-exams"
//               className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
//             >
//               View Available Exams
//             </Link>

//             <Link
//               href="/dashboard/student/results"
//               className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
//             >
//               View Results
//             </Link>
//           </div>
//         )}
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
    <main className="min-h-screen bg-gray-50 text-gray-800 p-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-[#0D7C66]">
          SecureExam Dashboard
        </h1>

        {/* Instructor Panel */}
        {session?.user?.role === "instructor" && (
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              href="/dashboard/instructor/create-batch"
              title="Create Batch"
            />
            <Card
              href="/dashboard/instructor/add-students"
              title="Add Students"
            />
            <Card
              href="/dashboard/instructor/create-exam"
              title="Create Exam"
            />
            <Card
              href="/dashboard/instructor/question-bank"
              title="Question Bank"
            />
            <Card
              href="/dashboard/instructor/exam-list"
              title="Publish Exams"
            />
            <Card href="/dashboard/instructor/analytics" title="Analytics" />
          </section>
        )}

        {/* Student Panel */}
        {session?.user?.role === "student" && (
          <section className="grid md:grid-cols-2 gap-8">
            <Card href="/dashboard/student/my-exams" title="Available Exams" />
            <Card href="/dashboard/student/results" title="View Results" />
          </section>
        )}
      </div>
    </main>
  );
}

/* ====================== Reusable Card Component ====================== */
function Card({ href, title }) {
  return (
    <Link
      href={href}
      className="bg-white shadow-lg border border-gray-200 rounded-xl p-8 flex flex-col justify-between 
                 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 text-sm">
        Click to manage <span className="font-medium">{title}</span>.
      </p>
    </Link>
  );
}
