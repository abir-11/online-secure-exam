"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("instructor");

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(13,124,102,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(13,124,102,0.25)] transition-all duration-300 p-8">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-full bg-[#0D7C66] flex items-center justify-center text-white text-xl font-bold">
          SE
        </div>
        <h2 className="mt-3 text-2xl font-bold text-[#0D7C66]">SecureExam</h2>
        <p className="text-sm text-[#4B5563]">
          Create your account to get started
        </p>
      </div>

      {/* Role Pills */}
      <div className="flex justify-center gap-2 mb-6">
        {["admin", "instructor", "student"].map((item) => (
          <button
            key={item}
            onClick={() => setRole(item)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
              role === item
                ? "bg-[#0D7C66] text-white"
                : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#334155]"
            }`}
          >
            {item === "admin" && "👑 Admin"}
            {item === "instructor" && "📚 Instructor"}
            {item === "student" && "🎓 Student"}
          </button>
        ))}
      </div>

      {/* Form */}
      <form className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm text-[#4B5563]">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-[#1e293b] placeholder-[#94a3b8]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-[#4B5563]">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-[#1e293b] placeholder-[#94a3b8]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-[#4B5563]">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-[#1e293b] placeholder-[#94a3b8]"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm text-[#4B5563]">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-[#1e293b] placeholder-[#94a3b8]"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-sm text-[#4B5563]">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-[#1e293b] placeholder-[#94a3b8]"
          />
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="w-4 h-4 border-[#cbd5e1] rounded focus:ring-[#41B3A2] checked:bg-[#0D7C66]"
          />
          <span className="text-[#475569]">
            I agree to the{" "}
            <a href="#" className="text-[#0D7C66] hover:text-[#41B3A2]">
              Terms & Conditions
            </a>
          </span>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-[#0D7C66] text-white font-medium hover:bg-[#41B3A2] transition-all transform hover:-translate-y-0.5"
        >
          Register
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-2">
        <div className="flex-1 h-px bg-[#e2e8f0]"></div>
        <span className="text-[#94a3b8] text-sm">or continue with</span>
        <div className="flex-1 h-px bg-[#e2e8f0]"></div>
      </div>

      {/* Google Button */}
      <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#41B3A2] hover:bg-white transition">
        <span className="text-[#DB4437] font-bold">G</span>
        <span className="text-[#475569] hover:text-[#1e293b]">
          Continue with Google
        </span>
      </button>

      {/* Sign In Link */}
      <p className="mt-6 text-center text-sm text-[#64748b]">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-[#0D7C66] hover:text-[#41B3A2] font-medium"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
