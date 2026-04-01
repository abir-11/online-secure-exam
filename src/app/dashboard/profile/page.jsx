"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaLock,
  FaCamera,
  FaChevronRight,
  FaSave,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newName, setNewName] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!session) return null;

  // --- Handlers (Image, Name, Password) ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSaveImage = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const uploadRes = await fetch("/api/upload-profile", { method: "POST", body: formData });
      const data = await uploadRes.json();
      if (!data.url) throw new Error("Upload failed");

      const updateRes = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: data.url }),
      });

      session.user.image = data.url;
      setPreview(null);
      setSelectedImage(null);
      Swal.fire({ icon: "success", title: "Profile Image Updated", background: "#064e3b", color: "#fff" });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Update Failed", background: "#064e3b", color: "#fff" });
    }
  };

  const handleSaveName = async () => {
    if (!newName) return;
    try {
      await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      session.user.name = newName;
      setIsEditingName(false);
      Swal.fire({ icon: "success", title: "Name Updated", background: "#064e3b", color: "#fff" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-950 p-4 md:p-8 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />

      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={fadeInUp}
        className="max-w-2xl mx-auto relative z-10"
      >
        {/* Profile Card */}
        <div className="bg-emerald-900/30 backdrop-blur-xl border border-emerald-800/50 rounded-[2.5rem] shadow-2xl overflow-hidden">
          
          {/* Header/Avatar Section */}
          <div className="relative h-32 bg-gradient-to-r from-emerald-800 to-teal-700">
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <div className="relative group">
                <Image
                  src={preview || session.user.image || "/default-avatar.png"}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-emerald-950 object-cover shadow-2xl transition-transform group-hover:scale-105"
                />
                <label className="absolute bottom-1 right-1 bg-emerald-500 p-2 rounded-full cursor-pointer hover:bg-emerald-400 shadow-lg transition-colors border-2 border-emerald-950">
                  <FaCamera className="text-white text-sm" />
                  <input type="file" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-6 md:px-10 space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-emerald-50">{session.user.name}</h2>
              <p className="text-emerald-400 font-medium uppercase tracking-widest text-xs">{session.user.role}</p>
            </div>

            {/* Save Image Button (Conditional) */}
            <AnimatePresence>
              {selectedImage && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleSaveImage}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-2xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <FaSave /> Confirm New Profile Picture
                </motion.button>
              )}
            </AnimatePresence>

            {/* Info Rows */}
            <div className="grid gap-4">
              
              {/* Name Row */}
              <div className="group">
                <div className="bg-emerald-800/20 border border-emerald-700/30 p-4 rounded-2xl flex justify-between items-center hover:bg-emerald-800/40 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <FaUser />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-100/40 uppercase font-bold tracking-wider">Full Name</p>
                      <p className="text-emerald-50 font-medium">{session.user.name}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setIsEditingName(!isEditingName); setNewName(session.user.name || ""); }}
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-bold px-3 py-1 rounded-lg hover:bg-emerald-400/10 transition-all"
                  >
                    Edit
                  </button>
                </div>
                {isEditingName && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 p-3 bg-emerald-900/40 rounded-2xl border border-emerald-500/30 flex gap-2">
                    <input 
                      type="text" value={newName} onChange={(e) => setNewName(e.target.value)}
                      className="bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2 w-full text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <button onClick={handleSaveName} className="bg-emerald-500 px-4 rounded-xl text-emerald-950 font-bold text-xs">Save</button>
                  </motion.div>
                )}
              </div>

              {/* Email Row (Read Only) */}
              <div className="bg-emerald-800/20 border border-emerald-700/30 p-4 rounded-2xl flex items-center gap-4 opacity-80">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-emerald-100/40 uppercase font-bold tracking-wider">Email Address</p>
                  <p className="text-emerald-50 font-medium">{session.user.email}</p>
                </div>
              </div>

              {/* Password Row */}
              <div className="group">
                <div className="bg-emerald-800/20 border border-emerald-700/30 p-4 rounded-2xl flex justify-between items-center hover:bg-emerald-800/40 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <FaLock />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-100/40 uppercase font-bold tracking-wider">Security</p>
                      <p className="text-emerald-50 font-medium">••••••••••••</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-bold px-3 py-1 rounded-lg hover:bg-emerald-400/10 transition-all"
                  >
                    Change
                  </button>
                </div>

                {isEditingPassword && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 p-4 bg-emerald-900/40 rounded-2xl border border-emerald-500/30 space-y-3">
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} placeholder="Current Password" 
                        value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2 w-full text-sm focus:outline-none focus:border-emerald-500"
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-emerald-500">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} placeholder="New Password" 
                      value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2 w-full text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <button onClick={handleChangePassword} className="w-full bg-emerald-500 py-2 rounded-xl text-emerald-950 font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20">Update Password</button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}