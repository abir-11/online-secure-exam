// "use client";

// import { useEffect, useState } from "react";

// export default function MyExamsPage() {
//   const [exams, setExams] = useState([]);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const [answers, setAnswers] = useState({}); // { questionId: answer }

//   useEffect(() => {
//     async function fetchExams() {
//       const res = await fetch("/api/exams");
//       const data = await res.json();
//       setExams(data.filter((e) => e.published));
//     }
//     fetchExams();
//   }, []);

//   const handleAnswerChange = (questionId, value) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!selectedExam) return alert("Select an exam first");

//     const payload = {
//       examId: selectedExam._id,
//       studentEmail: "student@example.com", // replace with logged-in user email
//       answers: Object.entries(answers).map(([qid, ans]) => ({
//         questionId: qid,
//         answer: ans,
//       })),
//     };

//     const res = await fetch("/api/exam-attempts", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     const data = await res.json();
//     alert(
//       data.message +
//         (data.totalMarks != null ? ` | Marks: ${data.totalMarks}` : ""),
//     );
//   };

//   return (
//     <main className="p-6 mt-20">
//       <h1 className="text-2xl font-bold mb-4">My Exams</h1>
//       <ul className="space-y-4">
//         {exams.map((exam) => (
//           <li
//             key={exam._id}
//             className="bg-gray-200 p-4 rounded cursor-pointer"
//             onClick={() => {
//               setSelectedExam(exam);
//               setAnswers({});
//             }}
//           >
//             {exam.title}
//           </li>
//         ))}
//       </ul>

//       {selectedExam && (
//         <div className="mt-6 p-4 bg-gray-100 rounded">
//           <h2 className="font-bold mb-2">{selectedExam.title} | Questions</h2>
//           {selectedExam.questions.length === 0 ? (
//             <p>No questions yet</p>
//           ) : (
//             <ul className="space-y-2">
//               {selectedExam.questions.map((q) => (
//                 <li key={q._id}>
//                   <p>{q.questionText}</p>
//                   {q.options.map((opt, idx) => (
//                     <label key={idx} className="flex items-center gap-2">
//                       <input
//                         type="radio"
//                         name={q._id}
//                         value={opt}
//                         checked={answers[q._id] === opt}
//                         onChange={(e) =>
//                           handleAnswerChange(q._id, e.target.value)
//                         }
//                       />
//                       {opt}
//                     </label>
//                   ))}
//                 </li>
//               ))}
//             </ul>
//           )}
//           <button
//             onClick={handleSubmit}
//             className="mt-4 bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
//           >
//             Submit Exam
//           </button>
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MyExamsPage() {
  const { data: session } = useSession();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submittedExams, setSubmittedExams] = useState([]);

  useEffect(() => {
    // fetch all published exams
    async function fetchExams() {
      const res = await fetch("/api/exams");
      const data = await res.json();
      setExams(data.filter((e) => e.published));
    }

    // fetch already submitted exams
    async function fetchSubmitted() {
      if (!session) return;
      const res = await fetch("/api/results");
      const data = await res.json();
      setSubmittedExams(data.map((r) => r.examId));
    }

    fetchExams();
    fetchSubmitted();
  }, [session]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedExam) return alert("Select an exam first");
    if (!session) return alert("Not logged in");

    // prevent multiple submissions
    if (submittedExams.includes(selectedExam._id)) {
      return alert("You have already submitted this exam");
    }

    const payload = {
      examId: selectedExam._id,
      studentEmail: session.user.email,
      answers: Object.entries(answers).map(([qid, ans]) => ({
        questionId: qid,
        answer: ans,
      })),
    };

    const res = await fetch("/api/exam-attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
    } else {
      alert(`Marks: ${data.score} / ${data.totalMarks}`);
      setSubmittedExams((prev) => [...prev, selectedExam._id]);
    }
  };

  const isSubmitted = selectedExam && submittedExams.includes(selectedExam._id);

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">My Exams</h1>

      <ul className="space-y-4">
        {exams.map((exam) => (
          <li
            key={exam._id}
            className={`p-4 rounded cursor-pointer ${
              selectedExam?._id === exam._id ? "bg-blue-100" : "bg-gray-200"
            }`}
            onClick={() => {
              setSelectedExam(exam);
              setAnswers({});
            }}
          >
            {exam.title}{" "}
            {submittedExams.includes(exam._id) && (
              <span className="text-sm text-green-600 font-semibold">
                (Submitted)
              </span>
            )}
          </li>
        ))}
      </ul>

      {selectedExam && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">{selectedExam.title} | Questions</h2>
          {selectedExam.questions.length === 0 ? (
            <p>No questions yet</p>
          ) : (
            <ul className="space-y-2">
              {selectedExam.questions.map((q) => (
                <li key={q._id}>
                  <p className="font-medium">{q.questionText}</p>
                  {q.options.map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={q._id}
                        value={opt}
                        checked={answers[q._id] === opt}
                        onChange={(e) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                      />
                      {opt}
                    </label>
                  ))}
                </li>
              ))}
            </ul>
          )}
          <button
            disabled={isSubmitted}
            onClick={handleSubmit}
            className={`mt-4 px-4 py-2 rounded text-white transition-colors ${
              isSubmitted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitted ? "Already Submitted" : "Submit Exam"}
          </button>
        </div>
      )}
    </main>
  );
}
