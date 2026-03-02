"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, [session]);

  // Publish exam
  const handlePublish = async (examId) => {
    if (
      !confirm(
        "Publish this exam? Students will be notified and MCQs cannot be edited after publishing.",
      )
    )
      return;

    try {
      const res = await fetch("/api/exams/publish", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId }),
      });
      const data = await res.json();
      alert(data.message);

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
      alert("Failed to publish exam");
    }
  };

  // View questions
  const handleViewQuestions = async (examId) => {
    setQuestionLoading(true);
    try {
      const res = await fetch(`/api/exams/${examId}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to load questions");
        return;
      }

      setSelectedExam(data.exam || data); // backend returns {exam} or exam directly
    } catch (error) {
      console.error(error);
      alert("Error loading questions");
    } finally {
      setQuestionLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading exams...</p>;

  return (
    <main className="p-6 mt-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exam Management</h1>

      {exams.length === 0 ? (
        <p className="text-gray-500">No exams found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{exam.title}</h2>

              <div className="text-gray-700 mb-1">
                <span className="font-medium">Type:</span>{" "}
                {exam.type.toUpperCase()}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">Duration:</span> {exam.duration}{" "}
                minutes
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">Total Questions:</span>{" "}
                {exam.totalQuestions || "-"}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">Batches:</span>{" "}
                {exam.batchNames && exam.batchNames.length > 0
                  ? exam.batchNames.join(", ")
                  : "-"}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">Start:</span>{" "}
                {new Date(exam.startTime).toLocaleString()}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">End:</span>{" "}
                {new Date(exam.endTime).toLocaleString()}
              </div>
              <div className="text-gray-700 mb-1">
                <span className="font-medium">Created At:</span>{" "}
                {new Date(exam.createdAt).toLocaleString()}
              </div>

              <div className="flex items-center justify-between mt-3">
                <span
                  className={`px-2 py-1 rounded text-sm font-semibold ${
                    exam.published
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {exam.published ? "Published" : "Draft"}
                </span>

                <div className="flex gap-2">
                  {!exam.published && (
                    <button
                      onClick={() => handlePublish(exam._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Publish
                    </button>
                  )}

                  <button
                    onClick={() => handleViewQuestions(exam._id)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    {questionLoading && selectedExam?._id === exam._id
                      ? "Loading..."
                      : "View Questions"}
                  </button>
                </div>
              </div>

              {selectedExam && selectedExam._id === exam._id && (
                <div className="mt-4 border-t pt-2">
                  <h3 className="font-semibold mb-2">Questions:</h3>
                  {selectedExam.questions.length === 0 ? (
                    <p className="text-gray-500">No questions added yet.</p>
                  ) : (
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedExam.questions.map((q, i) => (
                        <li key={q._id}>
                          {q.questionText}{" "}
                          <span className="text-sm text-green-700">
                            (Answer: {q.correctOption})
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
