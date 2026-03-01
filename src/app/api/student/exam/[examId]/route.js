//---result issue
// src/app/api/student/exam/[examId]/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  try {
    // ✅ Get current session
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Next.js 16: unwrap params
    const params = await context.params;
    const examId = params.examId;

    if (!ObjectId.isValid(examId)) {
      return Response.json({ message: "Invalid exam ID" }, { status: 400 });
    }

    // Collections
    const examsCol = await getCollection("exams");
    const questionsCol = await getCollection("questions");
    const batchesCol = await getCollection("batches");

    // Find exam
    const exam = await examsCol.findOne({
      _id: new ObjectId(examId),
      published: true,
    });

    if (!exam) {
      return Response.json({ message: "Exam not found" }, { status: 404 });
    }

    // ⏱ Check exam timing
    const now = new Date();
    if (now < new Date(exam.startTime) || now > new Date(exam.endTime)) {
      return Response.json({ message: "Exam not active" }, { status: 403 });
    }

    // 🔐 Check student batch
    const batch = await batchesCol.findOne({
      _id: { $in: exam.batchIds },
      students: session.user.email,
    });

    if (!batch) {
      return Response.json({ message: "Access denied" }, { status: 403 });
    }

    // ✅ Fetch questions (hide correctOption)
    const questions = await questionsCol
      .find({ examId: exam._id.toString() })
      .project({ _id: 1, questionText: 1, options: 1, marks: 1 }) // do not send correct answers
      .toArray();

    return Response.json({
      exam: {
        _id: exam._id,
        title: exam.title,
        type: exam.type,
        duration: exam.duration,
        totalQuestions: exam.totalQuestions,
      },
      questions,
    });
  } catch (err) {
    console.error("Student exam fetch error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

// /////// view details ran-->
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function GET(req, { params }) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || session.user.role !== "student") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { examId } = params;

//     if (!examId || !ObjectId.isValid(examId)) {
//       return NextResponse.json({ message: "Invalid exam ID" }, { status: 400 });
//     }

//     const examsCollection = await getCollection("exams");
//     const questionsCollection = await getCollection("questions");

//     const exam = await examsCollection.findOne({
//       _id: new ObjectId(examId),
//       published: true,
//     });

//     if (!exam) {
//       return NextResponse.json({ message: "Exam not found" }, { status: 404 });
//     }

//     const questions = await questionsCollection
//       .find(
//         { examId: exam._id },
//         { projection: { correctOption: 0 } }, // hide correct answers
//       )
//       .toArray();

//     return NextResponse.json({ exam, questions });
//   } catch (err) {
//     console.error("❌ Student exam API error:", err);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }
