// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import { getCollection } from "@/lib/dbConnect";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),

//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),

//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },

//       async authorize(credentials) {
//         const usersCollection = await getCollection("users");

//         const user = await usersCollection.findOne({
//           email: credentials.email,
//         });

//         if (!user) throw new Error("User not found");

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password,
//         );

//         if (!isValid) throw new Error("Wrong password");

//         return user;
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

//-------------------------------------------------------

//-------------------------------------------------------

// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import { getCollection } from "@/lib/dbConnect";

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     let { name, email, password, role, phone } = body;

//     // Basic validation
//     if (!name || !email || !password || !role) {
//       return NextResponse.json(
//         { message: "All required fields must be filled" },
//         { status: 400 },
//       );
//     }

//     // Normalize email
//     email = email.toLowerCase();

//     // Allow only 3 roles
//     const allowedRoles = ["admin", "instructor", "student"];
//     if (!allowedRoles.includes(role)) {
//       return NextResponse.json(
//         { message: "Invalid role selected" },
//         { status: 400 },
//       );
//     }

//     const usersCollection = await getCollection("users");

//     // Check existing user
//     const existingUser = await usersCollection.findOne({ email });

//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 409 },
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user
//     const result = await usersCollection.insertOne({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       phone: phone || "",
//       image: "",
//       createdAt: new Date(),
//       loginAttempts: 0,
//       isLocked: false,
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Registration successful",
//         userId: result.insertedId,
//       },
//       { status: 201 },
//     );
//   } catch (error) {
//     console.error("Register Error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }

// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getCollection } from "@/lib/dbConnect";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const usersCollection = await getCollection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) throw new Error("Invalid password");

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};

// **App Router requires you to export GET and POST explicitly**
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
