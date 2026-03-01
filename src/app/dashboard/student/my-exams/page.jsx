// "use client";

// import { useEffect, useState } from "react";

// export default function MyExamsPage() {
//   const [exams, setExams] = useState([]);

//   useEffect(() => {
//     fetch("/api/student/exams")
//       .then((r) => r.json())
//       .then((d) => setExams(d.exams || []));
//   }, []);

//   return (
//     <main className="p-6 mt-20">
//       <h1 className="text-2xl font-bold mb-4">My Exams</h1>

//       {exams.length === 0 ? (
//         <p>No exams assigned yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {exams.map((exam) => {
//             const now = new Date();
//             const start = new Date(exam.startTime);
//             const end = new Date(exam.endTime);

//             const canAttend = now >= start && now <= end;

//             return (
//               <li
//                 key={exam._id}
//                 className="border p-4 rounded flex justify-between"
//               >
//                 <div>
//                   <h2 className="font-semibold">{exam.title}</h2>
//                   <p>Starts: {start.toLocaleString()}</p>
//                   <p>Ends: {end.toLocaleString()}</p>
//                 </div>

//                 {canAttend ? (
//                   <a
//                     href={`/dashboard/student/exam/${exam._id}`}
//                     className="bg-green-600 text-white px-4 py-2 rounded"
//                   >
//                     Attend
//                   </a>
//                 ) : (
//                   <span className="text-gray-500">Not available</span>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </main>
//   );
// }

//submit once attended try

"use client";

import { useEffect, useState } from "react";

export default function MyExamsPage() {
  const [exams, setExams] = useState([]);
  const [submittedExams, setSubmittedExams] = useState(new Set()); // 🆕

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/student/exams");
        const data = await res.json();
        setExams(data.exams || []);

        // Fetch submitted exams
        const submittedRes = await fetch("/api/student/exams/submitted");
        if (submittedRes.ok) {
          const submittedData = await submittedRes.json();
          // store submitted examIds in a Set for quick lookup
          setSubmittedExams(new Set(submittedData.examIds || []));
        }
      } catch (err) {
        console.error("Failed to load exams or submissions:", err);
      }
    }

    fetchExams();
  }, []);

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">My Exams</h1>

      {exams.length === 0 ? (
        <p>No exams assigned yet.</p>
      ) : (
        <ul className="space-y-4">
          {exams.map((exam) => {
            const now = new Date();
            const start = new Date(exam.startTime);
            const end = new Date(exam.endTime);

            const canAttend = now >= start && now <= end;
            const hasSubmitted = submittedExams.has(exam._id); // 🆕

            return (
              <li
                key={exam._id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold">{exam.title}</h2>
                  <p>Starts: {start.toLocaleString()}</p>
                  <p>Ends: {end.toLocaleString()}</p>
                </div>

                {hasSubmitted ? (
                  <span className="bg-gray-400 text-white px-4 py-2 rounded">
                    Attended
                  </span>
                ) : canAttend ? (
                  <a
                    href={`/dashboard/student/exam/${exam._id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Attend
                  </a>
                ) : (
                  <span className="text-gray-500">Not available</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
