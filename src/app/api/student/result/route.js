import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const submissionsCol = await getCollection("submissions");

    const results = await submissionsCol
      .find({ studentEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    /**
     * 🔁 BACKWARD + FORWARD COMPATIBLE FORMAT
     * - Old UI still works
     * - New theory grading works
     */
    const formattedResults = results.map((r) => ({
      examId: r.examId,
      title: r.examTitle || "Unknown Exam",

      // ✅ OLD FIELDS (do NOT break existing UI)
      marksObtained: r.score ?? 0,
      totalMarks: r.totalMarks ?? 0,
      submittedAt: r.createdAt,

      // ✅ NEW FIELDS (for theory support)
      status: r.status || "graded", // graded | pending
      gradedAt: r.gradedAt || null,

      // Optional clarity
      score: r.score,
    }));

    return Response.json({ results: formattedResults }, { status: 200 });
  } catch (err) {
    console.error("Fetch student results error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
