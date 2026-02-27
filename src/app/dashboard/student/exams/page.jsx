// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function StudentExamsPage() {
//   const [exams, setExams] = useState([]);

//   useEffect(() => {
//     fetch("/api/exams")
//       .then((res) => res.json())
//       .then((data) => {
//         const published = data.filter((e) => e.published);
//         setExams(published);
//       });
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Available Exams</h1>

//       {exams.map((exam) => (
//         <div key={exam._id} className="border p-4 rounded mb-3">
//           <h2 className="text-lg font-semibold">{exam.title}</h2>
//           <p>Duration: {exam.duration} minutes</p>

//           <Link
//             href={`/dashboard/student/exam-attempt?examId=${exam._id}`}
//             className="text-blue-600"
//           >
//             Start Exam
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function ExamPage({ examId, totalMarks, questions }) {
  const [score, setScore] = useState(0);

  // Example: function to calculate score from answers
  const calculateScore = () => {
    let s = 0;
    // your logic to calculate correct answers
    questions.forEach((q) => {
      if (q.selectedAnswer === q.correctAnswer) s++;
    });
    setScore(s);
    return s;
  };

  const handleSubmit = async () => {
    const finalScore = calculateScore();

    const res = await fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examId,
        score: finalScore,
        totalMarks,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message); // e.g., "You have already submitted this exam"
    } else {
      alert(
        `Exam submitted successfully! Marks: ${finalScore} / ${totalMarks}`,
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Exam: {examId}</h1>
      {/* Render your questions here */}
      <button onClick={handleSubmit} className="btn btn-primary mt-4">
        Submit Exam
      </button>
    </div>
  );
}
