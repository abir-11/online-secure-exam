import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { newRole } = await request.json();

    console.log("🔍 Change role for ID:", id, "to:", newRole);

    if (!["admin", "instructor", "student"].includes(newRole)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const usersCollection = await getCollection("users");

    // Try string ID first
    let result = await usersCollection.updateOne(
      { _id: id },
      {
        $set: {
          role: newRole,
          updatedAt: new Date(),
        },
      },
    );

    // If not found, try as ObjectId
    if (result.matchedCount === 0 && ObjectId.isValid(id)) {
      result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            role: newRole,
            updatedAt: new Date(),
          },
        },
      );
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Role updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 },
    );
  }
}
