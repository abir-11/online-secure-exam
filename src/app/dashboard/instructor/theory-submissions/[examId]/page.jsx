//dashboard/theory-submissions/[examId]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function InstructorTheorySubmissionsPage() {
  const { examId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmissions() {
      const res = await fetch(`/api/instructor/theory-submissions/${examId}`);
      const data = await res.json();
      setSubmissions(data.submissions || []);
      setLoading(false);
    }
    fetchSubmissions();
  }, [examId]);

  async function gradeSubmission(submissionId, score) {
    const res = await fetch("/api/instructor/theory-submissions/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionId, score }),
    });

    if (res.ok) {
      alert("Graded successfully");
      location.reload();
    } else {
      const data = await res.json();
      alert(data.message);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Theory Submissions</h1>

      {submissions.map((s) => (
        <div key={s._id} className="border p-4 mb-4 rounded">
          <p className="font-semibold">Student: {s.studentEmail}</p>

          <div className="mt-2">
            {Object.entries(s.answers).map(([qid, ans], idx) => (
              <p key={qid}>
                <strong>Q{idx + 1}:</strong> {ans}
              </p>
            ))}
          </div>

          {s.status === "graded" ? (
            <p className="mt-2 text-green-600">
              Graded: {s.score}/{s.totalMarks}
            </p>
          ) : (
            <div className="mt-3 flex gap-2">
              <input
                type="number"
                placeholder="Score"
                min={0}
                max={s.totalMarks}
                id={`score-${s._id}`}
                className="border px-2 py-1"
              />
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded"
                onClick={() =>
                  gradeSubmission(
                    s._id,
                    Number(document.getElementById(`score-${s._id}`).value),
                  )
                }
              >
                Grade
              </button>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
