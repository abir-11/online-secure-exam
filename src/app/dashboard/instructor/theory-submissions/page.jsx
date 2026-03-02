"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TheorySubmissionsListPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExams() {
      const res = await fetch("/api/instructor/exam-list?type=theory");
      const data = await res.json();
      setExams(data.exams || []);
      setLoading(false);
    }
    fetchExams();
  }, []);

  if (loading) return <p>Loading exams...</p>;
  if (!exams.length) return <p>No theory exams found.</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Theory Exam Submissions</h1>
      <ul className="space-y-2">
        {exams.map((exam) => (
          <li key={exam._id}>
            <Link
              href={`/dashboard/instructor/theory-submissions/${exam._id}`}
              className="text-blue-600 hover:underline"
            >
              {exam.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
