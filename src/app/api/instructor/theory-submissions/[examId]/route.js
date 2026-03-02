// // api/instructor/theory-submissions/[examId]/route.js
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";

// export async function GET(req, context) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor") {
//       return new Response(JSON.stringify({ message: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     const { examId } = context.params;
//     if (!examId) {
//       return new Response(JSON.stringify({ message: "Exam ID required" }), {
//         status: 400,
//       });
//     }

//     const theorySubCol = await getCollection("theorySubmissions");

//     // Fetch all submissions for this exam
//     const submissions = await theorySubCol
//       .find({ examId })
//       .project({
//         studentEmail: 1,
//         examId: 1,
//         examTitle: 1,
//         answers: 1,
//         marksGiven: 1,
//         gradedBy: 1,
//         gradedAt: 1,
//         totalMarks: 1,
//         submittedAt: 1,
//       })
//       .toArray();

//     return new Response(JSON.stringify({ submissions }), { status: 200 });
//   } catch (err) {
//     console.error("Fetch theory submissions error:", err);
//     return new Response(JSON.stringify({ message: "Server error" }), {
//       status: 500,
//     });
//   }
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "instructor") {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const submissionsCol = await getCollection("submissions");

  const submissions = await submissionsCol
    .find({ examId: params.examId, status: "pending" })
    .toArray();

  return Response.json({ submissions });
}
