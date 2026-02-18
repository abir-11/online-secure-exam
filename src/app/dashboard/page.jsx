"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: "John Doe",
    role: "student", // change to: student | teacher | admin
  });

  // Example stats (replace with API data later)
  const stats = {
    student: [
      { title: "Upcoming Exams", value: 3 },
      { title: "Active Exams", value: 1 },
      { title: "Completed Exams", value: 12 },
      { title: "Certificates Earned", value: 5 },
    ],
    teacher: [
      { title: "Total Exams Created", value: 8 },
      { title: "Active Exams", value: 2 },
      { title: "Total Students", value: 120 },
      { title: "Question Bank Size", value: 340 },
    ],
    admin: [
      { title: "Total Users", value: 540 },
      { title: "Total Exams", value: 42 },
      { title: "Active Exams", value: 6 },
      { title: "Platform Engagement", value: "78%" },
    ],
  };

  const recentActivity = [
    "Math Exam completed by 25 students",
    "New exam scheduled for Physics",
    "User Ahmed registered",
    "System maintenance completed",
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)]">
          Welcome back, {user.name} 👋
        </h2>
        <p className="text-gray-600 capitalize">
          {user.role} Dashboard Overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats[user.role].map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md hover:shadow-lg transition-all"
          >
            <div className="card-body">
              <h3 className="text-gray-500 text-sm">{item.title}</h3>
              <p className="text-3xl font-bold text-[var(--color-primary)]">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Role Specific Section */}
      {user.role === "student" && (
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn bg-[var(--color-primary)] text-white">
              View My Exams
            </button>
            <button className="btn btn-outline border-[var(--color-primary)] text-[var(--color-primary)]">
              View Results
            </button>
          </div>
        </div>
      )}

      {user.role === "teacher" && (
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Teacher Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn bg-[var(--color-primary)] text-white">
              Create New Exam
            </button>
            <button className="btn btn-outline border-[var(--color-primary)] text-[var(--color-primary)]">
              Manage Question Bank
            </button>
          </div>
        </div>
      )}

      {user.role === "admin" && (
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Admin Controls</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn bg-[var(--color-primary)] text-white">
              Manage Users
            </button>
            <button className="btn btn-outline border-[var(--color-primary)] text-[var(--color-primary)]">
              System Reports
            </button>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-2">
          {recentActivity.map((activity, index) => (
            <li
              key={index}
              className="p-3 bg-gray-50 rounded-md border border-gray-100"
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
