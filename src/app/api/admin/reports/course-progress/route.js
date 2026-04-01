import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const coursesCollection = await getCollection("courses");
    const usersCollection = await getCollection("users");
    const paymentsCollection = await getCollection("payments");
    const examAttemptsCollection = await getCollection("examAttempts");
    const submissionsCollection = await getCollection("submissions");

    // Get all courses
    const courses = await coursesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // If specific course requested
    if (courseId && ObjectId.isValid(courseId)) {
      const course = await coursesCollection.findOne({
        _id: new ObjectId(courseId),
      });
      if (!course) {
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 },
        );
      }

      // Get students who purchased this course
      const payments = await paymentsCollection
        .find({ courseId: courseId, status: "completed" })
        .toArray();

      const studentEmails = [...new Set(payments.map((p) => p.userEmail))];
      const students = await usersCollection
        .find({ email: { $in: studentEmails } })
        .toArray();

      // Get exam submissions for these students (to track progress)
      const submissions = await submissionsCollection
        .find({ studentEmail: { $in: studentEmails } })
        .toArray();

      // Calculate progress for each student
      const totalModules = course.totalModules || course.lessons || 10; // Default to 10 if not set

      const studentProgress = students
        .map((student) => {
          // Count completed exams/submissions for this student
          const studentSubmissions = submissions.filter(
            (s) => s.studentEmail === student.email,
          );
          const completedCount = studentSubmissions.length;

          // Calculate progress percentage
          const progress =
            totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

          // Get last activity date
          const lastActivity =
            studentSubmissions.length > 0
              ? Math.max(
                  ...studentSubmissions.map(
                    (s) => new Date(s.createdAt || s.submittedAt),
                  ),
                )
              : null;

          // Determine status based on progress
          let status = "Not Started";
          if (progress >= 100) status = "Completed";
          else if (progress >= 75) status = "Advanced";
          else if (progress >= 50) status = "Halfway";
          else if (progress >= 25) status = "Started";
          else if (progress > 0) status = "Just Started";

          return {
            studentId: student._id,
            studentName: student.name,
            studentEmail: student.email,
            progress: progress.toFixed(1),
            completedModules: completedCount,
            totalModules,
            lastActivity,
            status,
            enrolledDate:
              payments.find((p) => p.userEmail === student.email)?.createdAt ||
              null,
          };
        })
        .sort((a, b) => b.progress - a.progress);

      // Calculate course statistics
      const totalStudents = studentProgress.length;
      const averageProgress =
        totalStudents > 0
          ? studentProgress.reduce(
              (sum, s) => sum + parseFloat(s.progress),
              0,
            ) / totalStudents
          : 0;
      const completedCount = studentProgress.filter(
        (s) => parseFloat(s.progress) >= 100,
      ).length;
      const completionRate =
        totalStudents > 0 ? (completedCount / totalStudents) * 100 : 0;

      // Progress distribution
      const distribution = {
        notStarted: studentProgress.filter((s) => parseFloat(s.progress) === 0)
          .length,
        started: studentProgress.filter(
          (s) => parseFloat(s.progress) > 0 && parseFloat(s.progress) < 25,
        ).length,
        halfway: studentProgress.filter(
          (s) => parseFloat(s.progress) >= 25 && parseFloat(s.progress) < 50,
        ).length,
        advanced: studentProgress.filter(
          (s) => parseFloat(s.progress) >= 50 && parseFloat(s.progress) < 75,
        ).length,
        nearlyDone: studentProgress.filter(
          (s) => parseFloat(s.progress) >= 75 && parseFloat(s.progress) < 100,
        ).length,
        completed: studentProgress.filter((s) => parseFloat(s.progress) >= 100)
          .length,
      };

      // Paginate student progress
      const paginatedStudents = studentProgress.slice(skip, skip + limit);
      const totalPages = Math.ceil(studentProgress.length / limit);

      return NextResponse.json({
        success: true,
        course: {
          id: course._id,
          title: course.title,
          instructor: course.instructor,
          price: course.price,
          totalModules: course.totalModules || course.lessons || 10,
          description: course.description,
        },
        stats: {
          totalStudents,
          averageProgress: averageProgress.toFixed(1),
          completionRate: completionRate.toFixed(1),
          completedCount,
          distribution,
        },
        studentProgress: paginatedStudents,
        pagination: {
          currentPage: page,
          totalPages,
          totalStudents: studentProgress.length,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      });
    }

    // Get all courses for list view
    const courseList = await Promise.all(
      courses.map(async (course) => {
        const payments = await paymentsCollection
          .find({ courseId: course._id.toString(), status: "completed" })
          .toArray();

        const studentEmails = [...new Set(payments.map((p) => p.userEmail))];
        const submissions = await submissionsCollection
          .find({ studentEmail: { $in: studentEmails } })
          .toArray();

        const totalModules = course.totalModules || course.lessons || 10;

        const studentProgress = studentEmails.map((email) => {
          const studentSubmissions = submissions.filter(
            (s) => s.studentEmail === email,
          );
          return studentSubmissions.length / totalModules;
        });

        const averageProgress =
          studentProgress.length > 0
            ? (studentProgress.reduce((a, b) => a + b, 0) /
                studentProgress.length) *
              100
            : 0;
        const completedCount = studentProgress.filter((p) => p >= 1).length;
        const completionRate =
          studentEmails.length > 0
            ? (completedCount / studentEmails.length) * 100
            : 0;

        return {
          id: course._id,
          title: course.title,
          instructor: course.instructor,
          totalStudents: studentEmails.length,
          averageProgress: averageProgress.toFixed(1),
          completionRate: completionRate.toFixed(1),
        };
      }),
    );

    return NextResponse.json({
      success: true,
      courses: courseList,
    });
  } catch (error) {
    console.error("Course Progress Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch course progress" },
      { status: 500 },
    );
  }
}
