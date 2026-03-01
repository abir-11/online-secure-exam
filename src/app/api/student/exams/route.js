// // // // // // // // import { NextResponse } from "next/server";
// // // // // // // // import { getServerSession } from "next-auth";
// // // // // // // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // // // // // // // import { getCollection } from "@/lib/dbConnect";

// // // // // // // // export async function GET() {
// // // // // // // //   const session = await getServerSession(authOptions);

// // // // // // // //   if (!session || session.user.role !== "student") {
// // // // // // // //     return NextResponse.json({ exams: [] }, { status: 401 });
// // // // // // // //   }

// // // // // // // //   const examsCol = await getCollection("exams");

// // // // // // // //   const exams = await examsCol
// // // // // // // //     .find({
// // // // // // // //       published: true,
// // // // // // // //       batchIds: session.user.batchId, // 🔑 THIS WAS MISSING
// // // // // // // //     })
// // // // // // // //     .project({
// // // // // // // //       title: 1,
// // // // // // // //       startTime: 1,
// // // // // // // //       duration: 1,
// // // // // // // //     })
// // // // // // // //     .toArray();

// // // // // // // //   return NextResponse.json({ exams });
// // // // // // // // }

// // // // // // // import { NextResponse } from "next/server";
// // // // // // // import { getServerSession } from "next-auth";
// // // // // // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // // // // // // import { getCollection } from "@/lib/dbConnect";

// // // // // // // export async function GET() {
// // // // // // //   const session = await getServerSession(authOptions);

// // // // // // //   if (!session || session.user.role !== "student") {
// // // // // // //     return NextResponse.json({ exams: [] }, { status: 401 });
// // // // // // //   }

// // // // // // //   const examsCol = await getCollection("exams");

// // // // // // //   const exams = await examsCol
// // // // // // //     .find({
// // // // // // //       published: true,
// // // // // // //       batchIds: { $in: [session.user.batchId] }, // 🔑 must use $in
// // // // // // //     })
// // // // // // //     .project({
// // // // // // //       title: 1,
// // // // // // //       startTime: 1,
// // // // // // //       duration: 1,
// // // // // // //     })
// // // // // // //     .toArray();

// // // // // // //   return NextResponse.json({ exams });
// // // // // // // }

// // // // // // import { NextResponse } from "next/server";
// // // // // // import { getServerSession } from "next-auth";
// // // // // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // // // // // import { getCollection } from "@/lib/dbConnect";

// // // // // // /* ================= UTIL ================= */
// // // // // // function getExamStatus(exam) {
// // // // // //   const now = new Date();
// // // // // //   const start = new Date(exam.startTime);
// // // // // //   const end = new Date(exam.endTime);
// // // // // //   if (now < start) return "upcoming";
// // // // // //   if (now > end) return "past";
// // // // // //   return "ongoing";
// // // // // // }

// // // // // // /* ================= LIST EXAMS (STUDENT) ================= */
// // // // // // export async function GET() {
// // // // // //   const session = await getServerSession(authOptions);

// // // // // //   if (!session || session.user.role !== "student") {
// // // // // //     return NextResponse.json({ exams: [] }, { status: 401 });
// // // // // //   }

// // // // // //   if (!session.user.batchId) {
// // // // // //     return NextResponse.json({ exams: [] }, { status: 400 });
// // // // // //   }

// // // // // //   const examsCol = await getCollection("exams");

// // // // // //   const exams = await examsCol
// // // // // //     .find({ published: true, batchIds: session.user.batchId })
// // // // // //     .project({ title: 1, startTime: 1, endTime: 1, duration: 1, type: 1 })
// // // // // //     .sort({ startTime: 1 })
// // // // // //     .toArray();

// // // // // //   const enriched = exams.map((exam) => ({
// // // // // //     ...exam,
// // // // // //     status: getExamStatus(exam),
// // // // // //   }));

// // // // // //   return NextResponse.json({ exams: enriched });
// // // // // // }

// // // // // import { NextResponse } from "next/server";
// // // // // import { getServerSession } from "next-auth";
// // // // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // // // // import { getCollection } from "@/lib/dbConnect";

// // // // // /* ================= HELPER ================= */
// // // // // function getExamStatus(exam) {
// // // // //   const now = new Date();
// // // // //   const start = new Date(exam.startTime);
// // // // //   const end = new Date(exam.endTime);
// // // // //   if (now < start) return "upcoming";
// // // // //   if (now > end) return "past";
// // // // //   return "ongoing";
// // // // // }

// // // // // /* ================= GET STUDENT EXAMS ================= */
// // // // // export async function GET() {
// // // // //   const session = await getServerSession(authOptions);

// // // // //   if (!session || session.user.role !== "student") {
// // // // //     return NextResponse.json({ exams: [] }, { status: 401 });
// // // // //   }

// // // // //   if (!session.user.batchId) {
// // // // //     return NextResponse.json({ exams: [] }, { status: 400 });
// // // // //   }

// // // // //   const examsCol = await getCollection("exams");

// // // // //   const exams = await examsCol
// // // // //     .find({ published: true, batchIds: session.user.batchId })
// // // // //     .project({ title: 1, startTime: 1, endTime: 1, duration: 1, type: 1 })
// // // // //     .sort({ startTime: 1 })
// // // // //     .toArray();

// // // // //   const enriched = exams.map((exam) => ({
// // // // //     ...exam,
// // // // //     status: getExamStatus(exam),
// // // // //   }));

// // // // //   return NextResponse.json({ exams: enriched });
// // // // // }

// // // // import { NextResponse } from "next/server";
// // // // import { getServerSession } from "next-auth";
// // // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // // // import { getCollection } from "@/lib/dbConnect";

