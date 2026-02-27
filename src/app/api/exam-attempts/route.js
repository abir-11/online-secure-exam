// // // // // // import { NextResponse } from "next/server";
// // // // // // import { getCollection } from "@/lib/dbConnect";
// // // // // // import { ObjectId } from "mongodb";

// // // // // // export async function POST(req) {
// // // // // //   try {
// // // // // //     const data = await req.json();
// // // // // //     const { examId, studentEmail, answers } = data;

// // // // // //     if (!examId || !studentEmail || !answers) {
// // // // // //       return NextResponse.json(
// // // // // //         { message: "All fields are required" },
// // // // // //         { status: 400 },
// // // // // //       );
// // // // // //     }

// // // // // //     const examsCollection = await getCollection("exams");
// // // // // //     const attemptsCollection = await getCollection("examAttempts");

// // // // // //     const exam = await examsCollection.findOne({ _id: new ObjectId(examId) });
// // // // // //     if (!exam)
// // // // // //       return NextResponse.json({ message: "Exam not found" }, { status: 404 });

// // // // // //     // Auto-grade
// // // // // //     let totalMarks = 0;
// // // // // //     exam.questions.forEach((q) => {
// // // // // //       const ans = answers.find((a) => a.questionId === q._id.toString());
// // // // // //       if (ans && ans.answer === q.correctOption) totalMarks += q.marks;
// // // // // //     });

// // // // // //     const attempt = {
// // // // // //       examId: new ObjectId(examId),
// // // // // //       studentEmail,
// // // // // //       answers,
// // // // // //       totalMarks,
// // // // // //       submittedAt: new Date(),
// // // // // //     };

// // // // // //     await attemptsCollection.insertOne(attempt);

// // // // // //     return NextResponse.json({ message: "Exam submitted", totalMarks });
// // // // // //   } catch (error) {
// // // // // //     console.error(error);
// // // // // //     return NextResponse.json(
// // // // // //       { message: "Failed to submit exam" },
// // // // // //       { status: 500 },
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // import { NextResponse } from "next/server";
// // // // // import { getCollection } from "@/lib/dbConnect";
// // // // // import { ObjectId } from "mongodb";

// // // // // export async function POST(req) {
// // // // //   try {
// // // // //     const { examId, studentEmail, answers } = await req.json();

// // // // //     const examsCollection = await getCollection("exams");
// // // // //     const attemptsCollection = await getCollection("examAttempts");

// // // // //     const exam = await examsCollection.findOne({ _id: new ObjectId(examId) });
// // // // //     if (!exam) {
// // // // //       return NextResponse.json({ message: "Exam not found" }, { status: 404 });
// // // // //     }

// // // // //     let totalMarks = 0;
// // // // //     exam.questions.forEach((q) => {
// // // // //       const ans = answers.find((a) => a.questionId === q._id.toString());
// // // // //       if (ans?.answer === q.correctOption) totalMarks += q.marks;
// // // // //     });

// // // // //     await attemptsCollection.insertOne({
// // // // //       examId: exam._id,
// // // // //       studentEmail,
// // // // //       instructorEmail: exam.instructorEmail, // 🔐 IMPORTANT
// // // // //       totalMarks,
// // // // //       submittedAt: new Date(),
// // // // //     });

