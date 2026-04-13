"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaLock,
  FaCamera,
} from "react-icons/fa";

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
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
          <p className="mt-4 text-emerald-100/70">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // --- Image handlers ---
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
      const uploadRes = await fetch("/api/upload-profile", {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();

      if (!data.url) {
        return Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "Image upload failed",
        });
      }

      const updateRes = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: data.url }),
      });

      const updateData = await updateRes.json();

      if (updateData.error) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: updateData.error,
        });
      }

      session.user.image = data.url;
      setPreview(null);
      setSelectedImage(null);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile image updated successfully!",
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong while uploading",
      });
    }
  };

  // --- Name handlers ---
  const handleSaveName = async () => {
    if (!newName) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid Name",
        text: "Name cannot be empty",
      });
    }

    try {
      const res = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      const data = await res.json();

      if (data.error) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error,
        });
      }

      session.user.name = newName;
      setIsEditingName(false);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Name updated successfully!",
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating name",
      });
    }
  };

  // --- Password handler ---
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Fill both password fields",
      });
    }

    try {
      const res = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (data.error) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error,
        });
      }

      setIsEditingPassword(false);
      setCurrentPassword("");
      setNewPassword("");

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password updated successfully!",
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating password",
      });
    }
  };

  return (
    <div className="min-h-screen bg-emerald-950 relative overflow-hidden px-4 sm:px-6 lg:px-0 py-6">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-3xl mx-auto bg-emerald-900/30 backdrop-blur-md rounded-3xl shadow-xl border border-emerald-700/50 overflow-hidden relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-600/40 to-teal-500/40 border-b border-emerald-700/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaUser /> My Profile
          </h2>

          {/* Profile Image */}
          <div className="relative">
            <Image
              src={preview || session.user.image || "/default-avatar.png"}
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full border-2 border-emerald-400 object-cover"
            />
            <label className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-emerald-500 flex items-center gap-1 transition-colors">
              <FaCamera />
              Edit
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Save Image */}
          {selectedImage && (
            <button
              onClick={handleSaveImage}
              className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold flex justify-center items-center gap-2 transition-colors shadow-[0_0_15px_rgb(16,185,129,0.2)]"
            >
              <FaCamera /> Save Profile Picture
            </button>
          )}

          {/* Name */}
          <div className="bg-emerald-900/20 border border-emerald-700/50 p-4 rounded-xl flex justify-between items-center shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <FaUser className="text-emerald-400" />
              <div>
                <p className="text-sm text-emerald-300">Name</p>
                <p className="text-lg font-semibold text-white">
                  {session.user.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsEditingName(!isEditingName);
                setNewName(session.user.name || "");
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors"
            >
              Edit
            </button>
          </div>

          {isEditingName && (
            <div className="border border-emerald-700/50 rounded-xl p-4 space-y-3 bg-emerald-900/20 backdrop-blur-sm">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border border-emerald-700/50 bg-emerald-950/50 text-white px-3 py-2 rounded-lg placeholder-emerald-500/50 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSaveName}
                className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-colors shadow-[0_0_15px_rgb(16,185,129,0.2)]"
              >
                Save Name
              </button>
            </div>
          )}

          {/* Email */}
          <div className="bg-emerald-900/20 border border-emerald-700/50 p-4 rounded-xl shadow-sm flex items-center gap-2 backdrop-blur-sm">
            <FaEnvelope className="text-emerald-400" />
            <div>
              <p className="text-sm text-emerald-300">Email</p>
              <p className="text-lg font-semibold text-white">
                {session.user.email}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="bg-emerald-900/20 border border-emerald-700/50 p-4 rounded-xl shadow-sm flex items-center gap-2 backdrop-blur-sm">
            <FaUserShield className="text-emerald-400" />
            <div>
              <p className="text-sm text-emerald-300">Role</p>
              <p className="text-lg font-semibold text-white">
                {session.user.role}
              </p>
            </div>
          </div>

          {/* Password */}
          <div className="bg-emerald-900/20 border border-emerald-700/50 p-4 rounded-xl shadow-sm flex justify-between items-center backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <FaLock className="text-emerald-400" />
              <div>
                <p className="text-sm text-emerald-300">Password</p>
                <p className="text-emerald-100/70">Change your password</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditingPassword(!isEditingPassword)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors"
            >
              Change
            </button>
          </div>

          {isEditingPassword && (
            <div className="border border-emerald-700/50 rounded-xl p-4 space-y-3 bg-emerald-900/20 backdrop-blur-sm">
              <div className="flex justify-between items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-emerald-700/50 bg-emerald-950/50 text-white px-3 py-2 rounded-lg placeholder-emerald-500/50 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-1 text-sm bg-emerald-700/50 hover:bg-emerald-700 text-emerald-100 rounded-lg transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex justify-between items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-emerald-700/50 bg-emerald-950/50 text-white px-3 py-2 rounded-lg placeholder-emerald-500/50 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-1 text-sm bg-emerald-700/50 hover:bg-emerald-700 text-emerald-100 rounded-lg transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                onClick={handleChangePassword}
                className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-colors shadow-[0_0_15px_rgb(16,185,129,0.2)]"
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
