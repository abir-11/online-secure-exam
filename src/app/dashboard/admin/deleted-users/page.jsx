// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   Search,
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
//   RotateCcw,
//   Trash2,
//   Archive,
//   AlertCircle,
// } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function DeletedUsersPage() {
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [hasNextPage, setHasNextPage] = useState(false);
//   const [hasPrevPage, setHasPrevPage] = useState(false);

//   // Count states
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
//     fetchDeletedUsers();
//   }, [currentPage, filter, pageSize, searchTerm]);

//   const fetchCounts = async () => {
//     try {
//       const response = await axios.get("/api/admin/deleted-users?limit=1000");
//       const allDeletedUsers = response.data.users;
//       setCounts({
//         total: allDeletedUsers.length,
//         admin: allDeletedUsers.filter((u) => u.role === "admin").length,
//         instructor: allDeletedUsers.filter((u) => u.role === "instructor")
//           .length,
//         student: allDeletedUsers.filter((u) => u.role === "student").length,
//       });
//     } catch (error) {
//       console.error("Error fetching counts:", error);
//     }
//   };

//   const fetchDeletedUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/api/admin/deleted-users", {
//         params: {
//           page: currentPage,
//           limit: pageSize,
//           role: filter !== "all" ? filter : undefined,
//           search: searchTerm || undefined,
//         },
//       });
//       setUsers(response.data.users);
//       if (response.data.pagination) {
//         setTotalPages(response.data.pagination.totalPages);
//         setTotalUsers(response.data.pagination.totalUsers);
//         setHasNextPage(response.data.pagination.hasNextPage);
//         setHasPrevPage(response.data.pagination.hasPrevPage);
//       }
//     } catch (error) {
//       toast.error("Failed to load deleted users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRestore = async (userId, userName) => {
//     if (window.confirm(`Are you sure you want to restore ${userName}?`)) {
//       try {
//         await axios.post(`/api/admin/deleted-users/${userId}`);
//         toast.success("User restored successfully");
//         await fetchCounts();
//         await fetchDeletedUsers();
//       } catch (error) {
//         toast.error(error.response?.data?.error || "Failed to restore user");
//       }
//     }
//   };

//   const handlePermanentDelete = async (userId, userName) => {
//     if (
//       window.confirm(
//         `Are you sure you want to permanently delete ${userName}? This action cannot be undone!`,
//       )
//     ) {
//       try {
//         await axios.delete(`/api/admin/deleted-users/${userId}`);
//         toast.success("User permanently deleted");
//         await fetchCounts();
//         await fetchDeletedUsers();
//       } catch (error) {
//         toast.error("Failed to permanently delete user");
//       }
//     }
//   };

//   const getRoleBadge = (role) => {
//     const colors = {
//       admin: "bg-purple-900 text-purple-300 border-purple-800",
//       instructor: "bg-blue-900 text-blue-300 border-blue-800",
//       student: "bg-green-900 text-green-300 border-green-800",
//     };
//     return colors[role] || "bg-gray-900 text-gray-300";
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
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };
//   const handleRefresh = () => {
//     fetchCounts();
//     fetchDeletedUsers();
//   };

//   return (
//     <div className="min-h-screen bg-emerald-950 p-3 sm:p-4 md:p-6 text-white">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
//           <div>
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
//               Deleted Users Archive
//             </h1>
//             <p className="text-white/80 text-xs sm:text-sm mt-1">
//               Restore or permanently delete archived users
//             </p>
//           </div>
//           <Link
//             href="/dashboard/admin/users"
//             className="bg-white text-emerald-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-gray-100 transition flex items-center gap-1 sm:gap-2 shadow-lg text-sm sm:text-base"
//           >
//             <Users className="w-4 h-4 sm:w-5 sm:h-5" />
//             Back to Active Users
//           </Link>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
//         <StatCard
//           icon={Archive}
//           count={counts.total}
//           label="Total Deleted"
//           color="text-red-400"
//           bg="bg-red-900/20"
//         />
//         <StatCard
//           icon={Shield}
//           count={counts.admin}
//           label="Admins"
//           color="text-purple-400"
//           bg="bg-purple-900/20"
//         />
//         <StatCard
//           icon={GraduationCap}
//           count={counts.instructor}
//           label="Instructors"
//           color="text-blue-400"
//           bg="bg-blue-900/20"
//         />
//         <StatCard
//           icon={Users}
//           count={counts.student}
//           label="Students"
//           color="text-green-400"
//           bg="bg-green-900/20"
//         />
//       </div>

