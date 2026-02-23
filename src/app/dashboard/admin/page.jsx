// src/app/dashboard/admin/page.jsx
"use client";

import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
      <p>Role: {session.user.role}</p>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">Manage Users</div>
        <div className="p-4 bg-white shadow rounded">Reports & Analytics</div>
      </div>
    </div>
  );
}
