// // File: app/api/batches/route.js
// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor") {
//       return NextResponse.json([], { status: 401 });
//     }

//     const batchesCollection = await getCollection("batches");
//     const batches = await batchesCollection
//       .find({ instructorEmail: session.user.email })
//       .toArray();

//     return NextResponse.json(batches || []);
//   } catch (error) {
//     console.error("GET batches error:", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { name } = await req.json();
//     if (!name) {
//       return NextResponse.json(
//         { message: "Batch name required" },
//         { status: 400 },
//       );
//     }

//     const batchesCollection = await getCollection("batches");
//     const existingBatch = await batchesCollection.findOne({
//       name: name.trim(),
//       instructorEmail: session.user.email,
//     });

//     if (existingBatch) {
//       return NextResponse.json(
//         { message: "Batch already exists" },
//         { status: 400 },
//       );
//     }

//     const newBatch = {
//       name: name.trim(),
//       students: [],
//       instructorEmail: session.user.email,
//       createdAt: new Date(),
//     };

//     const result = await batchesCollection.insertOne(newBatch);
//     return NextResponse.json({
//       message: "Batch created",
//       insertedId: result.insertedId,
//     });
//   } catch (error) {
//     console.error("POST batch error:", error);
//     return NextResponse.json(
//       { message: "Failed to create batch" },
//       { status: 500 },
//     );
//   }
// }

//with delete route

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

// ---------------- DELETE ROUTE ----------------
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Batch ID required" },
        { status: 400 },
      );
    }

    const batchesCollection = await getCollection("batches");
    const result = await batchesCollection.deleteOne({
      _id: new ObjectId(id),
      instructorEmail: session.user.email,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Batch not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Batch deleted successfully" });
  } catch (error) {
    console.error("DELETE batch error:", error);
    return NextResponse.json(
      { message: "Failed to delete batch" },
      { status: 500 },
    );
  }
}
