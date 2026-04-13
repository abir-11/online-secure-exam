//dashboard/student/result/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (loading)
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
          <p className="mt-4 text-emerald-100/70">Loading results...</p>
        </div>
      </div>
    );

  if (!results.length)
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-emerald-100/70 text-lg">
            You have no results yet.
          </p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-emerald-950 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <h1 className="text-3xl font-bold mb-8 text-center text-white relative z-10">
        My Exam Results
      </h1>

      <div className="space-y-6 relative z-10">
        {results.map((r) => (
          <div
            key={r.examId}
            className="bg-emerald-900/30 backdrop-blur-md shadow-lg rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between transition hover:bg-emerald-800/40 border border-emerald-700/50"
          >
            <div className="flex-1 mb-3 md:mb-0">
              <h2 className="text-xl font-semibold text-white">{r.title}</h2>
              <p className="text-sm text-emerald-300 mt-1">
                Exam Type:{" "}
                <span className="font-medium">
                  {r.examCategory || r.examType?.toUpperCase() || "Unknown"}
                </span>
              </p>
              <p className="text-sm text-emerald-300 mt-1">
                Submitted At:{" "}
                <span className="font-medium">
                  {new Date(r.submittedAt).toLocaleString()}
                </span>
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-emerald-300">Result</p>
                <p
                  className={`mt-1 font-semibold ${
                    r.status === "pending"
                      ? "text-yellow-400"
                      : r.status === "graded"
                        ? "text-emerald-400"
                        : "text-blue-400"
                  }`}
                >
                  {r.status === "pending" ? "Pending grading" : r.marksObtained}
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-emerald-300">Total Marks</p>
                <p className="mt-1 font-semibold text-white">{r.totalMarks}</p>
              </div>

              <button
                onClick={() =>
                  router.push(`/dashboard/student/result/${r.examId}`)
                }
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-[0_0_15px_rgb(16,185,129,0.2)] transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
