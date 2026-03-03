"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ChangeRolePage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  const [newRole, setNewRole] = useState("instructor");
  const [updating, setUpdating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);

    setTimeout(() => {
      toast.success(`Role changed to ${newRole} (Demo)`);
      setUpdating(false);
      router.push("/dashboard/admin/users");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/admin/users"
          className="p-2 hover:bg-gray-200 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold">Change User Role</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">User ID:</span> {userId || "No ID"}
          </p>
          <p className="text-xs text-blue-600 mt-1">⚡ Frontend Demo Mode</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p>
              <strong>Demo User:</strong> Rahim Miah (rahim@example.com)
            </p>
            <p>
              <strong>Current Role:</strong> student
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { value: "admin", label: "Admin", icon: "👑" },
                { value: "instructor", label: "Instructor", icon: "📚" },
                { value: "student", label: "Student", icon: "🎓" },
              ].map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setNewRole(role.value)}
                  className={`p-4 rounded-xl border-2 transition ${
                    newRole === role.value
                      ? "border-[#0D7C66] bg-[#0D7C66]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-1">{role.icon}</div>
                  <div className="text-sm font-medium">{role.label}</div>
                </button>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-yellow-700">
                  Demo: Role will be updated in frontend only
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={updating}
                className="flex-1 bg-[#0D7C66] text-white px-4 py-3 rounded-xl hover:bg-[#41B3A2]"
              >
                {updating ? "Updating..." : "Update Role (Demo)"}
              </button>
              <Link
                href="/dashboard/admin/users"
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
