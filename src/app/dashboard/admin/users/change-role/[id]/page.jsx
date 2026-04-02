"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Shield, AlertCircle, User, 
  Mail, Ban, GraduationCap, BookOpen, 
  ChevronRight, Lock, Loader2 
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ChangeRolePage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    if (userId) {
      fetchUser();
    } else {
      toast.error("Invalid user ID");
      router.push("/dashboard/admin/users");
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/users/${userId}`);
      if (response.data.success) {
        setUser(response.data.user);
        setNewRole(response.data.user.role);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to load user");
      router.push("/dashboard/admin/users");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newRole === user.role) {
      toast.error("New role must be different");
      return;
    }
    if (user.role === "student" && newRole !== "instructor") {
      toast.error("Students can only be promoted to Instructor");
      return;
    }
    if (user.role !== "student") {
      toast.error("Role change is restricted for this user");
      return;
    }

    setUpdating(true);
    try {
      const response = await axios.put(`/api/admin/users/change-role/${userId}`, { newRole });
      if (response.data.success) {
        toast.success(`User promoted to Instructor successfully`);
        router.push("/dashboard/admin/users");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const isRoleChangeAllowed = user?.role === "student";

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 p-4 md:p-8 selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <Link href="/dashboard/admin/users" className="p-3 bg-emerald-900/40 border border-emerald-800/50 rounded-2xl hover:bg-emerald-800/60 transition-all group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              {isRoleChangeAllowed ? "Elevation Portal" : "Access Restricted"}
            </h1>
            <p className="text-emerald-100/40 text-xs font-medium uppercase tracking-widest mt-1">
              Role & Permission Management
            </p>
          </div>
        </motion.div>

        {/* User Profile Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-900/20 backdrop-blur-xl border border-emerald-800/40 rounded-[2.5rem] p-6 md:p-8 mb-6 overflow-hidden relative shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-emerald-500/20">
                {user?.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-none">{user?.name}</h2>
                <p className="text-emerald-100/50 text-sm mt-2 flex items-center gap-2">
                  <Mail size={14} className="text-emerald-500" /> {user?.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-950/60 rounded-2xl border border-emerald-800/50">
              <span className="text-xs font-bold text-emerald-100/40 uppercase tracking-tighter">Current Role</span>
              <div className="h-4 w-[1px] bg-emerald-800" />
              <div className="flex items-center gap-2 text-emerald-400 font-black uppercase text-xs">
                <GraduationCap size={16} /> {user?.role}
              </div>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/5 blur-3xl rounded-full" />
        </motion.div>

        {/* Main Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-emerald-900/20 backdrop-blur-xl border border-emerald-800/40 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className={`h-2 w-full ${isRoleChangeAllowed ? 'bg-emerald-500' : 'bg-rose-500/50'}`} />
          
          <div className="p-8 md:p-12">
            {!isRoleChangeAllowed ? (
              <div className="text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center border border-rose-500/20">
                  <Lock className="w-10 h-10 text-rose-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white">Action Restricted</h3>
                  <p className="text-emerald-100/40 text-sm max-w-md mx-auto leading-relaxed">
                    System security protocols only allow <span className="text-emerald-400 font-bold">Students</span> to be promoted to <span className="text-blue-400 font-bold">Instructors</span>. 
                    Admins and current Instructors cannot change roles through this portal.
                  </p>
                </div>
                <Link href="/dashboard/admin/users" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-900/60 text-emerald-100 font-bold rounded-2xl hover:bg-emerald-800 transition-all border border-emerald-800/50">
                  Return to User Directory
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-emerald-100/40 uppercase tracking-[0.2em] ml-1">Select Elevation Path</h3>
                  
                  <button
                    type="button"
                    onClick={() => setNewRole("instructor")}
                    className={`w-full group relative flex items-center justify-between p-6 rounded-3xl border-2 transition-all duration-500 ${
                      newRole === "instructor"
                        ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                        : "border-emerald-800/30 bg-emerald-950/40 hover:border-emerald-700/50"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-2xl transition-colors ${newRole === "instructor" ? "bg-emerald-500 text-white" : "bg-emerald-900/50 text-emerald-700"}`}>
                        <BookOpen size={24} />
                      </div>
                      <div className="text-left">
                        <div className={`font-black text-lg ${newRole === "instructor" ? "text-white" : "text-emerald-100/30"}`}>Instructor</div>
                        <p className="text-emerald-100/40 text-sm">Full teaching & exam management privileges</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-6 h-6 transition-transform duration-500 ${newRole === "instructor" ? "text-emerald-500 translate-x-0" : "text-emerald-800 -translate-x-4 opacity-0"}`} />
                  </button>
                </div>

                <AnimatePresence>
                  {newRole === "instructor" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex gap-4"
                    >
                      <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                      <div className="text-xs leading-relaxed text-amber-100/50">
                        <span className="font-black text-amber-500 block mb-1 uppercase">Security Warning</span>
                        Promoting this student will grant them administrative access to course materials, exam creation, and student performance data. This action is logged in the system audit.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-emerald-800/30">
                  <button
                    type="submit"
                    disabled={updating || newRole === user.role}
                    className="flex-[2] relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black py-4 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-30 disabled:grayscale"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                      {updating ? "Processing Elevation..." : "Confirm Promotion"}
                    </div>
                  </button>
                  <Link href="/dashboard/admin/users" className="flex-1 bg-emerald-900/40 text-emerald-100 font-bold py-4 rounded-2xl hover:bg-emerald-800/60 transition-all text-center border border-emerald-800/50">
                    Discard
                  </Link>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}