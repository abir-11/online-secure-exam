"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentExamsPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("/api/exams")
      .then((res) => res.json())
      .then((data) => {
        const published = data.filter((e) => e.published);
        setExams(published);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Exams</h1>

      {exams.map((exam) => (
        <div key={exam._id} className="border p-4 rounded mb-3">
          <h2 className="text-lg font-semibold">{exam.title}</h2>
          <p>Duration: {exam.duration} minutes</p>

          <Link
            href={`/dashboard/student/exam-attempt?examId=${exam._id}`}
            className="text-blue-600"
          >
            Start Exam
          </Link>
        </div>
      ))}
    </div>
  );
}
