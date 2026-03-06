// //api/student/result/route.js
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || session.user.role !== "student") {
//       return Response.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const submissionsCol = await getCollection("submissions");

//     const results = await submissionsCol
//       .find({ studentEmail: session.user.email })
//       .sort({ createdAt: -1 })
//       .toArray();

//     /**
//      * 🔁 BACKWARD + FORWARD COMPATIBLE FORMAT
//      * - Old UI still works
//      * - New theory grading works
//      */
//     const formattedResults = results.map((r) => ({
//       examId: r.examId,
//       title: r.examTitle || "Unknown Exam",

//       // ✅ OLD FIELDS (do NOT break existing UI)
//       marksObtained: r.score ?? 0,
//       totalMarks: r.totalMarks ?? 0,
//       submittedAt: r.createdAt,

//       // ✅ NEW FIELDS (for theory support)
//       status: r.status || "graded", // graded | pending
//       gradedAt: r.gradedAt || null,

//       // Optional clarity
//       score: r.score,
//     }));

//     return Response.json({ results: formattedResults }, { status: 200 });
//   } catch (err) {
//     console.error("Fetch student results error:", err);
//     return Response.json({ message: "Server error" }, { status: 500 });
//   }
// }

// api/student/result/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const submissionsCol = await getCollection("submissions");
    const theoryQuestionsCol = await getCollection("theoryQuestions");

    // Fetch all submissions of this student
    const submissions = await submissionsCol
      .find({ studentEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    const formattedResults = await Promise.all(
      submissions.map(async (sub) => {
        // Fetch theory questions for this exam
        const theoryQuestions = await theoryQuestionsCol
          .find({ examId: String(sub.examId) })
          .toArray();

        // Map theory questions by string _id for easy lookup
        const qMap = {};
        let totalMarks = 0;
        theoryQuestions.forEach((q) => {
          qMap[q._id.toString()] = q;
          totalMarks += q.marks || 0;
        });

        // Build detailed answers with marks for theory
        const answersWithMarks = {};
        if (sub.answers) {
          for (let qid in sub.answers) {
            const question = qMap[qid];
            answersWithMarks[qid] = {
              questionText: question?.questionText || "Question not found",
              answer: sub.answers[qid],
              maxMarks: question?.marks || 0,
              awarded: sub.scores?.[qid] ?? null,
            };
          }
        }

        // Calculate total awarded marks (including theory)
        const awardedTotal = Object.values(sub.scores || {}).reduce(
          (sum, val) => sum + (val || 0),
          0,
        );

        return {
          examId: sub.examId,
          title: sub.examTitle || "Unknown Exam",
          marksObtained: sub.score ?? awardedTotal,
          totalMarks: sub.totalMarks ?? totalMarks,
          submittedAt: sub.createdAt,
          status: sub.status || "graded",
          gradedAt: sub.gradedAt || null,
          score: sub.score ?? awardedTotal,
          answersWithMarks, // NEW: per-question details
        };
      }),
    );

    return new Response(JSON.stringify({ results: formattedResults }), {
      status: 200,
    });
  } catch (err) {
    console.error("Fetch student results error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
