"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaFileAlt,
  FaTasks,
  FaChartLine,
  FaBookOpen,
} from "react-icons/fa";
import AdminDashboard from "./admin/page";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen  bg-primary pt-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] rounded-2xl p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {session?.user?.name}!
              </h1>
            </div>
            <div className="flex gap-3">
              <span className="bg-white/20 px-4 py-2 rounded-xl text-sm">
                {session?.user?.role}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-xl text-sm">
                📅{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* admin panel */}
        {session?.user?.role === "admin" && <AdminDashboard></AdminDashboard>}
        {/* Instructor Panel */}
        {session?.user?.role === "instructor" && (
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card
              href="/dashboard/instructor/create-batch"
              title="Create Batch"
              icon={<FaChalkboardTeacher />}
            />
            <Card
              href="/dashboard/instructor/add-students"
              title="Add Students"
              icon={<FaUserGraduate />}
            />
            <Card
              href="/dashboard/instructor/create-exam"
              title="Create Exam"
              icon={<FaFileAlt />}
            />
            <Card
              href="/dashboard/instructor/question-bank"
              title="Question Bank"
              icon={<FaBookOpen />}
            />
            <Card
              href="/dashboard/instructor/exam-list"
              title="Publish Exams"
              icon={<FaTasks />}
            />
            <Card
              href="/dashboard/instructor/analytics"
              title="Analytics"
              icon={<FaChartLine />}
            />
          </section>
        )}

        {/* Student Panel */}
        {session?.user?.role === "student" && (
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            <Card
              href="/dashboard/student/my-exams"
              title="Available Exams"
              icon={<FaTasks />}
            />
            <Card
              href="/dashboard/student/result"
              title="View Results"
              icon={<FaFileAlt />}
            />
          </section>
        )}
      </div>
    </main>
  );
}

/* ====================== Reusable Card Component ====================== */
function Card({ href, title, icon }) {
  return (
    <Link
      href={href}
      className="bg-gradient-to-br from-teal-100 via-teal-50 to-white shadow-lg border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <div className="flex items-center gap-3 mb-4 text-teal-700 text-2xl">
        {icon} <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-gray-600 text-sm">
        Click to manage <span className="font-medium">{title}</span>.
      </p>
    </Link>
  );
}
