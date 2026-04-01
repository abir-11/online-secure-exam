"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Sparkles,
  BarChart3,
  PieChart,
  Clock,
  Zap,
  Award,
  Calendar,
} from "lucide-react";
// Fixed: সঠিকভাবে react-icons/fi ইম্পোর্ট করা হয়েছে
import {
  FiUsers,
  FiTrash2,
  FiAlertCircle,
  FiBarChart2,
  FiFlag,
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
);

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const cardHover = {
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 25px -12px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 },
  },
};

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const statsRes = await axios.get("/api/admin/analytics/stats");
      setStats(statsRes.data.data);

      const activitiesRes = await axios.get("/api/admin/analytics/activities");
      setRecentActivities(activitiesRes.data.activities.slice(0, 5));

      const revenueRes = await axios.get(
        "/api/admin/analytics/revenue?period=week",
      );
      setRevenueData(revenueRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const mins = Math.floor((new Date() - new Date(timestamp)) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min ago`;
    return `${Math.floor(mins / 60)} hour ago`;
  };

  // Fixed: Loading ব্লকের ট্যাগ সঠিকভাবে ক্লোজ করা হয়েছে
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#0D7C66] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Fixed: দুইটা আলাদা return স্টেটমেন্টকে একটি Fragment (<> ... </>) এর মাধ্যমে একসাথে করা হয়েছে
  return (
    <>
      <div className="p-6">
        {/* Quick Actions - Now Clickable */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/dashboard/admin/users">
            <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
              <div className="flex items-center mb-2">
                <FiUsers size={28} className="text-[#0D7C66] mr-2" />
                <h3 className="text-xl font-semibold text-[#0D7C66]">
                  Manage Users
                </h3>
              </div>
              <p className="text-gray-600">
                View, add, edit, and manage all users
              </p>
            </div>
          </Link>

          <Link href="/dashboard/admin/deleted-users">
            <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
              <div className="flex items-center mb-2">
                <FiTrash2 size={28} className="text-[#0D7C66] mr-2" />
                <h3 className="text-xl font-semibold text-[#0D7C66]">
                  Deleted Users
                </h3>
              </div>
              <p className="text-gray-600">
                View deleted users and restore or permanently remove them
              </p>
            </div>
          </Link>

          <Link href="/dashboard/admin/reports">
            <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
              <div className="flex items-center mb-2">
                <FiAlertCircle size={28} className="text-[#0D7C66] mr-2" />
                <h3 className="text-xl font-semibold text-[#0D7C66]">Reports</h3>
              </div>
              <p className="text-gray-600">
                View the issues reported by users and take necessary actions
              </p>
            </div>
          </Link>

          <Link href="/dashboard/admin/analytics">
            <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
              <div className="flex items-center mb-2">
                <FiBarChart2 size={28} className="text-[#0D7C66] mr-2" />
                <h3 className="text-xl font-semibold text-[#0D7C66]">
                  Analytics
                </h3>
              </div>
              <p className="text-gray-600">
                View reports and analytics for exams and system performance
              </p>
            </div>
          </Link>

          <Link href="/dashboard/admin/reportissue">
            <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
              <div className="flex items-center mb-2">
                <FiFlag size={28} className="text-[#0D7C66] mr-2" />
                <h3 className="text-xl font-semibold text-[#0D7C66]">
                  Report Issues
                </h3>
              </div>
              <p className="text-gray-600">
                View the issues reported by users and take necessary actions
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="min-h-screen bg-[var(--color-primary-dark)] p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 "
        ></motion.div>

        {/* Stats Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 "
        >
          <StatsCard
            icon={Users}
            title="Total Users"
            value={stats?.users?.total?.toLocaleString()}
            trend="+12%"
            color="bg-[#0D7C66]"
            delay={0}
          />
          <StatsCard
            icon={BookOpen}
            title="Total Courses"
            value={stats?.courses?.total?.toLocaleString()}
            trend="+5%"
            color="bg-[#0D7C66]"
            delay={0.1}
          />
          <StatsCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${stats?.payments?.totalRevenue}`}
            trend="+23%"
            color="bg-[#0D7C66]"
            delay={0.2}
          />
          <StatsCard
            icon={Activity}
            title="Active Today"
            value={stats?.activity?.activeToday?.toLocaleString()}
            trend="+8%"
            color="bg-[#0D7C66]"
            delay={0.3}
          />
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8"
        >
          {/* Revenue Chart Card */}
          <motion.div
            whileHover="hover"
            variants={cardHover}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#0D7C66]/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#0D7C66]" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Revenue Trend
                  </h2>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-xs text-[#0D7C66] bg-[#0D7C66]/10 px-3 py-1 rounded-full"
                >
                  Last 7 days
                </motion.div>
              </div>
            </div>
            <div className="p-5 h-72">
              {revenueData && (
                <Line
                  data={{
                    labels: revenueData.labels,
                    datasets: [
                      {
                        data: revenueData.values,
                        borderColor: "#0D7C66",
                        backgroundColor: "rgba(13,124,102,0.05)",
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: "#0D7C66",
                        pointBorderColor: "white",
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: {
                        grid: { color: "#f0f0f0" },
                        ticks: { callback: (v) => `$${v}` },
                      },
                      x: { grid: { display: false } },
                    },
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* User Distribution Card */}
          <motion.div
            whileHover="hover"
            variants={cardHover}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  User Distribution
                </h2>
              </div>
            </div>
            <div className="p-5 h-72 flex items-center justify-center">
              <Pie
                data={{
                  labels: ["Students", "Instructors", "Admins"],
                  datasets: [
                    {
                      data: [
                        stats?.users?.students || 0,
                        stats?.users?.instructors || 0,
                        stats?.users?.admins || 0,
                      ],
                      backgroundColor: ["#10B981", "#3B82F6", "#8B5CF6"],
                      borderWidth: 0,
                      hoverOffset: 10,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { usePointStyle: true, boxWidth: 10 },
                    },
                    tooltip: {
                      backgroundColor: "#1F2937",
                      titleColor: "#F3F4F6",
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Action & Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Quick Actions Card */}
          <motion.div
            whileHover="hover"
            variants={cardHover}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#0D7C66]/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#0D7C66]" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Quick Actions
                </h2>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {[
                {
                  label: "Manage Users",
                  link: "/dashboard/admin/users",
                  icon: Users,
                  color: "text-blue-600",
                },
                {
                  label: "Inactive Users",
                  link: "/dashboard/admin/inactive-users",
                  icon: Activity,
                  color: "text-red-600",
                },
                {
                  label: "Reports",
                  link: "/dashboard/admin/reports",
                  icon: BarChart3,
                  color: "text-purple-600",
                },
                {
                  label: "Analytics",
                  link: "/dashboard/admin/analytics",
                  icon: TrendingUp,
                  color: "text-green-600",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <Link href={item.link}>
                    <motion.div
                      whileHover={{ x: 8, backgroundColor: "#F9FAFB" }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg ${item.color.replace("text", "bg")}/10 flex items-center justify-center`}
                        >
                          <item.icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <span className="text-gray-700 font-medium">
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0D7C66] transition-colors" />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities Card */}
          <motion.div
            whileHover="hover"
            variants={cardHover}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden lg:col-span-2"
          >
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Activities
                </h2>
              </div>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {recentActivities.map((act, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: "#F9FAFB" }}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] flex items-center justify-center text-white text-xs font-bold">
                        {act.userName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {act.userName}
                        </p>
                        <p className="text-xs text-gray-500">{act.details}</p>
                      </div>
                    </div>
                    <motion.span
                      className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full shadow-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      {formatTimeAgo(act.timestamp)}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

/* Stats Card Component with Animation */
function StatsCard({ icon: Icon, title, value, trend, color, delay }) {
  const isPositive = trend?.startsWith("+");

  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-gradient-to-br from-teal-100 via-teal-50 to-white shadow-lg border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-800"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: "spring" }}
          >
            {value || 0}
          </motion.h2>
        </div>
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center shadow-md`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}