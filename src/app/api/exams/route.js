// // // // // // // // //
// // // // // // // // import { NextResponse } from "next/server";
// // // // // // // // import { getCollection } from "@/lib/dbConnect";
// // // // // // // // import { ObjectId } from "mongodb";
// // // // // // // // import { getServerSession } from "next-auth";
// // // // // // // // import { authOptions } from "../auth/[...nextauth]/route";

// // // // // // // // /* ================= GET EXAMS (Instructor Scoped) ================= */
// // // // // // // // export async function GET() {
// // // // // // // //   try {
// // // // // // // //     const session = await getServerSession(authOptions);
// // // // // // // //     if (!session || session.user.role !== "instructor") {
// // // // // // // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // // // // // // //     }

// // // // // // // //     const examsCollection = await getCollection("exams");

// // // // // // // //     const exams = await examsCollection
// // // // // // // //       .find({ instructorEmail: session.user.email })
// // // // // // // //       .toArray();

// // // // // // // //     return NextResponse.json(exams);
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("GET exams error:", error);
// // // // // // // //     return NextResponse.json(
// // // // // // // //       { message: "Failed to fetch exams" },
// // // // // // // //       { status: 500 },
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // /* ================= CREATE EXAM ================= */
// // // // // // // // export async function POST(req) {
// // // // // // // //   try {
// // // // // // // //     const session = await getServerSession(authOptions);
// // // // // // // //     if (!session || session.user.role !== "instructor") {
// // // // // // // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // // // // // // //     }

// // // // // // // //     const data = await req.json();
// // // // // // // //     const { title, duration, batchIds, startTime, endTime } = data;

// // // // // // // //     if (!title || !duration || !batchIds?.length || !startTime || !endTime) {
// // // // // // // //       return NextResponse.json(
// // // // // // // //         { message: "All exam fields are required" },
// // // // // // // //         { status: 400 },
// // // // // // // //       );
// // // // // // // //     }

// // // // // // // //     const examsCollection = await getCollection("exams");
// // // // // // // //     const batchesCollection = await getCollection("batches");
// // // // // // // //     const messagesCollection = await getCollection("messages");

// // // // // // // //     const exam = {
// // // // // // // //       title,
// // // // // // // //       duration,
// // // // // // // //       batchIds: batchIds.map((id) => new ObjectId(id)),
// // // // // // // //       startTime: new Date(startTime),
// // // // // // // //       endTime: new Date(endTime),
// // // // // // // //       questions: [],
// // // // // // // //       published: false,
// // // // // // // //       instructorEmail: session.user.email, // 🔐 KEY FIX
// // // // // // // //       createdAt: new Date(),
// // // // // // // //     };

// // // // // // // //     const result = await examsCollection.insertOne(exam);

// // // // // // // //     // Notify students
// // // // // // // //     const batches = await batchesCollection
// // // // // // // //       .find({
// // // // // // // //         _id: { $in: exam.batchIds },
// // // // // // // //         instructorEmail: session.user.email,
// // // // // // // //       })
// // // // // // // //       .toArray();

// // // // // // // //     let students = [];
// // // // // // // //     batches.forEach((b) => b.students && students.push(...b.students));
// // // // // // // //     students = [...new Set(students)];

// // // // // // // //     if (students.length) {
// // // // // // // //       await messagesCollection.insertMany(
// // // // // // // //         students.map((email) => ({
// // // // // // // //           to: email,
// // // // // // // //           message: `New exam scheduled: ${title}`,
// // // // // // // //           type: "exam",
// // // // // // // //           read: false,
// // // // // // // //           createdAt: new Date(),
// // // // // // // //         })),
// // // // // // // //       );
// // // // // // // //     }

// // // // // // // //     return NextResponse.json({
// // // // // // // //       message: "Exam created successfully",
// // // // // // // //       examId: result.insertedId,
// // // // // // // //     });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("POST exam error:", error);
// // // // // // // //     return NextResponse.json(
// // // // // // // //       { message: "Failed to create exam" },
// // // // // // // //       { status: 500 },
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // /* ================= PUBLISH EXAM ================= */
// // // // // // // // export async function PATCH(req) {
// // // // // // // //   try {
// // // // // // // //     const session = await getServerSession(authOptions);
// // // // // // // //     if (!session || session.user.role !== "instructor") {
// // // // // // // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // // // // // // //     }

