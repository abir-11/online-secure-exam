import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const type = req.nextUrl.searchParams.get("type");

    const examsCol = await getCollection("exams");

    let filter = {
      instructorEmail: session.user.email,
    };

    if (type) {
      filter.type = type; // theory or mcq
    }

    const exams = await examsCol.find(filter).toArray();

    return new Response(JSON.stringify({ exams }), { status: 200 });
  } catch (err) {
    console.error("Exam list error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
