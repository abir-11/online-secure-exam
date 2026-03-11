import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const paymentsCollection = await getCollection("payments");

    // Last 7 days
    const labels = [];
    const values = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayPayments = await paymentsCollection
        .find({
          status: "completed",
          createdAt: { $gte: date, $lt: nextDate },
        })
        .toArray();

      const dayRevenue = dayPayments.reduce(
        (sum, p) => sum + (p.amount / 100 || 0),
        0,
      );

      labels.push(
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      );
      values.push(dayRevenue);
    }

    return NextResponse.json({
      success: true,
      data: {
        labels,
        values,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch revenue" },
      { status: 500 },
    );
  }
}
