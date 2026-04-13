"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function InstructorTheorySubmissionsPage() {
  const { examId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!examId) return;

    async function fetchSubmissions() {
      try {
        const res = await fetch(`/api/instructor/theory-submissions/${examId}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch");
          setSubmissions([]);
        } else {
          setSubmissions(data.submissions || []);
        }
      } catch (err) {
        setError("Network error");
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, [examId]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-emerald-400 text-lg font-semibold">
        Loading submissions...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Error: {error}
      </div>
    );

  return (
    <main className="min-h-screen bg-emerald-950 border border-slate-700 p-8 rounded-2xl shadow-xl relative z-10">
      {/* Background glow */}
      {/* <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-teal-500/20 blur-[100px] rounded-full"></div> */}

      <h1 className="text-2xl font-bold mb-6 text-white relative z-10">
        Theory Submissions
      </h1>

      {submissions.length === 0 && (
        <p className="text-slate-400 relative z-10">No submissions found.</p>
      )}

      <div className="space-y-6 relative z-10">
        {submissions.map((s) => (
          <div
            key={s._id}
            className="bg-slate-900 border border-slate-700 p-5 rounded-xl shadow"
          >
            <p className="font-semibold text-white">
              Student:{" "}
              <span className="text-emerald-400">{s.studentEmail}</span>
            </p>

            <div className="mt-4">
              {Object.entries(s.answersWithMarks || {}).map(
                ([qid, { questionText, answer, maxMarks }], idx) => (
                  <div
                    key={qid}
                    className="mb-4 border-b border-slate-700 pb-3"
                  >
                    <p className="font-medium text-white">
                      Q{idx + 1}: {questionText}{" "}
                      <span className="text-emerald-400">
                        ({maxMarks} marks)
                      </span>
                    </p>

                    <p className="ml-2 text-slate-300 mt-1">
                      <strong className="text-emerald-400">
                        Student Answer:
                      </strong>{" "}
                      {answer}
                    </p>

                    {s.scores?.[qid] != null ? (
                      <p className="text-emerald-400 mt-2">
                        Score: {s.scores[qid]} / {maxMarks}
                      </p>
                    ) : (
                      <div className="mt-3 flex gap-2">
                        <input
                          type="number"
                          min={0}
                          max={maxMarks}
                          id={`score-${s._id}-${qid}`}
                          className="bg-slate-800 border border-slate-600 text-white px-2 py-1 w-24 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1 rounded transition"
                          onClick={() =>
                            gradeSubmission(
                              s._id,
                              qid,
                              Number(
                                document.getElementById(`score-${s._id}-${qid}`)
                                  .value,
                              ),
                              maxMarks,
                            )
                          }
                        >
                          Grade
                        </button>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>

            <p className="mt-4 font-semibold text-lg text-white">
              Total Score:{" "}
              <span className="text-emerald-400">
                {s.score} / {s.totalMarks}
              </span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );

  async function gradeSubmission(submissionId, qid, score, maxMarks) {
    if (score < 0) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Score",
        text: "Cannot be negative",
      });
    }

    if (score > maxMarks) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Score",
        text: `Cannot exceed ${maxMarks}`,
      });
    }

    const res = await fetch(`/api/instructor/theory-submissions/${examId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionId, qid, score }),
    });

    if (res.ok) {
      await Swal.fire({
        icon: "success",
        title: "Graded Successfully",
        text: "The score has been saved.",
        confirmButtonColor: "#10b981",
      });
      location.reload();
    } else {
      const data = await res.json();

      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message,
      });
    }
  }
}
