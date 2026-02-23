import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { image } = await req.json();
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const usersCollection = await getCollection("users");

    const result = await usersCollection.updateOne(
      { email: session.user.email },
      { $set: { image } },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Profile image updated successfully" });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
