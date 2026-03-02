import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "instructor") {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const examId = req.nextUrl.searchParams.get("examId");
  const theoryCol = await getCollection("theorySubmissions");

  if (!examId)
    return new Response(JSON.stringify({ message: "Missing examId" }), {
      status: 400,
    });

  const results = await theoryCol.find({ examId }).toArray();

  return new Response(JSON.stringify({ results }), { status: 200 });
}
