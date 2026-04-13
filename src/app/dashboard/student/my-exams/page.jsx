"use client";

import { useEffect, useState } from "react";

export default function MyExamsPage() {
  const [exams, setExams] = useState([]);
  const [submittedExams, setSubmittedExams] = useState(new Set());

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/student/exams");
        const data = await res.json();

        // ✅ Sort exams so latest exam appears first
        const sortedExams = (data.exams || []).sort(
          (a, b) => new Date(b.startTime) - new Date(a.startTime),
        );
        setExams(sortedExams);

        // Fetch submitted exams
        const submittedRes = await fetch("/api/student/exams/submitted");
        if (submittedRes.ok) {
          const submittedData = await submittedRes.json();
          setSubmittedExams(new Set(submittedData.examIds || []));
        }
      } catch (err) {
        console.error("Failed to load exams or submissions:", err);
      }
    }

    fetchExams();
  }, []);

  return (
    <main className="min-h-screen bg-emerald-950 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6 lg:px-0 py-6">
        <h1 className="text-3xl font-bold text-white mb-6">My Exams</h1>

        {/* Static Demo Exam Widget */}
        <div className="bg-emerald-900/30 backdrop-blur-md hover:bg-emerald-800/40 shadow-lg rounded-xl p-5 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center border-l-4 border-emerald-400 transition-all duration-200 border border-emerald-700/50">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-white text-xl">Demo Exam</h2>
            <p className="text-emerald-200/70">Duration: No time limit</p>
            <p className="text-sm text-emerald-300">
              Static practice questions to get you started
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <a
              href="/dashboard/student/demo-exam"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold transition-colors duration-200 inline-block shadow-[0_0_15px_rgb(16,185,129,0.2)]"
            >
              Start Demo
            </a>
          </div>
        </div>

        {exams.length === 0 ? (
          <div className="p-6 bg-emerald-900/30 border-l-4 border-emerald-400 text-emerald-100/90 rounded shadow-md backdrop-blur-md border border-emerald-700/50">
            No exam published yet.
          </div>
        ) : (
          <ul className="space-y-4">
            {exams.map((exam) => {
              const now = new Date();
              const start = new Date(exam.startTime);
              const end = new Date(exam.endTime);

              const canAttend = now >= start && now <= end;
              const hasSubmitted = submittedExams.has(exam._id);

              return (
                <li
                  key={exam._id}
                  className="bg-emerald-900/30 backdrop-blur-md hover:bg-emerald-800/40 shadow-lg rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-200 border-l-4 border border-emerald-700/50"
                  style={{
                    borderLeftColor: hasSubmitted
                      ? "#10B981" // emerald
                      : canAttend
                        ? "#34D399" // emerald light
                        : "#FBBF24", // yellow for not available yet
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-white text-lg">
                      {exam.title}
                    </h2>
                    <p className="text-emerald-200/70 text-sm">
                      Starts: {start.toLocaleString()}
                    </p>
                    <p className="text-emerald-200/70 text-sm">
                      Ends: {end.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-0">
                    {hasSubmitted ? (
                      <span className="bg-emerald-700/50 text-white px-4 py-2 rounded-xl font-semibold border border-emerald-600/50">
                        Attended
                      </span>
                    ) : canAttend ? (
                      <a
                        href={`/dashboard/student/exam/${exam._id}`}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-200 shadow-[0_0_15px_rgb(16,185,129,0.2)]"
                      >
                        Attend
                      </a>
                    ) : (
                      <span className="bg-yellow-500/30 border border-yellow-500/50 text-yellow-200 px-4 py-2 rounded-xl font-semibold backdrop-blur-sm">
                        Not available
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
