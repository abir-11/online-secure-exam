//for single user's api
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

//GET
export async function GET(request, { params }) {
  try {
    const { id } = params;

    console.log("🔍 Received ID:", id);

    // ⚠️ ObjectId validation remove
    // if (!ObjectId.isValid(id)) {
    //   return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    // }

    const usersCollection = await getCollection("users");

    // Try to find by string ID first
    let user = await usersCollection.findOne({ _id: id });

    // If not found, try as ObjectId
    if (!user && ObjectId.isValid(id)) {
      user = await usersCollection.findOne({ _id: new ObjectId(id) });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error(" Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}
//PUT
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updates = await request.json();

    // Validation remove
    // if (!ObjectId.isValid(id)) {
    //   return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    // }

    const usersCollection = await getCollection("users");

    const { _id, password, createdAt, ...validUpdates } = updates;
    validUpdates.updatedAt = new Date();

    // Try string ID first, then ObjectId
    let result = await usersCollection.updateOne(
      { _id: id },
      { $set: validUpdates },
    );

    if (result.matchedCount === 0 && ObjectId.isValid(id)) {
      result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: validUpdates },
      );
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User updated" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

//DELETE
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const usersCollection = await getCollection("users");

    // Try string ID first
    let result = await usersCollection.deleteOne({ _id: id });

    // If not found, try as ObjectId
    if (result.deletedCount === 0 && ObjectId.isValid(id)) {
      result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
