// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useEffect, useState, useRef } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import { Menu, X, LogOut, ChevronRight } from "lucide-react";

// export default function DashboardLayout({ children }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const menuRef = useRef(null);
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session) {
//       router.push("/auth/login");
//     }
//   }, [session, status, router]);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isMobileMenuOpen &&
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMobileMenuOpen]);

//   // Close menu when route changes
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       setIsMobileMenuOpen(false);
//     }
//   }, [pathname, isMobileMenuOpen]);

//   if (status === "loading" || !session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0D7C66] border-t-transparent"></div>
//       </div>
//     );
//   }

//   const handleLogout = async () => {
//     await signOut({ redirect: false });
//     router.push("/");
//   };

//   // Helper to apply active class
//   const linkClass = (href) =>
//     `block px-3 py-2 rounded-lg transition-colors duration-200 ${
//       pathname === href
//         ? "bg-white text-[#0D7C66] font-semibold"
//         : "text-white hover:bg-[#41B3A2] hover:text-white"
//     }`;

//   // Mobile menu link class
//   const mobileLinkClass = (href) =>
//     `flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
//       pathname === href
//         ? "bg-white text-[#0D7C66] font-semibold"
//         : "text-white hover:bg-[#41B3A2]"
//     }`;

//   const toggleMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile topbar (Visible only on small screens) */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0D7C66] text-white flex items-center justify-between px-4 z-40">
//         <h2 className="text-xl font-bold">SecureExam</h2>
//         <button
//           ref={buttonRef}
//           onClick={toggleMenu}
//           className="p-2 focus:outline-none"
//         >
//           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Sidebar Overlay for Mobile */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         ref={menuRef}
//         className={`fixed inset-y-0 left-0 w-64 bg-secondary text-white p-4 flex flex-col justify-between z-30 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="mt-16 lg:mt-6">
//           <h2 className="text-2xl font-bold mb-6 hidden lg:block">
//             SecureExam
//           </h2>

//           <nav className="flex flex-col gap-2 overflow-y-auto max-h-[70vh] custom-scrollbar">
//             <Link href="/dashboard" className={linkClass("/dashboard")}>
//               Dashboard
//             </Link>

//             <Link
//               href="/dashboard/profile"
//               className={mobileLinkClass("/dashboard/profile")}
//             >
//               <span>Profile</span>
//               <ChevronRight className="w-4 h-4 lg:hidden" />
//             </Link>

//             {/* ADMIN Links */}
//             {session.user.role === "admin" && (
//               <>
//                 <Link
//                   href="/dashboard/admin/users"
//                   className={mobileLinkClass("/dashboard/admin/users")}
//                 >
//                   <span>User Mangement</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/admin/inactive-users"
//                   className={mobileLinkClass("/dashboard/admin/inactive-users")}
//                 >
//                   <span>Inactive Users</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/admin/deleted-users"
//                   className={mobileLinkClass("/dashboard/admin/deleted-users")}
//                 >
//                   <span>Deleted Users</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/admin/reports"
//                   className={mobileLinkClass("/dashboard/admin/reports")}
//                 >
//                   <span>Reports</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/admin/analytics"
//                   className={linkClass("/dashboard/admin/analytics")}
//                 >
//                   <span>Analytics</span>
//                 </Link>
//                 {/* Global Link: Report Issue */}
//                 <Link
//                   href="/dashboard/admin/reportissue"
//                   className={mobileLinkClass("/dashboard/reportissue")}
//                 >
//                   <span>Report Issue</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//               </>
//             )}

//             {/* INSTRUCTOR Links */}
//             {session.user.role === "instructor" && (
//               <>
//                 <Link
//                   href="/dashboard/instructor/create-batch"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/create-batch",
//                   )}
//                 >
//                   <span>Create Batch</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/view-batches"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/view-batches",
//                   )}
//                 >
//                   <span>View Batches</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/add-students"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/add-students",
//                   )}
//                 >
//                   <span>Add Students</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/create-exam"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/create-exam",
//                   )}
//                 >
//                   <span>Create Exam</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/question-bank"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/question-bank",
//                   )}
//                 >
//                   <span>Create Question</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/exam-list"
//                   className={mobileLinkClass("/dashboard/instructor/exam-list")}
//                 >
//                   <span>List of Exams</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/theory-submissions"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/theory-submissions",
//                   )}
//                 >
//                   <span>Theory Submissions</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/analytics"
//                   className={mobileLinkClass("/dashboard/instructor/analytics")}
//                 >
//                   <span>Analytics</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//               </>
//             )}