// // // // // // // //     const { examId } = await req.json();

// // // // // // // //     await getCollection("exams").updateOne(
// // // // // // // //       {
// // // // // // // //         _id: new ObjectId(examId),
// // // // // // // //         instructorEmail: session.user.email,
// // // // // // // //       },
// // // // // // // //       { $set: { published: true } },
// // // // // // // //     );

// // // // // // // //     return NextResponse.json({ message: "Exam published" });
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("PATCH exam error:", error);
// // // // // // // //     return NextResponse.json(
// // // // // // // //       { message: "Failed to publish exam" },
// // // // // // // //       { status: 500 },
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }

// // // // // // // import { NextResponse } from "next/server";
// // // // // // // import { getCollection } from "@/lib/dbConnect";
// // // // // // // import { ObjectId } from "mongodb";
// // // // // // // import { getServerSession } from "next-auth";
// // // // // // // import { authOptions } from "../auth/[...nextauth]/route";

// // // // // // // /* ===== GET exams ===== */
// // // // // // // export async function GET() {
// // // // // // //   const session = await getServerSession(authOptions);
// // // // // // //   const exams = await (await getCollection("exams"))
// // // // // // //     .find({ instructorEmail: session.user.email })
// // // // // // //     .toArray();

// // // // // // //   return NextResponse.json(exams);
// // // // // // // }

// // // // // // // /* ===== CREATE exam ===== */
// // // // // // // export async function POST(req) {
// // // // // // //   const session = await getServerSession(authOptions);
// // // // // // //   const { title, duration, batchIds, startTime, endTime } = await req.json();

// // // // // // //   const exam = {
// // // // // // //     title,
// // // // // // //     duration,
// // // // // // //     batchIds: batchIds.map((id) => new ObjectId(id)),
// // // // // // //     startTime: new Date(startTime),
// // // // // // //     endTime: new Date(endTime),
// // // // // // //     questions: [],
// // // // // // //     published: false,
// // // // // // //     instructorEmail: session.user.email, // 🔐 KEY
// // // // // // //     createdAt: new Date(),
// // // // // // //   };

// // // // // // //   const result = await (await getCollection("exams")).insertOne(exam);
// // // // // // //   return NextResponse.json({ examId: result.insertedId });
// // // // // // // }

// // // // // // // /* ===== PUBLISH exam ===== */
// // // // // // // export async function PATCH(req) {
// // // // // // //   const session = await getServerSession(authOptions);
// // // // // // //   const { examId } = await req.json();

// // // // // // //   const result = await (
// // // // // // //     await getCollection("exams")
// // // // // // //   ).updateOne(
// // // // // // //     { _id: new ObjectId(examId), instructorEmail: session.user.email },
// // // // // // //     { $set: { published: true } },
// // // // // // //   );

// // // // // // //   if (result.matchedCount === 0) {
// // // // // // //     return NextResponse.json(
// // // // // // //       { message: "Exam not found or not owned by you" },
// // // // // // //       { status: 403 },
// // // // // // //     );
// // // // // // //   }

// // // // // // //   return NextResponse.json({ message: "Exam published" });
// // // // // // // }

// // // // // // import { NextResponse } from "next/server";
// // // // // // import { getCollection } from "@/lib/dbConnect";
// // // // // // import { ObjectId } from "mongodb";
// // // // // // import { getServerSession } from "next-auth";
// // // // // // import { authOptions } from "../auth/[...nextauth]/route";

// // // // // // export async function PATCH(req) {
// // // // // //   try {
// // // // // //     const session = await getServerSession(authOptions);
// // // // // //     if (!session || session.user.role !== "instructor") {
// // // // // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // // // // //     }

// // // // // //     const { examId } = await req.json();
// // // // // //     if (!examId)
// // // // // //       return NextResponse.json({ message: "examId required" }, { status: 400 });

// // // // // //     const examsCollection = await getCollection("exams");
// // // // // //     const batchesCollection = await getCollection("batches");
// // // // // //     const messagesCollection = await getCollection("messages");

