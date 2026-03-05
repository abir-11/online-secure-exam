import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

/* ====================== GET SUBMISSIONS ====================== */
export async function GET(req, context) {
  try {
    // ✔ unwrap params properly in Next 16+
    const { examId } = await context.params;

    if (!examId || typeof examId !== "string") {
      return NextResponse.json(
        { message: "Exam ID required" },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const submissionsCol = await getCollection("submissions");
    const questionsCol = await getCollection("questions");

    // 1. Fetch all submissions for this exam
    const submissions = await submissionsCol.find({ examId }).toArray();

    // 2. Fetch all theory questions for this exam
    const questions = await questionsCol
      .find({ examId, type: "theory" })
      .toArray();

    // Build questions map for easy lookup
    const qMap = {};
    let totalExamMarks = 0;
    questions.forEach((q) => {
      qMap[q._id.toString()] = q;
      totalExamMarks += q.marks || 0;
    });

    // 3. Merge student answers + question info
    const submissionsWithDetails = submissions.map((sub) => {
      const answersWithMarks = {};

      for (let qid in sub.answers) {
        const question = qMap[qid];
        answersWithMarks[qid] = {
          questionText: question?.questionText || "Question not found",
          answer: sub.answers[qid],
          maxMarks: question?.marks || 0,
          awarded: sub.scores?.[qid] ?? null,
        };
      }

      // total marks for this specific submission
      const awardedTotal = Object.values(sub.scores || {}).reduce(
        (sum, val) => sum + (val || 0),
        0,
      );

      return {
        ...sub,
        answersWithMarks,
        totalMarks: totalExamMarks,
        score: awardedTotal,
      };
    });

    return NextResponse.json({ submissions: submissionsWithDetails });
  } catch (err) {
    console.error("GET Theory Submissions Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

/* ====================== POST: GRADE QUESTION ====================== */
export async function POST(req, context) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { examId } = await context.params;

    if (!examId) {
      return NextResponse.json(
        { message: "Exam ID required" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { submissionId, qid, score } = body;

    if (!submissionId || !qid || score == null) {
      return NextResponse.json(
        { message: "submissionId, qid, score required" },
        { status: 400 },
      );
    }

    const submissionsCol = await getCollection("submissions");
    const questionsCol = await getCollection("questions");

    // validate question
    const question = await questionsCol.findOne({
      _id: new ObjectId(qid),
    });

    if (!question) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 },
      );
    }

    if (score > question.marks) {
      return NextResponse.json(
        {
          message: `Cannot assign more than ${question.marks} marks`,
        },
        { status: 400 },
      );
    }

    // update per-question score
    await submissionsCol.updateOne(
      { _id: new ObjectId(submissionId) },
      { $set: { [`scores.${qid}`]: score } },
    );

    return NextResponse.json({ message: "Graded successfully" });
  } catch (err) {
    console.error("POST Grade Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
