"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, LogOut, ChevronRight, LayoutDashboard, 
  User, Users, UserX, Trash2, FileText, 
  BarChart3, AlertTriangle, PlusCircle, Layers, 
  UserPlus, ClipboardList, Database, CheckSquare, 
  Bell, GraduationCap, CreditCard, Award 
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/auth/login");
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]"
        />
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const navItems = {
    admin: [
      { name: "User Management", href: "/dashboard/admin/users", icon: Users },
      { name: "Inactive Users", href: "/dashboard/admin/inactive-users", icon: UserX },
      { name: "Deleted Users", href: "/dashboard/admin/deleted-users", icon: Trash2 },
      { name: "Reports", href: "/dashboard/admin/reports", icon: FileText },
      { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
      { name: "Report Issue", href: "/dashboard/admin/reportissue", icon: AlertTriangle },
    ],
    instructor: [
      { name: "Create Batch", href: "/dashboard/instructor/create-batch", icon: PlusCircle },
      { name: "View Batches", href: "/dashboard/instructor/view-batches", icon: Layers },
      { name: "Add Students", href: "/dashboard/instructor/add-students", icon: UserPlus },
      { name: "Create Exam", href: "/dashboard/instructor/create-exam", icon: ClipboardList },
      { name: "Question Bank", href: "/dashboard/instructor/question-bank", icon: Database },
      { name: "Exam List", href: "/dashboard/instructor/exam-list", icon: CheckSquare },
      { name: "Theory Submissions", href: "/dashboard/instructor/theory-submissions", icon: FileText },
      { name: "Analytics", href: "/dashboard/instructor/analytics", icon: BarChart3 },
    ],
    student: [
      { name: "My Exams", href: "/dashboard/student/my-exams", icon: ClipboardList },
      { name: "Results", href: "/dashboard/student/result", icon: Award },
      { name: "Notifications", href: "/dashboard/student/notifications", icon: Bell },
      { name: "Courses & Exams", href: "/dashboard/student/online-courses", icon: GraduationCap },
      { name: "Payments", href: "/dashboard/student/payment-history", icon: CreditCard },
      { name: "Awards", href: "/dashboard/student/awards", icon: Award },
    ],
  };

  const currentRoleItems = navItems[session.user.role] || [];

  return (
    <div className="flex min-h-screen bg-emerald-950 text-emerald-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-emerald-900/50 backdrop-blur-md border-b border-emerald-800/50 flex items-center justify-between px-6 z-50">
        <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          SecureExam
        </span>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-emerald-800/50 rounded-xl text-emerald-400"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-emerald-950/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-emerald-900/20 backdrop-blur-2xl border-r border-emerald-800/50 p-6 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 hidden lg:block">
          <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent tracking-tight">
            SecureExam
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold mt-1">Dashboard Panel</p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2 mt-12 lg:mt-0">
          <p className="text-[10px] uppercase font-bold text-emerald-100/30 ml-3 mb-2 tracking-widest">General</p>
          
          <SidebarLink href="/dashboard" icon={LayoutDashboard} label="Overview" active={pathname === "/dashboard"} />
          <SidebarLink href="/dashboard/profile" icon={User} label="My Profile" active={pathname === "/dashboard/profile"} />

          <div className="my-6 border-t border-emerald-800/30 pt-6">
            <p className="text-[10px] uppercase font-bold text-emerald-100/30 ml-3 mb-2 tracking-widest">
              {session.user.role} Menu
            </p>
            {currentRoleItems.map((item) => (
              <SidebarLink 
                key={item.href}
                href={item.href} 
                icon={item.icon} 
                label={item.name} 
                active={pathname === item.href} 
              />
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all duration-300 group"
        >
          <span className="font-bold text-sm">Sign Out</span>
          <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative pt-16 lg:pt-0">
        {/* Glow effect for content background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none" />
        
        <div className="p-4 md:p-8 relative z-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

// Sidebar Link Component for Reusability & Animation
function SidebarLink({ href, icon: Icon, label, active }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group ${
          active 
            ? "bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/20 font-bold" 
            : "text-emerald-100/60 hover:bg-emerald-800/30 hover:text-emerald-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className={active ? "text-emerald-950" : "text-emerald-500 group-hover:text-emerald-300"} />
          <span className="text-sm">{label}</span>
        </div>
        {active && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-emerald-950" />}
      </motion.div>
    </Link>
  );
}