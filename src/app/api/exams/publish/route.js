// // import { NextResponse } from "next/server";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // import { getCollection } from "@/lib/dbConnect";
// // import { ObjectId } from "mongodb";

// // export async function PATCH(req) {
// //   try {
// //     const session = await getServerSession(authOptions);
// //     if (!session || session.user.role !== "instructor") {
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //     }

// //     const { examId } = await req.json();
// //     if (!examId) {
// //       return NextResponse.json(
// //         { message: "Exam ID required" },
// //         { status: 400 },
// //       );
// //     }

// //     const examsCol = await getCollection("exams");
// //     const batchesCol = await getCollection("batches");
// //     const notificationsCol = await getCollection("messages");

// //     const exam = await examsCol.findOne({
// //       _id: new ObjectId(examId),
// //       instructorEmail: session.user.email,
// //     });

// //     if (!exam) {
// //       return NextResponse.json({ message: "Exam not found" }, { status: 404 });
// //     }

// //     if (exam.published) {
// //       return NextResponse.json({ message: "Exam already published" });
// //     }

// //     // ✅ Publish exam
// //     await examsCol.updateOne({ _id: exam._id }, { $set: { published: true } });

// //     // 🔴 CRITICAL FIX: use batchIds (NOT batchNames)
// //     const batchObjectIds = (exam.batchIds || []).map((id) => new ObjectId(id));

// //     const batches = await batchesCol
// //       .find({
// //         _id: { $in: batchObjectIds },
// //         instructorEmail: session.user.email,
// //       })
// //       .toArray();

// //     // Extract students
// //     const studentEmails = [
// //       ...new Set(batches.flatMap((b) => b.students || [])),
// //     ];

// //     // Insert notifications
// //     if (studentEmails.length > 0) {
// //       await notificationsCol.insertMany(
// //         studentEmails.map((email) => ({
// //           to: email,
// //           message: `New exam published: ${exam.title}`,
// //           type: "exam",
// //           read: false,
// //           createdAt: new Date(),
// //         })),
// //       );
// //     }

// //     return NextResponse.json({
// //       message: "Exam published and students notified",
// //       notifiedStudents: studentEmails.length,
// //     });
// //   } catch (error) {
// //     console.error("Publish exam error:", error);
// //     return NextResponse.json(
// //       { message: "Internal server error" },
// //       { status: 500 },
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function PATCH(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { examId } = await req.json();
//     if (!examId) {
//       return NextResponse.json(
//         { message: "Exam ID required" },
//         { status: 400 },
//       );
//     }

//     const examsCol = await getCollection("exams");
//     const batchesCol = await getCollection("batches");
//     const notificationsCol = await getCollection("messages");

//     const exam = await examsCol.findOne({
//       _id: new ObjectId(examId),
//       instructorEmail: session.user.email,
//     });

//     if (!exam) {
//       return NextResponse.json({ message: "Exam not found" }, { status: 404 });
//     }

//     if (exam.published) {
//       return NextResponse.json({ message: "Exam already published" });
//     }

//     // ✅ FIX: Update both 'published' and 'status'
//     await examsCol.updateOne(
//       { _id: exam._id },
//       { $set: { published: true, status: "published", updatedAt: new Date() } },
//     );

//     // 🔴 use batchIds (NOT batchNames)
//     const batchObjectIds = (exam.batchIds || []).map((id) => new ObjectId(id));

//     const batches = await batchesCol
//       .find({
//         _id: { $in: batchObjectIds },
//         instructorEmail: session.user.email,
//       })
//       .toArray();

//     // Extract students
//     const studentEmails = [
//       ...new Set(batches.flatMap((b) => b.students || [])),
//     ];

//     // Insert notifications
//     if (studentEmails.length > 0) {
//       await notificationsCol.insertMany(
//         studentEmails.map((email) => ({
//           to: email,
//           message: `New exam published: ${exam.title}`,
//           type: "exam",
//           read: false,
//           createdAt: new Date(),
//         })),
//       );
//     }

//     return NextResponse.json({
//       message: "Exam published and students notified",
//       notifiedStudents: studentEmails.length,
//     });
//   } catch (error) {
//     console.error("Publish exam error:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req) {
  try {
    /* =====================================
       🔐 AUTH CHECK
    ===================================== */
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    /* =====================================
       📦 BODY VALIDATION
    ===================================== */
    const { examId } = await req.json();

    if (!examId || !ObjectId.isValid(examId)) {
      return NextResponse.json({ message: "Invalid exam ID" }, { status: 400 });
    }

    /* =====================================
       📚 COLLECTIONS
    ===================================== */
    const examsCol = await getCollection("exams");
    const batchesCol = await getCollection("batches");
    const notificationsCol = await getCollection("messages");

    /* =====================================
       🧪 EXAM OWNERSHIP CHECK
    ===================================== */
    const exam = await examsCol.findOne({
      _id: new ObjectId(examId),
      instructorEmail: session.user.email,
    });

    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    if (exam.published) {
      return NextResponse.json({ message: "Exam already published" });
    }

    /* =====================================
       ✅ PUBLISH EXAM
    ===================================== */
    await examsCol.updateOne(
      { _id: exam._id },
      {
        $set: {
          published: true,
          status: "published",
          updatedAt: new Date(),
        },
      },
    );

    /* =====================================
       👥 FIND BATCH STUDENTS
    ===================================== */
    const batchObjectIds = (exam.batchIds || [])
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    const batches = await batchesCol
      .find({
        _id: { $in: batchObjectIds },
        instructorEmail: session.user.email,
      })
      .toArray();

    // Extract unique student emails
    const studentEmails = [
      ...new Set(batches.flatMap((batch) => batch.students || [])),
    ];

    /* =====================================
       🔔 CREATE NOTIFICATIONS
    ===================================== */
    if (studentEmails.length > 0) {
      await notificationsCol.insertMany(
        studentEmails.map((email) => ({
          to: email,
          type: "exam_published",
          examId: exam._id.toString(),
          title: "New Exam Published",
          message: `A new exam "${exam.title}" has been published.`,
          read: false,
          createdAt: new Date(),
        })),
      );
    }

    /* =====================================
       ✅ RESPONSE
    ===================================== */
    return NextResponse.json({
      message: "Exam published and students notified",
      notifiedStudents: studentEmails.length,
    });
  } catch (error) {
    console.error("PATCH /api/exams/publish error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
