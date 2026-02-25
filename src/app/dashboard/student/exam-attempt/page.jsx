"use client";

import { useEffect, useState } from "react";

export default function ExamAttempt({ searchParams }) {
  const examId = searchParams.examId;
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch("/api/exams")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((e) => e._id === examId);
        setExam(found);
      });
  }, []);

  // Detect tab switch
  useEffect(() => {
    const handleBlur = () => {
      console.log("User switched tab");
    };

    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  if (!exam) return <div>Loading exam...</div>;

  const handleSubmit = async () => {
    const res = await fetch("/api/exam-attempts", {
      method: "POST",
      body: JSON.stringify({
        examId,
        studentId: "studentId",
        answers,
      }),
    });

    const data = await res.json();
    alert(`Score: ${data.score}/${data.totalMarks}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{exam.title}</h1>

      {exam.questions.map((q, index) => (
        <div key={index} className="mb-4">
          <p>{q.question}</p>

          {q.options.map((opt, i) => (
            <div key={i}>
              <input
                type="radio"
                name={q._id}
                onChange={() =>
                  setAnswers({
                    ...answers,
                    [q._id]: i,
                  })
                }
              />
              {opt}
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2"
      >
        Submit Exam
      </button>
    </div>
  );
}
