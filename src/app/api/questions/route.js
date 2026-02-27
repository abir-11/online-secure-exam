// // // // import { NextResponse } from "next/server";
// // // // import { getCollection } from "@/lib/dbConnect";
// // // // import { ObjectId } from "mongodb";

// // // // export async function POST(req) {
// // // //   try {
// // // //     const data = await req.json();
// // // //     const { examId, questionText, options, correctOption, marks } = data;

// // // //     if (
// // // //       !examId ||
// // // //       !questionText ||
// // // //       !options ||
// // // //       !correctOption ||
// // // //       marks == null
// // // //     ) {
// // // //       return NextResponse.json(
// // // //         { message: "All fields are required" },
// // // //         { status: 400 },
// // // //       );
// // // //     }

// // // //     const examsCollection = await getCollection("exams");

// // // //     const question = {
// // // //       _id: new ObjectId(),
// // // //       questionText,
// // // //       options,
// // // //       correctOption,
// // // //       marks,
// // // //     };

// // // //     await examsCollection.updateOne(
// // // //       { _id: new ObjectId(examId) },
// // // //       { $push: { questions: question } },
// // // //     );

// // // //     return NextResponse.json({ message: "Question added successfully" });
// // // //   } catch (error) {
// // // //     console.error(error);
// // // //     return NextResponse.json(
// // // //       { message: "Failed to add question" },
// // // //       { status: 500 },
// // // //     );
// // // //   }
// // // // }

// // // import { NextResponse } from "next/server";
// // // import { getCollection } from "@/lib/dbConnect";
// // // import { ObjectId } from "mongodb";
// // // import { getServerSession } from "next-auth";
// // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// // // export async function POST(req) {
// // //   try {
// // //     const session = await getServerSession(authOptions);
// // //     if (!session || session.user.role !== "instructor") {
// // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // //     }

// // //     const { examId, questionText, options, correctOption, marks } =
// // //       await req.json();

// // //     const examsCollection = await getCollection("exams");

// // //     // 🔒 Verify ownership
// // //     const exam = await examsCollection.findOne({
// // //       _id: new ObjectId(examId),
// // //       instructorId: session.user.id,
// // //     });

// // //     if (!exam) {
// // //       return NextResponse.json(
// // //         { message: "Exam not found or not yours" },
// // //         { status: 403 },
// // //       );
// // //     }

// // //     const question = {
// // //       _id: new ObjectId(),
// // //       questionText,
// // //       options,
// // //       correctOption,
// // //       marks,
// // //     };

// // //     await examsCollection.updateOne(
// // //       { _id: exam._id },
// // //       { $push: { questions: question } },
// // //     );

// // //     return NextResponse.json({ message: "Question added successfully" });
// // //   } catch (error) {
// // //     return NextResponse.json(
// // //       { message: "Failed to add question" },
// // //       { status: 500 },
// // //     );
// // //   }
// // // }

// // import { NextResponse } from "next/server";
// // import { getCollection } from "@/lib/dbConnect";
// // import { ObjectId } from "mongodb";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "../auth/[...nextauth]/route";

// // export async function POST(req) {
// //   try {
// //     const session = await getServerSession(authOptions);
// //     if (!session || session.user.role !== "instructor") {
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //     }

// //     const { examId, questionText, options, correctOption, marks } =
// //       await req.json();

// //     const examsCollection = await getCollection("exams");

// //     // 🔐 ownership check
// //     const exam = await examsCollection.findOne({
// //       _id: new ObjectId(examId),
// //       instructorEmail: session.user.email,
// //     });

// //     if (!exam) {
// //       return NextResponse.json(
// //         { message: "Exam not found or access denied" },
// //         { status: 403 },
// //       );
// //     }

// //     const question = {
// //       _id: new ObjectId(),
// //       questionText,
// //       options,
// //       correctOption,
// //       marks,
// //     };

// //     await examsCollection.updateOne(
// //       { _id: exam._id },
// //       { $push: { questions: question } },
// //     );

// //     return NextResponse.json({ message: "Question added" });
// //   } catch (error) {
// //     console.error("Add question error:", error);
// //     return NextResponse.json(
// //       { message: "Failed to add question" },
// //       { status: 500 },
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// export async function POST(req) {
//   const session = await getServerSession(authOptions);
//   const { examId, questionText, options, correctOption, marks } =
//     await req.json();

//   const examsCollection = await getCollection("exams");

//   const exam = await examsCollection.findOne({
//     _id: new ObjectId(examId),
//     instructorEmail: session.user.email,
//   });

//   if (!exam) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
//   }

//   await examsCollection.updateOne(
//     { _id: exam._id },
//     {
//       $push: {
//         questions: {
//           _id: new ObjectId(),
//           questionText,
//           options,
//           correctOption,
//           marks,
//         },
//       },
//     },
//   );

//   return NextResponse.json({ message: "Question added" });
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { examId, question, options, correctAnswer, marks, type } =
      await req.json();

    if (!examId || !question || !type) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const examsCol = await getCollection("exams");
    const exam = await examsCol.findOne({ _id: new ObjectId(examId) });

    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    if (type === "mcq") {
      const newQ = {
        _id: new ObjectId(),
        questionText: question,
        options,
        correctAnswer,
        marks: marks || 1,
      };
      await examsCol.updateOne(
        { _id: new ObjectId(examId) },
        { $push: { questions: newQ } },
      );
    }

    if (type === "theory") {
      const newQ = {
        _id: new ObjectId(),
        questionText: question,
        marks: marks || 1,
      };
      await examsCol.updateOne(
        { _id: new ObjectId(examId) },
        { $push: { theoryQuestions: newQ } },
      );
    }

    return NextResponse.json({ message: "Question added successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to add question" },
      { status: 500 },
    );
  }
}
