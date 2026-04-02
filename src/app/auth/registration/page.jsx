"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FcGoogle } from "react-icons/fc";
import { IoShield } from "react-icons/io5";
import { HiEye, HiEyeOff } from "react-icons/hi"; // আইকন যোগ করা হয়েছে
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

// Lottie dynamic import for client-side rendering only
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import learningAnimation from "@/assets/learning.json"; // Instructor
import studentAnimation from "@/assets/Student.json"; // Student

export default function RegisterPage() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ পাসওয়ার্ড ভিজিবিলিটি স্টেট
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
        confirmButtonColor: "#10B981",
        background: "#022c22",
        color: "#fff",
      });
      return;
    }

    const phoneRegex = /^\+[1-9]\d{7,14}$/;
    if (!phoneRegex.test(phone)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Phone Number",
        text: "Please enter a valid international phone number (e.g. +8801712345678)",
        confirmButtonColor: "#10B981",
        background: "#022c22",
        color: "#fff",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        // সরাসরি সাইন ইন করানো হচ্ছে
        await signIn("credentials", { email, password, redirect: false });

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Redirecting to your dashboard...",
          confirmButtonColor: "#10B981",
          background: "#022c22",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          // ✅ আপনার রিকোয়েস্ট অনুযায়ী সরাসরি /dashboard এ পাঠানো হচ্ছে
          window.location.href = "/dashboard";
        }, 1500);

      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "Something went wrong.",
          confirmButtonColor: "#10B981",
          background: "#022c22",
          color: "#fff",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#10B981",
        background: "#022c22",
        color: "#fff",
      });
    }

    setLoading(false);
  };

  const getAnimationForRole = {
    instructor: learningAnimation,
    student: studentAnimation,
  };

  const inputStyles =
    "w-full px-4 py-3 bg-emerald-950/60 border border-emerald-700/60 rounded-xl focus:bg-emerald-900/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all text-white placeholder-gray-400 shadow-inner";

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, staggerChildren: 0.1 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center rounded-2xl p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full bg-emerald-900/40 backdrop-blur-xl border border-emerald-700/50 rounded-3xl shadow-[0_8px_32px_rgb(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row relative z-10 my-10"
      >
        {/* Left Side */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-emerald-900/60 to-emerald-950 flex-col justify-center items-center p-12 relative overflow-hidden border-r border-emerald-700/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="z-10 flex flex-col items-center w-full"
            >
              {getAnimationForRole[role] && (
                <Lottie
                  animationData={getAnimationForRole[role]}
                  loop={true}
                  className="w-[80%] max-w-md drop-shadow-2xl"
                />
              )}
              <h2 className="mt-8 text-3xl font-bold text-white text-center capitalize drop-shadow-md">
                Join as{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-200">
                  {role}
                </span>
              </h2>
              <p className="mt-4 text-emerald-50 text-center max-w-sm leading-relaxed text-lg font-medium">
                Empower your educational journey with our secure and reliable
                online examination platform.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 lg:p-14">
          <motion.div variants={itemVariants} className="md:hidden flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 border border-emerald-500 flex items-center justify-center text-emerald-200 mb-3 shadow-lg">
              <IoShield size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">SecureExam</h2>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white drop-shadow-sm">
              Create an account
            </h3>
            <p className="text-gray-300 mt-2 text-base">
              Please fill in your details to get started.
            </p>
          </motion.div>

          {/* Role Selection */}
          <motion.div variants={itemVariants} className="flex gap-2 mb-8 bg-emerald-950/70 border border-emerald-700/60 p-1.5 rounded-2xl shadow-inner">
            {["instructor", "student"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                  role === item
                    ? "text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-emerald-800/50"
                }`}
              >
                {role === item && (
                  <motion.div
                    layoutId="activeRoleReg"
                    className="absolute inset-0 bg-emerald-500 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">
                  {item === "instructor" && "📚 Instructor"}
                  {item === "student" && "🎓 Student"}
                </span>
              </button>
            ))}
          </motion.div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputStyles}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+8801712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={inputStyles}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-sm font-semibold text-white mb-2 block">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputStyles}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password Field */}
              <div className="relative">
                <label className="text-sm font-semibold text-white mb-2 block">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputStyles}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-400"
                  >
                    {showPass ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </button>
                </div>
              </div>
              
              {/* Confirm Password Field */}
              <div className="relative">
                <label className="text-sm font-semibold text-white mb-2 block">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={inputStyles}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-400"
                  >
                    {showConfirmPass ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold text-lg hover:from-emerald-400 hover:to-teal-300 shadow-[0_4px_20px_rgb(16,185,129,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed border border-emerald-300/30"
            >
              {loading ? "Creating Account..." : "Register Account"}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-emerald-700/60"></div>
            <span className="text-gray-300 text-sm font-medium tracking-wide">
              or register with
            </span>
            <div className="flex-1 h-px bg-emerald-700/60"></div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-emerald-950/60 border border-emerald-600/60 transition-all duration-300 text-white font-bold shadow-sm hover:border-emerald-400/80"
          >
            <FcGoogle size={24} />
            <span>Sign up with Google</span>
          </motion.button>

          <motion.p variants={itemVariants} className="mt-8 text-center text-base text-gray-300">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-emerald-300 hover:text-white hover:underline font-bold transition-colors ml-1"
            >
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}