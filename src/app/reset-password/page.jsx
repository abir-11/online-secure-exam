"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Shield,
  GraduationCap,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token) {
      setValidating(false);
      setTokenValid(false);
      return;
    }

    const validateToken = async () => {
      try {
        const response = await axios.get(
          `/api/auth/validate-token?token=${token}`,
        );
        if (response.data.success) {
          setTokenValid(true);
          setEmail(response.data.email);
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        setTokenValid(false);
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/reset-password", {
        token,
        newPassword: password,
      });

      if (response.data.success) {
        toast.success("Password reset successfully!");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-4 border-[#0D7C66] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm md:text-base text-gray-600">
            Validating reset link...
          </p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="w-full max-w-md bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Invalid or Expired Link
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-6">
            The password reset link is invalid or has expired.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block w-full py-3 bg-[#0D7C66] text-white rounded-xl hover:bg-[#41B3A2] transition text-sm md:text-base"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <Toaster position="top-center" />

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
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#0D7C66] mx-auto mb-4 flex items-center justify-center">
            <Lock className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            Enter your new password for <br />
            <span className="text-[#0D7C66] font-medium break-all">
              {email}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full pl-9 md:pl-10 pr-10 md:pr-12 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#41B3A2] bg-gray-50 text-sm md:text-base"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0D7C66]"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Eye className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
          </div>

          <div className="relative mb-6">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full pl-9 md:pl-10 pr-10 md:pr-12 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#41B3A2] bg-gray-50 text-sm md:text-base"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0D7C66]"
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Eye className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
          </div>

          {confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-red-500 -mt-4 mb-4">
              Passwords do not match
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 md:py-3 rounded-xl text-white font-semibold text-sm md:text-base transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0D7C66] hover:bg-[#41B3A2]"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
