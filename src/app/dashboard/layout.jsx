"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) return <p>Loading...</p>;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  // Helper to apply active class
  const linkClass = (href) =>
    `block px-3 py-2 rounded-lg transition-colors duration-200 ${
      pathname === href
        ? "bg-white text-[#0D7C66] font-semibold"
        : "text-white hover:bg-[#41B3A2] hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D7C66] text-white p-4 flex flex-col justify-between">
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">SecureExam</h2>

          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>
            <Link
              href="/dashboard/profile"
              className={linkClass("/dashboard/profile")}
            >
              Profile
            </Link>

            {/* ADMIN */}
            {session.user.role === "admin" && (
              <>
                <Link
                  href="/dashboard/admin/manage-users"
                  className={linkClass("/dashboard/admin/manage-users")}
                >
                  Manage Users
                </Link>
                <Link
                  href="/dashboard/admin/reports"
                  className={linkClass("/dashboard/admin/reports")}
                >
                  Reports
                </Link>
              </>
            )}

            {/* INSTRUCTOR */}
            {session.user.role === "instructor" && (
              <>
                <Link
                  href="/dashboard/instructor/create-batch"
                  className={linkClass("/dashboard/instructor/create-batch")}
                >
                  Create Batch
                </Link>
                <Link
                  href="/dashboard/instructor/view-batches"
                  className={linkClass("/dashboard/instructor/view-batches")}
                >
                  View Batches
                </Link>
                <Link
                  href="/dashboard/instructor/add-students"
                  className={linkClass("/dashboard/instructor/add-students")}
                >
                  Add Students
                </Link>
                <Link
                  href="/dashboard/instructor/create-exam"
                  className={linkClass("/dashboard/instructor/create-exam")}
                >
                  Create Exam
                </Link>
                <Link
                  href="/dashboard/instructor/question-bank"
                  className={linkClass("/dashboard/instructor/question-bank")}
                >
                  Question Bank
                </Link>
                <Link
                  href="/dashboard/instructor/exam-list"
                  className={linkClass("/dashboard/instructor/exam-list")}
                >
                  List of Exams
                </Link>
                <Link
                  href="/dashboard/instructor/analytics"
                  className={linkClass("/dashboard/instructor/analytics")}
                >
                  Analytics
                </Link>
              </>
            )}

            {/* STUDENT */}
            {session.user.role === "student" && (
              <>
                <Link
                  href="/dashboard/student/my-exams"
                  className={linkClass("/dashboard/student/my-exams")}
                >
                  My Exams
                </Link>
                <Link
                  href="/dashboard/student/result"
                  className={linkClass("/dashboard/student/results")}
                >
                  Results
                </Link>
                <Link
                  href="/dashboard/student/notifications"
                  className={linkClass("/dashboard/student/notifications")}
                >
                  Notifications
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 rounded-lg bg-white text-[#0D7C66] font-medium hover:bg-[#41B3A2] hover:text-white transition-all"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