// // // // /* ================= HELPER ================= */
// // // // function getExamStatus(exam) {
// // // //   const now = new Date();
// // // //   const start = new Date(exam.startTime);
// // // //   const end = new Date(exam.endTime);
// // // //   if (now < start) return "upcoming";
// // // //   if (now > end) return "past";
// // // //   return "ongoing";
// // // // }

// // // // export async function GET() {
// // // //   try {
// // // //     const session = await getServerSession(authOptions);
// // // //     if (!session || session.user.role !== "student") {
// // // //       return NextResponse.json({ exams: [] }, { status: 401 });
// // // //     }

// // // //     if (!session.user.batchId) {
// // // //       return NextResponse.json({ exams: [] }, { status: 400 });
// // // //     }

// // // //     const examsCol = await getCollection("exams");

// // // //     const exams = await examsCol
// // // //       .find({ published: true, batchIds: { $in: [session.user.batchId] } })
// // // //       .project({ title: 1, startTime: 1, endTime: 1, duration: 1, type: 1 })
// // // //       .sort({ startTime: 1 })
// // // //       .toArray();

// // // //     const enriched = exams.map((exam) => ({
// // // //       ...exam,
// // // //       status: getExamStatus(exam),
// // // //     }));

// // // //     return NextResponse.json({ exams: enriched });
// // // //   } catch (err) {
// // // //     console.error("Student exams fetch error:", err);
// // // //     return NextResponse.json(
// // // //       { message: "Internal server error" },
// // // //       { status: 500 },
// // // //     );
// // // //   }
// // // // }

// // // import { NextResponse } from "next/server";
// // // import { getServerSession } from "next-auth";
// // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // // import { getCollection } from "@/lib/dbConnect";

// // // /* ================= HELPER ================= */
// // // function getExamStatus(exam) {
// // //   const now = new Date();
// // //   const start = new Date(exam.startTime);
// // //   const end = new Date(exam.endTime);
// // //   if (now < start) return "upcoming";
// // //   if (now > end) return "past";
// // //   return "ongoing";
// // // }

// // // /* ================= GET STUDENT EXAMS ================= */
// // // export async function GET() {
// // //   const session = await getServerSession(authOptions);

// // //   if (!session || session.user.role !== "student") {
// // //     return NextResponse.json({ exams: [] }, { status: 401 });
// // //   }

// // //   if (!session.user.batchId) {
// // //     return NextResponse.json({ exams: [] }, { status: 400 });
// // //   }

// // //   const examsCol = await getCollection("exams");

// // //   const exams = await examsCol
// // //     .find({ published: true, batchIds: { $in: [session.user.batchId] } })
// // //     .project({ title: 1, startTime: 1, endTime: 1, duration: 1, type: 1 })
// // //     .sort({ startTime: 1 })
// // //     .toArray();

// // //   const enriched = exams.map((exam) => ({
// // //     ...exam,
// // //     status: getExamStatus(exam),
// // //   }));

// // //   return NextResponse.json({ exams: enriched });
// // // }

// // import { NextResponse } from "next/server";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // import { getCollection } from "@/lib/dbConnect";

// // /* ================= HELPER ================= */
// // function getExamStatus(exam) {
// //   const now = new Date();
// //   const start = new Date(exam.startTime);
// //   const end = new Date(exam.endTime);
// //   if (now < start) return "upcoming";
// //   if (now > end) return "past";
// //   return "ongoing";
// // }

// // /* ================= GET STUDENT EXAMS ================= */
// // export async function GET() {
// //   const session = await getServerSession(authOptions);

// //   if (!session || session.user.role !== "student") {
// //     return NextResponse.json({ exams: [] }, { status: 401 });
// //   }

// //   const examsCol = await getCollection("exams");

// //   // Match exams to the student's batch name
// //   const exams = await examsCol
// //     .find({ published: true, batchNames: session.user.batch || "" })
// //     .project({ title: 1, startTime: 1, endTime: 1, duration: 1, type: 1 })
// //     .sort({ startTime: 1 })
// //     .toArray();

// //   const enriched = exams.map((exam) => ({
// //     ...exam,
// //     status: getExamStatus(exam),
// //   }));

// //   return NextResponse.json({ exams: enriched });
// // }

// // app/api/student/exams/route.js
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== "student") {
//     return NextResponse.json({ exams: [] }, { status: 401 });
//   }

//   const examsCol = await getCollection("exams");

//   const exams = await examsCol
//     .find({
//       published: true,
//       batchNames: session.user.batch ? [session.user.batch] : [], // use batch name
//     })
//     .project({ title: 1, startTime: 1, endTime: 1, duration: 1, type: 1 })
//     .sort({ startTime: 1 })
//     .toArray();

//   return NextResponse.json({ exams });
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student") {
      return new Response("Unauthorized", { status: 401 });
    }

    const batchesCol = await getCollection("batches");
    const examsCol = await getCollection("exams");

    // 1️⃣ Find batches where student belongs
    const batches = await batchesCol
      .find({ students: session.user.email })
      .toArray();

    const batchIds = batches.map((b) => b._id);

    if (!batchIds.length) {
      return Response.json({ exams: [] });
    }

    // 2️⃣ Find published exams for those batches
    const exams = await examsCol
      .find({
        published: true,
        batchIds: { $in: batchIds },
      })
      .project({
        title: 1,
        startTime: 1,
        endTime: 1,
        duration: 1,
      })
      .toArray();

    return Response.json({ exams });
  } catch (err) {
    console.error("Student exams error:", err);
    return new Response("Server error", { status: 500 });
  }
}
