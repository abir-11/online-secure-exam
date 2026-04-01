"use client";

import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ExamAttempt({ searchParams }) {
  const examId = searchParams.examId;
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [submitted, setSubmitted] = useState(false);

  const timerRef = useRef(null);

  // Fetch exam
  useEffect(() => {
    async function fetchExam() {
      const res = await fetch(`/api/exams/${examId}`);
      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Exam not found or access denied",
        });
        return;
      }
      const data = await res.json();

      setExam(data);

      const now = new Date();
      const endTime = new Date(data.endTime);
      setTimeLeft(Math.floor((endTime - now) / 1000));
    }

    fetchExam();
  }, [examId]);

  // Start countdown timer
  useEffect(() => {
    if (!exam || submitted) return;
    if (timeLeft <= 0) return handleSubmit();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [exam, submitted, timeLeft]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (submitted || !exam) return;

    clearInterval(timerRef.current);

    const payload = {
      examId,
      answers: Object.entries(answers).map(([qid, ans]) => ({
        questionId: qid,
        answer: ans,
      })),
    };

    const res = await fetch("/api/exam-attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: data.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Exam Submitted",
      html: `Marks: <strong>${data.score} / ${data.totalMarks}</strong>`,
      confirmButtonColor: "#0D7C66",
    });

    setSubmitted(true);
  };

  if (!exam)
    return (
      <div className="flex items-center justify-center gap-2 p-8 text-center text-teal-600 font-semibold text-lg">
        <svg
          className="w-6 h-6 animate-spin text-teal-500"
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
        <span className="text-teal-700 animate-pulse tracking-wide">
          Loading Exam...
        </span>
      </div>
    );
  if (submitted)
    return <div className="p-6 mt-20">Exam submitted successfully!</div>;

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-xl font-bold">{exam.title}</h1>
      <p className="text-red-600 font-semibold mt-2">
        Time left: {formatTime(timeLeft)}
      </p>

      {exam.questions.length === 0 ? (
        <p>No questions available yet.</p>
      ) : (
        <ul className="space-y-4 mt-4">
          {exam.questions.map((q) => (
            <li key={q._id}>
              <p className="font-medium">{q.questionText}</p>

              {exam.examType === "MCQ" ? (
                q.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={q._id}
                      value={opt}
                      checked={answers[q._id] === opt}
                      onChange={(e) =>
                        handleAnswerChange(q._id, e.target.value)
                      }
                    />
                    {opt}
                  </label>
                ))
              ) : (
                <textarea
                  className="w-full border p-2 rounded"
                  rows={3}
                  value={answers[q._id] || ""}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                />
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Exam
      </button>
    </div>
  );
}
