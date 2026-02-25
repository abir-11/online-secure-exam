// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect"; // ✅ use your existing dbConnect.js
// import { ObjectId } from "mongodb";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { batchId, studentEmails } = body;

//     // Validate request
//     if (!batchId || !studentEmails || studentEmails.length === 0) {
//       return NextResponse.json(
//         { message: "BatchId and studentEmails are required" },
//         { status: 400 },
//       );
//     }

//     // Trim emails and remove duplicates
//     const emails = [...new Set(studentEmails.map((e) => e.trim()))];

//     // Get collections
//     const batchesCollection = await getCollection("batches");
//     const usersCollection = await getCollection("users");
//     const messagesCollection = await getCollection("messages");

//     // Find students that exist in users collection
//     const students = await usersCollection
//       .find({ email: { $in: emails } })
//       .toArray();

//     const foundEmails = students.map((s) => s.email);

//     if (foundEmails.length === 0) {
//       return NextResponse.json(
//         { message: "No valid student accounts found for these emails" },
//         { status: 404 },
//       );
//     }

//     // Add students to batch (avoiding duplicates)
//     await batchesCollection.updateOne(
//       { _id: new ObjectId(batchId) },
//       {
//         $addToSet: { students: { $each: foundEmails } },
//       },
//     );

//     // Create notifications/messages for each student
//     const batch = await batchesCollection.findOne({
//       _id: new ObjectId(batchId),
//     });

//     const notifications = foundEmails.map((email) => ({
//       to: email,
//       message: `You have been added to batch: ${batch.name}`,
//       type: "batch", // type can be batch, exam, etc.
//       read: false,
//       createdAt: new Date(),
//     }));

//     if (notifications.length > 0) {
//       await messagesCollection.insertMany(notifications);
//     }

//     return NextResponse.json({
//       message: "Students added successfully and notified",
//       addedStudents: foundEmails,
//     });
//   } catch (error) {
//     console.error("Error adding students:", error);
//     return NextResponse.json(
//       { message: "Failed to add students" },
//       { status: 500 },
//     );
//   }
// }

// File: src/app/api/batches/add-students/route.js
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect"; // your existing dbConnect.js
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { batchId, studentEmails } = body;

    // Validate request
    if (
      !batchId ||
      !studentEmails ||
      !Array.isArray(studentEmails) ||
      studentEmails.length === 0
    ) {
      return NextResponse.json(
        { message: "BatchId and studentEmails are required" },
        { status: 400 },
      );
    }

    // Trim emails and remove duplicates
    const emails = [...new Set(studentEmails.map((e) => e.trim()))];

    // Get collections
    const batchesCollection = await getCollection("batches");
    const usersCollection = await getCollection("users");
    const messagesCollection = await getCollection("messages");

    // Find valid student accounts
    const students = await usersCollection
      .find({ email: { $in: emails } })
      .toArray();
    const foundEmails = students.map((s) => s.email);

    if (foundEmails.length === 0) {
      return NextResponse.json(
        { message: "No valid student accounts found for these emails" },
        { status: 404 },
      );
    }

    // Add students to batch (avoid duplicates)
    await batchesCollection.updateOne(
      { _id: new ObjectId(batchId) },
      { $addToSet: { students: { $each: foundEmails } } },
    );

    // Send notifications
    const batch = await batchesCollection.findOne({
      _id: new ObjectId(batchId),
    });
    const notifications = foundEmails.map((email) => ({
      to: email, // matches your working frontend
      message: `You have been added to batch: ${batch.name}`,
      type: "batch",
      read: false,
      createdAt: new Date(),
    }));

    if (notifications.length > 0) {
      await messagesCollection.insertMany(notifications);
    }

    return NextResponse.json({
      message: "Students added successfully and notified",
      addedStudents: foundEmails,
    });
  } catch (error) {
    console.error("Error adding students:", error);
    return NextResponse.json(
      { message: "Failed to add students" },
      { status: 500 },
    );
  }
}
