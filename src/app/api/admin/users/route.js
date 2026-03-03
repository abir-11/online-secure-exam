//GET all users API
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const usersCollection = await getCollection("users");
    const users = await usersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Remove passwords from response
    const safeUsers = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    return NextResponse.json({ success: true, users: safeUsers });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role, instructorId, department } = body;

    // Validation
    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Name, email and role required" },
        { status: 400 },
      );
    }

    const usersCollection = await getCollection("users");

    // Check if user exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : await bcrypt.hash("Default@123", 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
      instructorId: role === "student" ? instructorId : null,
      department: department || "",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return NextResponse.json({
      success: true,
      message: "User created",
      userId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
