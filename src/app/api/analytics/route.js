import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const exams = await getCollection("exams");
    const attempts = await getCollection("examAttempts");
    const users = await getCollection("users");

    const totalStudents = await users.countDocuments({
      role: "student",
    });

    const totalExams = await exams.countDocuments();

    const allAttempts = await attempts.find({}).toArray();

    let avgScore = 0;

    if (allAttempts.length > 0) {
      const totalScore = allAttempts.reduce((sum, a) => sum + a.score, 0);
      avgScore = totalScore / allAttempts.length;
    }

    return NextResponse.json({
      totalStudents,
      totalExams,
      avgScore,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load analytics" },
      { status: 500 },
    );
  }
}