//             {/* STUDENT Links */}
//             {session.user.role === "student" && (
//               <>
//                 <Link
//                   href="/dashboard/student/my-exams"
//                   className={mobileLinkClass("/dashboard/student/my-exams")}
//                 >
//                   <span>My Exams</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/student/result"
//                   className={mobileLinkClass("/dashboard/student/result")}
//                 >
//                   <span>Results</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/student/notifications"
//                   className={mobileLinkClass(
//                     "/dashboard/student/notifications",
//                   )}
//                 >
//                   <span>Notifications</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/student/online-courses"
//                   className={mobileLinkClass(
//                     "/dashboard/student/online-courses",
//                   )}
//                 >
//                   <span>Online Courses & Exams</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/student/payment-history"
//                   className={mobileLinkClass(
//                     "/dashboard/student/payment-history",
//                   )}
//                 >
//                   <span>Payment History</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//                 <Link
//                   href="/dashboard/student/awards"
//                   className={mobileLinkClass("/dashboard/student/awards")}
//                 >
//                   <span>Awards</span>
//                   <ChevronRight className="w-4 h-4 lg:hidden" />
//                 </Link>
//               </>
//             )}
//           </nav>
//         </div>

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white text-red-600 font-medium hover:bg-red-50 transition"
//         >
//           <span>Logout</span>
//           <LogOut className="w-4 h-4" />
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 min-h-screen pt-16 lg:pt-0">
//         <div className="">{children}</div>
//       </main>
//     </div>
//   );
// }

// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useEffect, useState, useRef } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import { Menu, X, LogOut, ChevronRight } from "lucide-react";

// export default function DashboardLayout({ children }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const menuRef = useRef(null);
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session) {
//       router.push("/auth/login");
//     }
//   }, [session, status, router]);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isMobileMenuOpen &&
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMobileMenuOpen]);

//   // Close menu when route changes
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       setIsMobileMenuOpen(false);
//     }
//   }, [pathname]);

//   if (status === "loading" || !session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0D7C66] border-t-transparent"></div>
//       </div>
//     );
//   }

//   const handleLogout = async () => {
//     await signOut({ redirect: false });
//     router.push("/");
//   };

//   // Helper to apply active class
//   const linkClass = (href) =>
//     `block px-3 py-2 rounded-lg transition-colors duration-200 ${
//       pathname === href
//         ? "bg-white text-[#0D7C66] font-semibold"
//         : "text-white hover:bg-[#41B3A2] hover:text-white"
//     }`;

//   // Mobile menu link class
//   const mobileLinkClass = (href) =>
//     `flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
//       pathname === href
//         ? "bg-[#0D7C66] text-white font-semibold"
//         : "text-gray-700 hover:bg-gray-100"
//     }`;

//   const toggleMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Desktop Sidebar */}
//       <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-[#0D7C66] text-white z-30">
//         <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
//           <div className="p-4">
//             <h2 className="text-2xl font-bold mb-6">SecureExam</h2>

//             <nav className="flex flex-col gap-2">
//               <Link href="/dashboard" className={linkClass("/dashboard")}>
//                 Dashboard
//               </Link>
//               <Link
//                 href="/dashboard/profile"
//                 className={linkClass("/dashboard/profile")}
//               >
//                 Profile
//               </Link>

//               {/* ADMIN */}
//               {session.user.role === "admin" && (
//                 <>
//                   <Link
//                     href="/dashboard/admin/users"
//                     className={linkClass("/dashboard/admin/users")}
//                   >
//                     User Management
//                   </Link>
//                   <Link
//                     href="/dashboard/admin/inactive-users"
//                     className={linkClass("/dashboard/admin/inactive-users")}
//                   >
//                     Inactive Users
//                   </Link>
//                   <Link
//                     href="/dashboard/admin/deleted-users"
//                     className={linkClass("/dashboard/admin/deleted-users")}
//                   >
//                     Deleted Users
//                   </Link>
//                   <Link
//                     href="/dashboard/admin/reports"
//                     className={linkClass("/dashboard/admin/reports")}
//                   >
//                     Reports
//                   </Link>
//                   <Link
//                     href="/dashboard/admin/analytics"
//                     className={linkClass("/dashboard/admin/analytics")}
//                   >
//                     Analytics
//                   </Link>

