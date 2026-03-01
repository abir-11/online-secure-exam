// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import { useSession } from "next-auth/react";

// // export default function StudentExamPage() {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();
// //   const { examId } = useParams();

// //   const [exam, setExam] = useState(null);
// //   const [questions, setQuestions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     if (!examId) return;

// //     const fetchExam = async () => {
// //       try {
// //         setLoading(true);
// //         setError("");

// //         const res = await fetch(`/api/student/exam/${examId}`);
// //         if (!res.ok) {
// //           const err = await res.json();
// //           throw new Error(err.message || "Failed to load exam");
// //         }

// //         const data = await res.json();

// //         setExam(data.exam || null);
// //         setQuestions(Array.isArray(data.questions) ? data.questions : []);
// //       } catch (err) {
// //         console.error(err);
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchExam();
// //   }, [examId]);

// //   if (status === "loading")
// //     return <p className="p-6 mt-20">Checking session...</p>;
// //   if (!session) {
// //     router.push("/login");
// //     return null;
// //   }

// //   if (loading) return <p className="p-6 mt-20">Loading exam...</p>;
// //   if (error) return <p className="p-6 mt-20 text-red-600">{error}</p>;
// //   if (!exam) return <p className="p-6 mt-20 text-red-500">Exam not found</p>;

// //   return (
// //     <main className="p-6 mt-10 max-w-4xl mx-auto">
// //       <h1 className="text-3xl font-bold mb-4">{exam.title}</h1>
// //       <p className="mb-2">Type: {exam.type.toUpperCase()}</p>
// //       <p className="mb-2">Duration: {exam.duration} min</p>
// //       <p className="mb-2">Total Questions: {questions.length}</p>
// //       <hr className="my-4" />

// //       {questions.length === 0 ? (
// //         <p className="text-gray-500">No questions added yet.</p>
// //       ) : (
// //         <div className="space-y-6">
// //           {questions.map((q, index) => (
// //             <div key={q._id} className="border p-4 rounded shadow-sm">
// //               <p className="font-semibold mb-2">
// //                 Q{index + 1}: {q.questionText}
// //               </p>

// //               {exam.type === "mcq" && Array.isArray(q.options) && (
// //                 <div className="space-y-2">
// //                   {q.options.map((opt, idx) => (
// //                     <label key={idx} className="flex items-center gap-2">
// //                       <input
// //                         type="radio"
// //                         name={`q-${q._id}`}
// //                         value={idx}
// //                         disabled // enable for submission later
// //                       />
// //                       <span>{opt}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //               )}

// //               {exam.type === "theory" && (
// //                 <textarea
// //                   className="w-full border rounded p-2 mt-2"
// //                   rows={4}
// //                   placeholder="Write your answer here..."
// //                   disabled // enable for submission later
// //                 />
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </main>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// export default function StudentExamPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const { examId } = useParams();

//   const [exam, setExam] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!examId) return;

//     const fetchExam = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch(`/api/student/exam/${examId}`);
//         const data = await res.json(); // ✅ ONLY ONCE

//         if (!res.ok) {
//           throw new Error(data.message || "Failed to load exam");
//         }

//         setExam(data.exam || null);
//         setQuestions(Array.isArray(data.questions) ? data.questions : []);
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExam();
//   }, [examId]);

//   if (status === "loading")
//     return <p className="p-6 mt-20">Checking session...</p>;

//   if (!session) {
//     router.push("/login");
//     return null;
//   }

//   if (loading) return <p className="p-6 mt-20">Loading exam...</p>;
//   if (error) return <p className="p-6 mt-20 text-red-600">{error}</p>;
//   if (!exam) return <p className="p-6 mt-20 text-red-500">Exam not found</p>;

//   return (
//     <main className="p-6 mt-10 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">{exam.title}</h1>
//       <p className="mb-2">Type: {exam.type.toUpperCase()}</p>
//       <p className="mb-2">Duration: {exam.duration} min</p>
//       <p className="mb-2">Total Questions: {questions.length}</p>
//       <hr className="my-4" />

