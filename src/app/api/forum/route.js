import { getCollection } from "@/lib/dbConnect";

// ✅ GET all posts
export async function GET() {
  try {
    const collection = await getCollection("forum_posts");

    const posts = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return Response.json(posts);
  } catch (error) {
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// ✅ CREATE new post
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.title || !body.content) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const collection = await getCollection("forum_posts");

    const newPost = {
      title: body.title,
      content: body.content,
      author: body.author || "Anonymous",
      likes: 0,
      replies: 0,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newPost);

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Failed to create post" }, { status: 500 });
  }
}
