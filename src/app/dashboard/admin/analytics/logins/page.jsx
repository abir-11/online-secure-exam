"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, LogIn, Calendar, Mail, Clock } from "lucide-react";
import axios from "axios";

export default function LoginsPage() {
  const [logins, setLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogins();
  }, []);

  const fetchLogins = async () => {
    try {
      const response = await axios.get(
        "/api/admin/analytics/activities-by-type",
      );
      setLogins(response.data.data.logins);
    } catch (error) {
      console.error("Error fetching logins:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#41B3A2] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 p-6">
      <div className="mb-6">
        <Link
          href="/dashboard/admin/analytics"
          className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Analytics
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
          <LogIn className="w-8 h-8 text-yellow-400" />
          Recent Logins
        </h1>
        <p className="text-white/70 mt-1">All user login activities</p>
      </div>

      <div className="bg-gray-800/90 rounded-2xl shadow-sm border border-emerald-700 overflow-hidden">
        {logins.length === 0 ? (
          <div className="text-center py-12">
            <LogIn className="w-12 h-12 mx-auto text-white/50 mb-3" />
            <p className="text-white/70">No logins yet today</p>
          </div>
        ) : (
          <div className="divide-y divide-emerald-700">
            {logins.map((login, i) => (
              <div
                key={i}
                className="p-4 hover:bg-emerald-700/50 transition-colors rounded"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-yellow-700 font-semibold">
                      {login.userName?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{login.userName}</p>
                    <p className="text-sm text-white/80 flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-white/80" />
                      {login.userEmail}
                    </p>
                    <p className="text-xs text-white/60 flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3 text-white/60" />
                      {formatDate(login.timestamp)}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    {login.userRole}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
