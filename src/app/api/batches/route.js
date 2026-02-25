// // import { NextResponse } from "next/server";
// // import { getCollection } from "@/lib/dbConnect";

// // // Helper function to send a message/notification to students
// // async function sendBatchNotification(studentEmails, batchName) {
// //   try {
// //     const messagesCollection = await getCollection("messages");

// //     const messages = studentEmails.map((email) => ({
// //       to: email,
// //       message: `You have been added to batch "${batchName}".`,
// //       createdAt: new Date(),
// //       read: false,
// //     }));

// //     if (messages.length > 0) {
// //       await messagesCollection.insertMany(messages);
// //     }
// //   } catch (err) {
// //     console.error("Failed to send batch notifications:", err);
// //   }
// // }

// // export async function GET() {
// //   try {
// //     const batchesCollection = await getCollection("batches");
// //     const batches = await batchesCollection.find({}).toArray();

// //     return NextResponse.json(batches);
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       { error: "Failed to fetch batches" },
// //       { status: 500 },
// //     );
// //   }
// // }

// // export async function POST(req) {
// //   try {
// //     const data = await req.json();
// //     const { name, studentEmails = [] } = data;

// //     if (!name) {
// //       return NextResponse.json(
// //         { error: "Batch name is required" },
// //         { status: 400 },
// //       );
// //     }

// //     // Ensure batch name is unique
// //     const batchesCollection = await getCollection("batches");
// //     const existing = await batchesCollection.findOne({ name: name.trim() });
// //     if (existing) {
// //       return NextResponse.json(
// //         { error: "Batch name already exists" },
// //         { status: 400 },
// //       );
// //     }

// //     const batch = {
// //       name: name.trim(),
// //       students: studentEmails.map((email) => email.trim()),
// //       createdAt: new Date(),
// //     };

// //     const result = await batchesCollection.insertOne(batch);

// //     // Send notification to students
// //     await sendBatchNotification(batch.students, batch.name);

// //     return NextResponse.json({
// //       message: "Batch created successfully",
// //       batchId: result.insertedId,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       { error: "Failed to create batch" },
// //       { status: 500 },
// //     );
// //   }
// // }

// // export async function DELETE(req) {
// //   try {
// //     const { searchParams } = new URL(req.url);
// //     const batchId = searchParams.get("id");

// //     if (!batchId) {
// //       return NextResponse.json(
// //         { error: "Batch ID is required" },
// //         { status: 400 },
// //       );
// //     }

// //     const batchesCollection = await getCollection("batches");
// //     const result = await batchesCollection.deleteOne({
// //       _id: new ObjectId(batchId),
// //     });

// //     if (result.deletedCount === 0) {
// //       return NextResponse.json({ error: "Batch not found" }, { status: 404 });
// //     }

// //     return NextResponse.json({ message: "Batch deleted successfully" });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       { error: "Failed to delete batch" },
// //       { status: 500 },
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb";
// import { getCollection } from "@/lib/dbConnect";

// // Send notification to students
// async function sendBatchNotification(studentEmails, batchName) {
//   try {
//     const messagesCollection = await getCollection("messages");

//     const messages = studentEmails.map((email) => ({
//       to: email,
//       message: `You have been added to batch "${batchName}".`,
//       createdAt: new Date(),
//       read: false,
//     }));

//     if (messages.length > 0) {
//       await messagesCollection.insertMany(messages);
//     }
//   } catch (error) {
//     console.error("Notification error:", error);
//   }
// }

// // Get all batches
// export async function GET() {
//   try {
//     const batchesCollection = await getCollection("batches");
//     const batches = await batchesCollection.find({}).toArray();
//     return NextResponse.json(batches);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to fetch batches" },
//       { status: 500 },
//     );
//   }
// }

// // Create batch OR add students
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, studentEmails } = body;

//     const batchesCollection = await getCollection("batches");

//     // Create new batch
//     if (name && !studentEmails) {
//       const existing = await batchesCollection.findOne({ name });

//       if (existing) {
//         return NextResponse.json(
//           { error: "Batch name already exists" },
//           { status: 400 },
//         );
//       }

//       const result = await batchesCollection.insertOne({
//         name,
//         students: [],
//         createdAt: new Date(),
//       });

//       return NextResponse.json({
//         message: "Batch created successfully",
//         batchId: result.insertedId,
//       });
//     }

//     // Add students to batch
//     if (name && studentEmails) {
//       let emailsArray = [];

//       // allow string input like "ronita@gmail.com, tania@gmail.com"
//       if (typeof studentEmails === "string") {
//         emailsArray = studentEmails
//           .split(",")
//           .map((email) => email.trim())
//           .filter(Boolean);
//       } else if (Array.isArray(studentEmails)) {
//         emailsArray = studentEmails;
//       }

//       if (emailsArray.length === 0) {
//         return NextResponse.json(
//           { error: "No valid emails provided" },
//           { status: 400 },
//         );
//       }

//       const batch = await batchesCollection.findOne({ name });

//       if (!batch) {
//         return NextResponse.json({ error: "Batch not found" }, { status: 404 });
//       }

//       await batchesCollection.updateOne(
//         { name },
//         {
//           $addToSet: {
//             students: { $each: emailsArray },
//           },
//         },
//       );

//       await sendBatchNotification(emailsArray, name);

//       return NextResponse.json({
//         message: "Students added successfully",
//       });
//     }

//     return NextResponse.json(
//       { error: "Invalid request data" },
//       { status: 400 },
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Server error while processing request" },
//       { status: 500 },
//     );
//   }
// }

// // Delete batch
// export async function DELETE(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ error: "Batch id required" }, { status: 400 });
//     }

//     const batchesCollection = await getCollection("batches");

//     const result = await batchesCollection.deleteOne({
//       _id: new ObjectId(id),
//     });

//     return NextResponse.json({
//       message: "Batch deleted successfully",
//       result,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to delete batch" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET all batches (IMPORTANT: return array so old pages work)
export async function GET() {
  try {
    const batchesCollection = await getCollection("batches");

    const batches = await batchesCollection.find({}).toArray();

    return NextResponse.json(batches); // return array directly
  } catch (error) {
    console.error("GET batches error:", error);
    return NextResponse.json(
      { message: "Failed to fetch batches" },
      { status: 500 },
    );
  }
}

// CREATE batch (only batch name required)
export async function POST(req) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Batch name is required" },
        { status: 400 },
      );
    }

    const batchesCollection = await getCollection("batches");

    // prevent duplicate batch name
    const existingBatch = await batchesCollection.findOne({
      name: name.trim(),
    });

    if (existingBatch) {
      return NextResponse.json(
        { message: "Batch with this name already exists" },
        { status: 400 },
      );
    }

    const newBatch = {
      name: name.trim(),
      students: [],
      createdAt: new Date(),
    };

    const result = await batchesCollection.insertOne(newBatch);

    return NextResponse.json({
      message: "Batch created successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Create batch error:", error);
    return NextResponse.json(
      { message: "Failed to create batch" },
      { status: 500 },
    );
  }
}

// DELETE batch
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Batch ID required" },
        { status: 400 },
      );
    }

    const batchesCollection = await getCollection("batches");

    await batchesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      message: "Batch deleted successfully",
    });
  } catch (error) {
    console.error("Delete batch error:", error);
    return NextResponse.json(
      { message: "Failed to delete batch" },
      { status: 500 },
    );
  }
}
