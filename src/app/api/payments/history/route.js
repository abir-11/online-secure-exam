import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (!session.user.id && !session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const paymentsDb = await getCollection("payments");

    const query = session.user.id
      ? { userId: session.user.id }
      : { userEmail: session.user.email };

    // Fetch all payments for the current user
    const payments = await paymentsDb
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // Format payment data
    const formattedPayments = payments.map((payment) => ({
      _id: payment._id,
      courseId: payment.courseId,
      courseName: payment.courseName,
      amount: payment.amount,
      status: payment.status,
      transactionId: payment.transactionId || payment.stripePaymentIntentId,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    }));

    return NextResponse.json({ payments: formattedPayments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment history" },
      { status: 500 },
    );
  }
}
