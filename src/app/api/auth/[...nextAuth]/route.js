import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getCollection } from "@/lib/dbConnect";
import { logActivity } from "@/lib/activityLogger";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    // ---------------- Google Provider ----------------
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // -------------- Credentials Provider --------------
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const usersCollection = await getCollection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          // Inactive user check
          if (user.isActive === false) {
            console.log(`Blocked login for inactive user: ${user.email}`);
            throw new Error(
              "Your account is inactive. Please contact the administrator.",
            );
          }

          // If profile is already locked, block login immediately
          if (user.isLocked) {
            throw new Error(
              "Your profile is locked. Please reset your password.",
            );
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          // Wrong password: increment failed attempts and lock after 3 tries
          if (!isPasswordCorrect) {
            const failedAttempts = user.failedLoginAttempts || 0;
            const updatedAttempts = failedAttempts + 1;

            const updateDoc = {
              $set: {
                failedLoginAttempts: updatedAttempts,
              },
            };

            if (updatedAttempts >= 3) {
              updateDoc.$set.isLocked = true;
            }

            await usersCollection.updateOne({ _id: user._id }, updateDoc);

            if (updatedAttempts >= 3) {
              throw new Error(
                "Your profile is locked. Please reset your password.",
              );
            }

            throw new Error("Wrong password");
          }

          // Role check
          if (credentials.role && credentials.role !== user.role) {
            throw new Error("Role mismatch");
          }

          // Activity Log for successful login
          await logActivity({
            userId: user._id.toString(),
            userName: user.name,
            userEmail: user.email,
            userRole: user.role,
            action: "logged_in",
            details: "User logged in",
          });

          // Successful login: reset failed attempts and unlock if needed
          if (user.failedLoginAttempts || user.isLocked) {
            await usersCollection.updateOne(
              { _id: user._id },
              {
                $set: {
                  failedLoginAttempts: 0,
                  isLocked: false,
                },
              },
            );
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image || null,
          };
        } catch (error) {
          console.log("Auth Error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],

  // ---------------- Callbacks ----------------
  callbacks: {
    // ১. signIn কলব্যাক: গুগল ইউজারকে ডাটাবেসে সেভ করা বা চেক করা
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const usersCollection = await getCollection("users");
          const dbUser = await usersCollection.findOne({ email: user.email });

          if (!dbUser) {
            // নতুন ইউজার হলে ডাটাবেসে ডিফল্ট রোল দিয়ে সেভ করুন
            const newUser = {
              name: user.name,
              email: user.email,
              image: user.image,
              role: "student", // ডিফল্ট রোল
              isActive: true,
              isLocked: false,
              authProvider: "google",
              createdAt: new Date(),
            };
            const result = await usersCollection.insertOne(newUser);

            // নতুন ইউজারের লগ অ্যাক্টিভিটি
            await logActivity({
              userId: result.insertedId.toString(),
              userName: newUser.name,
              userEmail: newUser.email,
              userRole: "student",
              action: "registered_google",
              details: "User registered via Google",
            });
          } else {
            // ইউজার আগে থেকেই থাকলে, চেক করুন অ্যাকাউন্ট ব্লকড বা লকড কিনা
            if (dbUser.isActive === false) {
              return "/auth/login?error=inactive"; // inactive এরর পাঠাবে
            }
            if (dbUser.isLocked) {
              return "/auth/login?error=locked"; // locked এরর পাঠাবে
            }

            // পুরনো ইউজারের লগ অ্যাক্টিভিটি
            await logActivity({
              userId: dbUser._id.toString(),
              userName: dbUser.name,
              userEmail: dbUser.email,
              userRole: dbUser.role,
              action: "logged_in_google",
              details: "User logged in via Google",
            });
          }
          return true; // লগিন সফল
        } catch (error) {
          console.error("Google Auth Database Error:", error);
          return false; // কোনো এরর হলে লগিন বাতিল করবে
        }
      }
      return true; // Credentials provider-এর জন্য ডিফল্টভাবে true
    },

    // ২. jwt কলব্যাক: ডাটাবেস থেকে ইউজারের ডাটা টোকেনে আনা
    async jwt({ token, user, account }) {
      // account অবজেক্টটি শুধুমাত্র লগিন করার সময়ই পাওয়া যায়
      if (account) {
        if (account.provider === "google") {
          // গুগল লগিনের ক্ষেত্রে ডাটাবেস থেকে আসল রোল ও আইডি নিয়ে আসা
          const usersCollection = await getCollection("users");
          const dbUser = await usersCollection.findOne({ email: user.email });

          if (dbUser) {
            token.id = dbUser._id.toString();
            token.role = dbUser.role;
            token.image = dbUser.image || user.image;
          }
        } else if (user) {
          // Credentials লগিনের ক্ষেত্রে authorize ফাংশন থেকে পাওয়া ডাটা
          token.id = user.id;
          token.role = user.role;
          token.image = user.image;
        }
      }
      return token;
    },

    // ৩. session কলব্যাক: টোকেন থেকে সেশনে ডাটা পাঠানো
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.image;
      }
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