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
      <div className="flex items-center justify-center gap-2 p-8 text-center text-teal-600 font-semibold text-lg">
        <svg
          className="w-6 h-6 animate-spin text-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-teal-700 animate-pulse tracking-wide">
          Loading Exams...
        </span>
      </div>
    );
  if (!exams.length)
    return <p className="p-6 text-gray-600">No theory exams found.</p>;

  return (
    <main className="p-4 md:p-6 min-h-screen bg-primary">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-teal-800">
        Theory Exam Submissions
      </h1>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full rounded-lg shadow-lg border border-gray-200">
          <thead className="bg-teal-100">
            <tr>
              <th className="px-6 py-3 text-left text-teal-800 font-semibold">
                Exam Title
              </th>
              <th className="px-6 py-3 text-left text-teal-800 font-semibold">
                Batches
              </th>
              <th className="px-6 py-3 text-left text-teal-800 font-semibold">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-teal-800 font-semibold">
                End Time
              </th>
              <th className="px-6 py-3 text-left text-teal-800 font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam, index) => (
              <tr
                key={exam._id}
                className={`transition-all duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-teal-50"
                } hover:bg-teal-100`}
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                  {exam.title}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {exam.batchNames && exam.batchNames.length > 0
                    ? exam.batchNames.join(", ")
                    : "N/A"}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(exam.startTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(exam.endTime).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/instructor/theory-submissions/${exam._id}`}
                    className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
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

      {/* MOBILE CARD LAYOUT */}
      <div className="md:hidden space-y-4">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {exam.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Batches:</span>{" "}
              {exam.batchNames && exam.batchNames.length > 0
                ? exam.batchNames.join(", ")
                : "N/A"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Start:</span>{" "}
              {new Date(exam.startTime).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">End:</span>{" "}
              {new Date(exam.endTime).toLocaleString()}
            </p>
            <Link
              href={`/dashboard/instructor/theory-submissions/${exam._id}`}
              className="mt-2 inline-flex items-center bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm text-sm"
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
