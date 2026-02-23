"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) return <p>Loading...</p>;

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D7C66] text-white p-4 flex flex-col justify-between">
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">SecureExam</h2>
          <nav className="flex flex-col gap-3">
            <a href="/dashboard/profile" className="hover:underline">
              Profile
            </a>
            <a href="/dashboard/help" className="hover:underline">
              Help / Support
            </a>

            {session.user.role === "admin" && (
              <>
                <a
                  href="/dashboard/admin/manage-users"
                  className="hover:underline"
                >
                  Manage Users
                </a>
                <a href="/dashboard/admin/reports" className="hover:underline">
                  Reports
                </a>
              </>
            )}

            {session.user.role === "instructor" && (
              <>
                <a
                  href="/dashboard/instructor/courses"
                  className="hover:underline"
                >
                  My Courses
                </a>
                <a
                  href="/dashboard/instructor/exams"
                  className="hover:underline"
                >
                  Exams
                </a>
              </>
            )}

            {session.user.role === "student" && (
              <>
                <a
                  href="/dashboard/student/my-exams"
                  className="hover:underline"
                >
                  My Exams
                </a>
                <a
                  href="/dashboard/student/results"
                  className="hover:underline"
                >
                  Results
                </a>
              </>
            )}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 rounded-lg bg-white text-[#0D7C66] font-medium hover:bg-[#41B3A2] hover:text-white transition-all"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
