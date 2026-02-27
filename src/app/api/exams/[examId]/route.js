import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const examsCol = await getCollection("exams");
    const exam = await examsCol.findOne({ _id: new ObjectId(params.examId) });

    if (!exam)
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });

    return NextResponse.json(exam);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch exam" },
      { status: 500 },
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { mcqDone } = await req.json();
    const examsCol = await getCollection("exams");

    await examsCol.updateOne(
      { _id: new ObjectId(params.examId) },
      { $set: { mcqDone } },
    );

    return NextResponse.json({ message: "Exam updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update exam" },
      { status: 500 },
    );
  }
}
