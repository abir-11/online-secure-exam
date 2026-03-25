import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const batchId = searchParams.get("batchId");

    const usersCollection = await getCollection("users");
    const submissionsCollection = await getCollection("submissions");
    const examsCollection = await getCollection("exams");
    const batchesCollection = await getCollection("batches");
    const awardsCollection = await getCollection("awards");

    // Get all students
    let query = { role: "student" };
    if (batchId && ObjectId.isValid(batchId)) {
      const batch = await batchesCollection.findOne({
        _id: new ObjectId(batchId),
      });
      if (batch && batch.students) {
        query.email = { $in: batch.students };
      }
    }

    const students = await usersCollection.find(query).toArray();
    const studentEmails = students.map((s) => s.email);

    // Get submissions
    const submissions = await submissionsCollection
      .find({ studentEmail: { $in: studentEmails } })
      .sort({ createdAt: -1 })
      .toArray();

    // Get exams
    const examIds = [...new Set(submissions.map((s) => s.examId))];
    const exams = await examsCollection
      .find({
        _id: {
          $in: examIds.map((id) => {
            try {
              return new ObjectId(id);
            } catch {
              return id;
            }
          }),
        },
      })
      .toArray();

    const examMap = {};
    exams.forEach((e) => {
      examMap[e._id.toString()] = e;
    });

    // Get awards
    const awards = await awardsCollection
      .find({ studentEmail: { $in: studentEmails } })
      .toArray();

    const awardsMap = {};
    awards.forEach((a) => {
      awardsMap[a.studentEmail] =
        (awardsMap[a.studentEmail] || 0) + (a.gems || 0);
    });

    // Prepare data for each student
    const performanceData = students.map((student) => {
      const studentSubmissions = submissions.filter(
        (s) => s.studentEmail === student.email,
      );

      const examResults = studentSubmissions.map((sub) => {
        const exam = examMap[sub.examId];
        const score = sub.score || 0;
        const totalMarks = sub.totalMarks || exam?.totalMarks || 0;
        const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0;
        const passed = percentage >= 40;

        return {
          examTitle: sub.examTitle || exam?.title || "Unknown",
          score,
          totalMarks,
          percentage: percentage.toFixed(2),
          passed,
          date: sub.createdAt || sub.submittedAt,
        };
      });

      const totalExams = examResults.length;
      const avgPercentage =
        totalExams > 0
          ? examResults.reduce((sum, r) => sum + parseFloat(r.percentage), 0) /
            totalExams
          : 0;
      const passCount = examResults.filter((r) => r.passed).length;

      return {
        student: {
          id: student._id,
          name: student.name,
          email: student.email,
        },
        summary: {
          totalExams,
          avgPercentage: avgPercentage.toFixed(2),
          passRate:
            totalExams > 0 ? ((passCount / totalExams) * 100).toFixed(2) : 0,
          totalGems: awardsMap[student.email] || 0,
        },
        examResults,
      };
    });

    return NextResponse.json({
      success: true,
      students: students.map((s) => ({
        id: s._id,
        name: s.name,
        email: s.email,
      })),
      performanceData,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
