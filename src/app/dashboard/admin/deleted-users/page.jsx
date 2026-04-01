"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  RotateCcw,
  Trash2,
  Archive,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

export default function DeletedUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Search states for debounce
  const [searchInput, setSearchInput] = useState("");
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
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  useEffect(() => {
    fetchDeletedUsers();
  }, [currentPage, filter, pageSize, searchTerm]);

  const fetchCounts = async () => {
    try {
      const response = await axios.get("/api/admin/deleted-users?limit=1000");
      const allDeletedUsers = response.data.users || [];

      setCounts({
        total: allDeletedUsers.length,
        admin: allDeletedUsers.filter((u) => u.role === "admin").length,
        instructor: allDeletedUsers.filter((u) => u.role === "instructor")
          .length,
        student: allDeletedUsers.filter((u) => u.role === "student").length,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const fetchDeletedUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/admin/deleted-users", {
        params: {
          page: currentPage,
          limit: pageSize,
          role: filter !== "all" ? filter : undefined,
          search: searchTerm || undefined,
        },
      });

      setUsers(response.data.users || []);

      if (response.data.pagination) {
        setTotalPages(response.data.pagination.totalPages);
        setTotalUsers(response.data.pagination.totalUsers);
        setHasNextPage(response.data.pagination.hasNextPage);
        setHasPrevPage(response.data.pagination.hasPrevPage);
      }
    } catch (error) {
      toast.error("Failed to load deleted users");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to restore ${userName}?`)) {
      try {
        await axios.post(`/api/admin/deleted-users/${userId}`);
        toast.success("User restored successfully");
        setUsers(users.filter((user) => user._id !== userId));
        await fetchCounts();
        await fetchDeletedUsers();
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to restore user");
      }
    }
  };

  const handlePermanentDelete = async (userId, userName) => {
    if (
      window.confirm(
        `Are you sure you want to permanently delete ${userName}? This action cannot be undone!`,
      )
    ) {
      try {
        await axios.delete(`/api/admin/deleted-users/${userId}`);
        toast.success("User permanently deleted");
        setUsers(users.filter((user) => user._id !== userId));
        await fetchCounts();
        await fetchDeletedUsers();
      } catch (error) {
        toast.error("Failed to permanently delete user");
      }
    }
  };

  const getRoleBadge = (role) => {
    const baseClasses =
      "bg-emerald-900/60 border-emerald-700/50 text-emerald-300";
    return baseClasses;
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const goToLastPage = () => setCurrentPage(totalPages);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => setSearchInput(e.target.value);

  const handleRefresh = () => {
    fetchCounts();
    fetchDeletedUsers();
  };

  return (
    <div className="min-h-screen bg-emerald-950 p-4 md:p-6 text-emerald-100/70 relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-96 bg-emerald-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal-500/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-emerald-900/30 border border-emerald-800/50 rounded-2xl p-6 mb-6 shadow-[0_4px_20px_rgb(0,0,0,0.2)] relative overflow-hidden group"
      >
        {/* Header Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent tracking-tight">
              Deleted Users Archive
            </h1>
            <p className="text-emerald-100/70 mt-1.5 text-sm md:text-base">
              Restore or permanently delete archived users
            </p>
          </div>
          <Link
            href="/dashboard/admin/users"
            className="bg-emerald-800/80 hover:bg-emerald-600 border border-emerald-600/50 hover:border-emerald-400 text-emerald-300 hover:text-white px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] font-medium text-sm group/btn"
          >
            <Users className="w-4 h-4 text-emerald-300 group-hover/btn:text-white transition-colors" />
            Back to Active Users
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 relative z-10"
      >
        <StatCard icon={Archive} count={counts.total} label="Total Deleted" />
        <StatCard icon={Shield} count={counts.admin} label="Admins" />
        <StatCard icon={GraduationCap} count={counts.instructor} label="Instructors" />
        <StatCard icon={Users} count={counts.student} label="Students" />
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-emerald-900/30 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.2)] border border-emerald-800/50 p-4 mb-6 relative z-10"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search deleted users by name or email..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 border border-emerald-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400 text-white transition-shadow bg-emerald-950 placeholder:text-emerald-100/60 shadow-[0_4px_20px_rgb(0,0,0,0.2)]"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
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
                  fetchCounts();
                }}
                className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                  filter === f.key
                    ? "bg-emerald-800/80 border-emerald-500/50 text-emerald-300 shadow-[0_8px_30px_rgb(16,185,129,0.15)] border"
                    : "bg-emerald-900/60 border border-emerald-800/50 text-emerald-100/60 hover:bg-emerald-800/40 hover:text-emerald-300 hover:border-emerald-500/40"
                }`}
              >
                {f.label}{" "}
                <span className="opacity-80 text-xs ml-1">({f.count})</span>
              </button>
            ))}
            <button
              onClick={handleRefresh}
              className="p-2.5 rounded-xl bg-emerald-900/60 border border-emerald-800/50 text-emerald-300 hover:bg-emerald-800/80 hover:text-white transition-colors group"
              title="Refresh Data"
            >
              <RefreshCw
                className={`w-4 h-4 group-hover:text-white ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Warning Message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-900/40 border border-emerald-700/50 rounded-xl p-4 mb-6 shadow-[0_4px_20px_rgb(0,0,0,0.2)] relative z-10"
      >
        <div className="flex gap-3 items-start md:items-center">
          <AlertCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 md:mt-0" />
          <p className="text-sm text-emerald-100/70 leading-relaxed">
            <strong className="font-semibold text-emerald-300">Note:</strong>{" "}
            Deleted users are securely stored for 30 days. After that, they will
            be automatically and permanently deleted from the system.
          </p>
        </div>
      </motion.div>

      {/* Users Table */}
      <div className="bg-emerald-900/30 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.2)] border border-emerald-800/50 overflow-hidden relative z-10">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500/50 border-t-emerald-300"></div>
            <p className="mt-3 text-emerald-100/70 font-medium">
              Fetching deleted records...
            </p>
          </div>
        ) : users.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 text-emerald-100/60"
          >
            <div className="bg-emerald-900/60 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-800/50 shadow-[0_8px_30px_rgb(16,185,129,0.15)]">
              <Archive className="w-10 h-10 text-emerald-300" />
            </div>
            <p className="text-lg font-semibold text-white">No records found</p>
            <p className="text-sm mt-1 text-emerald-100/60">
              Deleted users matching your criteria will appear here.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-emerald-900/50 border-b border-emerald-800/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                      User Details
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                      Email Address
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                      Deleted Timestamp
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-emerald-300 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-800/30">
                  <AnimatePresence>
                    {users.map((user) => (
                      <motion.tr
                        key={user._id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        layout
                        className="hover:bg-emerald-800/40 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                            {user.name}
                          </div>
                          <div className="text-xs text-emerald-100/60 mt-0.5 font-mono">
                            ID: {user.originalId?.slice(-6) || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-emerald-100/70 text-sm">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getRoleBadge(
                              user.role,
                            )} uppercase tracking-wide`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-emerald-100/60 text-sm">
                          <div className="flex flex-col">
                            <span>
                              {new Date(user.deletedAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                            <span className="text-xs text-emerald-100/50">
                              {new Date(user.deletedAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 flex items-center gap-1.5 w-fit shadow-[0_4px_20px_rgb(0,0,0,0.2)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            Archived
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleRestore(user._id, user.name)}
                              className="p-2 bg-emerald-800/80 border border-emerald-600/50 hover:bg-emerald-600 hover:border-emerald-400 text-emerald-300 hover:text-white rounded-lg transition-all shadow-md group/btn"
                              title="Restore User"
                            >
                              <RotateCcw className="w-4 h-4 group-hover/btn:-rotate-90 transition-transform duration-300" />
                            </button>
                            <button
                              onClick={() =>
                                handlePermanentDelete(user._id, user.name)
                              }
                              className="p-2 bg-red-900/30 border border-red-800/50 hover:bg-red-800/60 text-red-400 hover:text-red-300 rounded-lg transition-all shadow-md group/btn"
                              title="Permanently Delete"
                            >
                              <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-emerald-800/30">
              <AnimatePresence>
                {users.map((user) => (
                  <motion.div
                    key={user._id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    layout
                    className="p-4 hover:bg-emerald-800/40 bg-emerald-900/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {user.name}
                        </h3>
                        <p className="text-sm text-emerald-100/70 flex items-center gap-1.5 mt-1">
                          <Mail className="w-3.5 h-3.5 text-emerald-300" />
                          {user.email}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${getRoleBadge(
                          user.role,
                        )}`}
                      >
                        {user.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-emerald-100/60 mb-4 bg-emerald-950/50 p-2 rounded-lg border border-emerald-800/50">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                        {new Date(user.deletedAt).toLocaleDateString()}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-emerald-700/50"></div>
                      <span className="text-emerald-300 font-medium">
                        Archived
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRestore(user._id, user.name)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-800/80 border border-emerald-600/50 text-emerald-300 rounded-xl text-sm font-medium hover:bg-emerald-600 hover:text-white transition-all shadow-md"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Restore
                      </button>
                      <button
                        onClick={() =>
                          handlePermanentDelete(user._id, user.name)
                        }
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-900/30 border border-red-800/50 text-red-400 rounded-xl text-sm font-medium hover:bg-red-800/50 hover:text-red-300 transition-all shadow-md"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      {/* Pagination Controls */}
      {users.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-emerald-900/30 p-4 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.2)] border border-emerald-800/50 relative z-10"
        >
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-emerald-100/70 font-medium">
              Show
            </span>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="px-3 py-1.5 border border-emerald-800/50 rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bg-emerald-950 cursor-pointer shadow-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-emerald-100/70 font-medium">
              entries
            </span>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={goToFirstPage}
              disabled={!hasPrevPage}
              className="p-2 rounded-lg bg-emerald-800/80 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-600/50"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToPrevPage}
              disabled={!hasPrevPage}
              className="p-2 rounded-lg bg-emerald-800/80 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-600/50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="px-3 py-1 text-sm font-medium text-emerald-100/70 bg-emerald-900/60 rounded-lg border border-emerald-800/50 shadow-inner">
              Page <span className="text-emerald-300">{currentPage}</span> of{" "}
              {totalPages}
            </div>

            <button
              onClick={goToNextPage}
              disabled={!hasNextPage}
              className="p-2 rounded-lg bg-emerald-800/80 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-600/50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={goToLastPage}
              disabled={!hasNextPage}
              className="p-2 rounded-lg bg-emerald-800/80 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-600/50"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>

          {/* Showing info */}
          <div className="text-sm text-emerald-100/70 font-medium">
            Showing{" "}
            <span className="text-emerald-300">
              {(currentPage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="text-emerald-300">
              {Math.min(currentPage * pageSize, totalUsers)}
            </span>{" "}
            of <span className="text-emerald-300">{totalUsers}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Stat Card Component Customised with Emerald Theme
const StatCard = motion.create(
  function StatCard({ icon: Icon, count, label }, ref) {
    return (
      <div
        ref={ref}
        className="bg-emerald-900/30 border border-emerald-800/50 rounded-2xl p-4 md:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.15)] hover:border-emerald-500/40 hover:bg-emerald-800/40 transition-all relative overflow-hidden group"
      >
        {/* Animated gradient bottom border on hover */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="flex flex-col gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-600/50 group-hover:bg-emerald-600 group-hover:border-emerald-400 transition-colors flex items-center justify-center shadow-md">
            <Icon className="w-5 h-5 text-emerald-300 group-hover:text-white transition-colors" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
              {count}
            </h4>
            <p className="text-emerald-100/70 text-xs md:text-sm font-medium mt-0.5">
              {label}
            </p>
          </div>
        </div>
      </div>
    );
  },
);