//                   {/* Global Link: Report Issue */}
//                   <Link
//                     href="/dashboard/admin/reportissue"
//                     className={linkClass("/dashboard/reportissue")}
//                   >
//                     <span>Report Issue</span>
//                     <ChevronRight className="w-4 h-4 lg:hidden" />
//                   </Link>
//                 </>
//               )}

//               {/* INSTRUCTOR */}
//               {session.user.role === "instructor" && (
//                 <>
//                   <Link
//                     href="/dashboard/instructor/create-batch"
//                     className={linkClass("/dashboard/instructor/create-batch")}
//                   >
//                     Create Batch
//                   </Link>
//                   <Link
//                     href="/dashboard/instructor/view-batches"
//                     className={linkClass("/dashboard/instructor/view-batches")}
//                   >
//                     View Batches
//                   </Link>
//                   <Link
//                     href="/dashboard/instructor/add-students"
//                     className={linkClass("/dashboard/instructor/add-students")}
//                   >
//                     Add Students
//                   </Link>
//                   <Link
//                     href="/dashboard/instructor/create-exam"
//                     className={linkClass("/dashboard/instructor/create-exam")}
//                   >
//                     Create Exam
//                   </Link>
//                   <Link
//                     href="/dashboard/instructor/question-bank"
//                     className={linkClass("/dashboard/instructor/question-bank")}
//                   >
//                     Create Question
//                   </Link>
//                   <Link
//                     href="/dashboard/instructor/exam-list"
//                     className={linkClass("/dashboard/instructor/exam-list")}
//                   >
//                     List of Exams
//                   </Link>
//                   <Link
//                     href="/dashboard/instructor/theory-submissions"
//                     className={linkClass(
//                       "/dashboard/instructor/theory-submissions",
//                     )}
//                   >
//                     Theory Submissions
//                   </Link>
//                   <Link
//                     href="/dashboard/instructor/analytics"
//                     className={linkClass("/dashboard/instructor/analytics")}
//                   >
//                     Analytics
//                   </Link>
//                 </>
//               )}

//               {/* STUDENT */}
//               {session.user.role === "student" && (
//                 <>
//                   <Link
//                     href="/dashboard/student/my-exams"
//                     className={linkClass("/dashboard/student/my-exams")}
//                   >
//                     My Exams
//                   </Link>
//                   <Link
//                     href="/dashboard/student/result"
//                     className={linkClass("/dashboard/student/result")}
//                   >
//                     Results
//                   </Link>
//                   <Link
//                     href="/dashboard/student/notifications"
//                     className={linkClass("/dashboard/student/notifications")}
//                   >
//                     Notifications
//                   </Link>
//                   <Link
//                     href="/dashboard/student/online-courses"
//                     className={linkClass("/dashboard/student/online-courses")}
//                   >
//                     Online Courses
//                   </Link>
//                   <Link
//                     href="/dashboard/student/payment-history"
//                     className={linkClass("/dashboard/student/payment-history")}
//                   >
//                     Payment History
//                   </Link>
//                   <Link
//                     href="/dashboard/student/awards"
//                     className={linkClass("/dashboard/student/awards")}
//                   >
//                     Awards
//                   </Link>
//                 </>
//               )}
//             </nav>
//           </div>

//           {/* Desktop Logout */}
//           <div className="p-4 border-t border-[#41B3A2]">
//             <button
//               onClick={handleLogout}
//               className="w-full py-2 rounded-lg bg-white text-[#0D7C66] font-medium hover:bg-[#41B3A2] hover:text-white transition-all"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Mobile Header */}
//       <div className="lg:hidden bg-[#0D7C66] text-white sticky top-0 z-40">
//         <div className="flex items-center justify-between px-4 py-3">
//           <div className="flex items-center gap-3">
//             <button
//               ref={buttonRef}
//               onClick={toggleMenu}
//               className="p-2 hover:bg-[#41B3A2] rounded-lg transition focus:outline-none"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//             <h2 className="text-xl font-bold">SecureExam</h2>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-sm hidden sm:inline">
//               {session.user?.name}
//             </span>
//             <div className="w-8 h-8 rounded-full bg-white text-[#0D7C66] flex items-center justify-center font-bold">
//               {session.user?.name?.charAt(0)}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar - Slide down from header (no overlay) */}
//       <div
//         ref={menuRef}
//         className={`lg:hidden bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
//           isMobileMenuOpen
//             ? "max-h-[calc(100vh-64px)] opacity-100"
//             : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="p-4 border-b">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold text-[#0D7C66]">SecureExam</h2>
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="p-1 hover:bg-gray-100 rounded"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//           <div className="mt-2 text-sm text-gray-600">
//             {session.user?.name} • {session.user?.role}
//           </div>
//         </div>