// // // // // //     // Publish exam
// // // // // //     const result = await examsCollection.updateOne(
// // // // // //       { _id: new ObjectId(examId), instructorEmail: session.user.email },
// // // // // //       { $set: { published: true } },
// // // // // //     );

// // // // // //     if (result.matchedCount === 0) {
// // // // // //       return NextResponse.json(
// // // // // //         { message: "Exam not found or not owned by you" },
// // // // // //         { status: 403 },
// // // // // //       );
// // // // // //     }

// // // // // //     // Fetch exam to get batchIds and title
// // // // // //     const exam = await examsCollection.findOne({
// // // // // //       _id: new ObjectId(examId),
// // // // // //       instructorEmail: session.user.email,
// // // // // //     });

// // // // // //     // Fetch all batches of this instructor
// // // // // //     const batches = await batchesCollection
// // // // // //       .find({
// // // // // //         _id: { $in: exam.batchIds },
// // // // // //         instructorEmail: session.user.email,
// // // // // //       })
// // // // // //       .toArray();

// // // // // //     let studentEmails = [];
// // // // // //     batches.forEach((b) => b.students && studentEmails.push(...b.students));
// // // // // //     studentEmails = [...new Set(studentEmails)];

// // // // // //     // Send notifications
// // // // // //     if (studentEmails.length) {
// // // // // //       const notifications = studentEmails.map((email) => ({
// // // // // //         to: email,
// // // // // //         message: `New exam published: ${exam.title}`,
// // // // // //         type: "exam",
// // // // // //         read: false,
// // // // // //         createdAt: new Date(),
// // // // // //       }));
// // // // // //       await messagesCollection.insertMany(notifications);
// // // // // //     }

// // // // // //     return NextResponse.json({
// // // // // //       message: "Exam published and students notified",
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("PATCH exam error:", error);
// // // // // //     return NextResponse.json(
// // // // // //       { message: "Failed to publish exam" },
// // // // // //       { status: 500 },
// // // // // //     );
// // // // // //   }
// // // // // // }

// // // // // import { NextResponse } from "next/server";
// // // // // import { getCollection } from "@/lib/dbConnect";
// // // // // import { ObjectId } from "mongodb";
// // // // // import { getServerSession } from "next-auth";
// // // // // import { authOptions } from "../auth/[...nextauth]/route";

// // // // // /* ================= GET EXAMS ================= */
// // // // // export async function GET() {
// // // // //   try {
// // // // //     const session = await getServerSession(authOptions);
// // // // //     if (!session || session.user.role !== "instructor") {
// // // // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // // // //     }

// // // // //     const examsCollection = await getCollection("exams");

// // // // //     const exams = await examsCollection
// // // // //       .find({
// // // // //         $or: [
// // // // //           { instructorEmail: session.user.email }, // new exams
// // // // //           { instructorEmail: { $exists: false } }, // old exams
// // // // //         ],
// // // // //       })
// // // // //       .toArray();

// // // // //     return NextResponse.json(exams);
// // // // //   } catch (error) {
// // // // //     console.error("GET exams error:", error);
// // // // //     return NextResponse.json(
// // // // //       { message: "Failed to fetch exams" },
// // // // //       { status: 500 },
// // // // //     );
// // // // //   }
// // // // // }

// // // // // /* ================= CREATE EXAM ================= */
// // // // // export async function POST(req) {
// // // // //   try {
// // // // //     const session = await getServerSession(authOptions);
// // // // //     if (!session || session.user.role !== "instructor") {
// // // // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // // // //     }

// // // // //     const data = await req.json();
// // // // //     const { title, duration, batchIds, startTime, endTime } = data;

// // // // //     if (!title || !duration || !batchIds?.length || !startTime || !endTime) {
// // // // //       return NextResponse.json(
// // // // //         { message: "All exam fields are required" },
// // // // //         { status: 400 },
// // // // //       );
// // // // //     }

// // // // //     const examsCollection = await getCollection("exams");
// // // // //     const batchesCollection = await getCollection("batches");
// // // // //     const messagesCollection = await getCollection("messages");

