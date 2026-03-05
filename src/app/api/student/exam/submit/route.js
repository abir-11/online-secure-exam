import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    // 🔐 Auth check
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 📥 Parse body
    const { examId, answers } = await req.json();
    if (!examId || !answers || Object.keys(answers).length === 0) {
      return Response.json(
        { message: "Exam ID and answers required" },
        { status: 400 },
      );
    }

    // 📦 Collections
    const examsCol = await getCollection("exams");
    const questionsCol = await getCollection("questions");
    const submissionsCol = await getCollection("submissions");

    // 📝 Exam exists?
    const exam = await examsCol.findOne({ _id: new ObjectId(examId) });
    if (!exam) {
      return Response.json({ message: "Exam not found" }, { status: 404 });
    }

    // 🔒 Prevent multiple submissions
    const existingSubmission = await submissionsCol.findOne({
      studentEmail: session.user.email,
      examId,
    });

    if (existingSubmission) {
      return Response.json(
        { message: "You have already submitted this exam." },
        { status: 409 },
      );
    }

    // 📚 Fetch questions
    const questions = await questionsCol
      .find({ examId })
      .project({ _id: 1, correctOption: 1, marks: 1 })
      .toArray();

    // 🧮 Always calculate correct total marks
    const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

    // 🎯 Default for THEORY
    let score = null; // theory → no auto score
    let status = "pending"; // waiting for instructor
    let gradedAt = null;

    // ✅ MCQ auto scoring (UNCHANGED LOGIC)
    if (exam.type === "mcq") {
      score = 0;
      for (const q of questions) {
        const selected = answers[q._id.toString()];
        if (selected === q.correctOption) {
          score += q.marks;
        }
      }
      status = "graded";
      gradedAt = new Date();
    }

    // 💾 Save submission
    await submissionsCol.insertOne({
      studentEmail: session.user.email,
      examId,
      examTitle: exam.title,
      answers,
      score, // number | null
      totalMarks, // correct total
      status, // graded | pending
      gradedAt, // Date | null
      createdAt: new Date(),
    });

    return Response.json(
      {
        message:
          exam.type === "mcq"
            ? "Exam submitted successfully!"
            : "Exam submitted. Awaiting instructor grading.",
        score,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Submit exam error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
