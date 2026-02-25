// "use client";

// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// export default function ExamListPage() {
//   const [exams, setExams] = useState([]);

//   useEffect(() => {
//     fetch("/api/exams")
//       .then((res) => res.json())
//       .then((data) => setExams(data))
//       .catch(console.error);
//   }, []);

//   const togglePublish = async (examId, currentStatus) => {
//     const response = await fetch("/api/exams", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ examId, publish: !currentStatus }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       Swal.fire("Success", data.message, "success");
//       setExams(
//         exams.map((e) =>
//           e._id === examId ? { ...e, published: !currentStatus } : e,
//         ),
//       );
//     } else {
//       Swal.fire("Error", data.error || "Failed to update exam", "error");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-20">
//       <h2 className="text-2xl font-bold mb-6 text-[#0D7C66]">Exam List</h2>
//       <table className="w-full table-auto border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">Title</th>
//             <th className="border px-4 py-2">Duration</th>
//             <th className="border px-4 py-2">Published</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {exams.map((exam) => (
//             <tr key={exam._id}>
//               <td className="border px-4 py-2">{exam.title}</td>
//               <td className="border px-4 py-2">{exam.duration} min</td>
//               <td className="border px-4 py-2">
//                 {exam.published ? "Yes" : "No"}
//               </td>
//               <td className="border px-4 py-2">
//                 <button
//                   onClick={() => togglePublish(exam._id, exam.published)}
//                   className={`px-3 py-1 rounded-md text-white ${
//                     exam.published
//                       ? "bg-red-500 hover:bg-red-600"
//                       : "bg-green-500 hover:bg-green-600"
//                   }`}
//                 >
//                   {exam.published ? "Unpublish" : "Publish"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

export default function ExamListPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    async function fetchExams() {
      const res = await fetch("/api/exams");
      const data = await res.json();
      setExams(data);
    }
    fetchExams();
  }, []);

  const handlePublish = async (examId) => {
    if (!confirm("Publish this exam?")) return;

    const res = await fetch("/api/exams", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) {
      setExams((prev) =>
        prev.map((e) => (e._id === examId ? { ...e, published: true } : e)),
      );
    }
  };

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">All Exams</h1>
      <ul className="space-y-4">
        {exams.map((exam) => (
          <li
            key={exam._id}
            className="bg-gray-200 p-4 rounded flex justify-between items-center"
          >
            <span>
              {exam.title} {exam.published ? "(Published)" : "(Not Published)"}
            </span>
            {!exam.published && (
              <button
                onClick={() => handlePublish(exam._id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Publish
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
