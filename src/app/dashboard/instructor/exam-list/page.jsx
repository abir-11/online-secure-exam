"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import {
  FileText,
  Clock,
  ListChecks,
  BookOpen,
  Users,
  Calendar,
  Eye,
  Send,
} from "lucide-react";

export default function ExamListPage() {
  const { data: session } = useSession();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(false);

  // Fetch exams
  useEffect(() => {
    if (!session) return;

    async function fetchExams() {
      setLoading(true);
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        console.error("Failed to fetch exams:", err);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch exams",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, [session]);

  // Publish exam
  const handlePublish = async (examId) => {
    const result = await Swal.fire({
      title: "Publish this exam?",
      text: "Students will be notified and MCQs cannot be edited after publishing.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06b6d4", // teal/blue confirm button
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, publish it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch("/api/exams/publish", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId }),
      });

      const data = await res.json();

      await Swal.fire({
        icon: res.ok ? "success" : "error",
        title: res.ok ? "Success" : "Error",
        text: data.message,
      });

      if (res.ok) {
        setExams((prev) =>
          prev.map((e) =>
            e._id === examId
              ? { ...e, published: true, status: "published" }
              : e,
          ),
        );
      }
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to publish exam",
      });
    }
  };

  // View questions
  const handleViewQuestions = async (examId) => {
    setQuestionLoading(true);

    try {
      const res = await fetch(`/api/exams/${examId}`);
      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to load questions",
        });
        return;
      }

      setSelectedExam(data.exam || data);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error loading questions",
      });
    } finally {
      setQuestionLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 p-8 text-center text-white font-semibold text-lg min-h-screen bg-emerald-950">
        <svg
          className="w-6 h-6 animate-spin text-white"
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
        <span className="text-white animate-pulse tracking-wide">
          Loading Exams...
        </span>
      </div>
    );

  return (
    <main className="p-8 bg-emerald-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white">Exam Management</h1>

      {exams.length === 0 ? (
        <p className="text-white/80">No exams found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => {
            const calculatedTotalMarks =
              exam.totalMarks ??
              (exam.questions
                ? exam.questions.reduce((sum, q) => sum + (q.marks || 1), 0)
                : "-");

            return (
              <div
                key={exam._id}
                className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6"
              >
                {/* Title */}
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-cyan-400" />
                  {exam.title || "-"}
                </h2>

                {/* Info */}
                <div className="space-y-2 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-cyan-300" />
                    <span className="font-medium">Type:</span>
                    {exam.type?.toUpperCase() || "-"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-cyan-300" />
                    <span className="font-medium">Duration:</span>
                    {exam.duration ?? "-"} minutes
                  </div>

                  <div className="flex items-center gap-2">
                    <ListChecks size={16} className="text-cyan-300" />
                    <span className="font-medium">Total Questions:</span>
                    {exam.questionsCount ?? "-"}
                  </div>

                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-cyan-300" />
                    <span className="font-medium">Total Marks:</span>
                    {calculatedTotalMarks}
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-cyan-300" />
                    <span className="font-medium">Batches:</span>
                    {exam.batchNames && exam.batchNames.length > 0
                      ? exam.batchNames.join(", ")
                      : "-"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-cyan-300" />
                    <span className="font-medium">Start:</span>
                    {exam.startTime
                      ? new Date(exam.startTime).toLocaleString()
                      : "-"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-cyan-300" />
                    <span className="font-medium">End:</span>
                    {exam.endTime
                      ? new Date(exam.endTime).toLocaleString()
                      : "-"}
                  </div>
                </div>

                {/* Status + Buttons */}
                <div className="flex items-center justify-between mt-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      exam.published
                        ? "bg-green-100 text-green-700"
                        : "bg-cyan-100 text-cyan-700"
                    }`}
                  >
                    {exam.published ? "Published" : "Draft"}
                  </span>

                  <div className="flex gap-2">
                    {!exam.published && (
                      <button
                        onClick={() => handlePublish(exam._id)}
                        className="flex items-center gap-1 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded-md text-sm transition"
                      >
                        <Send size={14} />
                        Publish
                      </button>
                    )}

                    <button
                      onClick={() => handleViewQuestions(exam._id)}
                      className="flex items-center gap-1 bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      <Eye size={14} />
                      {questionLoading && selectedExam?._id === exam._id
                        ? "Loading..."
                        : "View"}
                    </button>

                    {/* VIEW TO EDIT button */}
                    <button
                      onClick={() => {
                        if (exam?.status === "published") {
                          Swal.fire({
                            icon: "warning",
                            title: "Not allowed",
                            text: "This question set has been published, you cannot edit anymore",
                          });
                          return;
                        }
                        window.open(
                          `/dashboard/instructor/exam/${exam._id}/questions`,
                          "_blank",
                        );
                      }}
                      className="flex items-center gap-1 bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      View to edit
                    </button>
                  </div>
                </div>

                {/* Questions */}
                {selectedExam && selectedExam._id === exam._id && (
                  <div className="mt-5 pt-4 border-t border-white/20">
                    <h3 className="font-semibold mb-3 text-white">Questions</h3>

                    {selectedExam.questions?.length === 0 ? (
                      <p className="text-white/80 text-sm">
                        No questions added yet.
                      </p>
                    ) : (
                      <>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-white/90">
                          {selectedExam.questions?.map((q) => (
                            <li key={q._id}>
                              {q.questionText || "-"}{" "}
                              <span className="text-green-400 text-xs">
                                (Answer:{" "}
                                {exam.type === "mcq"
                                  ? (q.correctOption ?? "-")
                                  : "Answers not available"}
                                )
                              </span>{" "}
                              <span className="text-cyan-300 text-xs">
                                — Marks: {q.marks ?? 1}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 font-semibold text-white">
                          Total Marks:{" "}
                          {selectedExam.questions?.reduce(
                            (sum, q) => sum + (q.marks || 1),
                            0,
                          ) ?? "-"}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
