import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getCollection } from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 },
      );
    }

    if (decoded.purpose !== "password_reset") {
      return NextResponse.json(
        { error: "Invalid token purpose" },
        { status: 400 },
      );
    }

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({
      email: decoded.email,
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Token is valid",
      email: decoded.email,
    });
  } catch (error) {
    console.error("Validate token error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
