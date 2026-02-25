// // api/questions/route.js
// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function GET() {
//   try {
//     const collection = await getCollection("questions");
//     const questions = await collection.find({}).toArray();
//     return NextResponse.json(questions);
//   } catch (error) {
//     console.error("GET /questions Error:", error.message);
//     return NextResponse.json(
//       { error: "Failed to fetch questions" },
//       { status: 500 },
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     const collection = await getCollection("questions");

//     const question = {
//       examId: new ObjectId(data.examId),
//       questionText: data.questionText,
//       options: data.options, // ["A", "B", "C", "D"]
//       correctAnswer: data.correctAnswer,
//       marks: data.marks || 1,
//       hints: data.hints || "",
//       createdAt: new Date(),
//     };

//     const result = await collection.insertOne(question);

//     return NextResponse.json({
//       message: "Question added successfully",
//       insertedId: result.insertedId,
//     });
//   } catch (error) {
//     console.error("POST /questions Error:", error.message);
//     return NextResponse.json(
//       { error: "Failed to add question" },
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
    const { examId, questionText, options, correctOption, marks } = data;

    if (
      !examId ||
      !questionText ||
      !options ||
      !correctOption ||
      marks == null
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const examsCollection = await getCollection("exams");

    const question = {
      _id: new ObjectId(),
      questionText,
      options,
      correctOption,
      marks,
    };

    await examsCollection.updateOne(
      { _id: new ObjectId(examId) },
      { $push: { questions: question } },
    );

    return NextResponse.json({ message: "Question added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add question" },
      { status: 500 },
    );
  }
}