// // // // //     const exam = {
// // // // //       title,
// // // // //       duration,
// // // // //       batchIds: batchIds.map((id) => new ObjectId(id)),
// // // // //       startTime: new Date(startTime),
// // // // //       endTime: new Date(endTime),
// // // // //       questions: [],
// // // // //       published: false,
// // // // //       instructorEmail: session.user.email,
// // // // //       createdAt: new Date(),
// // // // //     };

// // // // //     const result = await examsCollection.insertOne(exam);

// // // // //     // Notify students in batches
// // // // //     const batches = await batchesCollection
// // // // //       .find({
// // // // //         _id: { $in: exam.batchIds },
// // // // //         instructorEmail: session.user.email,
// // // // //       })
// // // // //       .toArray();

// // // // //     let studentEmails = [];
// // // // //     batches.forEach((b) => b.students && studentEmails.push(...b.students));
// // // // //     studentEmails = [...new Set(studentEmails)];

// // // // //     if (studentEmails.length) {
// // // // //       const notifications = studentEmails.map((email) => ({
// // // // //         to: email,
// // // // //         message: `New exam scheduled: ${title}`,
// // // // //         type: "exam",
// // // // //         read: false,
// // // // //         createdAt: new Date(),
// // // // //       }));
// // // // //       await messagesCollection.insertMany(notifications);
// // // // //     }

// // // // //     return NextResponse.json({
// // // // //       message: "Exam created successfully",
// // // // //       examId: result.insertedId,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("POST exam error:", error);
// // // // //     return NextResponse.json(
// // // // //       { message: "Failed to create exam" },
// // // // //       { status: 500 },
// // // // //     );
// // // // //   }
// // // // // }

// // // // // /* ================= PUBLISH EXAM ================= */
// // // // // export async function PATCH(req) {
// // // // //   try {
// // // // //     const session = await getServerSession(authOptions);
// // // // //     if (!session || session.user.role !== "instructor") {
// // // // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // // // //     }

// // // // //     const { examId } = await req.json();
// // // // //     if (!examId)
// // // // //       return NextResponse.json({ message: "examId required" }, { status: 400 });

// // // // //     const examsCollection = await getCollection("exams");
// // // // //     const batchesCollection = await getCollection("batches");
// // // // //     const messagesCollection = await getCollection("messages");

// // // // //     // Publish exam
// // // // //     const result = await examsCollection.updateOne(
// // // // //       { _id: new ObjectId(examId), instructorEmail: session.user.email },
// // // // //       { $set: { published: true } },
// // // // //     );

// // // // //     if (result.matchedCount === 0) {
// // // // //       return NextResponse.json(
// // // // //         { message: "Exam not found or not owned by you" },
// // // // //         { status: 403 },
// // // // //       );
// // // // //     }

// // // // //     // Notify students
// // // // //     const exam = await examsCollection.findOne({
// // // // //       _id: new ObjectId(examId),
// // // // //       instructorEmail: session.user.email,
// // // // //     });

// // // // //     const batches = await batchesCollection
// // // // //       .find({
// // // // //         _id: { $in: exam.batchIds },
// // // // //         instructorEmail: session.user.email,
// // // // //       })
// // // // //       .toArray();

// // // // //     let studentEmails = [];
// // // // //     batches.forEach((b) => b.students && studentEmails.push(...b.students));
// // // // //     studentEmails = [...new Set(studentEmails)];

// // // // //     if (studentEmails.length) {
// // // // //       const notifications = studentEmails.map((email) => ({
// // // // //         to: email,
// // // // //         message: `New exam published: ${exam.title}`,
// // // // //         type: "exam",
// // // // //         read: false,
// // // // //         createdAt: new Date(),
// // // // //       }));
// // // // //       await messagesCollection.insertMany(notifications);
// // // // //     }

// // // // //     return NextResponse.json({
// // // // //       message: "Exam published and students notified",
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("PATCH exam error:", error);
// // // // //     return NextResponse.json(
// // // // //       { message: "Failed to publish exam" },
// // // // //       { status: 500 },
// // // // //     );
// // // // //   }
// // // // // }

// // // // export async function GET() {
// // // //   try {
// // // //     const session = await getServerSession(authOptions);
// // // //     if (!session) {
// // // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // // //     }

// // // //     const examsCollection = await getCollection("exams");
// // // //     const batchesCollection = await getCollection("batches");

