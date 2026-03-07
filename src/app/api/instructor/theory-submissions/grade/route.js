import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { submissionId, score } = await req.json();

    if (!submissionId || score === undefined) {
      return Response.json(
        { message: "Submission ID and score required" },
        { status: 400 },
      );
    }

    if (score < 0) {
      return Response.json(
        { message: "Score cannot be negative" },
        { status: 400 },
      );
    }

    const submissionsCol = await getCollection("submissions");

    const submission = await submissionsCol.findOne({
      _id: new ObjectId(submissionId),
    });

    if (!submission) {
      return Response.json(
        { message: "Submission not found" },
        { status: 404 },
      );
    }

    if (submission.status === "graded") {
      return Response.json({ message: "Already graded" }, { status: 409 });
    }

    await submissionsCol.updateOne(
      { _id: submission._id },
      {
        $set: {
          score: Number(score),
          status: "graded",
          gradedAt: new Date(),
        },
      },
    );

    return Response.json({
      message: "Submission graded successfully",
    });
  } catch (err) {
    console.error("Grade theory error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
