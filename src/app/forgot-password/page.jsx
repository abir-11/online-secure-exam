"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Shield, GraduationCap } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/forgot-password", { email });

      if (response.data.success) {
        setSubmitted(true);
        toast.success("Check your email for reset link!");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-full max-w-md bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Check Your Email
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-4">
            We&apos;ve sent a password reset link to{" "}
            <strong className="break-all">{email}</strong>
          </p>
          <p className="text-xs md:text-sm text-gray-500 mb-6">
            Click the link in the email to reset your password. The link expires
            in 1 hour.
          </p>
          <Link
            href="/auth/login"
            className="inline-block w-full py-3 bg-[#0D7C66] text-white rounded-xl hover:bg-[#41B3A2] transition text-sm md:text-base"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <Toaster position="top-center" />

      {/* Decorative Icons */}
      <div className="fixed top-0 right-0 w-64 md:w-96 h-64 md:h-96 opacity-5 pointer-events-none">
        <Shield className="w-64 md:w-96 h-64 md:h-96 text-[#0D7C66] absolute top-10 right-10 rotate-12" />
      </div>
      <div className="fixed bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 opacity-5 pointer-events-none">
        <GraduationCap className="w-64 md:w-96 h-64 md:h-96 text-[#41B3A2] absolute bottom-10 left-10 -rotate-12" />
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8">
        <Link
          href="/auth/login"
          className="inline-flex items-center text-gray-500 hover:text-[#0D7C66] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm">Back to Login</span>
        </Link>

        <div className="text-center mb-6 md:mb-8">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#41B3A2] mx-auto mb-4 flex items-center justify-center">
            <Mail className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            Enter your email and we&apos;ll send you a link to reset your
            password
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#41B3A2] bg-gray-50 text-sm md:text-base"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 md:py-3 rounded-xl text-white font-semibold text-sm md:text-base transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0D7C66] hover:bg-[#41B3A2]"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
