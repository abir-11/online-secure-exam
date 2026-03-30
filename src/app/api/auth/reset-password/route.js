import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getCollection } from "@/lib/dbConnect";

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // Verify token
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
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
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

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await usersCollection.updateOne(
      { email: decoded.email },
      {
        $set: { password: hashedPassword },
        $unset: { resetToken: "", resetTokenExpires: "" },
      },
    );

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
