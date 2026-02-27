// // import { NextResponse } from "next/server";
// // import { getCollection } from "@/lib/dbConnect";
// // import { ObjectId } from "mongodb";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "../auth/[...nextauth]/route";

// // export async function GET() {
// //   try {
// //     const session = await getServerSession(authOptions);
// //     if (!session || session.user.role !== "instructor") {
// //       return NextResponse.json([], { status: 401 });
// //     }

// //     const batchesCollection = await getCollection("batches");
// //     const batches = await batchesCollection
// //       .find({ instructorEmail: session.user.email })
// //       .toArray();

// //     return NextResponse.json(batches || []);
// //   } catch (error) {
// //     console.error("GET batches error:", error);
// //     return NextResponse.json([], { status: 500 });
// //   }
// // }

// // export async function POST(req) {
// //   try {
// //     const session = await getServerSession(authOptions);
// //     if (!session || session.user.role !== "instructor") {
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //     }

// //     const { name } = await req.json();
// //     if (!name) {
// //       return NextResponse.json(
// //         { message: "Batch name required" },
// //         { status: 400 },
// //       );
// //     }

// //     const batchesCollection = await getCollection("batches");
// //     const existingBatch = await batchesCollection.findOne({
// //       name: name.trim(),
// //       instructorEmail: session.user.email,
// //     });

// //     if (existingBatch) {
// //       return NextResponse.json(
// //         { message: "Batch already exists" },
// //         { status: 400 },
// //       );
// //     }

// //     const newBatch = {
// //       name: name.trim(),
// //       students: [],
// //       instructorEmail: session.user.email,
// //       createdAt: new Date(),
// //     };

// //     const result = await batchesCollection.insertOne(newBatch);
// //     return NextResponse.json({
// //       message: "Batch created",
// //       insertedId: result.insertedId,
// //     });
// //   } catch (error) {
// //     console.error("POST batch error:", error);
// //     return NextResponse.json(
// //       { message: "Failed to create batch" },
// //       { status: 500 },
// //     );
// //   }
// // }

// // File: app/api/exams/route.js
// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// /* ================= GET EXAMS (Instructor Scoped) ================= */
// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const examsCollection = await getCollection("exams");

//     let query = {};
//     if (session.user.role === "instructor") {
//       query = { instructorEmail: session.user.email };
//     } else if (session.user.role === "student") {
//       // Student: exams assigned to their batch
//       const batchesCollection = await getCollection("batches");
//       const userBatches = await batchesCollection
//         .find({ students: session.user.email })
//         .toArray();
//       const batchIds = userBatches.map((b) => b._id);
//       query = { batchIds: { $in: batchIds } };
//     }

//     const exams = await examsCollection.find(query).toArray();
//     return NextResponse.json(exams);
//   } catch (error) {
//     console.error("GET exams error:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch exams" },
//       { status: 500 },
//     );
//   }
// }

// /* ================= CREATE EXAM ================= */
// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const data = await req.json();
//     const { title, duration, batchIds, startTime, endTime } = data;

//     if (!title || !duration || !batchIds?.length || !startTime || !endTime) {
//       return NextResponse.json(
//         { message: "All exam fields are required" },
//         { status: 400 },
//       );
//     }

//     const examsCollection = await getCollection("exams");
//     const batchesCollection = await getCollection("batches");
//     const messagesCollection = await getCollection("messages");

//     const exam = {
//       title,
//       duration,
//       batchIds: batchIds.map((id) => new ObjectId(id)),
//       startTime: new Date(startTime),
//       endTime: new Date(endTime),
//       questions: [],
//       published: false,
//       instructorEmail: session.user.email, // 🔐 Instructor scoping
//       createdAt: new Date(),
//     };

//     const result = await examsCollection.insertOne(exam);

//     // Notify students in batches
//     const batches = await batchesCollection
//       .find({
//         _id: { $in: exam.batchIds },
//         instructorEmail: session.user.email,
//       })
//       .toArray();

//     let students = [];
//     batches.forEach((b) => b.students && students.push(...b.students));
//     students = [...new Set(students)];

//     if (students.length) {
//       await messagesCollection.insertMany(
//         students.map((email) => ({
//           to: email,
//           message: `New exam scheduled: ${title}`,
//           type: "exam",
//           read: false,
//           createdAt: new Date(),
//         })),
//       );
//     }

//     return NextResponse.json({
//       message: "Exam created successfully",
//       examId: result.insertedId,
//     });
//   } catch (error) {
//     console.error("POST exam error:", error);
//     return NextResponse.json(
//       { message: "Failed to create exam" },
//       { status: 500 },
//     );
//   }
// }

// /* ================= PUBLISH EXAM ================= */
// export async function PATCH(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { examId } = await req.json();
//     if (!examId) {
//       return NextResponse.json(
//         { message: "examId is required" },
//         { status: 400 },
//       );
//     }

//     const examsCollection = await getCollection("exams");
//     const result = await examsCollection.updateOne(
//       { _id: new ObjectId(examId), instructorEmail: session.user.email },
//       { $set: { published: true } },
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { message: "Exam not found or unauthorized" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json({ message: "Exam published successfully" });
//   } catch (error) {
//     console.error("PATCH exam error:", error);
//     return NextResponse.json(
//       { message: "Failed to publish exam" },
//       { status: 500 },
//     );
//   }
// }

// File: app/api/batches/route.js
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json([], { status: 401 });
    }

    const batchesCollection = await getCollection("batches");
    const batches = await batchesCollection
      .find({ instructorEmail: session.user.email })
      .toArray();

    return NextResponse.json(batches || []);
  } catch (error) {
    console.error("GET batches error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        { message: "Batch name required" },
        { status: 400 },
      );
    }

    const batchesCollection = await getCollection("batches");
    const existingBatch = await batchesCollection.findOne({
      name: name.trim(),
      instructorEmail: session.user.email,
    });

    if (existingBatch) {
      return NextResponse.json(
        { message: "Batch already exists" },
        { status: 400 },
      );
    }

    const newBatch = {
      name: name.trim(),
      students: [],
      instructorEmail: session.user.email,
      createdAt: new Date(),
    };

    const result = await batchesCollection.insertOne(newBatch);
    return NextResponse.json({
      message: "Batch created",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("POST batch error:", error);
    return NextResponse.json(
      { message: "Failed to create batch" },
      { status: 500 },
    );
  }
}
