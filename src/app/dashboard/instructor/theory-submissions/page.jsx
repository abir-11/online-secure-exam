// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ChevronRightIcon } from "lucide-react"; // nice arrow icon

// export default function TheorySubmissionsListPage() {
//   const [exams, setExams] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchExams() {
//       try {
//         const res = await fetch("/api/instructor/exam-list?type=theory");
//         const data = await res.json();

//         const sorted = (data.exams || []).sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
//         );

//         setExams(sorted);
//       } catch (err) {
//         console.error("Failed to load exams:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchExams();
//   }, []);

//   if (loading)
//     return <p className="p-6 text-teal-700 font-medium">Loading exams...</p>;
//   if (!exams.length)
//     return <p className="p-6 text-gray-600">No theory exams found.</p>;

//   return (
//     <main className="p-6 min-h-screen bg-primary">
//       <h1 className="text-3xl font-bold mb-6 text-teal-800">
//         Theory Exam Submissions
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full rounded-lg shadow-lg">
//           <thead className="bg-teal-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-teal-800 font-semibold">
//                 Exam Title
//               </th>
//               <th className="px-6 py-3 text-left text-teal-800 font-semibold">
//                 Batches
//               </th>
//               <th className="px-6 py-3 text-left text-teal-800 font-semibold">
//                 Start Time
//               </th>
//               <th className="px-6 py-3 text-left text-teal-800 font-semibold">
//                 End Time
//               </th>
//               <th className="px-6 py-3 text-left text-teal-800 font-semibold">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {exams.map((exam, index) => (
//               <tr
//                 key={exam._id}
//                 className={`transition-all duration-200 ${
//                   index % 2 === 0 ? "bg-white" : "bg-teal-50"
//                 } hover:bg-teal-100`}
//               >
//                 <td className="px-6 py-4 font-medium text-gray-700">
//                   {exam.title}
//                 </td>
//                 <td className="px-6 py-4 text-gray-600">
//                   {exam.batchNames && exam.batchNames.length > 0
//                     ? exam.batchNames.join(", ")
//                     : "N/A"}
//                 </td>
//                 <td className="px-6 py-4 text-gray-600">
//                   {new Date(exam.startTime).toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4 text-gray-600">
//                   {new Date(exam.endTime).toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4">
//                   <Link
//                     href={`/dashboard/instructor/theory-submissions/${exam._id}`}
//                     className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
//                   >
//                     View
//                     <ChevronRightIcon className="ml-2 w-4 h-4" />
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// }

//responsive design

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export default function TheorySubmissionsListPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/instructor/exam-list?type=theory");
        const data = await res.json();

        const sorted = (data.exams || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        setExams(sorted);
      } catch (err) {
        console.error("Failed to load exams:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-emerald-400 text-lg font-semibold">
        Loading Exams...
      </div>
    );

  if (!exams.length)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        No theory exams found.
      </div>
    );

  return (
    <main className="min-h-screen bg-slate-950 relative p-4 md:p-6 overflow-hidden">
      {/* Background glow (like homepage) */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-teal-500/20 blur-[100px] rounded-full"></div>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white relative z-10">
        Theory Exam Submissions
      </h1>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto relative z-10">
        <table className="min-w-full rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-emerald-400 font-semibold">
                Exam Title
              </th>
              <th className="px-6 py-3 text-left text-emerald-400 font-semibold">
                Batches
              </th>
              <th className="px-6 py-3 text-left text-emerald-400 font-semibold">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-emerald-400 font-semibold">
                End Time
              </th>
              <th className="px-6 py-3 text-left text-emerald-400 font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam, index) => (
              <tr
                key={exam._id}
                className={`transition ${
                  index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"
                } hover:bg-emerald-900/40`}
              >
                <td className="px-6 py-4 text-white font-medium">
                  {exam.title}
                </td>
                <td className="px-6 py-4 text-slate-300">
                  {exam.batchNames?.join(", ") || "N/A"}
                </td>
                <td className="px-6 py-4 text-slate-300">
                  {new Date(exam.startTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-slate-300">
                  {new Date(exam.endTime).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/instructor/theory-submissions/${exam._id}`}
                    className="inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 transition shadow"
                  >
                    View
                    <ChevronRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD */}
      <div className="md:hidden space-y-4 relative z-10">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow"
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              {exam.title}
            </h2>

            <p className="text-sm text-slate-300">
              <span className="text-emerald-400 font-medium">Batches:</span>{" "}
              {exam.batchNames?.join(", ") || "N/A"}
            </p>

            <p className="text-sm text-slate-300">
              <span className="text-emerald-400 font-medium">Start:</span>{" "}
              {new Date(exam.startTime).toLocaleString()}
            </p>

            <p className="text-sm text-slate-300">
              <span className="text-emerald-400 font-medium">End:</span>{" "}
              {new Date(exam.endTime).toLocaleString()}
            </p>

            <Link
              href={`/dashboard/instructor/theory-submissions/${exam._id}`}
              className="mt-3 inline-flex items-center bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-500 transition text-sm"
            >
              View
              <ChevronRightIcon className="ml-2 w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
