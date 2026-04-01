"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Save, User, Mail, Shield, 
  CheckCircle2, XCircle, Info, Hash 
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    isActive: true,
  });

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
        const user = response.data.user;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          role: user.role || "student",
          department: user.department || "",
          isActive: user.isActive !== false,
        });
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
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    setSaving(true);
    try {
      const response = await axios.put(`/api/admin/users/${userId}`, formData);
      if (response.data.success) {
        toast.success("Profile updated successfully");
        router.push("/dashboard/admin/users");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 p-4 md:p-8 selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Header */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/admin/users"
              className="p-3 bg-emerald-900/40 border border-emerald-800/50 rounded-2xl hover:bg-emerald-800/60 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">Edit User Profile</h1>
              <p className="text-emerald-100/40 text-xs font-medium uppercase tracking-widest mt-1 flex items-center gap-2">
                <Hash size={12} /> ID: {userId.slice(-8)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative bg-emerald-900/20 backdrop-blur-xl border border-emerald-800/40 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          {/* Top Decorative bar */}
          <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
          
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="space-y-2 group">
                <label className="text-sm font-bold text-emerald-100/60 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50 group-focus-within:text-emerald-400 transition-colors w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-emerald-950/50 border border-emerald-800/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-white font-medium"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2 group">
                <label className="text-sm font-bold text-emerald-100/60 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50 group-focus-within:text-emerald-400 transition-colors w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-emerald-950/50 border border-emerald-800/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-white font-medium"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Status Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-emerald-100/60 ml-1">Account Status</label>
                <div className="relative">
                  <select
                    value={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                    className="w-full appearance-none px-5 py-4 bg-emerald-950/50 border border-emerald-800/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white font-medium"
                  >
                    <option value="true" className="bg-emerald-950">Active Member</option>
                    <option value="false" className="bg-emerald-950">Inactive / Suspended</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {formData.isActive ? <CheckCircle2 className="text-emerald-400 w-5 h-5" /> : <XCircle className="text-rose-500 w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Role Display (Read Only) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-emerald-100/60 ml-1">Assigned Role</label>
                <div className="flex items-center justify-between px-5 py-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-50 font-bold capitalize">{formData.role}</span>
                  </div>
                  <Link href="/dashboard/admin/users/roles" className="text-[10px] text-emerald-500 hover:text-emerald-400 font-black uppercase tracking-tighter transition-colors">
                    Change Role
                  </Link>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-blue-100/50">
                Updating personal information will affect user login and certification data. Please ensure the email address is verified before saving.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-emerald-800/30">
              <button
                type="submit"
                disabled={saving}
                className="flex-[2] relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {saving ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                  {saving ? "Processing..." : "Commit Changes"}
                </div>
              </button>
              
              <Link
                href="/dashboard/admin/users"
                className="flex-1 bg-emerald-900/40 text-emerald-100 font-bold py-4 rounded-2xl hover:bg-emerald-800/60 transition-all text-center border border-emerald-800/50"
              >
                Discard
              </Link>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}

// Reusable Refresh Icon for saving state
function RefreshCw(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
  );
}