// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   UserPlus,
//   Search,
//   Edit,
//   Trash2,
//   RefreshCw,
//   Shield,
//   GraduationCap,
//   Users,
//   Mail,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
// } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function UsersPage() {
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [hasNextPage, setHasNextPage] = useState(false);
//   const [hasPrevPage, setHasPrevPage] = useState(false);

//   const [counts, setCounts] = useState({
//     total: 0,
//     admin: 0,
//     instructor: 0,
//     student: 0,
//   });

//   useEffect(() => {
//     fetchCounts();
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage, filter, pageSize]);

//   const fetchCounts = async () => {
//     try {
//       const response = await axios.get("/api/admin/users/count");
//       if (response.data.success) {
//         setCounts(response.data.counts);
//       }
//     } catch (error) {
//       console.error("Error fetching counts:", error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.get("/api/admin/users", {
//         params: {
//           page: currentPage,
//           limit: pageSize,
//           role: filter !== "all" ? filter : undefined,
//         },
//       });

//       setUsers(response.data.users);

//       if (response.data.pagination) {
//         setTotalPages(response.data.pagination.totalPages);
//         setTotalUsers(response.data.pagination.totalUsers);
//         setHasNextPage(response.data.pagination.hasNextPage);
//         setHasPrevPage(response.data.pagination.hasPrevPage);
//       }
//     } catch {
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (userId, userName) => {
//     if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
//       try {
//         await axios.delete(`/api/admin/users/${userId}`);
//         toast.success("User deleted");

//         await fetchCounts();
//         await fetchUsers();
//       } catch (error) {
//         toast.error(error.response?.data?.error || "Failed to delete user");
//       }
//     }
//   };

//   const filteredUsers = users.filter((user) => {
//     if (searchTerm) {
//       return (
//         user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     return true;
//   });

//   const getRoleBadge = (role) => {
//     const colors = {
//       admin: "bg-purple-900/40 text-purple-300 border-purple-700",
//       instructor: "bg-blue-900/40 text-blue-300 border-blue-700",
//       student: "bg-emerald-900/40 text-emerald-300 border-emerald-700",
//     };
//     return colors[role] || "bg-slate-700 text-slate-300";
//   };

//   const goToFirstPage = () => setCurrentPage(1);
//   const goToPrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
//   const goToNextPage = () =>
//     setCurrentPage((prev) => Math.min(totalPages, prev + 1));
//   const goToLastPage = () => setCurrentPage(totalPages);

//   const handlePageSizeChange = (e) => {
//     setPageSize(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleRefresh = () => {
//     fetchCounts();
//     fetchUsers();
//   };

//   return (
//     <div className="min-h-screen bg-emerald-950 p-4 md:p-6 relative overflow-hidden">
//       {/* Background glow */}
//       <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full"></div>
//       <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-teal-500/20 blur-[100px] rounded-full"></div>

//       {/* Header */}
//       <div className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-2xl p-6 mb-6 text-white relative z-10">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold">
//               👥 User Management
//             </h1>
//             <p className="text-white/80 mt-1">Manage all users in the system</p>
//           </div>
//           <Link
//             href="/dashboard/admin/users/add"
//             className="bg-white text-emerald-700 px-4 py-2 rounded-xl hover:bg-gray-100 transition flex items-center gap-2 shadow-lg"
//           >
//             <UserPlus className="w-5 h-5" />
//             Add New User
//           </Link>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 relative z-10">
//         <StatCard icon={Users} count={counts.total} label="Total Users" />
//         <StatCard icon={Shield} count={counts.admin} label="Admins" />
//         <StatCard
//           icon={GraduationCap}
//           count={counts.instructor}
//           label="Instructors"
//         />
//         <StatCard icon={Users} count={counts.student} label="Students" />
//       </div>

//       {/* Search */}
//       <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-md p-4 mb-6 relative z-10">
//         <div className="flex flex-col md:flex-row gap-3">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
//             />
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={handleRefresh}
//               className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-md overflow-hidden relative z-10">
//         {loading ? (
//           <div className="text-center py-12 text-slate-300">
//             Loading users...
//           </div>
//         ) : (
//           <div className="hidden md:block overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-slate-800 border-b border-slate-700">
//                 <tr className="text-slate-400 text-xs uppercase">
//                   <th className="px-6 py-3 text-left">User</th>
//                   <th className="px-6 py-3 text-left">Email</th>
//                   <th className="px-6 py-3 text-left">Role</th>
//                   <th className="px-6 py-3 text-left">Joined</th>
//                   <th className="px-6 py-3 text-left">Status</th>
//                   <th className="px-6 py-3 text-left">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-700">
//                 {filteredUsers.map((user) => (
//                   <tr key={user._id} className="hover:bg-slate-800 transition">
//                     <td className="px-6 py-4 text-white">{user.name}</td>
//                     <td className="px-6 py-4 text-slate-300">{user.email}</td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs border ${getRoleBadge(user.role)}`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-slate-400 text-sm">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 text-xs rounded-full bg-emerald-700/30 text-emerald-300 border border-emerald-700">
//                         Active
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 flex gap-2">
//                       <Edit className="text-blue-400" />
//                       <Shield className="text-emerald-400" />
//                       <Trash2 className="text-red-400" />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function StatCard({ icon: Icon, count, label }) {
//   return (
//     <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-slate-400 text-sm">{label}</p>
//           <p className="text-2xl font-bold text-white">{count}</p>
//         </div>
//         <Icon className="w-8 h-8 text-emerald-400" />
//       </div>
//     </div>
//   );
// }
// responsive

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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

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
    } catch {
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

        await fetchCounts();
        await fetchUsers();
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

  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-900/40 text-purple-300 border-purple-700",
      instructor: "bg-blue-900/40 text-blue-300 border-blue-700",
      student: "bg-emerald-900/40 text-emerald-300 border-emerald-700",
    };
    return colors[role] || "bg-slate-700 text-slate-300";
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

  const handleRefresh = () => {
    fetchCounts();
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-emerald-950 p-4 md:p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-teal-500/20 blur-[100px] rounded-full"></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-2xl p-6 mb-6 text-white relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              👥 User Management
            </h1>
            <p className="text-white/80 mt-1">Manage all users in the system</p>
          </div>
          <Link
            href="/dashboard/admin/users/add"
            className="bg-white text-emerald-700 px-4 py-2 rounded-xl hover:bg-gray-100 transition flex items-center gap-2 shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            Add New User
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 relative z-10">
        <StatCard icon={Users} count={counts.total} label="Total Users" />
        <StatCard icon={Shield} count={counts.admin} label="Admins" />
        <StatCard
          icon={GraduationCap}
          count={counts.instructor}
          label="Instructors"
        />
        <StatCard icon={Users} count={counts.student} label="Students" />
      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-md p-4 mb-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Table / Cards */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-md overflow-hidden relative z-10">
        {loading ? (
          <div className="text-center py-12 text-slate-300">
            Loading users...
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr className="text-slate-400 text-xs uppercase">
                    <th className="px-6 py-3 text-left">User</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-left">Joined</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-slate-800 transition"
                    >
                      <td className="px-6 py-4 text-white">{user.name}</td>
                      <td className="px-6 py-4 text-slate-300">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs border ${getRoleBadge(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-emerald-700/30 text-emerald-300 border border-emerald-700">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <Edit className="text-blue-400" />
                        <Shield className="text-emerald-400" />
                        <Trash2 className="text-red-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden p-4 space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-slate-800 p-4 rounded-xl shadow flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-white font-semibold">{user.name}</p>
                    <span
                      className={`px-2 py-1 text-xs rounded-full border ${getRoleBadge(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm">{user.email}</p>
                  <p className="text-slate-400 text-xs">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-emerald-700/30 text-emerald-300 border border-emerald-700">
                      Active
                    </span>
                    <div className="flex gap-2">
                      <Edit className="text-blue-400 w-5 h-5" />
                      <Shield className="text-emerald-400 w-5 h-5" />
                      <Trash2 className="text-red-400 w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, count, label }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white">{count}</p>
        </div>
        <Icon className="w-8 h-8 text-emerald-400" />
      </div>
    </div>
  );
}
