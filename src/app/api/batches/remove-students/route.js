import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { batchId, studentEmail } = await req.json();

    if (!batchId || !studentEmail) {
      return NextResponse.json(
        { message: "batchId and studentEmail are required" },
        { status: 400 },
      );
    }

    const batchesCollection = await getCollection("batches");

    const result = await batchesCollection.updateOne(
      { _id: new ObjectId(batchId) },
      { $pull: { students: studentEmail } },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Student not found in batch" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Student removed successfully" });
  } catch (error) {
    console.error("Remove student error:", error);
    return NextResponse.json(
      { message: "Failed to remove student" },
      { status: 500 },
    );
  }
}
