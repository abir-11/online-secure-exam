"use client";
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  Shield,
  GraduationCap,
  Users,
  Mail,
  Calendar,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Load users when page opens
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/users");
      setUsers(response.data.users);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  //   //handle delete
  //   const handleDelete = async (userId, userName) => {
  //     if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
  //       try {
  //         await axios.delete(`/api/admin/users/${userId}`);
  //         toast.success("User deleted");
  //         fetchUsers(); // Refresh list
  //       } catch (error) {
  //         toast.error("Failed to delete user");
  //       }
  //     }
  //   };

  //handle delete
  const handleDelete = async (userId, userName) => {
    console.log("🗑️ Delete clicked for user:", userId, userName);
    console.log("📡 DELETE URL:", `/api/admin/users/${userId}`);

    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      console.log("✅ User confirmed deletion");

      try {
        console.log("📡 Making DELETE request...");

        const response = await axios.delete(`/api/admin/users/${userId}`);

        console.log("✅ Delete response:", response.data);

        toast.success("User deleted");
        fetchUsers(); // Refresh list
      } catch (error) {
        console.error("❌ Delete error:", error);
        console.error("❌ Error response:", error.response?.data);
        console.error("❌ Error status:", error.response?.status);
        console.error("❌ Error config:", error.config);

        toast.error(error.response?.data?.error || "Failed to delete user");
      }
    }
  };

  // Filter users based on role and search
  const filteredUsers = users.filter((user) => {
    if (filter !== "all" && user.role !== filter) return false;
    if (searchTerm) {
      return (
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  // Count users by role
  const counts = {
    total: users.length,
    admin: users.filter((u) => u.role === "admin").length,
    instructor: users.filter((u) => u.role === "instructor").length,
    student: users.filter((u) => u.role === "student").length,
  };

  // Role badge color
  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      instructor: "bg-blue-100 text-blue-800 border-blue-200",
      student: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] rounded-2xl p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              👥 User Management
            </h1>
            <p className="text-white/80 mt-1">Manage all users in the system</p>
          </div>
          <Link
            href="/dashboard/admin/users/add"
            className="bg-white text-[#0D7C66] px-4 py-2 rounded-xl hover:bg-gray-100 transition flex items-center gap-2 shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            Add New User
          </Link>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard
          icon={Users}
          count={counts.total}
          label="Total Users"
          color="text-[#0D7C66]"
          bg="bg-[#0D7C66]/10"
        />
        <StatCard
          icon={Shield}
          count={counts.admin}
          label="Admins"
          color="text-purple-600"
          bg="bg-purple-100"
        />
        <StatCard
          icon={GraduationCap}
          count={counts.instructor}
          label="Instructors"
          color="text-blue-600"
          bg="bg-blue-100"
        />
        <StatCard
          icon={Users}
          count={counts.student}
          label="Students"
          color="text-green-600"
          bg="bg-green-100"
        />
      </div>

      {/* Search & Filter - Responsive */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2] focus:border-transparent"
            />
          </div>

          {/* Filter Buttons - Scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { key: "all", label: "All", count: counts.total },
              { key: "admin", label: "Admin", count: counts.admin },
              {
                key: "instructor",
                label: "Instructor",
                count: counts.instructor,
              },
              { key: "student", label: "Student", count: counts.student },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
                  filter === f.key
                    ? "bg-[#0D7C66] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
            <button
              onClick={fetchUsers}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              title="Refresh"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table - Responsive Card View on Mobile */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#0D7C66] border-t-transparent"></div>
            <p className="mt-2 text-gray-500">Loading users...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table - Hidden on mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.isActive !== false
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {user.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/dashboard/admin/users/${user._id}/edit`}
                            className="p-2 hover:bg-blue-100 rounded-lg transition group"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-blue-600 group-hover:scale-110" />
                          </Link>
                          <Link
                            href={`/dashboard/admin/users/change-role/${user._id}`}
                            className="p-2 hover:bg-green-100 rounded-lg transition group"
                            title="Change Role"
                          >
                            <Shield className="w-4 h-4 text-green-600 group-hover:scale-110" />
                          </Link>
                          <button
                            onClick={() => handleDelete(user._id, user.name)}
                            className="p-2 hover:bg-red-100 rounded-lg transition group"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 group-hover:scale-110" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <div key={user._id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        user.isActive !== false
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive !== false ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Link
                      href={`/dashboard/admin/users/${user._id}/edit`}
                      className="flex-1 text-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/dashboard/admin/users/change-role/${user._id}`}
                      className="flex-1 text-center px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100"
                    >
                      Change Role
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id, user.name)}
                      className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No users found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, count, label, color, bg }) {
  return (
    <div
      className={`${bg} rounded-xl p-4 shadow-sm hover:shadow-md transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-xs md:text-sm">{label}</p>
          <p className={`text-xl md:text-2xl font-bold ${color}`}>{count}</p>
        </div>
        <Icon className={`w-8 h-8 md:w-10 md:h-10 ${color} opacity-80`} />
      </div>
    </div>
  );
}