//       {/* Search & Filter */}
//       <div className="bg-emerald-900/70 rounded-xl shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300 w-4 h-4 sm:w-5 sm:h-5" />
//             <input
//               type="text"
//               placeholder="Search deleted users by name or email..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm bg-emerald-950 border border-emerald-700 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//             />
//           </div>

//           <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
//             {[
//               { key: "all", label: "All", count: counts.total },
//               { key: "admin", label: "Admin", count: counts.admin },
//               {
//                 key: "instructor",
//                 label: "Instructor",
//                 count: counts.instructor,
//               },
//               { key: "student", label: "Student", count: counts.student },
//             ].map((f) => (
//               <button
//                 key={f.key}
//                 onClick={() => {
//                   setFilter(f.key);
//                   setCurrentPage(1);
//                   fetchCounts();
//                 }}
//                 className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl whitespace-nowrap text-xs sm:text-sm transition ${
//                   filter === f.key
//                     ? "bg-emerald-600 text-white shadow-md"
//                     : "bg-emerald-800 text-emerald-300 hover:bg-emerald-700"
//                 }`}
//               >
//                 {f.label} ({f.count})
//               </button>
//             ))}
//             <button
//               onClick={handleRefresh}
//               className="p-1.5 sm:p-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 transition"
//               title="Refresh"
//             >
//               <RefreshCw
//                 className={`w-4 h-4 sm:w-5 sm:h-5 ${loading ? "animate-spin" : ""}`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Warning */}
//       <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-black/80">
//         <div className="flex gap-2">
//           <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
//           <p className="text-xs sm:text-sm">
//             <strong>Note:</strong> Deleted users are stored for 30 days. You can
//             restore them within this period.
//           </p>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-emerald-900/70 rounded-xl shadow-md overflow-hidden">
//         {loading ? (
//           <div className="text-center py-8 sm:py-12">
//             <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-4 border-red-400 border-t-transparent mx-auto"></div>
//             <p className="mt-2 text-sm text-emerald-300">
//               Loading deleted users...
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Desktop Table */}
//             <div className="hidden md:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-emerald-900 border-b border-emerald-700 text-emerald-300">
//                   <tr>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
//                       User
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
//                       Email
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
//                       Role
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
//                       Deleted At
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
//                       Status
//                     </th>
//                     <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-emerald-800">
//                   {users.map((user) => (
//                     <tr
//                       key={user._id}
//                       className="hover:bg-emerald-900/50 transition"
//                     >
//                       <td className="px-4 sm:px-6 py-3 sm:py-4 text-white">
//                         <div className="font-medium text-sm sm:text-base">
//                           {user.name}
//                         </div>
//                         <div className="text-[10px] sm:text-xs text-emerald-300">
//                           ID: {user.originalId?.slice(-6)}
//                         </div>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3 sm:py-4 text-emerald-300 text-sm">
//                         {user.email}
//                       </td>
//                       <td className="px-4 sm:px-6 py-3 sm:py-4">
//                         <span
//                           className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.role)}`}
//                         >
//                           {user.role}
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3 sm:py-4 text-emerald-300 text-xs sm:text-sm">
//                         {new Date(user.deletedAt).toLocaleDateString()} at{" "}
//                         {new Date(user.deletedAt).toLocaleTimeString()}
//                       </td>
//                       <td className="px-4 sm:px-6 py-3 sm:py-4">
//                         <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-red-800/30 text-red-400 border border-red-700">
//                           Deleted
//                         </span>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3 sm:py-4 flex gap-2">
//                         <button
//                           onClick={() => handleRestore(user._id, user.name)}
//                           className="p-1.5 sm:p-2 hover:bg-green-900/30 rounded-lg transition"
//                           title="Restore"
//                         >
//                           <RotateCcw className="w-4 h-4 text-green-400" />
//                         </button>
//                         <button
//                           onClick={() =>
//                             handlePermanentDelete(user._id, user.name)
//                           }
//                           className="p-1.5 sm:p-2 hover:bg-red-900/30 rounded-lg transition"
//                           title="Permanently Delete"
//                         >
//                           <Trash2 className="w-4 h-4 text-red-400" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* No Results */}
//             {users.length === 0 && (
//               <div className="text-center py-8 sm:py-12 text-emerald-300">
//                 <Archive className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3" />
//                 <p className="text-sm sm:text-base">No deleted users found.</p>
//                 <p className="text-xs sm:text-sm mt-1">
//                   Deleted users will appear here.
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function StatCard({ icon: Icon, count, label, color, bg }) {
//   return (
//     <div
//       className={`${bg} rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-emerald-300 text-xs sm:text-sm">{label}</p>
//           <p className={`text-base sm:text-xl md:text-2xl font-bold ${color}`}>
//             {count}
//           </p>
//         </div>
//         <Icon
//           className={`w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 ${color} opacity-80`}
//         />
//       </div>
//     </div>
//   );
// }

//responsive try

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function DeletedUsersPage() {
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
    fetchDeletedUsers();
  }, [currentPage, filter, pageSize, searchTerm]);

  const fetchCounts = async () => {
    try {
      const response = await axios.get("/api/admin/deleted-users?limit=1000");
      const allDeletedUsers = response.data.users;
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
      setUsers(response.data.users);
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
        await fetchCounts();
        await fetchDeletedUsers();
      } catch (error) {
        toast.error("Failed to permanently delete user");
      }
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-900 text-purple-300 border-purple-800",
      instructor: "bg-blue-900 text-blue-300 border-blue-800",
      student: "bg-green-900 text-green-300 border-green-800",
    };
    return colors[role] || "bg-gray-900 text-gray-300";
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    fetchCounts();
    fetchDeletedUsers();
  };

  return (
    <div className="min-h-screen bg-emerald-950 p-3 sm:p-4 md:p-6 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Deleted Users Archive
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-1">
              Restore or permanently delete archived users
            </p>
          </div>
          <Link
            href="/dashboard/admin/users"
            className="bg-white text-emerald-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-gray-100 transition flex items-center gap-1 sm:gap-2 shadow-lg text-sm sm:text-base"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Active Users
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatCard
          icon={Archive}
          count={counts.total}
          label="Total Deleted"
          color="text-red-400"
          bg="bg-red-900/20"
        />
        <StatCard
          icon={Shield}
          count={counts.admin}
          label="Admins"
          color="text-purple-400"
          bg="bg-purple-900/20"
        />
        <StatCard
          icon={GraduationCap}
          count={counts.instructor}
          label="Instructors"
          color="text-blue-400"
          bg="bg-blue-900/20"
        />
        <StatCard
          icon={Users}
          count={counts.student}
          label="Students"
          color="text-green-400"
          bg="bg-green-900/20"
        />
      </div>

      {/* Search */}
      <div className="bg-emerald-900/70 rounded-xl shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-300 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search deleted users..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-emerald-950 border border-emerald-700 rounded-xl text-white"
            />
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 bg-emerald-800 rounded-xl"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Table / Mobile Cards */}
      <div className="bg-emerald-900/70 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-900 border-b border-emerald-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs uppercase">
                      Deleted At
                    </th>
                    <th className="px-6 py-3 text-left text-xs uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs border rounded ${getRoleBadge(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(user.deletedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <RotateCcw
                          onClick={() => handleRestore(user._id, user.name)}
                          className="text-green-400 cursor-pointer"
                        />
                        <Trash2
                          onClick={() =>
                            handlePermanentDelete(user._id, user.name)
                          }
                          className="text-red-400 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-emerald-800/50 p-4 rounded-xl"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{user.name}</h3>
                    <span
                      className={`px-2 py-1 text-xs border rounded ${getRoleBadge(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <p className="text-sm text-emerald-300">{user.email}</p>
                  <p className="text-xs text-emerald-400 mt-1">
                    Deleted: {new Date(user.deletedAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end gap-3 mt-3">
                    <RotateCcw
                      onClick={() => handleRestore(user._id, user.name)}
                      className="text-green-400 w-5 h-5"
                    />
                    <Trash2
                      onClick={() => handlePermanentDelete(user._id, user.name)}
                      className="text-red-400 w-5 h-5"
                    />
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

function StatCard({ icon: Icon, count, label, color, bg }) {
  return (
    <div className={`${bg} rounded-xl p-4`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm">{label}</p>
          <p className={`text-xl font-bold ${color}`}>{count}</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );
}