// // // //     let exams = [];

// // // //     if (session.user.role === "instructor") {
// // // //       // Instructor: only exams created by them
// // // //       exams = await examsCollection
// // // //         .find({
// // // //           $or: [
// // // //             { instructorEmail: session.user.email }, // new exams
// // // //             { instructorEmail: { $exists: false } }, // old exams
// // // //           ],
// // // //         })
// // // //         .toArray();
// // // //     } else if (session.user.role === "student") {
// // // //       // Student: fetch batches the student belongs to
// // // //       const batches = await batchesCollection
// // // //         .find({ students: session.user.email })
// // // //         .toArray();

// // // //       const batchIds = batches.map((b) => b._id);

// // // //       exams = await examsCollection
// // // //         .find({
// // // //           batchIds: { $in: batchIds },
// // // //         })
// // // //         .toArray();
// // // //     }

// // // //     // always return an array
// // // //     return NextResponse.json(Array.isArray(exams) ? exams : []);
// // // //   } catch (error) {
// // // //     console.error("GET exams error:", error);
// // // //     return NextResponse.json(
// // // //       { message: "Failed to fetch exams" },
// // // //       { status: 500 },
// // // //     );
// // // //   }
// // // // }

// // // import { NextResponse } from "next/server";
// // // import { getCollection } from "@/lib/dbConnect";
// // // import { ObjectId } from "mongodb";
// // // import { getServerSession } from "next-auth";
// // // import { authOptions } from "../auth/[...nextauth]/route";

// // // export async function GET() {
// // //   try {
// // //     const session = await getServerSession(authOptions);

// // //     if (!session) {
// // //       return NextResponse.json(
// // //         { message: "Unauthorized", data: [] },
// // //         { status: 401 },
// // //       );
// // //     }

// // //     const examsCollection = await getCollection("exams");
// // //     const batchesCollection = await getCollection("batches");

// // //     let exams = [];

// // //     if (session.user.role === "instructor") {
// // //       exams = await examsCollection
// // //         .find({ instructorEmail: session.user.email })
// // //         .toArray();
// // //     } else if (session.user.role === "student") {
// // //       const batches = await batchesCollection
// // //         .find({ students: session.user.email })
// // //         .toArray();

// // //       const batchIds = batches.map((b) => b._id);

// // //       exams = await examsCollection
// // //         .find({ batchIds: { $in: batchIds } })
// // //         .toArray();
// // //     }

// // //     // Ensure always an array
// // //     return NextResponse.json(exams || []);
// // //   } catch (error) {
// // //     console.error("GET exams error:", error);
// // //     return NextResponse.json(
// // //       { message: "Failed to fetch exams", data: [] },
// // //       { status: 500 },
// // //     );
// // //   }
// // // }

// // // File: src/app/api/exams/route.js
// // import { NextResponse } from "next/server";
// // import { getCollection } from "@/lib/dbConnect";
// // import { ObjectId } from "mongodb";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "../auth/[...nextauth]/route";

// // /* ================= GET EXAMS ================= */
// // export async function GET() {
// //   try {
// //     const session = await getServerSession(authOptions);

// //     if (!session) {
// //       return NextResponse.json(
// //         { message: "Unauthorized", data: [] },
// //         { status: 401 },
// //       );
// //     }

// //     const examsCollection = await getCollection("exams");
// //     const batchesCollection = await getCollection("batches");

// //     let exams = [];

// //     if (session.user.role === "instructor") {
// //       // Instructors see only their exams
// //       exams = await examsCollection
// //         .find({ instructorEmail: session.user.email })
// //         .toArray();
// //     } else if (session.user.role === "student") {
// //       // Students see exams only for batches they belong to
// //       const batches = await batchesCollection
// //         .find({ students: session.user.email })
// //         .toArray();

// //       const batchIds = batches.map((b) => b._id);

// //       exams = await examsCollection
// //         .find({ batchIds: { $in: batchIds } })
// //         .toArray();
// //     }

// //     // Always return an array
// //     return NextResponse.json(Array.isArray(exams) ? exams : []);
// //   } catch (error) {
// //     console.error("GET exams error:", error);
// //     return NextResponse.json(
// //       { message: "Failed to fetch exams", data: [] },
// //       { status: 500 },
// //     );
// //   }
// // }

