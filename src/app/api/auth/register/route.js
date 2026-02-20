import bcrypt from "bcrypt";
import { getCollection } from "@/lib/dbConnect";

export async function POST(req) {
  const body = await req.json();
  const { name, email, password, role } = body;

  const usersCollection = await getCollection("users");

  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    return Response.json({ message: "User exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await usersCollection.insertOne({
    name,
    email,
    password: hashedPassword,
    role: role || "student",
    createdAt: new Date(),
  });

  return Response.json({ message: "User created" });
}
