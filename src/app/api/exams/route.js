// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// // GET exams
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const instructorId = searchParams.get("instructorId");

//     const examsCollection = await getCollection("exams");
//     const questionsCollection = await getCollection("questions");

//     let query = {};
//     if (instructorId) {
//       query.instructorId = instructorId;
//     }

//     const exams = await examsCollection.find(query).toArray();

//     const examsWithQuestions = await Promise.all(
//       exams.map(async (exam) => {
//         const questions = await questionsCollection
//           .find({ examId: exam._id.toString() })
//           .toArray();

//         return {
//           ...exam,
//           questions,
//         };
//       }),
//     );

//     return NextResponse.json(examsWithQuestions);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch exams" },
//       { status: 500 },
//     );
//   }
// }

// // CREATE exam
// export async function POST(req) {
//   try {
//     const data = await req.json();
//     const collection = await getCollection("exams");

//     const exam = {
//       title: data.title,
//       duration: data.duration,
//       batchIds: data.batchIds || [],
//       instructorId: data.instructorId,
//       startTime: data.startTime,
//       endTime: data.endTime,
//       published: false,
//       createdAt: new Date(),
//     };

//     const result = await collection.insertOne(exam);

//     return NextResponse.json({
//       message: "Exam created",
//       insertedId: result.insertedId,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to create exam" },
//       { status: 500 },
//     );
//   }
// }

// // Publish exam
// export async function PUT(req) {
//   try {
//     const data = await req.json();
//     const collection = await getCollection("exams");

//     await collection.updateOne(
//       { _id: new ObjectId(data.examId) },
//       {
//         $set: { published: true },
//       },
//     );

//     return NextResponse.json({
//       message: "Exam published successfully",
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to publish exam" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const collection = await getCollection("exams");
    const exams = await collection.find({}).toArray();
    return NextResponse.json(exams);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch exams" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { title, duration, batchIds, startTime, endTime } = data;

    if (
      !title ||
      !duration ||
      !batchIds ||
      batchIds.length === 0 ||
      !startTime ||
      !endTime
    ) {
      return NextResponse.json(
        { message: "All exam fields are required" },
        { status: 400 },
      );
    }

    const examsCollection = await getCollection("exams");
    const batchesCollection = await getCollection("batches");
    const messagesCollection = await getCollection("messages");

    // Create exam
    const exam = {
      title,
      duration,
      batchIds: batchIds.map((id) => new ObjectId(id)),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      questions: [],
      published: false,
      createdAt: new Date(),
    };

    const result = await examsCollection.insertOne(exam);

    // Notify all students in batches
    const batches = await batchesCollection
      .find({ _id: { $in: exam.batchIds } })
      .toArray();
    let studentEmails = [];
    batches.forEach((b) => {
      if (b.students) studentEmails.push(...b.students);
    });
    studentEmails = [...new Set(studentEmails)];

    const notifications = studentEmails.map((email) => ({
      to: email,
      message: `New exam scheduled: ${title} from ${new Date(startTime).toLocaleString()} to ${new Date(endTime).toLocaleString()}`,
      type: "exam",
      read: false,
      createdAt: new Date(),
    }));

    if (notifications.length > 0) {
      await messagesCollection.insertMany(notifications);
    }

    return NextResponse.json({
      message: "Exam created and students notified",
      examId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create exam" },
      { status: 500 },
    );
  }
}

// PATCH /api/exams
export async function PATCH(req) {
  try {
    const data = await req.json();
    const { examId } = data;

    if (!examId)
      return NextResponse.json(
        { message: "examId is required" },
        { status: 400 },
      );

    const examsCollection = await getCollection("exams");
    await examsCollection.updateOne(
      { _id: new ObjectId(examId) },
      { $set: { published: true } },
    );

    return NextResponse.json({ message: "Exam published successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to publish exam" },
      { status: 500 },
    );
  }
}
