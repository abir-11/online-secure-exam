import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getCollection } from "@/lib/dbConnect";
import { sendResetEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email });

    // Always return success for security (don't reveal if user exists)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists, a reset link has been sent.",
      });
    }

    // Generate JWT token (expires in 1 hour)
    const resetToken = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
        purpose: "password_reset",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    // Save token to database
    await usersCollection.updateOne(
      { email },
      {
        $set: {
          resetToken: resetToken,
          resetTokenExpires: resetTokenExpires,
        },
      },
    );

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    await sendResetEmail(email, resetLink);

    return NextResponse.json({
      success: true,
      message: "If an account exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
