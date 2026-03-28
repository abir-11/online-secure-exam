"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  RefreshCw,
  Shield,
  GraduationCap,
  Users,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  UserCheck,
  Trash2,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function InactiveUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // Count states
  const [counts, setCounts] = useState({
    total: 0,
    admin: 0,
    instructor: 0,
    student: 0,
  });

  useEffect(() => {
    fetchCounts();
    fetchUsers();
  }, [currentPage, filter, pageSize, searchTerm]);

  const fetchCounts = async () => {
    try {
      const response = await axios.get("/api/admin/inactive-users");
      const allUsers = response.data.users;
      setCounts({
        total: allUsers.length,
        admin: allUsers.filter((u) => u.role === "admin").length,
        instructor: allUsers.filter((u) => u.role === "instructor").length,
        student: allUsers.filter((u) => u.role === "student").length,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/inactive-users", {
        params: {
          page: currentPage,
          limit: pageSize,
          role: filter !== "all" ? filter : undefined,
          search: searchTerm || undefined,
        },
      });

      setUsers(response.data.users);

      if (response.data.pagination) {
        setTotalPages(response.data.pagination.totalPages);
        setTotalUsers(response.data.pagination.totalUsers);
        setHasNextPage(response.data.pagination.hasNextPage);
        setHasPrevPage(response.data.pagination.hasPrevPage);
      }
    } catch (error) {
      toast.error("Failed to load inactive users");
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (userId, userName) => {
    const result = await Swal.fire({
      title: `Activate ${userName}?`,
      text: "This user will be able to login again.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D7C66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Activate",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`/api/admin/users/${userId}`, { isActive: true });
        toast.success(`${userName} activated successfully`);
        fetchUsers();
        fetchCounts();
      } catch (error) {
        toast.error("Failed to activate user");
      }
    }
  };

  const handleDelete = async (userId, userName) => {
    const result = await Swal.fire({
      title: `Delete ${userName}?`,
      text: "This user will be permanently deleted. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0D7C66",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        toast.success(`${userName} deleted permanently`);
        fetchUsers();
        fetchCounts();
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800 border-purple-200",
      instructor: "bg-blue-100 text-blue-800 border-blue-200",
      student: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goToLastPage = () => setCurrentPage(totalPages);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-400 rounded-2xl p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              🚫 Inactive Users
            </h1>
            <p className="text-white/80 mt-1">
              Users who cannot login to the system
            </p>
          </div>
          <Link
            href="/dashboard/admin/users"
            className="bg-white text-red-600 px-4 py-2 rounded-xl hover:bg-gray-100 transition flex items-center gap-2 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Active Users
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard
          icon={Users}
          count={counts.total}
          label="Total Inactive"
          color="text-red-600"
          bg="bg-red-100"
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

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
            />
          </div>
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
                onClick={() => {
                  setFilter(f.key);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
                  filter === f.key
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
            <button
              onClick={() => {
                fetchUsers();
                fetchCounts();
              }}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent mx-auto"></div>
          </div>
        ) : (
          <>
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
                      Deactivated On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
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
                        {user.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleActivate(user._id, user.name)}
                            className="p-2 hover:bg-green-100 rounded-lg transition group"
                            title="Activate User"
                          >
                            <UserCheck className="w-5 h-5 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id, user.name)}
                            className="p-2 hover:bg-red-100 rounded-lg transition group"
                            title="Permanently Delete"
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y">
              {users.map((user) => (
                <div key={user._id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3 pt-2 border-t">
                    <button
                      onClick={() => handleActivate(user._id, user.name)}
                      className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => handleDelete(user._id, user.name)}
                      className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {users.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No inactive users found
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-3 py-2 border rounded-xl text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToFirstPage}
            disabled={!hasPrevPage}
            className="p-2 rounded-xl bg-gray-100 disabled:opacity-50"
          >
            <ChevronsLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToPrevPage}
            disabled={!hasPrevPage}
            className="p-2 rounded-xl bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-4 py-2 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={!hasNextPage}
            className="p-2 rounded-xl bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={goToLastPage}
            disabled={!hasNextPage}
            className="p-2 rounded-xl bg-gray-100 disabled:opacity-50"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalUsers)} of {totalUsers} users
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, count, label, color, bg }) {
  return (
    <div className={`${bg} rounded-xl p-4 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{count}</p>
        </div>
        <Icon className={`w-8 h-8 ${color} opacity-80`} />
      </div>
    </div>
  );
}
