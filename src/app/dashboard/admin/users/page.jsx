"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus, Search, Edit, Trash2, RefreshCw,
  Shield, GraduationCap, Users, Mail, Calendar,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  MoreVertical, UserCheck, UserX, Loader2, Filter
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UsersPage() {
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
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filter, pageSize]);

  const fetchCounts = async () => {
    try {
      const response = await axios.get("/api/admin/users/count");
      if (response.data.success) {
        setCounts(response.data.counts);
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/users", {
        params: {
          page: currentPage,
          limit: pageSize,
          role: filter !== "all" ? filter : undefined,
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
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        toast.success("User deleted");
        fetchCounts();
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to delete user");
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    if (searchTerm) {
      return (
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  const getRoleStyle = (role) => {
    const styles = {
      admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      instructor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      student: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };
    return styles[role] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Users className="text-emerald-500 w-8 h-8" /> User Directory
          </h1>
          <p className="text-emerald-100/40 text-sm mt-1 uppercase tracking-widest font-bold">
            Access Control & Member Management
          </p>
        </motion.div>

        <Link
          href="/dashboard/admin/users/add"
          className="group relative flex items-center gap-2 bg-emerald-500 text-emerald-950 font-black px-6 py-3 rounded-2xl hover:bg-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Enroll New User
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Grand Total", count: counts.total, icon: Users, color: "text-white", bg: "bg-emerald-900/20" },
          { label: "Administrators", count: counts.admin, icon: Shield, color: "text-purple-400", bg: "bg-purple-500/5" },
          { label: "Instructors", count: counts.instructor, icon: GraduationCap, color: "text-blue-400", bg: "bg-blue-500/5" },
          { label: "Students", count: counts.student, icon: UserCheck, color: "text-emerald-400", bg: "bg-emerald-500/5" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${stat.bg} backdrop-blur-sm border border-white/5 p-5 rounded-[2rem] flex items-center justify-between group hover:border-emerald-500/30 transition-all`}
          >
            <div>
              <p className="text-emerald-100/30 text-xs font-black uppercase tracking-tighter mb-1">{stat.label}</p>
              <h3 className={`text-3xl font-black ${stat.color}`}>{stat.count}</h3>
            </div>
            <stat.icon className={`w-10 h-10 ${stat.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
          </motion.div>
        ))}
      </div>

      {/* Main Controls Section */}
      <div className="bg-emerald-900/10 border border-white/5 rounded-[2.5rem] p-6 mb-8 backdrop-blur-md">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Search Box */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5 group-focus-within:scale-110 transition-transform" />
            <input
              type="text"
              placeholder="Filter by name or secure email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-emerald-950/50 border border-emerald-800/30 rounded-2xl pl-12 pr-4 py-4 text-emerald-50 focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-emerald-100/20"
            />
          </div>

          {/* Role Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "all", label: "All Records" },
              { key: "admin", label: "Admins" },
              { key: "instructor", label: "Instructors" },
              { key: "student", label: "Students" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => { setFilter(f.key); setCurrentPage(1); }}
                className={`px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                  filter === f.key 
                    ? "bg-emerald-500 text-emerald-950 shadow-lg" 
                    : "bg-emerald-800/20 text-emerald-100/40 hover:bg-emerald-800/40"
                }`}
              >
                {f.label}
              </button>
            ))}
            <button 
              onClick={() => { fetchCounts(); fetchUsers(); }}
              className="p-3 bg-emerald-800/20 rounded-xl hover:bg-emerald-500 hover:text-emerald-950 transition-all"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Users Data Display */}
      <div className="bg-emerald-900/10 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md shadow-2xl">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
            <p className="text-emerald-100/30 font-black uppercase tracking-widest text-xs">Syncing Database...</p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-950/40 text-emerald-100/30 text-[10px] uppercase font-black tracking-[0.2em]">
                  <th className="px-8 py-5">Identified User</th>
                  <th className="px-8 py-5">Credentials</th>
                  <th className="px-8 py-5">Role Authority</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {filteredUsers.map((user) => (
                    <motion.tr 
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-bold text-white tracking-tight">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-emerald-100/40 text-sm">
                          <Mail size={14} className="text-emerald-500/50" /> {user.email}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase border ${getRoleStyle(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${user.isActive !== false ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500'}`} />
                          <span className={`text-xs font-bold ${user.isActive !== false ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {user.isActive !== false ? "Active" : "Locked"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/admin/users/${user._id}/edit`} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-xl transition-all" title="Edit Profile">
                            <Edit size={18} />
                          </Link>
                          <Link href={`/dashboard/admin/users/change-role/${user._id}`} className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-xl transition-all" title="Modify Access">
                            <Shield size={18} />
                          </Link>
                          <button onClick={() => handleDelete(user._id, user.name)} className="p-2 hover:bg-rose-500/20 text-rose-400 rounded-xl transition-all" title="Terminate User">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 bg-emerald-900/20 border border-white/5 px-4 py-2 rounded-2xl">
          <span className="text-xs font-bold text-emerald-100/30 uppercase tracking-tighter">View</span>
          <select 
            value={pageSize} 
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="bg-transparent text-emerald-500 font-black text-sm outline-none cursor-pointer"
          >
            {[5, 10, 20, 50].map(v => <option key={v} value={v} className="bg-emerald-950">{v}</option>)}
          </select>
          <span className="text-xs font-bold text-emerald-100/30 uppercase tracking-tighter">Entries</span>
        </div>

        <div className="flex items-center gap-4 bg-emerald-900/20 border border-white/5 p-2 rounded-2xl">
          <div className="flex gap-1">
            <PaginationBtn onClick={() => setCurrentPage(1)} disabled={!hasPrevPage} icon={ChevronsLeft} />
            <PaginationBtn onClick={() => setCurrentPage(p => p - 1)} disabled={!hasPrevPage} icon={ChevronLeft} />
          </div>
          
          <div className="text-xs font-black text-white px-4">
            {currentPage} <span className="text-emerald-500 mx-1">/</span> {totalPages}
          </div>

          <div className="flex gap-1">
            <PaginationBtn onClick={() => setCurrentPage(p => p + 1)} disabled={!hasNextPage} icon={ChevronRight} />
            <PaginationBtn onClick={() => setCurrentPage(totalPages)} disabled={!hasNextPage} icon={ChevronsRight} />
          </div>
        </div>

        <p className="text-[10px] font-black text-emerald-100/20 uppercase tracking-[0.2em]">
          Registry: {totalUsers} Records found
        </p>
      </div>
    </div>
  );
}

// Sub-components
function PaginationBtn({ onClick, disabled, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2.5 rounded-xl hover:bg-emerald-500 hover:text-emerald-950 disabled:opacity-10 disabled:hover:bg-transparent disabled:hover:text-inherit transition-all"
    >
      <Icon size={18} />
    </button>
  );
}