// // /* ================= CREATE EXAM ================= */
// // export async function POST(req) {
// //   try {
// //     const session = await getServerSession(authOptions);
// //     if (!session || session.user.role !== "instructor") {
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //     }

// //     let data;
// //     try {
// //       data = await req.json();
// //     } catch (err) {
// //       return NextResponse.json(
// //         { message: "Invalid JSON body" },
// //         { status: 400 },
// //       );
// //     }

// //     const { title, duration, batchIds, startTime, endTime } = data;

// //     if (!title || !duration || !batchIds?.length || !startTime || !endTime) {
// //       return NextResponse.json(
// //         { message: "All exam fields are required" },
// //         { status: 400 },
// //       );
// //     }

// //     const examsCollection = await getCollection("exams");
// //     const batchesCollection = await getCollection("batches");
// //     const messagesCollection = await getCollection("messages");

// //     const exam = {
// //       title,
// //       duration,
// //       batchIds: batchIds.map((id) => new ObjectId(id)),
// //       startTime: new Date(startTime),
// //       endTime: new Date(endTime),
// //       questions: [],
// //       published: false,
// //       instructorEmail: session.user.email,
// //       createdAt: new Date(),
// //     };

// //     const result = await examsCollection.insertOne(exam);

// //     // Notify students in batches
// //     const batches = await batchesCollection
// //       .find({
// //         _id: { $in: exam.batchIds },
// //         instructorEmail: session.user.email,
// //       })
// //       .toArray();

// //     let students = [];
// //     batches.forEach((b) => b.students && students.push(...b.students));
// //     students = [...new Set(students)];

// //     if (students.length) {
// //       await messagesCollection.insertMany(
// //         students.map((email) => ({
// //           to: email,
// //           message: `New exam scheduled: ${title}`,
// //           type: "exam",
// //           read: false,
// //           createdAt: new Date(),
// //         })),
// //       );
// //     }

// //     return NextResponse.json({
// //       message: "Exam created successfully",
// //       examId: result.insertedId,
// //     });
// //   } catch (error) {
// //     console.error("POST exam error:", error);
// //     return NextResponse.json(
// //       { message: "Failed to create exam" },
// //       { status: 500 },
// //     );
// //   }
// // }

// // /* ================= PUBLISH EXAM ================= */
// // export async function PATCH(req) {
// //   try {
// //     const session = await getServerSession(authOptions);
// //     if (!session || session.user.role !== "instructor") {
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //     }

// //     let data;
// //     try {
// //       data = await req.json();
// //     } catch (err) {
// //       return NextResponse.json(
// //         { message: "Invalid JSON body" },
// //         { status: 400 },
// //       );
// //     }

// //     const { examId } = data;

// //     if (!examId) {
// //       return NextResponse.json(
// //         { message: "examId is required" },
// //         { status: 400 },
// //       );
// //     }

// //     const result = await getCollection("exams").updateOne(
// //       { _id: new ObjectId(examId), instructorEmail: session.user.email },
// //       { $set: { published: true } },
// //     );

// //     if (result.modifiedCount === 0) {
// //       return NextResponse.json(
// //         { message: "No exam updated (check ID or permissions)" },
// //         { status: 404 },
// //       );
// //     }

// //     return NextResponse.json({ message: "Exam published successfully" });
// //   } catch (error) {
// //     console.error("PATCH exam error:", error);
// //     return NextResponse.json(
// //       { message: "Failed to publish exam" },
// //       { status: 500 },
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// // GET exams for instructor or student
// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) return NextResponse.json([], { status: 401 });

//     const examsCollection = await getCollection("exams");
//     const batchesCollection = await getCollection("batches");

//     let exams = [];
//     if (session.user.role === "instructor") {
//       exams = await examsCollection
//         .find({ instructorEmail: session.user.email })
//         .toArray();
//     } else if (session.user.role === "student") {
//       const batches = await batchesCollection
//         .find({ students: session.user.email })
//         .toArray();
//       const batchIds = batches.map((b) => b._id);
//       exams = await examsCollection
//         .find({ batchIds: { $in: batchIds } })
//         .toArray();
//     }

