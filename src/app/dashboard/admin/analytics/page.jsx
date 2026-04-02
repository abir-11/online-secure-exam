"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Clock,
  ShoppingCart,
  Activity,
  UserCheck,
  Calendar,
  UserPlus,
  LogIn,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { motion } from "framer-motion";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [revenueData, setRevenueData] = useState(null);
  const [activitiesByType, setActivitiesByType] = useState({
    registrations: [],
    logins: [],
    purchases: [],
    counts: { total: 0, registrations: 0, logins: 0, purchases: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("week"); // "week" or "month"

  // Fetch data when timeFilter changes
  useEffect(() => {
    fetchAllData();
  }, [timeFilter]);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [statsRes, activitiesRes, revenueRes, activitiesByTypeRes] =
        await Promise.all([
          axios.get("/api/admin/analytics/stats"),
          axios.get("/api/admin/analytics/activities"),
          axios.get(`/api/admin/analytics/revenue?period=${timeFilter}`),
          axios.get("/api/admin/analytics/activities-by-type"),
        ]);

      setStats(statsRes.data.data);
      setActivities(activitiesRes.data.activities);
      setRevenueData(revenueRes.data.data);
      setActivitiesByType(activitiesByTypeRes.data.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Chart configuration customized for Dark Theme
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(6, 78, 59, 0.9)", // emerald-900
        titleColor: "white",
        bodyColor: "rgba(110, 231, 183, 1)", // emerald-300
        padding: 12,
        displayColors: false,
        borderColor: "rgba(52, 211, 153, 0.3)", // emerald-400
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return `$${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(16, 185, 129, 0.1)" }, // emerald-500/10
        ticks: {
          color: "rgba(209, 250, 229, 0.6)", // emerald-100/60
          callback: (value) => `$${value}`,
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "rgba(209, 250, 229, 0.6)", // emerald-100/60
          maxRotation: 45,
          minRotation: 45,
          maxTicksLimit: timeFilter === "week" ? 7 : 10,
        },
      },
    },
    elements: {
      line: { tension: 0.4 },
      point: { radius: 4, hoverRadius: 7 },
    },
  };

  const chartData = {
    labels: revenueData?.labels || [],
    datasets: [
      {
        label: "Revenue",
        data: revenueData?.values || [],
        borderColor: "#34d399", // emerald-400
        backgroundColor: "rgba(52, 211, 153, 0.15)", // emerald-400 with opacity
        borderWidth: 3,
        fill: true,
        pointBackgroundColor: "#059669", // emerald-600
        pointBorderColor: "white",
        pointBorderWidth: 2,
      },
    ],
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const getActionIcon = (action) => {
    switch (action) {
      case "purchased_course":
        return "🛒";
      case "joined_platform":
        return "🎉";
      case "logged_in":
        return "🔓";
      default:
        return "📌";
    }
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent shadow-[0_0_15px_rgba(16,185,129,0.5)] mx-auto"></div>
          <p className="mt-4 text-emerald-100/70 animate-pulse">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 p-4 md:p-6 space-y-6 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Header with Time Filter */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-900/40 backdrop-blur-md border border-emerald-700/50 rounded-3xl p-6 md:p-8 text-white shadow-lg"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                📊 Analytics Dashboard
              </h1>
              <p className="text-emerald-100/70 mt-2 font-medium">
                Real-time overview of your platform's performance
              </p>
            </div>

            {/* Time Filter Buttons */}
            <div className="flex gap-2 bg-emerald-950/50 rounded-xl p-1.5 border border-emerald-800/50 backdrop-blur-sm">
              <button
                onClick={() => setTimeFilter("week")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                  timeFilter === "week"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-emerald-100/60 hover:text-white hover:bg-emerald-800/50"
                }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setTimeFilter("month")}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                  timeFilter === "month"
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-emerald-100/60 hover:text-white hover:bg-emerald-800/50"
                }`}
              >
                Last 30 Days
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard
            icon={Users}
            title="Total Users"
            value={stats?.users?.total?.toLocaleString() || "0"}
            subtitle={`+${stats?.users?.newToday || 0} today`}
            bgColor="bg-blue-900/20"
            iconColor="text-blue-400"
            borderColor="border-blue-800/40"
            glowColor="group-hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]"
          />
          <StatCard
            icon={BookOpen}
            title="Total Courses"
            value={stats?.courses?.total?.toLocaleString() || "0"}
            bgColor="bg-purple-900/20"
            iconColor="text-purple-400"
            borderColor="border-purple-800/40"
            glowColor="group-hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]"
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${stats?.payments?.totalRevenue || "0"}`}
            subtitle={`$${stats?.payments?.todayRevenue || "0"} today`}
            bgColor="bg-emerald-900/20"
            iconColor="text-emerald-400"
            borderColor="border-emerald-800/40"
            glowColor="group-hover:shadow-[0_0_25px_rgba(52,211,153,0.15)]"
          />
          <StatCard
            icon={Activity}
            title="Active Today"
            value={stats?.activity?.activeToday?.toLocaleString() || "0"}
            bgColor="bg-teal-900/20"
            iconColor="text-teal-400"
            borderColor="border-teal-800/40"
            glowColor="group-hover:shadow-[0_0_25px_rgba(45,212,191,0.15)]"
          />
        </motion.div>

        {/* Revenue Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-emerald-900/30 backdrop-blur-md rounded-3xl shadow-lg border border-emerald-800/50 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              Revenue Trend <span className="text-sm font-medium text-emerald-100/50">{timeFilter === "week" ? "(Last 7 Days)" : "(Last 30 Days)"}</span>
            </h2>
            <div className="text-sm text-emerald-100/60 bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-800/50 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              {timeFilter === "week" ? "Week View" : "Month View"}
            </div>
          </div>
          <div className="h-80 w-full">
            {revenueData && <Line data={chartData} options={chartOptions} />}
          </div>
        </motion.div>

        {/* Activity Sections - 3 Column Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <ActivitySection
            router={router}
            icon={UserPlus}
            title="New Registrations"
            count={activitiesByType.counts.registrations}
            activities={activitiesByType.registrations}
            bgColor="bg-purple-900/30"
            iconColor="text-purple-400"
            type="registrations"
          />
          <ActivitySection
            router={router}
            icon={LogIn}
            title="Recent Logins"
            count={activitiesByType.counts.logins}
            activities={activitiesByType.logins}
            bgColor="bg-blue-900/30"
            iconColor="text-blue-400"
            type="logins"
          />
          <ActivitySection
            router={router}
            icon={CreditCard}
            title="Recent Purchases"
            count={activitiesByType.counts.purchases}
            activities={activitiesByType.purchases}
            bgColor="bg-emerald-900/30"
            iconColor="text-emerald-400"
            type="purchases"
          />
        </motion.div>

        {/* Two Column Layout (User Distribution & Payments) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
          
          {/* User Distribution */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-emerald-900/30 backdrop-blur-md rounded-3xl shadow-lg border border-emerald-800/50 p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-emerald-400" />
              User Distribution
            </h2>
            <div className="space-y-6">
              <ProgressBar
                label="Students"
                value={stats?.users?.students || 0}
                total={stats?.users?.total || 1}
                barColor="bg-teal-400"
              />
              <ProgressBar
                label="Instructors"
                value={stats?.users?.instructors || 0}
                total={stats?.users?.total || 1}
                barColor="bg-blue-400"
              />
              <ProgressBar
                label="Admins"
                value={stats?.users?.admins || 0}
                total={stats?.users?.total || 1}
                barColor="bg-purple-400"
              />
            </div>
          </motion.div>

          {/* Payment Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-emerald-900/30 backdrop-blur-md rounded-3xl shadow-lg border border-emerald-800/50 p-6 md:p-8 flex flex-col"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-emerald-400" />
              Payment Summary
            </h2>
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-center p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/30 hover:bg-emerald-800/30 transition-colors">
                <span className="text-emerald-100/70 font-medium">Total Transactions</span>
                <span className="font-extrabold text-white text-lg">
                  {stats?.payments?.totalTransactions || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/30 hover:bg-emerald-800/30 transition-colors">
                <span className="text-emerald-100/70 font-medium">Average Transaction</span>
                <span className="font-extrabold text-emerald-300 text-lg">
                  ${stats?.payments?.averageTransaction || "0.00"}
                </span>
              </div>
              <div className="flex justify-between items-center p-5 bg-gradient-to-r from-emerald-900/60 to-teal-900/60 rounded-2xl border border-emerald-500/30 shadow-inner">
                <span className="font-bold text-white">
                  Today's Revenue
                </span>
                <span className="font-black text-2xl text-emerald-300 drop-shadow-md">
                  ${stats?.payments?.todayRevenue || "0"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

// ================= Components =================

function StatCard({ icon: Icon, title, value, subtitle, bgColor, iconColor, borderColor, glowColor }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
      }}
      whileHover={{ y: -5 }}
      className={`bg-emerald-900/30 backdrop-blur-md rounded-3xl p-6 border ${borderColor} shadow-lg transition-all duration-300 group ${glowColor}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-emerald-100/60 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-black text-white tracking-tight">{value}</p>
          {subtitle && <p className="text-xs font-semibold text-emerald-400 mt-2">{subtitle}</p>}
        </div>
        <div className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center border ${borderColor} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ label, value, total, barColor }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-emerald-100/80 font-medium">{label}</span>
        <span className="font-bold text-white">
          {value.toLocaleString()} <span className="text-emerald-100/40 font-normal">({Math.round(percentage)}%)</span>
        </span>
      </div>
      <div className="w-full bg-emerald-950/60 rounded-full h-3 overflow-hidden border border-emerald-800/30 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`${barColor} rounded-full h-full relative`}
        >
          {/* Shimmer Effect */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
        </motion.div>
      </div>
    </div>
  );
}

function ActivitySection({ router, icon: Icon, title, count, activities, bgColor, iconColor, type }) {
  const displayedActivities = activities.slice(0, 5);

  const getActionIcon = (action) => {
    switch (action) {
      case "purchased_course": return "🛒";
      case "joined_platform": return "🎉";
      case "logged_in": return "🔓";
      default: return "📌";
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    return `${Math.floor(diffMins / 60)} hr ago`;
  };

  const handleViewAll = () => {
    switch (type) {
      case "registrations": router.push("/dashboard/admin/analytics/registrations"); break;
      case "logins": router.push("/dashboard/admin/analytics/logins"); break;
      case "purchases": router.push("/dashboard/admin/analytics/purchases"); break;
      default: router.push("/dashboard/admin/analytics/all");
    }
  };

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="bg-emerald-900/30 backdrop-blur-md rounded-3xl shadow-lg border border-emerald-800/50 p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-800/50">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center border border-emerald-700/30`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{title}</h3>
            <p className="text-xs font-medium text-emerald-400">{count} Today</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 flex-1">
        {displayedActivities.length > 0 ? (
          displayedActivities.map((act, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(6, 78, 59, 0.4)" }}
              className="flex items-start gap-3 p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/30 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-800/80 flex items-center justify-center text-white font-bold shrink-0 border border-emerald-600/50">
                {act.userName?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2">
                  <p className="text-sm font-bold text-white truncate">
                    {act.userName}
                  </p>
                  {type === "purchases" && act.amount && (
                    <span className="text-xs font-bold bg-teal-900/60 text-teal-300 px-2 py-0.5 rounded-md border border-teal-700/50">
                      ${act.amount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-100/60 mt-0.5 truncate">
                  {type === "purchases" ? act.courseName || act.details : act.details}
                </p>
                <p className="text-[10px] text-emerald-100/40 mt-1 uppercase font-semibold tracking-wider">
                  {formatTime(act.timestamp)}
                </p>
              </div>
              <div className="text-lg opacity-60 bg-emerald-900/50 p-1.5 rounded-lg">
                {getActionIcon(act.action)}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-emerald-100/40">
            <Icon className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-sm font-medium">No {title.toLowerCase()} yet</p>
          </div>
        )}
      </div>

      <button
        onClick={handleViewAll}
        className="mt-6 w-full py-3 bg-emerald-950/50 hover:bg-emerald-800/50 text-emerald-300 text-sm font-bold rounded-xl border border-emerald-800/50 flex items-center justify-center gap-2 transition-colors"
      >
        View All History <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}