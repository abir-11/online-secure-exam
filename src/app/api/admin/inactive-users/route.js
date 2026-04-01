import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const role = searchParams.get("role");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    const usersCollection = await getCollection("users");

    // Build query for inactive users
    let query = { isActive: false };

    // Role filter
    if (role && role !== "all") {
      query.role = role;
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const totalUsers = await usersCollection.countDocuments(query);

    const users = await usersCollection
      .find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalPages = Math.ceil(totalUsers / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Remove passwords
    const safeUsers = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    return NextResponse.json({
      success: true,
      users: safeUsers,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNextPage,
        hasPrevPage,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching inactive users:", error);
    return NextResponse.json(
      { error: "Failed to fetch inactive users" },
      { status: 500 },
    );
  }
}
