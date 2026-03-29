import clientPromise from "@/lib/mongodb";

// ===== POST (User submits report) =====
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const body = await req.json();

    const report = {
      ...body,
      createdAt: new Date(),
    };

    const result = await db.collection("reportissues").insertOne(report);

    return Response.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      message: "Failed to save report",
    });
  }
}

// ===== GET (Admin fetch reports) =====
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const reports = await db
      .collection("reportissues")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      reportissues: reports,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      reportissues: [],
    });
  }
}
