// // // // // api/instructor/theory-submissions/grade/route.js
// // // // import { getServerSession } from "next-auth";
// // // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // // // import { getCollection } from "@/lib/dbConnect";

// // // // export async function POST(req) {
// // // //   try {
// // // //     const session = await getServerSession(authOptions);
// // // //     if (!session || session.user.role !== "instructor") {
// // // //       return new Response(JSON.stringify({ message: "Unauthorized" }), {
// // // //         status: 401,
// // // //       });
// // // //     }

// // // //     const body = await req.json();
// // // //     const { submissionId, marksGiven } = body;

// // // //     if (!submissionId || !marksGiven) {
// // // //       return new Response(
// // // //         JSON.stringify({ message: "submissionId and marksGiven required" }),
// // // //         { status: 400 },
// // // //       );
// // // //     }

// // // //     const theorySubCol = await getCollection("theorySubmissions");

// // // //     // Calculate total marks
// // // //     const totalMarks = Object.values(marksGiven).reduce((a, b) => a + b, 0);

// // // //     // Update submission with marks
// // // //     const updateResult = await theorySubCol.updateOne(
// // // //       { _id: submissionId },
// // // //       {
// // // //         $set: {
// // // //           marksGiven,
// // // //           gradedBy: session.user.email,
// // // //           gradedAt: new Date(),
// // // //           totalMarks,
// // // //         },
// // // //       },
// // // //     );

// // // //     if (updateResult.modifiedCount === 0) {
// // // //       return new Response(
// // // //         JSON.stringify({ message: "Submission not found or already graded" }),
// // // //         { status: 404 },
// // // //       );
// // // //     }

// // // //     return new Response(
// // // //       JSON.stringify({ message: "Submission graded successfully", totalMarks }),
// // // //       { status: 200 },
// // // //     );
// // // //   } catch (err) {
// // // //     console.error("Grade theory submission error:", err);
// // // //     return new Response(JSON.stringify({ message: "Server error" }), {
// // // //       status: 500,
// // // //     });
// // // //   }
// // // // }

// // // import { getServerSession } from "next-auth";
// // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // // import { getCollection } from "@/lib/dbConnect";
// // // import { ObjectId } from "mongodb";

// // // export async function POST(req) {
// // //   const session = await getServerSession(authOptions);
// // //   if (!session || session.user.role !== "instructor") {
// // //     return Response.json({ message: "Unauthorized" }, { status: 401 });
// // //   }

// // //   const { submissionId, score } = await req.json();
// // //   if (!submissionId || score === undefined) {
// // //     return Response.json({ message: "Invalid payload" }, { status: 400 });
// // //   }

// // //   const submissionsCol = await getCollection("submissions");

// // //   await submissionsCol.updateOne(
// // //     { _id: new ObjectId(submissionId) },
// // //     {
// // //       $set: {
// // //         score,
// // //         status: "graded",
// // //         gradedAt: new Date(),
// // //       },
// // //     },
// // //   );

// // //   return Response.json({ message: "Graded successfully" });
// // // }

// // // src/app/api/instructor/theory-submissions/grade/route.js

// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // import { getCollection } from "@/lib/dbConnect";
// // import { ObjectId } from "mongodb";

// // export async function POST(req) {
// //   try {
// //     const session = await getServerSession(authOptions);

// //     if (!session || session.user.role !== "instructor") {
// //       return Response.json({ message: "Unauthorized" }, { status: 401 });
// //     }

// //     const { submissionId, score } = await req.json();

// //     if (!submissionId || score === undefined) {
// //       return Response.json(
// //         { message: "Submission ID and score required" },
// //         { status: 400 },
// //       );
// //     }

// //     const submissionsCol = await getCollection("submissions");

// //     const submission = await submissionsCol.findOne({
// //       _id: new ObjectId(submissionId),
// //     });

// //     if (!submission) {
// //       return Response.json(
// //         { message: "Submission not found" },
// //         { status: 404 },
// //       );
// //     }

// //     if (submission.status === "graded") {
// //       return Response.json({ message: "Already graded" }, { status: 409 });
// //     }

// //     if (score < 0 || score > submission.totalMarks) {
// //       return Response.json({ message: "Invalid score value" }, { status: 400 });
// //     }

// //     await submissionsCol.updateOne(
// //       { _id: submission._id },
// //       {
// //         $set: {
// //           score,
// //           status: "graded",
// //           gradedAt: new Date(),
// //         },
// //       },
// //     );

// //     return Response.json({
// //       message: "Submission graded successfully",
// //     });
// //   } catch (err) {
// //     console.error("Grade theory error:", err);
// //     return Response.json({ message: "Server error" }, { status: 500 });
// //   }
// // }

// // src/app/api/instructor/theory-submissions/grade/route.js
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "instructor") {
//       return new Response(JSON.stringify({ message: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     const { submissionId, score } = await req.json();
//     if (!submissionId || score === undefined) {
//       return new Response(
//         JSON.stringify({ message: "Submission ID and score required" }),
//         { status: 400 },
//       );
//     }

//     const submissionsCol = await getCollection("submissions");
//     const submission = await submissionsCol.findOne({
//       _id: new ObjectId(submissionId),
//     });
//     if (!submission) {
//       return new Response(JSON.stringify({ message: "Submission not found" }), {
//         status: 404,
//       });
//     }

//     // If totalMarks exists in submission, use it; else default to 100
//     const totalMarks = submission.totalMarks ?? 100;

//     if (score < 0 || score > totalMarks) {
//       return new Response(JSON.stringify({ message: "Invalid score value" }), {
//         status: 400,
//       });
//     }

//     await submissionsCol.updateOne(
//       { _id: submission._id },
//       { $set: { score, status: "graded", gradedAt: new Date() } },
//     );

//     return new Response(
//       JSON.stringify({ message: "Submission graded successfully" }),
//       { status: 200 },
//     );
//   } catch (err) {
//     console.error("Grade theory error:", err);
//     return new Response(JSON.stringify({ message: "Server error" }), {
//       status: 500,
//     });
//   }
// }

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
