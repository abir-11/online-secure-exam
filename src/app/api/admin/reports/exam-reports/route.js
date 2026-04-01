import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const examId = searchParams.get("examId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const examsCollection = await getCollection("exams");
    const submissionsCollection = await getCollection("submissions");
    const usersCollection = await getCollection("users");
    const batchesCollection = await getCollection("batches");

    // If specific exam requested
    if (examId && ObjectId.isValid(examId)) {
      const exam = await examsCollection.findOne({ _id: new ObjectId(examId) });
      if (!exam) {
        return NextResponse.json({ error: "Exam not found" }, { status: 404 });
      }

      // Get all submissions for this exam
      const submissions = await submissionsCollection
        .find({ examId: examId })
        .toArray();

      // Get student details for each submission
      const studentEmails = submissions.map((s) => s.studentEmail);
      const students = await usersCollection
        .find({ email: { $in: studentEmails } })
        .toArray();

      const studentMap = {};
      students.forEach((s) => {
        studentMap[s.email] = s;
      });

      // Calculate statistics
      const scores = submissions.map((s) => s.score || 0);
      const totalMarks = exam.totalMarks || submissions[0]?.totalMarks || 0;

      const totalStudents = submissions.length;
      const averageScore =
        totalStudents > 0
          ? scores.reduce((a, b) => a + b, 0) / totalStudents
          : 0;
      const highestScore = Math.max(...scores, 0);
      const lowestScore = Math.min(...scores, 0);

      const passCount = submissions.filter((s) => {
        const percentage =
          totalMarks > 0 ? ((s.score || 0) / totalMarks) * 100 : 0;
        return percentage >= 40;
      }).length;
      const passRate =
        totalStudents > 0 ? (passCount / totalStudents) * 100 : 0;

      // Score distribution (0-100)
      const distribution = [0, 0, 0, 0, 0];
      submissions.forEach((s) => {
        const percentage =
          totalMarks > 0 ? ((s.score || 0) / totalMarks) * 100 : 0;
        if (percentage < 20) distribution[0]++;
        else if (percentage < 40) distribution[1]++;
        else if (percentage < 60) distribution[2]++;
        else if (percentage < 80) distribution[3]++;
        else distribution[4]++;
      });

      // Student performance list with pagination
      const studentPerformance = submissions
        .map((sub) => {
          const student = studentMap[sub.studentEmail];
          const percentage =
            totalMarks > 0 ? ((sub.score || 0) / totalMarks) * 100 : 0;
          return {
            studentName: student?.name || "Unknown",
            studentEmail: sub.studentEmail,
            score: sub.score || 0,
            totalMarks,
            percentage: percentage.toFixed(2),
            passed: percentage >= 40,
            submittedAt: sub.createdAt || sub.submittedAt,
          };
        })
        .sort((a, b) => b.percentage - a.percentage);

      const paginatedStudents = studentPerformance.slice(skip, skip + limit);
      const totalPages = Math.ceil(studentPerformance.length / limit);

      return NextResponse.json({
        success: true,
        exam: {
          id: exam._id,
          title: exam.title,
          type: exam.type,
          duration: exam.duration,
          startTime: exam.startTime,
          endTime: exam.endTime,
          totalQuestions: exam.totalQuestions || exam.questionsCount || 0,
          totalMarks,
        },
        stats: {
          totalStudents,
          averageScore: averageScore.toFixed(2),
          highestScore,
          lowestScore,
          passCount,
          passRate: passRate.toFixed(2),
          distribution,
        },
        studentPerformance: paginatedStudents,
        pagination: {
          currentPage: page,
          totalPages,
          totalStudents: studentPerformance.length,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      });
    }

    // Get all exams for list view
    const exams = await examsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const examList = await Promise.all(
      exams.map(async (exam) => {
        const submissions = await submissionsCollection
          .find({ examId: exam._id.toString() })
          .toArray();

        const totalStudents = submissions.length;
        const scores = submissions.map((s) => s.score || 0);
        const totalMarks = exam.totalMarks || submissions[0]?.totalMarks || 0;
        const averageScore =
          totalStudents > 0
            ? scores.reduce((a, b) => a + b, 0) / totalStudents
            : 0;

        const passCount = submissions.filter((s) => {
          const percentage =
            totalMarks > 0 ? ((s.score || 0) / totalMarks) * 100 : 0;
          return percentage >= 40;
        }).length;
        const passRate =
          totalStudents > 0 ? (passCount / totalStudents) * 100 : 0;

        return {
          id: exam._id,
          title: exam.title,
          type: exam.type,
          startTime: exam.startTime,
          totalStudents,
          averageScore: averageScore.toFixed(2),
          passRate: passRate.toFixed(2),
        };
      }),
    );

    return NextResponse.json({
      success: true,
      exams: examList,
    });
  } catch (error) {
    console.error("Exam Reports Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exam reports" },
      { status: 500 },
    );
  }
}
