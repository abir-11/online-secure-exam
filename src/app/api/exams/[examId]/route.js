// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function GET(req, context) {
//   try {
//     // 🔥 Next.js 16 FIX
//     const { examId } = await context.params;

//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const examsCol = await getCollection("exams");
//     const questionsCol = await getCollection("questions");

//     /* ======================================================
//        👨‍🏫 INSTRUCTOR VIEW
//     ====================================================== */
//     if (session.user.role === "instructor") {
//       const exam = await examsCol.findOne({
//         _id: new ObjectId(examId),
//         instructorEmail: session.user.email,
//       });

//       if (!exam) {
//         return NextResponse.json(
//           { message: "Exam not found" },
//           { status: 404 },
//         );
//       }

//       const questions = await questionsCol.find({ examId }).toArray();

//       return NextResponse.json({
//         exam: {
//           ...exam,
//           _id: exam._id.toString(),
//           questions: questions.map((q) => ({
//             ...q,
//             _id: q._id.toString(),
//           })),
//         },
//       });
//     }

//     /* ======================================================
//        🎓 STUDENT VIEW (ATTEND EXAM)
//     ====================================================== */
//     if (session.user.role === "student") {
//       const exam = await examsCol.findOne({
//         _id: new ObjectId(examId),
//         published: true,
//         batchIds: session.user.batchId,
//       });

//       if (!exam) {
//         return NextResponse.json(
//           { message: "Exam not found" },
//           { status: 404 },
//         );
//       }

//       // ⏱ TIME GATE
//       const now = new Date();

//       if (now < new Date(exam.startTime)) {
//         return NextResponse.json(
//           { message: "Exam has not started yet" },
//           { status: 403 },
//         );
//       }

//       if (now > new Date(exam.endTime)) {
//         return NextResponse.json(
//           { message: "Exam has ended" },
//           { status: 403 },
//         );
//       }

//       const questions = await questionsCol
//         .find({ examId })
//         .project({ correctOption: 0 }) // 🔐 hide answers
//         .toArray();

//       return NextResponse.json({
//         exam: {
//           ...exam,
//           _id: exam._id.toString(),
//           questions: questions.map((q) => ({
//             ...q,
//             _id: q._id.toString(),
//           })),
//         },
//       });
//     }

//     return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//   } catch (error) {
//     console.error("GET /api/exams/[examId] error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  try {
    const params = await context.params; // ✅ Next.js 16 Turbopack fix
    const { examId } = params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const examsCol = await getCollection("exams");
    const questionsCol = await getCollection("questions");
    const theoryCol = await getCollection("theoryQuestions");

    // Fetch exam document
    const exam = await examsCol.findOne({ _id: new ObjectId(examId) });
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    let questions = [];

    // Decide which collection to fetch based on exam type
    if (exam.type === "mcq") {
      // MCQ collection
      questions = await questionsCol
        .find({ examId: exam._id.toString() }) // examId stored as string
        .toArray();
    } else if (exam.type === "theory") {
      // Theory collection
      questions = await theoryCol
        .find({ examId: exam._id.toString() }) // examId stored as string
        .toArray();
    }

    // Map _id to string for frontend
    questions = questions.map((q) => ({ ...q, _id: q._id.toString() }));

    return NextResponse.json({
      exam: {
        ...exam,
        _id: exam._id.toString(),
        questions,
      },
    });
  } catch (error) {
    console.error("GET /api/exams/[examId] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
