"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SelectRolePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRoleSelect = async (role) => {
    await fetch("/api/user/set-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    if (role === "student") {
      router.push("/dashboard/student");
    } else {
      router.push("/dashboard/instructor");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Select Your Role</h1>

      <button
        onClick={() => handleRoleSelect("student")}
        className="px-6 py-3 bg-green-600 text-white rounded-xl"
      >
        Student
      </button>

      <button
        onClick={() => handleRoleSelect("instructor")}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl"
      >
        Instructor
      </button>
    </div>
  );
}