// // // // //     return NextResponse.json({ message: "Exam submitted", totalMarks });
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     return NextResponse.json(
// // // // //       { message: "Failed to submit exam" },
// // // // //       { status: 500 },
// // // // //     );
// // // // //   }
// // // // // }

// // // // import { NextResponse } from "next/server";
// // // // import { getCollection } from "@/lib/dbConnect";
// // // // import { ObjectId } from "mongodb";

// // // // export async function POST(req) {
// // // //   const { examId, studentEmail, answers } = await req.json();

// // // //   const examsCollection = await getCollection("exams");
// // // //   const exam = await examsCollection.findOne({ _id: new ObjectId(examId) });

// // // //   let totalMarks = 0;
// // // //   exam.questions.forEach((q) => {
// // // //     const a = answers.find((x) => x.questionId === q._id.toString());
// // // //     if (a?.answer === q.correctOption) totalMarks += q.marks;
// // // //   });

// // // //   await (
// // // //     await getCollection("examAttempts")
// // // //   ).insertOne({
// // // //     examId: exam._id,
// // // //     studentEmail,
// // // //     instructorEmail: exam.instructorEmail, // 🔐 KEY
// // // //     totalMarks,
// // // //     submittedAt: new Date(),
// // // //   });

// // // //   return NextResponse.json({ totalMarks });
// // // // }

// // // import { NextResponse } from "next/server";
// // // import { getServerSession } from "next-auth";
// // // import { authOptions } from "../auth/[...nextauth]/route";
// // // import { getCollection } from "@/lib/dbConnect";

// // // export async function POST(req) {
// // //   try {
// // //     const session = await getServerSession(authOptions);
// // //     if (!session) {
// // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // //     }

// // //     const { examId, studentEmail, answers } = await req.json();

// // //     if (!examId || !studentEmail || !answers) {
// // //       return NextResponse.json(
// // //         { message: "Missing examId, studentEmail, or answers" },
// // //         { status: 400 },
// // //       );
// // //     }

// // //     const resultsCollection = await getCollection("results");

// // //     // Prevent multiple submissions
// // //     const existing = await resultsCollection.findOne({ examId, studentEmail });
// // //     if (existing) {
// // //       return NextResponse.json(
// // //         { message: "You have already submitted this exam" },
// // //         { status: 400 },
// // //       );
// // //     }

// // //     // Simple scoring logic: each correct answer = 1 mark
// // //     const examsCollection = await getCollection("exams");
// // //     const exam = await examsCollection.findOne({ _id: examId });
// // //     let totalMarks = exam?.questions?.length || 0;
// // //     let score = 0;

// // //     exam.questions.forEach((q) => {
// // //       if (
// // //         answers.find((a) => a.questionId === q._id)?.answer === q.correctAnswer
// // //       ) {
// // //         score += 1;
// // //       }
// // //     });

// // //     await resultsCollection.insertOne({
// // //       examId,
// // //       studentEmail,
// // //       answers,
// // //       score,
// // //       totalMarks,
// // //       submittedAt: new Date(),
// // //     });

// // //     return NextResponse.json({
// // //       message: "Exam submitted successfully",
// // //       score,
// // //       totalMarks,
// // //     });
// // //   } catch (err) {
// // //     console.error("POST /api/exam-attempts error:", err);
// // //     return NextResponse.json(
// // //       { message: "Failed to submit exam" },
// // //       { status: 500 },
// // //     );
// // //   }
// // // }

// // import { NextResponse } from "next/server";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "../auth/[...nextauth]/route";
// // import { getCollection } from "@/lib/dbConnect";
// // import { ObjectId } from "mongodb";

// // export async function POST(req) {
// //   try {
// //     const session = await getServerSession(authOptions);
// //     if (!session) {
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //     }

// //     const { examId, studentEmail, answers } = await req.json();

// //     if (!examId || !studentEmail || !answers) {
// //       return NextResponse.json(
// //         { message: "Missing examId, studentEmail, or answers" },
// //         { status: 400 },
// //       );
// //     }

// //     const resultsCollection = await getCollection("results");
// //     const examsCollection = await getCollection("exams");

// //     // Convert examId to ObjectId for MongoDB
// //     const exam = await examsCollection.findOne({ _id: new ObjectId(examId) });
// //     if (!exam) {
// //       return NextResponse.json({ message: "Exam not found" }, { status: 404 });
// //     }

// //     // Prevent multiple submissions
// //     const existing = await resultsCollection.findOne({ examId, studentEmail });
// //     if (existing) {
// //       return NextResponse.json(
// //         { message: "You have already submitted this exam" },
// //         { status: 400 },
// //       );
// //     }

// //     // Calculate score: 1 mark per correct answer
// //     let totalMarks = exam.questions?.length || 0;
// //     let score = 0;

// //     exam.questions.forEach((q) => {
// //       if (
// //         answers.find((a) => a.questionId === q._id)?.answer === q.correctAnswer
// //       ) {
// //         score += 1;
// //       }
// //     });

// //     await resultsCollection.insertOne({
// //       examId,
// //       studentEmail,
// //       answers,
// //       score,
// //       totalMarks,
// //       submittedAt: new Date(),
// //     });

// //     return NextResponse.json({
// //       message: "Exam submitted successfully",
// //       score,
// //       totalMarks,
// //     });
// //   } catch (err) {
// //     console.error("POST /api/exam-attempts error:", err);
// //     return NextResponse.json(
// //       { message: "Failed to submit exam" },
// //       { status: 500 },
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { examId, answers = [], theoryAnswers = [] } = await req.json();

//     const examsCol = await getCollection("exams");
//     const attemptsCol = await getCollection("examAttempts");
//     const resultsCol = await getCollection("results");

//     const exam = await examsCol.findOne({ _id: new ObjectId(examId) });
//     if (!exam) {
//       return NextResponse.json({ message: "Exam not found" }, { status: 404 });
//     }

//     // 🔒 Prevent multiple submissions
//     const existingAttempt = await attemptsCol.findOne({
//       examId,
//       studentEmail: session.user.email,
//     });

//     if (existingAttempt) {
//       return NextResponse.json(
//         { message: "You already submitted this exam" },
//         { status: 400 },
//       );
//     }

//     let score = null;
//     let totalMarks = null;

//     // ✅ MCQ AUTO CHECK
//     if (exam.type === "mcq") {
//       totalMarks = exam.questions.reduce((s, q) => s + (q.marks || 1), 0);
//       score = 0;

//       exam.questions.forEach((q) => {
//         const given = answers.find((a) => a.questionId === q._id.toString());
//         if (given && given.answer === q.correctAnswer) {
//           score += q.marks || 1;
//         }
//       });
//     }

//     // Save attempt
//     await attemptsCol.insertOne({
//       examId,
//       studentEmail: session.user.email,
//       type: exam.type,
//       mcqAnswers: answers,
//       theoryAnswers,
//       score,
//       evaluated: exam.type === "mcq",
//       submittedAt: new Date(),
//     });

//     // Auto result for MCQ
//     if (exam.type === "mcq") {
//       await resultsCol.insertOne({
//         examId,
//         studentEmail: session.user.email,
//         score,
//         totalMarks,
//         publishedAt: new Date(),
//       });
//     }

//     return NextResponse.json({
//       message:
//         exam.type === "mcq"
//           ? "Exam submitted successfully"
//           : "Exam submitted. Await evaluation.",
//       totalMarks,
//     });
//   } catch (err) {
//     console.error("Exam submit error:", err);
//     return NextResponse.json(
//       { message: "Failed to submit exam" },
//       { status: 500 },
//     );
//   }
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { examId, answers } = await req.json();
    const attemptsCollection = await getCollection("examAttempts");
    const examsCollection = await getCollection("exams");

    // Check if already submitted
    const existing = await attemptsCollection.findOne({
      examId,
      studentEmail: session.user.email,
    });
    if (existing)
      return NextResponse.json(
        { message: "Already submitted" },
        { status: 403 },
      );

    // Fetch exam to validate
    const exam = await examsCollection.findOne({ _id: examId });
    if (!exam)
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });

    // TODO: Check student batch access if required
    // const batchAllowed = exam.batchIds.includes(session.user.batchId);
    // if (!batchAllowed) return NextResponse.json({ message: "Access denied" }, { status: 403 });

    let totalMarks = 0;
    if (exam.examType === "MCQ") {
      answers.forEach((a) => {
        const q = exam.questions.find((q) => q._id === a.questionId);
        if (q && q.correctAnswer === a.answer) totalMarks++;
      });
    }

    await attemptsCollection.insertOne({
      examId,
      studentEmail: session.user.email,
      answers,
      totalMarks: exam.examType === "MCQ" ? totalMarks : null,
      graded: exam.examType === "Theoretical" ? false : true,
      submittedAt: new Date(),
    });

    return NextResponse.json({
      message: "Exam submitted successfully",
      totalMarks,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to submit exam" },
      { status: 500 },
    );
  }
}
