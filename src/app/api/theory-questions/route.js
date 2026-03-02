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

//     const { examId, questionText, marks } = await req.json();

//     if (!examId || !questionText || !marks) {
//       return new Response(
//         JSON.stringify({ message: "Missing required fields" }),
//         { status: 400 },
//       );
//     }

//     const theoryCol = await getCollection("theoryQuestions");

//     await theoryCol.insertOne({
//       examId: new ObjectId(examId),
//       questionText,
//       marks: Number(marks),
//       createdAt: new Date(),
//     });

//     return new Response(
//       JSON.stringify({ message: "Theory question added successfully" }),
//       { status: 201 },
//     );
//   } catch (err) {
//     console.error("Add theory question error:", err);
//     return new Response(JSON.stringify({ message: "Server error" }), {
//       status: 500,
//     });
//   }
// }
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const { examId, questionText, marks } = await req.json();

    if (!examId || !questionText || !marks) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 },
      );
    }

    const theoryCol = await getCollection("theoryQuestions");

    // ✅ Store examId as string instead of ObjectId
    await theoryCol.insertOne({
      examId: examId, // keep it as string
      questionText,
      marks: Number(marks),
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Theory question added successfully" }),
      { status: 201 },
    );
  } catch (err) {
    console.error("Add theory question error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