//         <nav className="overflow-y-auto max-h-[calc(100vh-120px)] p-4">
//           <div className="space-y-1">
//             <Link
//               href="/dashboard"
//               className={mobileLinkClass("/dashboard")}
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <span>Dashboard</span>
//               <ChevronRight className="w-4 h-4" />
//             </Link>
//             <Link
//               href="/dashboard/profile"
//               className={mobileLinkClass("/dashboard/profile")}
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               <span>Profile</span>
//               <ChevronRight className="w-4 h-4" />
//             </Link>

//             {/* ADMIN Mobile Links */}
//             {session.user.role === "admin" && (
//               <>
//                 <Link
//                   href="/dashboard/admin/users"
//                   className={mobileLinkClass("/dashboard/admin/users")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>User Management</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/admin/inactive-users"
//                   className={mobileLinkClass("/dashboard/admin/inactive-users")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Inactive Users</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/admin/deleted-users"
//                   className={mobileLinkClass("/dashboard/admin/deleted-users")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Deleted Users</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/admin/reports"
//                   className={mobileLinkClass("/dashboard/admin/reports")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Reports</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/admin/analytics"
//                   className={mobileLinkClass("/dashboard/admin/analytics")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Analytics</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/admin/reportissue"
//                   className={mobileLinkClass("/dashboard/reportissue")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Report Issue</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>

//
//               </>
//             )}

//             {/* INSTRUCTOR Mobile Links */}
//             {session.user.role === "instructor" && (
//               <>
//                 <Link
//                   href="/dashboard/instructor/create-batch"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/create-batch",
//                   )}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Create Batch</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/view-batches"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/view-batches",
//                   )}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>View Batches</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/add-students"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/add-students",
//                   )}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Add Students</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/create-exam"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/create-exam",
//                   )}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Create Exam</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/question-bank"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/question-bank",
//                   )}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Create Question</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/exam-list"
//                   className={mobileLinkClass("/dashboard/instructor/exam-list")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>List of Exams</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/theory-submissions"
//                   className={mobileLinkClass(
//                     "/dashboard/instructor/theory-submissions",
//                   )}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Theory Submissions</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/instructor/analytics"
//                   className={mobileLinkClass("/dashboard/instructor/analytics")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Analytics</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//               </>
//             )}

