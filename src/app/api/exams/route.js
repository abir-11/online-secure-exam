import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const examsCol = await getCollection("exams");
    const batchesCol = await getCollection("batches");

    const exams = await examsCol
      .find({ instructorEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    // Attach batch names
    for (const exam of exams) {
      const batchIds = (exam.batchIds || []).map((id) => new ObjectId(id));
      const batches = await batchesCol
        .find({ _id: { $in: batchIds } })
        .project({ name: 1 })
        .toArray();
      exam.batchNames = batches.map((b) => b.name);
    }

    return NextResponse.json({ exams });
  } catch (err) {
    console.error("GET /api/exams error:", err);
    return NextResponse.json(
      { message: "Failed to fetch exams" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "instructor") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      type,
      totalQuestions,
      duration,
      startTime,
      endTime,
      batchIds,
    } = await req.json();

    if (!title?.trim())
      return NextResponse.json({ message: "Title required" }, { status: 400 });
    if (!duration || duration <= 0)
      return NextResponse.json(
        { message: "Invalid duration" },
        { status: 400 },
      );
    if (!startTime || !endTime)
      return NextResponse.json(
        { message: "Start/end required" },
        { status: 400 },
      );
    if (!Array.isArray(batchIds) || batchIds.length === 0)
      return NextResponse.json(
        { message: "Select at least one batch" },
        { status: 400 },
      );

    const examsCol = await getCollection("exams");

    const examDoc = {
      title: title.trim(),
      type,
      totalQuestions: type === "mcq" ? Number(totalQuestions) : 0,
      duration: Number(duration),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      batchIds: batchIds.map((id) => new ObjectId(id)),
      instructorEmail: session.user.email,
      published: false,
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await examsCol.insertOne(examDoc);
    return NextResponse.json({ message: "Exam created successfully" });
  } catch (err) {
    console.error("POST /api/exams error:", err);
    return NextResponse.json(
      { message: "Failed to create exam" },
      { status: 500 },
    );
  }
}