//     return NextResponse.json(Array.isArray(exams) ? exams : []);
//   } catch (error) {
//     console.error("GET exams error:", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }

// // POST create exam
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
//         { message: "All fields required" },
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
//       instructorEmail: session.user.email,
//       createdAt: new Date(),
//     };

//     const result = await examsCollection.insertOne(exam);

//     // Notify students
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
//       message: "Exam created",
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

// // PATCH publish exam
// export async function PATCH(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor")
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const { examId } = await req.json();
//     if (!examId)
//       return NextResponse.json({ message: "examId required" }, { status: 400 });

//     const objId = new ObjectId(examId);
//     const result = await getCollection("exams").updateOne(
//       { _id: objId, instructorEmail: session.user.email },
//       { $set: { published: true } },
//     );

//     if (result.modifiedCount === 0)
//       return NextResponse.json(
//         { message: "Exam not updated (check ID or permissions)" },
//         { status: 404 },
//       );

//     return NextResponse.json({ message: "Exam published successfully" });
//   } catch (error) {
//     console.error("PATCH exam error:", error);
//     return NextResponse.json(
//       { message: "Failed to publish exam" },
//       { status: 500 },
//     );
//   }
// }
// File: app/api/exams/route.js
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

/* ================= GET EXAMS (Instructor Scoped) ================= */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const examsCollection = await getCollection("exams");

    let query = {};
    if (session.user.role === "instructor") {
      query = { instructorEmail: session.user.email };
    } else if (session.user.role === "student") {
      // Student: exams assigned to their batch
      const batchesCollection = await getCollection("batches");
      const userBatches = await batchesCollection
        .find({ students: session.user.email })
        .toArray();
      const batchIds = userBatches.map((b) => b._id);
      query = { batchIds: { $in: batchIds } };
    }

    const exams = await examsCollection.find(query).toArray();
    return NextResponse.json(exams);
  } catch (error) {
    console.error("GET exams error:", error);
    return NextResponse.json(
      { message: "Failed to fetch exams" },
      { status: 500 },
    );
  }
}

/* ================= CREATE EXAM ================= */
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { title, duration, batchIds, startTime, endTime } = data;

    if (!title || !duration || !batchIds?.length || !startTime || !endTime) {
      return NextResponse.json(
        { message: "All exam fields are required" },
        { status: 400 },
      );
    }

    const examsCollection = await getCollection("exams");
    const batchesCollection = await getCollection("batches");
    const messagesCollection = await getCollection("messages");

    const exam = {
      title,
      duration,
      batchIds: batchIds.map((id) => new ObjectId(id)),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      questions: [],
      published: false,
      instructorEmail: session.user.email, // 🔐 Instructor scoping
      createdAt: new Date(),
    };

    const result = await examsCollection.insertOne(exam);

    // Notify students in batches
    const batches = await batchesCollection
      .find({
        _id: { $in: exam.batchIds },
        instructorEmail: session.user.email,
      })
      .toArray();

    let students = [];
    batches.forEach((b) => b.students && students.push(...b.students));
    students = [...new Set(students)];

    if (students.length) {
      await messagesCollection.insertMany(
        students.map((email) => ({
          to: email,
          message: `New exam scheduled: ${title}`,
          type: "exam",
          read: false,
          createdAt: new Date(),
        })),
      );
    }

    return NextResponse.json({
      message: "Exam created successfully",
      examId: result.insertedId,
    });
  } catch (error) {
    console.error("POST exam error:", error);
    return NextResponse.json(
      { message: "Failed to create exam" },
      { status: 500 },
    );
  }
}

/* ================= PUBLISH EXAM ================= */
export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { examId } = await req.json();
    if (!examId) {
      return NextResponse.json(
        { message: "examId is required" },
        { status: 400 },
      );
    }

    const examsCollection = await getCollection("exams");
    const result = await examsCollection.updateOne(
      { _id: new ObjectId(examId), instructorEmail: session.user.email },
      { $set: { published: true } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Exam not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Exam published successfully" });
  } catch (error) {
    console.error("PATCH exam error:", error);
    return NextResponse.json(
      { message: "Failed to publish exam" },
      { status: 500 },
    );
  }
}
