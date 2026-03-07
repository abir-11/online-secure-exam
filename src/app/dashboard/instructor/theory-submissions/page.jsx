// // // // // //dashboard/theory-submissions/page.jsx
// // // // // "use client";

// // // // // import { useEffect, useState } from "react";
// // // // // import Link from "next/link";

// // // // // export default function TheorySubmissionsListPage() {
// // // // //   const [exams, setExams] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     async function fetchExams() {
// // // // //       const res = await fetch("/api/instructor/exam-list?type=theory");
// // // // //       const data = await res.json();
// // // // //       setExams(data.exams || []);
// // // // //       setLoading(false);
// // // // //     }
// // // // //     fetchExams();
// // // // //   }, []);

// // // // //   if (loading) return <p>Loading exams...</p>;
// // // // //   if (!exams.length) return <p>No theory exams found.</p>;

// // // // //   return (
// // // // //     <main className="p-6">
// // // // //       <h1 className="text-2xl font-bold mb-4">Theory Exam Submissions</h1>
// // // // //       <ul className="space-y-2">
// // // // //         {exams.map((exam) => (
// // // // //           <li key={exam._id}>
// // // // //             <Link
// // // // //               href={`/dashboard/instructor/theory-submissions/${exam._id}`}
// // // // //               className="text-blue-600 hover:underline"
// // // // //             >
// // // // //               {exam.title}
// // // // //             </Link>
// // // // //           </li>
// // // // //         ))}
// // // // //       </ul>
// // // // //     </main>
// // // // //   );
// // // // // }

// // // // // sort...

// // // // "use client";

// // // // import { useEffect, useState } from "react";
// // // // import Link from "next/link";

// // // // export default function TheorySubmissionsListPage() {
// // // //   const [exams, setExams] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     async function fetchExams() {
// // // //       try {
// // // //         const res = await fetch("/api/instructor/exam-list?type=theory");
// // // //         const data = await res.json();

// // // //         // Sort latest exams first
// // // //         const sorted = (data.exams || []).sort(
// // // //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
// // // //         );

// // // //         setExams(sorted);
// // // //       } catch (err) {
// // // //         console.error("Failed to load exams:", err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     }

// // // //     fetchExams();
// // // //   }, []);

// // // //   if (loading) return <p className="p-6">Loading exams...</p>;

// // // //   if (!exams.length) {
// // // //     return <p className="p-6">No theory exams found.</p>;
// // // //   }

// // // //   return (
// // // //     <main className="p-6 mt-10">
// // // //       <h1 className="text-2xl font-bold mb-6">Theory Exam Submissions</h1>

// // // //       <div className="overflow-x-auto">
// // // //         <table className="min-w-full border border-gray-300 rounded-lg">
// // // //           <thead className="bg-gray-100">
// // // //             <tr>
// // // //               <th className="border px-4 py-2 text-left">Exam Title</th>
// // // //               <th className="border px-4 py-2 text-left">Batch</th>
// // // //               <th className="border px-4 py-2 text-left">Start Time</th>
// // // //               <th className="border px-4 py-2 text-left">End Time</th>
// // // //               <th className="border px-4 py-2 text-left">Action</th>
// // // //             </tr>
// // // //           </thead>

// // // //           <tbody>
// // // //             {exams.map((exam) => (
// // // //               <tr key={exam._id} className="hover:bg-gray-50">
// // // //                 <td className="border px-4 py-2 font-medium">{exam.title}</td>

// // // //                 <td className="border px-4 py-2">{exam.batch || "N/A"}</td>

// // // //                 <td className="border px-4 py-2">
// // // //                   {new Date(exam.startTime).toLocaleString()}
// // // //                 </td>

// // // //                 <td className="border px-4 py-2">
// // // //                   {new Date(exam.endTime).toLocaleString()}
// // // //                 </td>

// // // //                 <td className="border px-4 py-2">
// // // //                   <Link
// // // //                     href={`/dashboard/instructor/theory-submissions/${exam._id}`}
// // // //                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
// // // //                   >
// // // //                     View Submissions
// // // //                   </Link>
// // // //                 </td>
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>
// // // //     </main>
// // // //   );
// // // // }

// // // //..
// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import Link from "next/link";

// // // export default function TheorySubmissionsListPage() {
// // //   const [exams, setExams] = useState([]);
// // //   const [batches, setBatches] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     async function fetchData() {
// // //       try {
// // //         // 1️⃣ Fetch theory exams
// // //         const resExams = await fetch("/api/instructor/exam-list?type=theory");
// // //         const dataExams = await resExams.json();
// // //         const sortedExams = (dataExams.exams || []).sort(
// // //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
// // //         );

// // //         // 2️⃣ Fetch batches
// // //         const resBatches = await fetch("/api/batches");
// // //         const dataBatches = await resBatches.json();

// // //         setExams(sortedExams);
// // //         setBatches(dataBatches || []);
// // //       } catch (err) {
// // //         console.error("Failed to load exams or batches:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }

// // //     fetchData();
// // //   }, []);

// // //   // Helper: get batch name(s) for an exam
// // //   const getBatchName = (exam) => {
// // //     // If your exam has a "students" array or criteria, map to batch name
// // //     const studentEmails = exam.students || [];
// // //     const batchNames = batches
// // //       .filter((b) => b.students?.some((s) => studentEmails.includes(s)))
// // //       .map((b) => b.name);

// // //     return batchNames.length ? batchNames.join(", ") : "N/A";
// // //   };

