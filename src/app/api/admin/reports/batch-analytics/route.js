import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get("batchId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const batchesCollection = await getCollection("batches");
    const usersCollection = await getCollection("users");
    const submissionsCollection = await getCollection("submissions");
    const examsCollection = await getCollection("exams");
    const awardsCollection = await getCollection("awards");

    // Get all batches
    const batches = await batchesCollection.find({}).toArray();

    // If specific batch requested
    if (batchId && ObjectId.isValid(batchId)) {
      const batch = await batchesCollection.findOne({
        _id: new ObjectId(batchId),
      });
      if (!batch) {
        return NextResponse.json({ error: "Batch not found" }, { status: 404 });
      }

      // Get students in this batch
      const studentEmails = batch.students || [];
      const students = await usersCollection
        .find({ email: { $in: studentEmails } })
        .toArray();

      // Get submissions for these students
      const submissions = await submissionsCollection
        .find({ studentEmail: { $in: studentEmails } })
        .toArray();

      // Get all exams
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

      // Calculate batch statistics
      const batchStats = {
        totalStudents: students.length,
        totalExams: examIds.length,
        totalSubmissions: submissions.length,
        avgScore: 0,
        passRate: 0,
        totalGems: 0,
      };

      // Calculate student-wise performance
      const studentPerformance = students.map((student) => {
        const studentSubmissions = submissions.filter(
          (s) => s.studentEmail === student.email,
        );

        const examResults = studentSubmissions.map((sub) => {
          const exam = examMap[sub.examId];
          const score = sub.score || 0;
          const totalMarks = sub.totalMarks || exam?.totalMarks || 0;
          const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0;
          const passed = percentage >= 40;

          return { percentage, passed, totalMarks, score };
        });

        const totalExams = examResults.length;
        const avgPercentage =
          totalExams > 0
            ? examResults.reduce((sum, r) => sum + r.percentage, 0) / totalExams
            : 0;
        const passCount = examResults.filter((r) => r.passed).length;
        const passRate = totalExams > 0 ? (passCount / totalExams) * 100 : 0;

        return {
          studentId: student._id,
          studentName: student.name,
          studentEmail: student.email,
          totalExams,
          avgPercentage: avgPercentage.toFixed(2),
          passRate: passRate.toFixed(2),
          totalGems: awardsMap[student.email] || 0,
        };
      });

      // Calculate batch averages
      const allAvgPercentages = studentPerformance.map((s) =>
        parseFloat(s.avgPercentage),
      );
      batchStats.avgScore =
        studentPerformance.length > 0
          ? (
              allAvgPercentages.reduce((a, b) => a + b, 0) /
              studentPerformance.length
            ).toFixed(2)
          : 0;

      const allPassRates = studentPerformance.map((s) =>
        parseFloat(s.passRate),
      );
      batchStats.passRate =
        studentPerformance.length > 0
          ? (
              allPassRates.reduce((a, b) => a + b, 0) /
              studentPerformance.length
            ).toFixed(2)
          : 0;

      batchStats.totalGems = Object.values(awardsMap).reduce(
        (a, b) => a + b,
        0,
      );

      // Paginate student performance
      const paginatedStudents = studentPerformance.slice(skip, skip + limit);
      const totalPages = Math.ceil(studentPerformance.length / limit);

      return NextResponse.json({
        success: true,
        batch: {
          id: batch._id,
          name: batch.name,
          students: studentEmails.length,
          instructorEmail: batch.instructorEmail,
        },
        stats: batchStats,
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

    // Get all batches for list view
    const batchList = await Promise.all(
      batches.map(async (batch) => {
        const studentEmails = batch.students || [];
        const submissions = await submissionsCollection
          .find({ studentEmail: { $in: studentEmails } })
          .toArray();

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

        const studentPerformance = [];
        for (const student of studentEmails) {
          const studentSubmissions = submissions.filter(
            (s) => s.studentEmail === student,
          );
          const examResults = studentSubmissions.map((sub) => {
            const exam = exams.find((e) => e._id.toString() === sub.examId);
            const totalMarks = sub.totalMarks || exam?.totalMarks || 0;
            const percentage =
              totalMarks > 0 ? ((sub.score || 0) / totalMarks) * 100 : 0;
            return { percentage, passed: percentage >= 40 };
          });

          const avgPercentage =
            examResults.length > 0
              ? examResults.reduce((sum, r) => sum + r.percentage, 0) /
                examResults.length
              : 0;
          const passCount = examResults.filter((r) => r.passed).length;
          const passRate =
            examResults.length > 0 ? (passCount / examResults.length) * 100 : 0;

          studentPerformance.push({ avgPercentage, passRate });
        }

        const allAvgPercentages = studentPerformance.map(
          (s) => s.avgPercentage,
        );
        const allPassRates = studentPerformance.map((s) => s.passRate);

        return {
          id: batch._id,
          name: batch.name,
          totalStudents: studentEmails.length,
          totalExams: examIds.length,
          avgScore:
            studentPerformance.length > 0
              ? (
                  allAvgPercentages.reduce((a, b) => a + b, 0) /
                  studentPerformance.length
                ).toFixed(2)
              : 0,
          passRate:
            studentPerformance.length > 0
              ? (
                  allPassRates.reduce((a, b) => a + b, 0) /
                  studentPerformance.length
                ).toFixed(2)
              : 0,
        };
      }),
    );

    return NextResponse.json({
      success: true,
      batches: batchList,
    });
  } catch (error) {
    console.error("Batch Analytics Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch batch analytics" },
      { status: 500 },
    );
  }
}
