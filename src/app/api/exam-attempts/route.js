// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";

// export async function POST(req) {
//   try {
//     const data = await req.json();

//     const questionsCollection = await getCollection("questions");
//     const attemptsCollection = await getCollection("examAttempts");

//     const questions = await questionsCollection
//       .find({ examId: data.examId })
//       .toArray();

//     let score = 0;
//     let totalMarks = 0;

//     questions.forEach((q) => {
//       totalMarks += q.marks;

//       if (data.answers[q._id] === q.correctOption) {
//         score += q.marks;
//       }
//     });

//     const attempt = {
//       examId: data.examId,
//       studentId: data.studentId,
//       answers: data.answers,
//       score,
//       totalMarks,
//       submittedAt: new Date(),
//     };

//     await attemptsCollection.insertOne(attempt);

//     return NextResponse.json({
//       message: "Exam submitted",
//       score,
//       totalMarks,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to submit exam" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const data = await req.json();
    const { examId, studentEmail, answers } = data;

    if (!examId || !studentEmail || !answers) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const examsCollection = await getCollection("exams");
    const attemptsCollection = await getCollection("examAttempts");

    const exam = await examsCollection.findOne({ _id: new ObjectId(examId) });
    if (!exam)
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });

    // Auto-grade
    let totalMarks = 0;
    exam.questions.forEach((q) => {
      const ans = answers.find((a) => a.questionId === q._id.toString());
      if (ans && ans.answer === q.correctOption) totalMarks += q.marks;
    });

    const attempt = {
      examId: new ObjectId(examId),
      studentEmail,
      answers,
      totalMarks,
      submittedAt: new Date(),
    };

    await attemptsCollection.insertOne(attempt);

    return NextResponse.json({ message: "Exam submitted", totalMarks });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to submit exam" },
      { status: 500 },
    );
  }
}
