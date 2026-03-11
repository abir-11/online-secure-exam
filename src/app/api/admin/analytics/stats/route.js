//stats API
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const usersCollection = await getCollection("users");
    const paymentsCollection = await getCollection("payments");
    const coursesCollection = await getCollection("courses");
    const activityCollection = await getCollection("activity_logs");

    // Today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return NextResponse.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students,
          instructors,
          admins,
          newToday: newUsersToday,
        },
        courses: {
          total: totalCourses,
        },
        payments: {
          totalRevenue: totalRevenue.toFixed(2),
          totalTransactions,
          todayRevenue: todayRevenue.toFixed(2),
          averageTransaction:
            totalTransactions > 0
              ? (totalRevenue / totalTransactions).toFixed(2)
              : 0,
        },
        activity: {
          activeToday,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
