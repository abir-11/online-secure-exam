// // // // import { NextResponse } from "next/server";
// // // // import { getCollection } from "@/lib/dbConnect";

// // // // export async function GET() {
// // // //   try {
// // // //     const collection = await getCollection("messages");
// // // //     const messages = await collection.find({}).toArray();

// // // //     return NextResponse.json(messages);
// // // //   } catch (error) {
// // // //     return NextResponse.json(
// // // //       { error: "Failed to fetch messages" },
// // // //       { status: 500 },
// // // //     );
// // // //   }
// // // // }

// // // // export async function POST(req) {
// // // //   try {
// // // //     const data = await req.json();
// // // //     const collection = await getCollection("messages");

// // // //     const message = {
// // // //       senderId: data.senderId,
// // // //       receiverId: data.receiverId,
// // // //       message: data.message,
// // // //       createdAt: new Date(),
// // // //     };

// // // //     await collection.insertOne(message);

// // // //     return NextResponse.json({
// // // //       message: "Message sent",
// // // //     });
// // // //   } catch (error) {
// // // //     return NextResponse.json(
// // // //       { error: "Failed to send message" },
// // // //       { status: 500 },
// // // //     );
// // // //   }
// // // // }

// // // import { NextResponse } from "next/server";
// // // import { getCollection } from "@/lib/dbConnect";
// // // import { getServerSession } from "next-auth";
// // // import { authOptions } from "../auth/[...nextauth]/route";

// // // export async function GET() {
// // //   try {
// // //     const session = await getServerSession(authOptions);
// // //     if (!session) {
// // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // //     }

// // //     const collection = await getCollection("messages");

// // //     // Only fetch messages for logged-in user
// // //     const messages = await collection
// // //       .find({ to: session.user.email })
// // //       .sort({ createdAt: -1 })
// // //       .toArray();

// // //     return NextResponse.json(messages);
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json(
// // //       { error: "Failed to fetch messages" },
// // //       { status: 500 },
// // //     );
// // //   }
// // // }

// // // export async function POST(req) {
// // //   try {
// // //     const session = await getServerSession(authOptions);
// // //     if (!session) {
// // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // //     }

// // //     const data = await req.json();
// // //     const collection = await getCollection("messages");

// // //     const recipients = Array.isArray(data.to) ? data.to : [data.to];

// // //     const messages = recipients.map((email) => ({
// // //       senderId: session.user.email,
// // //       to: email,
// // //       message: data.message,
// // //       type: data.type || "general", // "exam", "batch", "chat"
// // //       read: false,
// // //       createdAt: new Date(),
// // //     }));

// // //     await collection.insertMany(messages);

// // //     return NextResponse.json({ message: "Message(s) sent" });
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json(
// // //       { error: "Failed to send message" },
// // //       { status: 500 },
// // //     );
// // //   }
// // // }

// // import { NextResponse } from "next/server";
// // import { getCollection } from "@/lib/dbConnect";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "../auth/[...nextauth]/route";

// // export async function GET() {
// //   try {
// //     const session = await getServerSession(authOptions);
// //     if (!session)
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

// //     const collection = await getCollection("messages");
// //     const messages = await collection
// //       .find({ to: session.user.email })
// //       .sort({ createdAt: -1 })
// //       .toArray();

// //     return NextResponse.json(messages);
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       { error: "Failed to fetch messages" },
// //       { status: 500 },
// //     );
// //   }
// // }

// // export async function POST(req) {
// //   try {
// //     const session = await getServerSession(authOptions);
// //     if (!session)
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

// //     const data = await req.json();
// //     const collection = await getCollection("messages");

// //     const recipients = Array.isArray(data.to) ? data.to : [data.to];

// //     const messages = recipients.map((email) => ({
// //       senderId: session.user.email,
// //       to: email,
// //       message: data.message,
// //       type: data.type || "general",
// //       read: false,
// //       createdAt: new Date(),
// //     }));

// //     await collection.insertMany(messages);

// //     return NextResponse.json({ message: "Message(s) sent" });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       { error: "Failed to send message" },
// //       { status: 500 },
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { getCollection } from "@/lib/dbConnect";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) return NextResponse.json([], { status: 401 });

//     const messagesCollection = await getCollection("messages");
//     const messages = await messagesCollection
//       .find({ to: session.user.email })
//       .toArray();

//     return NextResponse.json(Array.isArray(messages) ? messages : []);
//   } catch (error) {
//     console.error("GET messages error:", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session)
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//     const data = await req.json();
//     const messagesCollection = await getCollection("messages");

//     const message = {
//       senderId: session.user.email,
//       to: data.to,
//       message: data.message,
//       type: data.type || "info",
//       read: false,
//       createdAt: new Date(),
//     };

//     await messagesCollection.insertOne(message);
//     return NextResponse.json({ message: "Message sent" });
//   } catch (error) {
//     console.error("POST messages error:", error);
//     return NextResponse.json(
//       { message: "Failed to send message" },
//       { status: 500 },
//     );
//   }
// }

// File: app/api/messages/route.js
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const collection = await getCollection("messages");
    const messages = await collection.find({}).toArray();
    return NextResponse.json(messages || []);
  } catch (error) {
    console.error("GET messages error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const collection = await getCollection("messages");

    const message = {
      senderId: data.senderId || null,
      receiverId: data.receiverId || null,
      to: data.to || null, // for notifications
      message: data.message,
      type: data.type || "message",
      read: false,
      createdAt: new Date(),
    };

    await collection.insertOne(message);
    return NextResponse.json({ message: "Message sent" });
  } catch (error) {
    console.error("POST messages error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