//       {questions.length === 0 ? (
//         <p className="text-gray-500">No questions added yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {questions.map((q, index) => (
//             <div key={q._id} className="border p-4 rounded shadow-sm">
//               <p className="font-semibold mb-2">
//                 Q{index + 1}: {q.questionText}
//               </p>

//               {exam.type === "mcq" && (
//                 <div className="space-y-2">
//                   {q.options.map((opt, idx) => (
//                     <label key={idx} className="flex items-center gap-2">
//                       <input type="radio" name={`q-${q._id}`} disabled />
//                       <span>{opt}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}

//               {exam.type === "theory" && (
//                 <textarea
//                   className="w-full border rounded p-2 mt-2"
//                   rows={4}
//                   placeholder="Write your answer here..."
//                   disabled
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ExamListPage() {
  const { data: session } = useSession();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(false);

  // Fetch exams
  useEffect(() => {
    if (!session) return;

    async function fetchExams() {
      setLoading(true);
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, [session]);

  // Publish exam
  const handlePublish = async (examId) => {
    if (
      !confirm(
        "Publish this exam? Students will be notified and MCQs cannot be edited after publishing.",
      )
    )
      return;

    try {
      const res = await fetch("/api/exams/publish", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId }),
      });
      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        setExams((prev) =>
          prev.map((e) =>
            e._id === examId
              ? { ...e, published: true, status: "published" }
              : e,
          ),
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to publish exam");
    }
  };

  // View questions
  const handleViewQuestions = async (examId) => {
    setQuestionLoading(true);
    try {
      const res = await fetch(`/api/exams/${examId}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to load questions");
        return;
      }

      setSelectedExam(data.exam || data); // backend returns {exam} or exam directly
    } catch (error) {
      console.error(error);
      alert("Error loading questions");
    } finally {
      setQuestionLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading exams...</p>;

  return (
    <main className="p-6 mt-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exam Management</h1>

      {exams.length === 0 ? (
        <p className="text-gray-500">No exams found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{exam.title}</h2>

              <div className="text-gray-700 mb-1">
                <span className="font-medium">Type:</span>{" "}
                {exam.type.toUpperCase()}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">Duration:</span> {exam.duration}{" "}
                minutes
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">Total Questions:</span>{" "}
                {exam.totalQuestions || "-"}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">Batches:</span>{" "}
                {exam.batchNames && exam.batchNames.length > 0
                  ? exam.batchNames.join(", ")
                  : "-"}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">Start:</span>{" "}
                {new Date(exam.startTime).toLocaleString()}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">End:</span>{" "}
                {new Date(exam.endTime).toLocaleString()}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">Created At:</span>{" "}
                {new Date(exam.createdAt).toLocaleString()}
              </div>

              <div className="flex items-center justify-between mt-3">
                <span
                  className={`px-2 py-1 rounded text-sm font-semibold ${
                    exam.published
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {exam.published ? "Published" : "Draft"}
                </span>

                <div className="flex gap-2">
                  {!exam.published && (
                    <button
                      onClick={() => handlePublish(exam._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Publish
                    </button>
                  )}

                  <button
                    onClick={() => handleViewQuestions(exam._id)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    {questionLoading && selectedExam?._id === exam._id
                      ? "Loading..."
                      : "View Questions"}
                  </button>
                </div>
              </div>

              {selectedExam && selectedExam._id === exam._id && (
                <div className="mt-4 border-t pt-2">
                  <h3 className="font-semibold mb-2">Questions:</h3>
                  {selectedExam.questions.length === 0 ? (
                    <p className="text-gray-500">No questions added yet.</p>
                  ) : (
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedExam.questions.map((q, i) => (
                        <li key={q._id}>
                          {q.questionText}{" "}
                          <span className="text-sm text-green-700">
                            (Answer: {q.correctOption})
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
