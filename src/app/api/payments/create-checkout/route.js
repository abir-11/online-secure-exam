import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { logActivity } from "@/lib/activityLogger"; //activityLogger import

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { courseId, courseName, amount, cardNumber, expiryDate, cvc } = body;

    if (!courseId || !amount || !cardNumber || !expiryDate || !cvc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate card details
    const cardDigits = cardNumber.replace(/\s/g, "");
    if (cardDigits.length !== 16) {
      return NextResponse.json(
        { error: "Invalid card number" },
        { status: 400 },
      );
    }

    if (expiryDate.length !== 5 || !expiryDate.includes("/")) {
      return NextResponse.json(
        { error: "Invalid expiry date" },
        { status: 400 },
      );
    }

    if (cvc.length < 3 || cvc.length > 4) {
      return NextResponse.json({ error: "Invalid CVC" }, { status: 400 });
    }

    // Store payment in database with test mode flag
    const paymentsDb = await getCollection("payments");
    const paymentRecord = await paymentsDb.insertOne({
      userId: session.user.id,
      courseId: courseId.toString(),
      courseName: courseName,
      amount: amount,
      userEmail: session.user.email,
      cardLast4: cardDigits.slice(-4), // Store only last 4 digits for security
      status: "completed", // In test mode, mark as completed immediately
      transactionId: `TEST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      testMode: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Activity Log for course purchase
    await logActivity({
      userId: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
      userRole: session.user.role,
      action: "purchased_course",
      details: courseName,
      metadata: {
        courseId,
        amount,
        transactionId: paymentRecord.transactionId,
      },
    });

    // Add course to user's enrolled courses
    const usersDb = await getCollection("users");
    await usersDb.updateOne(
      { email: session.user.email },
      {
        $addToSet: {
          enrolledCourses: courseId.toString(),
        },
      },
    );

    return NextResponse.json(
      {
        success: true,
        message: "Payment processed successfully",
        transactionId: `TEST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process payment" },
      { status: 500 },
    );
  }
}
