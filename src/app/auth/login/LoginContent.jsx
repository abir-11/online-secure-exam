"use client";

import { useState, useMemo } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FcGoogle } from "react-icons/fc";
import { IoShield } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// Disable SSR for Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import learningAnimation from "@/assets/learning.json";
import studentAnimation from "@/assets/Student.json";
import educationAnimation from "@/assets/Educatin.json";

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Safe animation selection
  const animationData = useMemo(() => {
    const animations = {
      admin: educationAnimation,
      instructor: learningAnimation,
      student: studentAnimation,
    };
    return animations[role] || studentAnimation;
  }, [role]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result || result.error) {
        setLoading(false);

        const errorMsg = result?.error || "";
        console.log("🔍 Login error received:", errorMsg);

        // Check for inactive account
        if (errorMsg.includes("inactive")) {
          Swal.fire({
            icon: "warning",
            title: "⚠️ Account Deactivated",
            html: `
            <p>Your account has been deactivated by the administrator.</p>
            <p class="text-sm text-gray-400 mt-2">Please contact support for assistance.</p>
          `,
            confirmButtonColor: "#10B981", // Emerald 500
            background: "#022c22", // Emerald 950
            color: "#fff",
          });
        }
        // Check for locked profile
        else if (errorMsg.toLowerCase().includes("locked")) {
          setIsLocked(true);
        }
        // Default error
        else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: errorMsg || "Invalid email or password",
            confirmButtonColor: "#10B981",
            background: "#022c22",
            color: "#fff",
          });
        }
        return;
      }

      // Login successful
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();
      const dbRole = sessionData?.user?.role;

      if (!dbRole) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: "User role not found.",
          confirmButtonColor: "#10B981",
          background: "#022c22",
          color: "#fff",
        });
        return;
      }

      if (dbRole !== role) {
        setLoading(false);
        Swal.fire({
          icon: "warning",
          title: "Wrong Role Selected",
          text: `Your account role is "${dbRole}". Please select the correct role.`,
          confirmButtonColor: "#10B981",
          background: "#022c22",
          color: "#fff",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Redirecting...",
        confirmButtonColor: "#10B981",
        background: "#022c22",
        color: "#fff",
        timer: 1200,
        showConfirmButton: false,
      });

      setTimeout(() => {
        if (callbackUrl) {
          router.push(callbackUrl);
          return;
        }
        router.push("/dashboard");
      }, 1200);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#10B981",
        background: "#022c22",
        color: "#fff",
      });
    }
  };

  // 🔴 Updated for better readability: White text and clear placeholder
  const inputStyles =
    "w-full px-4 py-3 bg-emerald-950/60 border border-emerald-700/60 rounded-xl focus:bg-emerald-900/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all text-white placeholder-gray-400 shadow-inner";

  // Framer Motion Variants
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
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full bg-emerald-900/40 backdrop-blur-xl border border-emerald-700/50 rounded-3xl shadow-[0_8px_32px_rgb(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row relative z-10"
      >
        {/* Left Side: Lottie Animation (Hidden on Mobile) */}
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
              {animationData && (
                <Lottie
                  animationData={animationData}
                  loop
                  className="w-[80%] max-w-md drop-shadow-2xl"
                />
              )}

              <h2 className="mt-8 text-3xl font-bold text-white text-center capitalize drop-shadow-md">
                Welcome back,{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-200">
                  {role}
                </span>
              </h2>

              {/* 🔴 Made text much brighter */}
              <p className="mt-4 text-emerald-50 text-center max-w-sm leading-relaxed text-lg font-medium">
                Log in to your account to continue your secure and reliable educational journey.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full md:w-1/2 p-8 lg:p-14">
          {/* Mobile Logo */}
          <motion.div variants={itemVariants} className="md:hidden flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 border border-emerald-500 flex items-center justify-center text-emerald-200 mb-3 shadow-lg">
              <IoShield size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">SecureExam</h2>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white drop-shadow-sm">
              Login to your account
            </h3>
            {/* 🔴 Subtitle made brighter */}
            <p className="text-gray-300 mt-2 text-base">
              Please enter your credentials to access your dashboard.
            </p>
          </motion.div>

          {/* ROLE SELECTOR */}
          <motion.div variants={itemVariants} className="flex gap-2 mb-8 bg-emerald-950/70 border border-emerald-700/60 p-1.5 rounded-2xl shadow-inner">
            {["admin", "instructor", "student"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative ${
                  role === item
                    ? "text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-emerald-800/50" // 🔴 Unselected text improved
                }`}
              >
                {role === item && (
                  <motion.div
                    layoutId="activeRole"
                    className="absolute inset-0 bg-emerald-500 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">
                  {item === "admin" && "👑 Admin"}
                  {item === "instructor" && "📚 Instructor"}
                  {item === "student" && "🎓 Student"}
                </span>
              </button>
            ))}
          </motion.div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <motion.div variants={itemVariants}>
              {/* 🔴 Label made white and bold */}
              <label className="text-sm font-semibold text-white mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputStyles}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              {/* 🔴 Label made white and bold */}
              <label className="text-sm font-semibold text-white mb-2 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputStyles}
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-emerald-300 hover:text-white hover:underline text-sm font-semibold transition-colors" // 🔴 Link color brighter
              >
                Forgot password?
              </Link>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold text-lg hover:from-emerald-400 hover:to-teal-300 shadow-[0_4px_20px_rgb(16,185,129,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed border border-emerald-300/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login to Dashboard"
              )}
            </motion.button>
          </form>

          {/* DIVIDER */}
          <motion.div variants={itemVariants} className="my-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-emerald-700/60"></div>
            {/* 🔴 Divider text improved */}
            <span className="text-gray-300 text-sm font-medium tracking-wide">
              or continue with
            </span>
            <div className="flex-1 h-px bg-emerald-700/60"></div>
          </motion.div>

          {/* GOOGLE LOGIN */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 78, 59, 0.6)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              signIn("google", {
                callbackUrl: callbackUrl || "/dashboard/student",
              })
            }
            // 🔴 Button text made white
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-emerald-950/60 border border-emerald-600/60 transition-all duration-300 text-white font-bold shadow-sm hover:border-emerald-400/80"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </motion.button>

          {/* 🔴 Sign up text brighter */}
          <motion.p variants={itemVariants} className="mt-8 text-center text-base text-gray-300">
            Do not have an account?{" "}
            <Link
              href="/auth/registration"
              className="text-emerald-300 hover:text-white hover:underline font-bold transition-colors ml-1"
            >
              Sign up
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Profile Locked Modal */}
      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-emerald-900 border border-emerald-600/80 rounded-3xl p-8 max-w-sm w-full flex flex-col items-center shadow-2xl relative overflow-hidden"
            >
              {/* Modal Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/30 blur-[50px] rounded-full"></div>
              
              <Lottie
                animationData={educationAnimation}
                loop
                className="w-32 h-32 relative z-10"
              />
              <h2 className="mt-4 text-2xl font-bold text-white text-center relative z-10">
                Profile Locked!
              </h2>
              {/* 🔴 Modal description brighter */}
              <p className="mt-2 text-emerald-50 text-center text-base font-medium leading-relaxed relative z-10">
                For your security, your account has been locked after 3 failed
                login attempts.
              </p>

              <button
                onClick={() => router.push("/forgot-password")}
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold hover:from-emerald-400 hover:to-teal-300 transition-all shadow-lg relative z-10"
              >
                Retrieve account
              </button>

              <button
                type="button"
                onClick={() => setIsLocked(false)}
                className="mt-4 text-sm font-semibold text-gray-300 hover:text-white transition-colors relative z-10"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}