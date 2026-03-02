// // src/app/api/student/exam/submit/route.js
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || session.user.role !== "student") {
//       return Response.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { examId, answers } = body;

//     if (!examId || !answers || Object.keys(answers).length === 0) {
//       return Response.json(
//         { message: "Exam ID and answers required" },
//         { status: 400 },
//       );
//     }

//     const examsCol = await getCollection("exams");
//     const questionsCol = await getCollection("questions");
//     const submissionsCol = await getCollection("submissions");

//     const exam = await examsCol.findOne({ _id: new ObjectId(examId) });
//     if (!exam)
//       return Response.json({ message: "Exam not found" }, { status: 404 });

//     // fetch questions for auto-scoring
//     const questions = await questionsCol
//       .find({ examId })
//       .project({ _id: 1, correctOption: 1, marks: 1 })
//       .toArray();

//     let score = 0;
//     for (const q of questions) {
//       const selected = answers[q._id.toString()];
//       if (selected === q.correctOption) score += q.marks;
//     }

//     await submissionsCol.insertOne({
//       studentEmail: session.user.email,
//       examId,
//       answers,
//       score,
//       createdAt: new Date(),
//     });

//     return Response.json({ message: "Exam submitted successfully!", score });
//   } catch (err) {
//     console.error("Submit exam error:", err);
//     return Response.json({ message: "Server error" }, { status: 500 });
//   }
// }

//try for submit once

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { examId, answers } = body;

    if (!examId || !answers || Object.keys(answers).length === 0) {
      return Response.json(
        { message: "Exam ID and answers required" },
        { status: 400 },
      );
    }

    const examsCol = await getCollection("exams");
    const questionsCol = await getCollection("questions");
    const submissionsCol = await getCollection("submissions");

    const exam = await examsCol.findOne({ _id: new ObjectId(examId) });
    if (!exam) {
      return Response.json({ message: "Exam not found" }, { status: 404 });
    }

    // 🔒 NEW: prevent multiple submission
    const existingSubmission = await submissionsCol.findOne({
      studentEmail: session.user.email,
      examId,
    });

    if (existingSubmission) {
      return Response.json(
        { message: "You have already submitted this exam." },
        { status: 409 },
      );
    }

    // fetch questions for auto-scoring
    const questions = await questionsCol
      .find({ examId })
      .project({ _id: 1, correctOption: 1, marks: 1 })
      .toArray();

    let score = 0;
    for (const q of questions) {
      const selected = answers[q._id.toString()];
      if (selected === q.correctOption) score += q.marks;
    }

    await submissionsCol.insertOne({
      studentEmail: session.user.email,
      examId,
      examTitle: exam.title, // 🆕 store exam title
      totalMarks:
        exam.totalMarks || questions.reduce((sum, q) => sum + q.marks, 0), // 🆕 calculate total marks
      answers,
      score,
      createdAt: new Date(),
    });

    return Response.json(
      { message: "Exam submitted successfully!", score },
      { status: 201 },
    );
  } catch (err) {
    console.error("Submit exam error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
