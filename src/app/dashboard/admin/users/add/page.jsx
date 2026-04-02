"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Save, User, Mail, Shield, 
  UserCircle, GraduationCap, Briefcase, 
  Info, Loader2, Sparkles 
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    instructorId: "",
    department: "",
  });

  useEffect(() => {
    if (formData.role === "student") {
      fetchInstructors();
    } else {
      setInstructors([]);
    }
  }, [formData.role]);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get("/api/admin/users?role=instructor");
      if (response.data.success) {
        setInstructors(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching instructors:", error);
      toast.error("Could not load instructors list");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }
    if (formData.role === "student" && !formData.instructorId) {
      toast.error("Please select an instructor for this student");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/admin/users", formData);
      if (response.data.success) {
        toast.success("User account created successfully!");
        router.push("/dashboard/admin/users");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 p-4 md:p-8 selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Header */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-10"
        >
          <Link
            href="/dashboard/admin/users"
            className="p-3 bg-emerald-900/40 border border-emerald-800/50 rounded-2xl hover:bg-emerald-800/60 transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Add New User <Sparkles className="text-emerald-400 w-5 h-5" />
            </h1>
            <p className="text-emerald-100/40 text-xs font-medium uppercase tracking-widest mt-1">
              System Registration Portal
            </p>
          </div>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative bg-emerald-900/20 backdrop-blur-xl border border-emerald-800/40 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />
          
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            
            {/* Role Selection - Chips Style */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-emerald-100/60 ml-1">Account Permission Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "admin", label: "Admin", icon: Shield, color: "from-rose-500 to-pink-600" },
                  { value: "instructor", label: "Instructor", icon: Briefcase, color: "from-blue-500 to-cyan-600" },
                  { value: "student", label: "Student", icon: GraduationCap, color: "from-emerald-500 to-teal-600" },
                ].map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: role.value, instructorId: "" })}
                    className={`relative flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 ${
                      formData.role === role.value
                        ? `border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]`
                        : "border-emerald-800/30 bg-emerald-950/40 hover:border-emerald-700/50"
                    }`}
                  >
                    <role.icon className={`w-5 h-5 ${formData.role === role.value ? "text-emerald-400" : "text-emerald-700"}`} />
                    <span className={`font-bold ${formData.role === role.value ? "text-white" : "text-emerald-100/30"}`}>
                      {role.label}
                    </span>
                    {formData.role === role.value && (
                      <motion.div layoutId="activeRole" className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

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
                    className="w-full pl-12 pr-4 py-4 bg-emerald-950/50 border border-emerald-800/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white font-medium"
                    placeholder="Enter full name"
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
                    className="w-full pl-12 pr-4 py-4 bg-emerald-950/50 border border-emerald-800/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white font-medium"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {formData.role === "student" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-bold text-emerald-100/60 ml-1">Assign Instructor</label>
                  <div className="relative">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50 w-5 h-5" />
                    <select
                      value={formData.instructorId}
                      onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
                      className="w-full appearance-none pl-12 pr-4 py-4 bg-emerald-950/50 border border-emerald-800/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white font-medium"
                      required
                    >
                      <option value="" className="bg-emerald-950">Select an instructor</option>
                      {instructors.map((inst) => (
                        <option key={inst._id} value={inst._id} className="bg-emerald-950">
                          {inst.name} {inst.department ? `(${inst.department})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Department Field */}
            <div className="space-y-2 group">
              <label className="text-sm font-bold text-emerald-100/60 ml-1">Department (Optional)</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-5 py-4 bg-emerald-950/50 border border-emerald-800/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white font-medium"
                placeholder="e.g. Computer Science"
              />
            </div>

            {/* Info Message */}
            <div className="flex items-start gap-4 p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-[1.5rem]">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <Info size={18} />
              </div>
              <p className="text-xs leading-relaxed text-emerald-100/40">
                Newly created users will be able to log in immediately using the default security key: 
                <span className="text-emerald-400 font-black ml-1 select-all bg-emerald-500/10 px-2 py-0.5 rounded">Default@123</span>. 
                System recommends a password change after first login.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-emerald-800/30">
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  )}
                  {loading ? "Generating Account..." : "Create User Profile"}
                </div>
              </button>
              
              <Link
                href="/dashboard/admin/users"
                className="flex-1 bg-emerald-900/40 text-emerald-100 font-bold py-4 rounded-2xl hover:bg-emerald-800/60 transition-all text-center border border-emerald-800/50"
              >
                Cancel
              </Link>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}