//dashboard/student/result/[examId]/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ExamDetailPage() {
  const { examId } = useParams();
  const router = useRouter();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await fetch(`/api/student/result`);
        const data = await res.json();
        const exam = data.results.find((r) => r.examId === examId);
        setResult(exam || null);
      } catch (err) {
        console.error("Failed to fetch exam details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [examId]);

  if (loading)
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-8 h-8 animate-spin text-emerald-400 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-emerald-100/70 mt-4 animate-pulse tracking-wide">
            Loading Exam Details...
          </p>
        </div>
      </div>
    );

  if (!result)
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-emerald-100/70 mb-4">Result not found.</p>
          <button
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );

  // --- Calculate percentage and pass/fail ---
  const percentage =
    result.totalMarks > 0
      ? ((result.marksObtained / result.totalMarks) * 100).toFixed(2)
      : 0;
  const passBoundary = 50; // pass if >= 50%
  const passed = percentage >= passBoundary;

  return (
    <main className="bg-emerald-950 min-h-screen relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 px-4 sm:px-6 lg:px-0 py-6">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-emerald-600/40 to-teal-500/40 backdrop-blur-md shadow-lg rounded-xl p-6 mb-8 border border-emerald-700/50">
          <h1 className="text-2xl font-bold text-white">{result.title}</h1>
          <p className="text-emerald-300 mt-1">
            Exam Type:{" "}
            <span className="font-medium">
              {result.examCategory ||
                result.examType?.toUpperCase() ||
                "Unknown"}
            </span>
          </p>
          <p className="text-emerald-300 mt-1">
            Submitted At:{" "}
            <span className="font-medium">
              {new Date(result.submittedAt).toLocaleString()}
            </span>
          </p>
          <p className="text-emerald-300 mt-1">
            Marks Obtained:{" "}
            <span className="font-semibold text-emerald-400">
              {result.marksObtained}
            </span>{" "}
            / {result.totalMarks}
          </p>
          <p className="text-emerald-300 mt-1">
            Percentage: <span className="font-semibold">{percentage}%</span>
          </p>
          <p className="text-emerald-300 mt-1">
            Status:{" "}
            <span
              className={`font-semibold ${
                passed ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {passed ? "PASS" : "FAIL"} (Pass boundary: {passBoundary}%)
            </span>
          </p>
          <p className="text-emerald-300 mt-1">
            Grading Status:{" "}
            <span className="font-semibold">
              {result.status === "graded" ? "Graded" : "Pending"}
            </span>
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {Object.entries(result.answersWithMarks).map(([qid, ans]) => {
            const isCorrect = ans.awarded === ans.maxMarks && ans.maxMarks > 0;
            const partial = ans.awarded > 0 && ans.awarded < ans.maxMarks;

            return (
              <div
                key={qid}
                className="bg-emerald-900/30 backdrop-blur-md shadow-md rounded-xl p-4 border-l-4 border border-emerald-700/50"
                style={{
                  borderLeftColor: isCorrect
                    ? "#34D399" // emerald for full marks
                    : partial
                      ? "#F59E0B" // yellow for partial
                      : "#EF4444", // red for zero
                }}
              >
                <h2 className="text-white font-semibold mb-1">
                  {ans.questionText}
                </h2>
                <p className="text-emerald-200/90 mb-1">
                  <span className="font-semibold">Your Answer:</span>{" "}
                  {ans.answer}
                </p>

                {result.examType === "mcq" && ans.correctAnswer && (
                  <p className="text-emerald-200/90 mb-1">
                    <span className="font-semibold">Correct Answer:</span>{" "}
                    {ans.correctAnswer}
                  </p>
                )}

                <p className="text-emerald-200/90">
                  <span className="font-semibold">Marks Obtained:</span>{" "}
                  <span
                    className={`font-semibold ${
                      isCorrect
                        ? "text-emerald-400"
                        : partial
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  >
                    {ans.awarded} / {ans.maxMarks}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-[0_0_15px_rgb(16,185,129,0.2)] transition-colors"
          >
            Back to Results
          </button>
        </div>
      </div>
    </main>
  );
}
