// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   ArrowLeft,
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
//   UserCheck,
//   Trash2,
// } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";

// export default function InactiveUsersPage() {
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
//     fetchUsers();
//   }, [currentPage, filter, pageSize, searchTerm]);

//   const fetchCounts = async () => {
//     try {
//       const response = await axios.get("/api/admin/inactive-users");
//       const allUsers = response.data.users;
//       setCounts({
//         total: allUsers.length,
//         admin: allUsers.filter((u) => u.role === "admin").length,
//         instructor: allUsers.filter((u) => u.role === "instructor").length,
//         student: allUsers.filter((u) => u.role === "student").length,
//       });
//     } catch (error) {
//       console.error("Error fetching counts:", error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/api/admin/inactive-users", {
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
//       toast.error("Failed to load inactive users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleActivate = async (userId, userName) => {
//     const result = await Swal.fire({
//       title: `Activate ${userName}?`,
//       text: "This user will be able to login again.",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#10B981",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Activate",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.put(`/api/admin/users/${userId}`, { isActive: true });
//         toast.success(`${userName} activated successfully`);
//         fetchUsers();
//         fetchCounts();
//       } catch (error) {
//         toast.error("Failed to activate user");
//       }
//     }
//   };

//   const handleDelete = async (userId, userName) => {
//     const result = await Swal.fire({
//       title: `Delete ${userName}?`,
//       text: "This user will be permanently deleted. This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#10B981",
//       confirmButtonText: "Yes, Delete",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`/api/admin/users/${userId}`);
//         toast.success(`${userName} deleted permanently`);
//         fetchUsers();
//         fetchCounts();
//       } catch (error) {
//         toast.error("Failed to delete user");
//       }
//     }
//   };

//   const getRoleBadge = (role) => {
//     const colors = {
//       admin: "bg-purple-700/20 text-purple-200 border-purple-600",
//       instructor: "bg-blue-700/20 text-blue-200 border-blue-600",
//       student: "bg-green-700/20 text-green-200 border-green-600",
//     };
//     return colors[role] || "bg-gray-700/20 text-gray-200";
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

//   return (
//     <div className="min-h-screen bg-emerald-950 p-3 sm:p-4 md:p-6 text-white">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 text-white">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
//           <div>
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
//               Inactive Users
//             </h1>
//             <p className="text-white/80 text-xs sm:text-sm mt-1">
//               Users who cannot login to the system
//             </p>
//           </div>
//           <Link
//             href="/dashboard/admin/users"
//             className="bg-white text-emerald-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-gray-100 transition flex items-center gap-1 sm:gap-2 shadow-lg text-sm sm:text-base"
//           >
//             <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//             Back to Active Users
//           </Link>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
//         <StatCard
//           icon={Users}
//           count={counts.total}
//           label="Total Inactive"
//           color="text-emerald-600"
//           bg="bg-emerald-600/20"
//         />
//         <StatCard
//           icon={Shield}
//           count={counts.admin}
//           label="Admins"
//           color="text-purple-400"
//           bg="bg-purple-400/20"
//         />
//         <StatCard
//           icon={GraduationCap}
//           count={counts.instructor}
//           label="Instructors"
//           color="text-blue-400"
//           bg="bg-blue-400/20"
//         />
//         <StatCard
//           icon={Users}
//           count={counts.student}
//           label="Students"
//           color="text-green-400"
//           bg="bg-green-400/20"
//         />
//       </div>

