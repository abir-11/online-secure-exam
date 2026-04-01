"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Users, BookOpen, DollarSign, TrendingUp, Activity,
  ChevronRight, BarChart3, PieChart, Clock, Zap,
  LayoutDashboard, RefreshCw, ArrowUpRight
} from "lucide-react";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip, Legend, Filler, ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  Tooltip, Legend, Filler, ArcElement
);

// --- Animation Config ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
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
      const [statsRes, activitiesRes, revenueRes] = await Promise.all([
        axios.get("/api/admin/analytics/stats"),
        axios.get("/api/admin/analytics/activities"),
        axios.get("/api/admin/analytics/revenue?period=week")
      ]);
      
      setStats(statsRes.data.data);
      setRecentActivities(activitiesRes.data.activities.slice(0, 5));
      setRevenueData(revenueRes.data.data);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        />
        <p className="text-emerald-400 font-medium animate-pulse">Syncing Analytics...</p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* --- Admin Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={Users}
          title="Total Users"
          value={stats?.users?.total?.toLocaleString()}
          color="from-emerald-500 to-teal-600"
          percentage="+12.5%"
        />
        <StatsCard
          icon={BookOpen}
          title="Total Courses"
          value={stats?.courses?.total?.toLocaleString()}
          color="from-blue-500 to-cyan-600"
          percentage="+4.2%"
        />
        <StatsCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${stats?.payments?.totalRevenue}`}
          color="from-amber-500 to-orange-600"
          percentage="+18.7%"
        />
        <StatsCard
          icon={Activity}
          title="Active Users"
          value={stats?.activity?.activeToday?.toLocaleString()}
          color="from-rose-500 to-pink-600"
          percentage="+9.1%"
        />
      </div>

      {/* --- Charts Row --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Line Chart */}
        <motion.div variants={itemVariants} className="xl:col-span-2 bg-emerald-900/20 backdrop-blur-md border border-emerald-800/40 p-6 rounded-[2rem]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                <TrendingUp size={20} />
              </div>
              <h2 className="text-lg font-bold text-white">Revenue Performance</h2>
            </div>
            <select className="bg-emerald-950 border border-emerald-800 text-xs text-emerald-400 rounded-lg px-3 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            {revenueData && (
              <Line
                data={{
                  labels: revenueData.labels,
                  datasets: [{
                    label: 'Revenue',
                    data: revenueData.values,
                    borderColor: "#10b981",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#64748b" } },
                    x: { grid: { display: false }, ticks: { color: "#64748b" } }
                  }
                }}
              />
            )}
          </div>
        </motion.div>

        {/* User Distribution Pie */}
        <motion.div variants={itemVariants} className="bg-emerald-900/20 backdrop-blur-md border border-emerald-800/40 p-6 rounded-[2rem]">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <PieChart size={20} className="text-emerald-400" /> User Distribution
          </h2>
          <div className="h-[250px] flex items-center justify-center">
            <Pie
              data={{
                labels: ["Students", "Instructors", "Admins"],
                datasets: [{
                  data: [stats?.users?.students, stats?.users?.instructors, stats?.users?.admins],
                  backgroundColor: ["#10b981", "#3b82f6", "#f59e0b"],
                  borderWidth: 0,
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'bottom', labels: { color: '#94a3b8', usePointStyle: true } }
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* --- Quick Actions & Recent Activity --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="bg-emerald-900/20 backdrop-blur-md border border-emerald-800/40 p-6 rounded-[2.5rem]">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Zap size={20} className="text-yellow-400" /> Management Tools
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <ActionLink icon={Users} label="User Management" href="/dashboard/admin/users" color="bg-blue-500" />
            <ActionLink icon={BarChart3} label="Financial Reports" href="/dashboard/admin/reports" color="bg-emerald-500" />
            <ActionLink icon={RefreshCw} label="System Analytics" href="/dashboard/admin/analytics" color="bg-purple-500" />
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-emerald-900/20 backdrop-blur-md border border-emerald-800/40 p-6 rounded-[2.5rem]">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Clock size={20} className="text-emerald-400" /> System Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((act, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/30 hover:border-emerald-500/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/20">
                    {act.userName?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-50 group-hover:text-emerald-400 transition-colors">{act.userName}</p>
                    <p className="text-xs text-emerald-100/40">{act.details}</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-emerald-500/60 bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10">
                  {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- Helper Components ---

function StatsCard({ icon: Icon, title, value, color, percentage }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="bg-emerald-900/20 backdrop-blur-md border border-emerald-800/40 p-6 rounded-[2rem] relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity`} />
      <div className="flex justify-between items-start">
        <div>
          <p className="text-emerald-100/40 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-black text-white tracking-tight">{value || "0"}</h3>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded font-bold">{percentage}</span>
            <span className="text-[10px] text-emerald-100/20 font-medium">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}

function ActionLink({ icon: Icon, label, href, color }) {
  return (
    <Link href={href}>
      <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/50 border border-emerald-800/30 hover:border-emerald-500/50 hover:bg-emerald-900/40 transition-all group">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white`}>
            <Icon size={16} />
          </div>
          <span className="text-sm font-bold text-emerald-100/70 group-hover:text-emerald-50 transition-colors">{label}</span>
        </div>
        <ArrowUpRight size={16} className="text-emerald-800 group-hover:text-emerald-400 transition-all" />
      </div>
    </Link>
  );
}