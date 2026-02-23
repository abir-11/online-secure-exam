// src/app/dashboard/profile/page.jsx
"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="p-6 mt-20 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p>
        <strong>Name:</strong> {session.user.name}
      </p>
      <p>
        <strong>Email:</strong> {session.user.email}
      </p>
      <p>
        <strong>Role:</strong> {session.user.role}
      </p>
    </div>
  );
}
