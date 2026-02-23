//----------- role added
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getCollection } from "@/lib/dbConnect"; // ✅ use named export

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },

      async authorize(credentials) {
        try {
          const usersCollection = await getCollection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isPasswordCorrect) {
            throw new Error("Wrong password");
          }

          // Role mismatch check
          if (credentials.role && credentials.role !== user.role) {
            throw new Error("Role mismatch");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.log("Auth Error:", error.message);
          throw new Error(error.message); // NextAuth will pass this as result.error
        }
      },
    }),
  ],

  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) token.role = user.role;
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.user.role = token.role;
  //     return session;
  //   },
  // },

  callbacks: {
    // This runs whenever a JWT token is created or updated
    async jwt({ token, user }) {
      if (user) {
        // Save role and image from user to token
        token.role = user.role;
        token.image = user.image; // <- add this
      }
      return token;
    },

    // This runs whenever a session is checked (client receives session)
    async session({ session, token }) {
      // Add role and image from token to session.user
      session.user.role = token.role;
      session.user.image = token.image; // <- add this
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
