// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function GET(req, { params }) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session)
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const examsCol = await getCollection("exams");
//     const exam = await examsCol.findOne({ _id: new ObjectId(params.examId) });

//     if (!exam)
//       return NextResponse.json({ message: "Exam not found" }, { status: 404 });

//     return NextResponse.json(exam);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { message: "Failed to fetch exam" },
//       { status: 500 },
//     );
//   }
// }

// export async function PATCH(req, { params }) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { mcqDone } = await req.json();
//     const examsCol = await getCollection("exams");

//     await examsCol.updateOne(
//       { _id: new ObjectId(params.examId) },
//       { $set: { mcqDone } },
//     );

//     return NextResponse.json({ message: "Exam updated" });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { message: "Failed to update exam" },
//       { status: 500 },
//     );
//   }
// }

"use client";

import { useEffect, useState } from "react";

export default function InstructorExamPage({ params }) {
  const { id } = params;
  const [exam, setExam] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/exams/${id}`);
      const examData = await res.json();
      setExam(examData);

      const subRes = await fetch(`/api/exam-attempts/${id}`);
      const subData = await subRes.json();
      setSubmissions(subData.attempts || []);

      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!exam) return <p>Exam not found or access denied.</p>;

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>

      {exam.examType === "MCQ" && (
        <p>
          MCQ Questions: {exam.questions.length} | Submitted:{" "}
          {submissions.length}
        </p>
      )}

      {exam.examType === "Theoretical" && (
        <div>
          <h2 className="font-bold mt-4 mb-2">Theoretical Submissions</h2>
          {submissions.length === 0 ? (
            <p>No submissions yet.</p>
          ) : (
            <ul className="space-y-4">
              {submissions.map((s) => (
                <li key={s._id} className="border p-2 rounded">
                  <p>
                    <strong>Student:</strong> {s.studentEmail}
                  </p>
                  <p>
                    <strong>Answer:</strong>{" "}
                    {s.answers.map((a) => a.answer).join(", ")}
                  </p>
                  <p>
                    <strong>Graded:</strong> {s.graded ? "Yes" : "Pending"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
}