//             {/* STUDENT Mobile Links */}
//             {session.user.role === "student" && (
//               <>
//                 <Link
//                   href="/dashboard/student/my-exams"
//                   className={mobileLinkClass("/dashboard/student/my-exams")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>My Exams</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/student/result"
//                   className={mobileLinkClass("/dashboard/student/result")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Results</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/student/notifications"
//                   className={mobileLinkClass(
//                     "/dashboard/student/notifications",
//                   )}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Notifications</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/student/online-courses"
//                   className={mobileLinkClass(
//                     "/dashboard/student/online-courses",
//                   )}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Online Courses</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/student/payment-history"
//                   className={mobileLinkClass(
//                     "/dashboard/student/payment-history",
//                   )}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Payment History</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//                 <Link
//                   href="/dashboard/student/awards"
//                   className={mobileLinkClass("/dashboard/student/awards")}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <span>Awards</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Logout */}
//           <button
//             onClick={handleLogout}
//             className="w-full mt-6 flex items-center justify-between px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
//           >
//             <span>Logout</span>
//             <LogOut className="w-4 h-4" />
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <main className="lg:ml-64 min-h-screen bg-gray-50">
//         <div className="p-4 lg:p-6">{children}</div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, LogOut, ChevronRight } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0D7C66] border-t-transparent"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  // Helper to apply active class
  const linkClass = (href) =>
    `block px-3 py-2 rounded-lg transition-colors duration-200 ${
      pathname === href
        ? "bg-white text-[#0D7C66] font-semibold"
        : "text-white hover:bg-[#41B3A2] hover:text-white"
    }`;

  // Mobile menu link class
  const mobileLinkClass = (href) =>
    `flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
      pathname === href
        ? "bg-[#0D7C66] text-white font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar - Sticky with full height */}
      <aside className="hidden lg:block lg:w-64 lg:sticky lg:top-0 lg:self-start bg-[#0D7C66] text-white z-30 h-screen overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="p-4 flex-1">
            {/* <h2 className="text-2xl font-bold mb-6">SecureExam</h2> */}

            <nav className="flex flex-col gap-2">
              <Link href="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>
              <Link
                href="/dashboard/profile"
                className={linkClass("/dashboard/profile")}
              >
                Profile
              </Link>

              {/* ADMIN */}
              {session.user.role === "admin" && (
                <>
                  <Link
                    href="/dashboard/admin/users"
                    className={linkClass("/dashboard/admin/users")}
                  >
                    User Management
                  </Link>
                  <Link
                    href="/dashboard/admin/inactive-users"
                    className={linkClass("/dashboard/admin/inactive-users")}
                  >
                    Inactive Users
                  </Link>
                  <Link
                    href="/dashboard/admin/deleted-users"
                    className={linkClass("/dashboard/admin/deleted-users")}
                  >
                    Deleted Users
                  </Link>
                  <Link
                    href="/dashboard/admin/reports"
                    className={linkClass("/dashboard/admin/reports")}
                  >
                    Reports
                  </Link>
                  <Link
                    href="/dashboard/admin/analytics"
                    className={linkClass("/dashboard/admin/analytics")}
                  >
                    Analytics
                  </Link>
                  <Link
                    href="/dashboard/admin/reportissue"
                    className={linkClass("/dashboard/reportissue")}
                  >
                    Report Issue
                  </Link>
                </>
              )}

              {/* INSTRUCTOR */}
              {session.user.role === "instructor" && (
                <>
                  <Link
                    href="/dashboard/instructor/create-batch"
                    className={linkClass("/dashboard/instructor/create-batch")}
                  >
                    Create Batch
                  </Link>
                  <Link
                    href="/dashboard/instructor/view-batches"
                    className={linkClass("/dashboard/instructor/view-batches")}
                  >
                    View Batches
                  </Link>
                  <Link
                    href="/dashboard/instructor/add-students"
                    className={linkClass("/dashboard/instructor/add-students")}
                  >
                    Add Students
                  </Link>
                  <Link
                    href="/dashboard/instructor/create-exam"
                    className={linkClass("/dashboard/instructor/create-exam")}
                  >
                    Create Exam
                  </Link>
                  <Link
                    href="/dashboard/instructor/question-bank"
                    className={linkClass("/dashboard/instructor/question-bank")}
                  >
                    Create Question
                  </Link>
                  <Link
                    href="/dashboard/instructor/exam-list"
                    className={linkClass("/dashboard/instructor/exam-list")}
                  >
                    List of Exams
                  </Link>
                  <Link
                    href="/dashboard/instructor/theory-submissions"
                    className={linkClass(
                      "/dashboard/instructor/theory-submissions",
                    )}
                  >
                    Theory Submissions
                  </Link>
                  <Link
                    href="/dashboard/instructor/analytics"
                    className={linkClass("/dashboard/instructor/analytics")}
                  >
                    Analytics
                  </Link>
                </>
              )}

              {/* STUDENT */}
              {session.user.role === "student" && (
                <>
                  <Link
                    href="/dashboard/student/my-exams"
                    className={linkClass("/dashboard/student/my-exams")}
                  >
                    My Exams
                  </Link>
                  <Link
                    href="/dashboard/student/result"
                    className={linkClass("/dashboard/student/result")}
                  >
                    Results
                  </Link>
                  <Link
                    href="/dashboard/student/notifications"
                    className={linkClass("/dashboard/student/notifications")}
                  >
                    Notifications
                  </Link>
                  <Link
                    href="/dashboard/student/online-courses"
                    className={linkClass("/dashboard/student/online-courses")}
                  >
                    Online Courses
                  </Link>
                  <Link
                    href="/dashboard/student/payment-history"
                    className={linkClass("/dashboard/student/payment-history")}
                  >
                    Payment History
                  </Link>
                  <Link
                    href="/dashboard/student/awards"
                    className={linkClass("/dashboard/student/awards")}
                  >
                    Awards
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Desktop Logout - at bottom of sidebar */}
          <div className="p-4 border-t border-[#41B3A2]">
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-lg bg-white text-[#0D7C66] font-medium hover:bg-[#41B3A2] hover:text-white transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="lg:hidden bg-[#0D7C66] text-white sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="p-2 hover:bg-[#41B3A2] rounded-lg transition focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
              {/* <h2 className="text-xl font-bold">SecureExam</h2> */}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm hidden sm:inline">
                {session.user?.name}
              </span>
              <div className="w-8 h-8 rounded-full bg-white text-[#0D7C66] flex items-center justify-center font-bold">
                {session.user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar - Slide down from header */}
        <div
          ref={menuRef}
          className={`lg:hidden bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen
              ? "max-h-[calc(100vh-64px)] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              {/* <h2 className="text-xl font-bold text-[#0D7C66]">SecureExam</h2> */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {session.user?.name} • {session.user?.role}
            </div>
          </div>

          <nav className="overflow-y-auto max-h-[calc(100vh-120px)] p-4">
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className={mobileLinkClass("/dashboard")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard/profile"
                className={mobileLinkClass("/dashboard/profile")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Profile</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              {/* ADMIN Mobile Links */}
              {session.user.role === "admin" && (
                <>
                  <Link
                    href="/dashboard/admin/users"
                    className={mobileLinkClass("/dashboard/admin/users")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>User Management</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/admin/inactive-users"
                    className={mobileLinkClass(
                      "/dashboard/admin/inactive-users",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Inactive Users</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/admin/deleted-users"
                    className={mobileLinkClass(
                      "/dashboard/admin/deleted-users",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Deleted Users</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/admin/reports"
                    className={mobileLinkClass("/dashboard/admin/reports")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Reports</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/admin/analytics"
                    className={mobileLinkClass("/dashboard/admin/analytics")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Analytics</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/admin/reportissue"
                    className={mobileLinkClass("/dashboard/reportissue")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Report Issue</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </>
              )}

              {/* INSTRUCTOR Mobile Links */}
              {session.user.role === "instructor" && (
                <>
                  <Link
                    href="/dashboard/instructor/create-batch"
                    className={mobileLinkClass(
                      "/dashboard/instructor/create-batch",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Create Batch</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/instructor/view-batches"
                    className={mobileLinkClass(
                      "/dashboard/instructor/view-batches",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>View Batches</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/instructor/add-students"
                    className={mobileLinkClass(
                      "/dashboard/instructor/add-students",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Add Students</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/instructor/create-exam"
                    className={mobileLinkClass(
                      "/dashboard/instructor/create-exam",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Create Exam</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/instructor/question-bank"
                    className={mobileLinkClass(
                      "/dashboard/instructor/question-bank",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Create Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/instructor/exam-list"
                    className={mobileLinkClass(
                      "/dashboard/instructor/exam-list",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>List of Exams</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/instructor/theory-submissions"
                    className={mobileLinkClass(
                      "/dashboard/instructor/theory-submissions",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Theory Submissions</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/instructor/analytics"
                    className={mobileLinkClass(
                      "/dashboard/instructor/analytics",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Analytics</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </>
              )}

              {/* STUDENT Mobile Links */}
              {session.user.role === "student" && (
                <>
                  <Link
                    href="/dashboard/student/my-exams"
                    className={mobileLinkClass("/dashboard/student/my-exams")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>My Exams</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/student/result"
                    className={mobileLinkClass("/dashboard/student/result")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Results</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/student/notifications"
                    className={mobileLinkClass(
                      "/dashboard/student/notifications",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Notifications</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/student/online-courses"
                    className={mobileLinkClass(
                      "/dashboard/student/online-courses",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Online Courses</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/student/payment-history"
                    className={mobileLinkClass(
                      "/dashboard/student/payment-history",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Payment History</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/student/awards"
                    className={mobileLinkClass("/dashboard/student/awards")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Awards</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className="w-full mt-6 flex items-center justify-between px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
            >
              <span>Logout</span>
              <LogOut className="w-4 h-4" />
            </button>
          </nav>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
