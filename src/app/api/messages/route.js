import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const collection = await getCollection("messages");
    const messages = await collection.find({}).toArray();

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const collection = await getCollection("messages");

    const message = {
      senderId: data.senderId,
      receiverId: data.receiverId,
      message: data.message,
      createdAt: new Date(),
    };

    await collection.insertOne(message);

    return NextResponse.json({
      message: "Message sent",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