// // //   if (loading) return <p className="p-6">Loading exams...</p>;
// // //   if (!exams.length) return <p className="p-6">No theory exams found.</p>;

// // //   return (
// // //     <main className="p-6 mt-10">
// // //       <h1 className="text-2xl font-bold mb-6">Theory Exam Submissions</h1>

// // //       <div className="overflow-x-auto">
// // //         <table className="min-w-full border border-gray-300 rounded-lg">
// // //           <thead className="bg-gray-100">
// // //             <tr>
// // //               <th className="border px-4 py-2 text-left">Exam Title</th>
// // //               <th className="border px-4 py-2 text-left">Batch</th>
// // //               <th className="border px-4 py-2 text-left">Start Time</th>
// // //               <th className="border px-4 py-2 text-left">End Time</th>
// // //               <th className="border px-4 py-2 text-left">Action</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {exams.map((exam) => (
// // //               <tr key={exam._id} className="hover:bg-gray-50">
// // //                 <td className="border px-4 py-2 font-medium">{exam.title}</td>

// // //                 <td className="border px-4 py-2">{getBatchName(exam)}</td>

// // //                 <td className="border px-4 py-2">
// // //                   {new Date(exam.startTime).toLocaleString()}
// // //                 </td>

// // //                 <td className="border px-4 py-2">
// // //                   {new Date(exam.endTime).toLocaleString()}
// // //                 </td>

// // //                 <td className="border px-4 py-2">
// // //                   <Link
// // //                     href={`/dashboard/instructor/theory-submissions/${exam._id}`}
// // //                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
// // //                   >
// // //                     View Submissions
// // //                   </Link>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </main>
// // //   );
// // // }

// // //..............

// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";

// // export default function TheorySubmissionsListPage() {
// //   const [exams, setExams] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchExams() {
// //       try {
// //         const res = await fetch("/api/instructor/exam-list?type=theory");
// //         const data = await res.json();

// //         // Sort latest exams first
// //         const sorted = (data.exams || []).sort(
// //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
// //         );

// //         setExams(sorted);
// //       } catch (err) {
// //         console.error("Failed to load exams:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchExams();
// //   }, []);

// //   if (loading) return <p className="p-6">Loading exams...</p>;
// //   if (!exams.length) return <p className="p-6">No theory exams found.</p>;

// //   return (
// //     <main className="p-6 mt-10">
// //       <h1 className="text-2xl font-bold mb-6">Theory Exam Submissions</h1>

// //       <div className="overflow-x-auto">
// //         <table className="min-w-full border border-gray-300 rounded-lg">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="border px-4 py-2 text-left">Exam Title</th>
// //               <th className="border px-4 py-2 text-left">Batch</th>
// //               <th className="border px-4 py-2 text-left">Start Time</th>
// //               <th className="border px-4 py-2 text-left">End Time</th>
// //               <th className="border px-4 py-2 text-left">Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {exams.map((exam) => (
// //               <tr key={exam._id} className="hover:bg-gray-50">
// //                 <td className="border px-4 py-2 font-medium">{exam.title}</td>
// //                 <td className="border px-4 py-2">
// //                   {exam.batchNames && exam.batchNames.length > 0
// //                     ? exam.batchNames.join(", ")
// //                     : "N/A"}
// //                 </td>
// //                 <td className="border px-4 py-2">
// //                   {new Date(exam.startTime).toLocaleString()}
// //                 </td>
// //                 <td className="border px-4 py-2">
// //                   {new Date(exam.endTime).toLocaleString()}
// //                 </td>
// //                 <td className="border px-4 py-2">
// //                   <Link
// //                     href={`/dashboard/instructor/theory-submissions/${exam._id}`}
// //                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
// //                   >
// //                     View Submissions
// //                   </Link>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </main>
// //   );
// // }

// //............

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

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

//   if (loading) return <p className="p-6">Loading exams...</p>;
//   if (!exams.length) return <p className="p-6">No theory exams found.</p>;

//   return (
//     <main className="p-6 mt-10">
//       <h1 className="text-2xl font-bold mb-6">Theory Exam Submissions</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2 text-left">Exam Title</th>
//               <th className="border px-4 py-2 text-left">Batches</th>
//               <th className="border px-4 py-2 text-left">Start Time</th>
//               <th className="border px-4 py-2 text-left">End Time</th>
//               <th className="border px-4 py-2 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {exams.map((exam) => (
//               <tr key={exam._id} className="hover:bg-gray-50">
//                 <td className="border px-4 py-2 font-medium">{exam.title}</td>
//                 <td className="border px-4 py-2">
//                   {exam.batchNames && exam.batchNames.length > 0
//                     ? exam.batchNames.join(", ")
//                     : "N/A"}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {new Date(exam.startTime).toLocaleString()}
//                 </td>
//                 <td className="border px-4 py-2">
//                   {new Date(exam.endTime).toLocaleString()}
//                 </td>
//                 <td className="border px-4 py-2">
//                   <Link
//                     href={`/dashboard/instructor/theory-submissions/${exam._id}`}
//                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                   >
//                     View Submissions
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

//............beautification

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react"; // nice arrow icon

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
    return <p className="p-6 text-teal-700 font-medium">Loading exams...</p>;
  if (!exams.length)
    return <p className="p-6 text-gray-600">No theory exams found.</p>;

  return (
    <main className="p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-teal-800">
        Theory Exam Submissions
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg shadow-lg">
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
    </main>
  );
}
