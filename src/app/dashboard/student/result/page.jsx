"use client";

import { useEffect, useState } from "react";

export default function StudentResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-6">Loading results...</div>;

  if (!results.length)
    return <div className="p-6">You have no results yet.</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 mt-20">My Exam Results</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Exam Title</th>
            <th className="border p-2">Marks Obtained</th>
            <th className="border p-2">Total Marks</th>
            <th className="border p-2">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.examId}>
              <td className="border p-2">{r.title}</td>
              <td className="border p-2">{r.marksObtained}</td>
              <td className="border p-2">{r.totalMarks}</td>
              <td className="border p-2">
                {new Date(r.submittedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
