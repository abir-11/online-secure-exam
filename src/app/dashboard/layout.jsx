"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`bg-[var(--color-primary-dark)] text-white w-64 flex-shrink-0 transition-all duration-300 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="p-6 text-center text-xl font-bold border-b border-[var(--color-primary)]">
          SecureExam
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link
                href="/dashboard"
                className="block px-6 py-3 hover:bg-[var(--color-primary)] transition-colors rounded"
              >
                Dashboard Overview
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className="block px-6 py-3 hover:bg-[var(--color-primary)] transition-colors rounded"
              >
                Profile
              </Link>

              <Link
                href="/dashboard/settings"
                className="block px-6 py-3 hover:bg-[var(--color-primary)] transition-colors rounded"
              >
                Settings
              </Link>

              <Link
                href="/dashboard/settings"
                className="block px-6 py-3 hover:bg-[var(--color-primary)] transition-colors rounded"
              >
                Help
              </Link>

              <Link
                href="/dashboard/settings"
                className="block px-6 py-3 hover:bg-[var(--color-primary)] transition-colors rounded"
              >
                Logout
              </Link>
            </li>
            {/* Add more links here */}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <button
            className="md:hidden text-[var(--color-primary-dark)]"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold text-[var(--color-primary-dark)]">
            Dashboard
          </h1>
          <div>
            <span className="text-gray-600 font-medium">Hi, User 👋</span>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
}
