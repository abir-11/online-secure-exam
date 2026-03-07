// // "use client";

// // import { useEffect, useState } from "react";

// // export default function StudentResultPage() {
// //   const [results, setResults] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchResults() {
// //       try {
// //         const res = await fetch("/api/student/result");
// //         const data = await res.json();
// //         setResults(data.results || []);
// //       } catch (err) {
// //         console.error("Failed to fetch results:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchResults();
// //   }, []);

// //   if (loading) return <div className="p-6">Loading results...</div>;

// //   if (!results.length)
// //     return <div className="p-6">You have no results yet.</div>;

// //   return (
// //     <main className="p-6">
// //       <h1 className="text-2xl font-bold mb-4 mt-20">My Exam Results</h1>

// //       <table className="table-auto border-collapse border border-gray-300 w-full">
// //         <thead>
// //           <tr className="bg-gray-100">
// //             <th className="border p-2">Exam Title</th>
// //             <th className="border p-2">Result</th>
// //             <th className="border p-2">Total Marks</th>
// //             <th className="border p-2">Exam Type</th> {/* New column */}
// //             <th className="border p-2">Submitted At</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {results.map((r) => (
// //             <tr key={r.examId}>
// //               <td className="border p-2">{r.title}</td>

// //               <td className="border p-2">
// //                 {r.status === "pending" && (
// //                   <span className="text-yellow-600 font-semibold">
// //                     Pending grading
// //                   </span>
// //                 )}

// //                 {r.status === "graded" && (
// //                   <span className="text-green-600 font-semibold">
// //                     {r.marksObtained}
// //                   </span>
// //                 )}

// //                 {/* MCQ auto-graded fallback */}
// //                 {!r.status && (
// //                   <span className="text-blue-600 font-semibold">
// //                     {r.marksObtained}
// //                   </span>
// //                 )}
// //               </td>

// //               <td className="border p-2">{r.totalMarks}</td>

// //               <td className="border p-2">
// //                 {r.examCategory || r.examType?.toUpperCase() || "Unknown"}
// //               </td>

// //               <td className="border p-2">
// //                 {new Date(r.submittedAt).toLocaleString()}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </main>
// //   );
// // }

// //.....

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function StudentResultPage() {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchResults() {
//       try {
//         const res = await fetch("/api/student/result");
//         const data = await res.json();
//         setResults(data.results || []);
//       } catch (err) {
//         console.error("Failed to fetch results:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchResults();
//   }, []);

//   if (loading)
//     return (
//       <div className="p-6 text-center text-gray-500">Loading results...</div>
//     );

//   if (!results.length)
//     return (
//       <div className="p-6 text-center text-gray-500">
//         You have no results yet.
//       </div>
//     );

//   return (
//     <main className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 mt-20 text-center">
//         My Exam Results
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-3 text-left">Exam Title</th>
//               <th className="border p-3 text-center">Result</th>
//               <th className="border p-3 text-center">Total Marks</th>
//               <th className="border p-3 text-center">Exam Type</th>
//               <th className="border p-3 text-center">Submitted At</th>
//               <th className="border p-3 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {results.map((r) => (
//               <tr key={r.examId} className="hover:bg-gray-50 transition">
//                 <td className="border p-3">{r.title}</td>

//                 <td className="border p-3 text-center">
//                   {r.status === "pending" && (
//                     <span className="text-yellow-600 font-semibold">
//                       Pending grading
//                     </span>
//                   )}

//                   {r.status === "graded" && (
//                     <span className="text-green-600 font-semibold">
//                       {r.marksObtained}
//                     </span>
//                   )}

//                   {!r.status && (
//                     <span className="text-blue-600 font-semibold">
//                       {r.marksObtained}
//                     </span>
//                   )}
//                 </td>

//                 <td className="border p-3 text-center">{r.totalMarks}</td>

//                 <td className="border p-3 text-center">
//                   {r.examCategory || r.examType?.toUpperCase() || "Unknown"}
//                 </td>

//                 <td className="border p-3 text-center">
//                   {new Date(r.submittedAt).toLocaleString()}
//                 </td>

//                 <td className="border p-3 text-center">
//                   <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                     onClick={() =>
//                       router.push(`/dashboard/student/result/${r.examId}`)
//                     }
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// }

///.........

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("/api/student/result");
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Failed to fetch results:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">Loading results...</div>
    );

  if (!results.length)
    return (
      <div className="p-6 text-center text-gray-500">
        You have no results yet.
      </div>
    );

  return (
    <main className="p-6  mx-auto  bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200">
      <h1 className="text-3xl font-bold mb-8  text-center text-teal-800">
        My Exam Results
      </h1>

      <div className="space-y-6">
        {results.map((r) => (
          <div
            key={r.examId}
            className="bg-gradient-to-r from-teal-50 to-teal-100 shadow-lg rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between transition hover:scale-105"
          >
            <div className="flex-1 mb-3 md:mb-0">
              <h2 className="text-xl font-semibold text-teal-900">{r.title}</h2>
              <p className="text-sm text-teal-700 mt-1">
                Exam Type:{" "}
                <span className="font-medium">
                  {r.examCategory || r.examType?.toUpperCase() || "Unknown"}
                </span>
              </p>
              <p className="text-sm text-teal-700 mt-1">
                Submitted At:{" "}
                <span className="font-medium">
                  {new Date(r.submittedAt).toLocaleString()}
                </span>
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-teal-700">Result</p>
                <p
                  className={`mt-1 font-semibold ${
                    r.status === "pending"
                      ? "text-yellow-600"
                      : r.status === "graded"
                        ? "text-green-600"
                        : "text-blue-600"
                  }`}
                >
                  {r.status === "pending" ? "Pending grading" : r.marksObtained}
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-teal-700">Total Marks</p>
                <p className="mt-1 font-semibold text-teal-900">
                  {r.totalMarks}
                </p>
              </div>

              <button
                onClick={() =>
                  router.push(`/dashboard/student/result/${r.examId}`)
                }
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
