//change role api
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newRole } = await request.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    if (!["admin", "instructor", "student"].includes(newRole)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const usersCollection = await getCollection("users");

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          role: newRole,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Role updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 },
    );
  }
}
