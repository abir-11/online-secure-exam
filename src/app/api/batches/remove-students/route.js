import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const batchesCollection = await getCollection("batches");
    const batches = await batchesCollection
      .find({
        $or: [
          { instructorEmail: session.user.email },
          { instructorEmail: { $exists: false } },
        ],
      })
      .toArray();

    return NextResponse.json(batches);
  } catch (error) {
    console.error("GET batches error:", error);
    return NextResponse.json(
      { message: "Failed to fetch batches" },
      { status: 500 },
    );
  }
}
