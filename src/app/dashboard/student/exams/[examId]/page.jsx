"use client";

import { useState } from "react";

export default function ExamPage({ examId, totalMarks }) {
  const [score, setScore] = useState(0);

  const handleSubmit = async () => {
    const res = await fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examId,
        score, // calculated from student answers
        totalMarks,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message); // e.g., "You have already submitted this exam"
    } else {
      alert(`Exam submitted successfully! Marks: ${score} / ${totalMarks}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Exam: {examId}</h1>
      {/* Your exam questions component here */}
      <button onClick={handleSubmit} className="btn btn-primary mt-4">
        Submit Exam
      </button>
    </div>
  );
}
