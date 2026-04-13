"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (!session.user.role) {
      router.push("/auth/select-role"); // ⭐ KEY
    } else if (session.user.role === "student") {
      router.push("/dashboard/student");
    } else if (session.user.role === "instructor") {
      router.push("/dashboard/instructor");
    }
  }, [session, status, router]);

  return <p className="text-center mt-10">Redirecting...</p>;
}
