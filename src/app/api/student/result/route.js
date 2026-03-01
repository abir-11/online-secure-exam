// // src/app/api/student/result/route.js
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";

// export async function GET(req) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || session.user.role !== "student") {
//       return Response.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const resultsCol = await getCollection("results");

//     // Fetch all results for this student
//     const results = await resultsCol
//       .find({ studentEmail: session.user.email })
//       .toArray();

//     return Response.json({ results });
//   } catch (err) {
//     console.error("Fetch student results error:", err);
//     return Response.json({ message: "Server error" }, { status: 500 });
//   }
// }

// src/app/api/student/result/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const resultsCol = await getCollection("submissions"); // make sure your collection name is correct

    const results = await resultsCol
      .find({ studentEmail: session.user.email })
      .toArray();

    // Map results to send relevant fields
    const formattedResults = results.map((r) => ({
      examId: r.examId,
      title: r.examTitle || "Unknown Exam", // store title in submission when student submits
      marksObtained: r.score,
      totalMarks: r.totalMarks || 100, // you can store totalMarks in exam doc
      submittedAt: r.createdAt,
    }));

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