//       {/* Search */}
//       <div className="bg-white/10 backdrop-blur rounded-xl shadow-md p-3 sm:p-4 mb-4 sm:mb-6 border border-emerald-700">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300 w-4 h-4 sm:w-5 sm:h-5" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm border border-emerald-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-900 text-white placeholder-emerald-400"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white/10 backdrop-blur rounded-xl shadow-md overflow-hidden border border-emerald-700">
//         {loading ? (
//           <div className="text-center py-8 sm:py-12">
//             <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-4 border-emerald-600 border-t-transparent mx-auto"></div>
//             <p className="mt-2 text-sm text-emerald-300">Loading users...</p>
//           </div>
//         ) : (
//           <>
//             <div className="hidden md:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-emerald-800/40 border-b border-emerald-700 text-emerald-100">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium uppercase">
//                       User
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium uppercase">
//                       Email
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium uppercase">
//                       Role
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium uppercase">
//                       Deactivated
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium uppercase">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-emerald-700">
//                   {users.map((user) => (
//                     <tr key={user._id} className="hover:bg-emerald-900/50">
//                       <td className="px-4 py-3">{user.name}</td>
//                       <td className="px-4 py-3 text-emerald-200">
//                         {user.email}
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadge(
//                             user.role,
//                           )}`}
//                         >
//                           {user.role}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-emerald-300">
//                         {user.updatedAt
//                           ? new Date(user.updatedAt).toLocaleDateString()
//                           : "-"}
//                       </td>
//                       <td className="px-4 py-3 flex gap-2">
//                         <button
//                           onClick={() => handleActivate(user._id, user.name)}
//                           className="p-2 hover:bg-green-800/30 rounded-lg"
//                         >
//                           <UserCheck className="w-4 h-4 text-green-400" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(user._id, user.name)}
//                           className="p-2 hover:bg-red-800/30 rounded-lg"
//                         >
//                           <Trash2 className="w-4 h-4 text-red-400" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {users.length === 0 && (
//               <div className="text-center py-8 text-emerald-400 text-sm">
//                 No inactive users found
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
//     <div className={`${bg} rounded-xl p-3 sm:p-4 shadow-sm`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-emerald-200 text-xs sm:text-sm">{label}</p>
//           <p className={`text-base sm:text-xl md:text-2xl font-bold ${color}`}>
//             {count}
//           </p>
//         </div>
//         <Icon className={`w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 ${color}`} />
//       </div>
//     </div>
//   );
// }

//inactive users

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
      confirmButtonColor: "#10B981",
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
      cancelButtonColor: "#10B981",
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
      admin: "bg-purple-700/20 text-purple-200 border-purple-600",
      instructor: "bg-blue-700/20 text-blue-200 border-blue-600",
      student: "bg-green-700/20 text-green-200 border-green-600",
    };
    return colors[role] || "bg-gray-700/20 text-gray-200";
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

  return (
    <div className="min-h-screen bg-emerald-950 p-3 sm:p-4 md:p-6 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Inactive Users
            </h1>
            <p className="text-white/80 text-xs sm:text-sm mt-1">
              Users who cannot login to the system
            </p>
          </div>
          <Link
            href="/dashboard/admin/users"
            className="bg-white text-emerald-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-gray-100 transition flex items-center gap-1 sm:gap-2 shadow-lg text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Active Users
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatCard
          icon={Users}
          count={counts.total}
          label="Total Inactive"
          color="text-emerald-600"
          bg="bg-emerald-600/20"
        />
        <StatCard
          icon={Shield}
          count={counts.admin}
          label="Admins"
          color="text-purple-400"
          bg="bg-purple-400/20"
        />
        <StatCard
          icon={GraduationCap}
          count={counts.instructor}
          label="Instructors"
          color="text-blue-400"
          bg="bg-blue-400/20"
        />
        <StatCard
          icon={Users}
          count={counts.student}
          label="Students"
          color="text-green-400"
          bg="bg-green-400/20"
        />
      </div>

      {/* Search */}
      <div className="bg-white/10 backdrop-blur rounded-xl shadow-md p-3 sm:p-4 mb-4 sm:mb-6 border border-emerald-700">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-300 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm border border-emerald-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-900 text-white placeholder-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* Users Table / Cards */}
      <div className="bg-white/10 backdrop-blur rounded-xl shadow-md overflow-hidden border border-emerald-700">
        {loading ? (
          <div className="text-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-4 border-emerald-600 border-t-transparent mx-auto"></div>
            <p className="mt-2 text-sm text-emerald-300">Loading users...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-800/40 border-b border-emerald-700 text-emerald-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                      Deactivated
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-700">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-emerald-900/50">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3 text-emerald-200">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadge(
                            user.role,
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-emerald-300">
                        {user.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleActivate(user._id, user.name)}
                          className="p-2 hover:bg-green-800/30 rounded-lg"
                        >
                          <UserCheck className="w-4 h-4 text-green-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id, user.name)}
                          className="p-2 hover:bg-red-800/30 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden p-4 space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-emerald-800/40 p-4 rounded-xl shadow flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-white font-semibold">{user.name}</p>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getRoleBadge(
                        user.role,
                      )}`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <p className="text-emerald-200 text-sm">{user.email}</p>
                  <p className="text-emerald-300 text-xs">
                    Deactivated:{" "}
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString()
                      : "-"}
                  </p>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => handleActivate(user._id, user.name)}
                      className="p-2 hover:bg-green-800/30 rounded-lg"
                    >
                      <UserCheck className="w-5 h-5 text-green-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id, user.name)}
                      className="p-2 hover:bg-red-800/30 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}

              {users.length === 0 && (
                <div className="text-center py-8 text-emerald-400 text-sm">
                  No inactive users found
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, count, label, color, bg }) {
  return (
    <div className={`${bg} rounded-xl p-3 sm:p-4 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-emerald-200 text-xs sm:text-sm">{label}</p>
          <p className={`text-base sm:text-xl md:text-2xl font-bold ${color}`}>
            {count}
          </p>
        </div>
        <Icon className={`w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 ${color}`} />
      </div>
    </div>
  );
}
