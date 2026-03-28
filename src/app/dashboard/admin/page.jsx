"use client";

import { useState, useEffect } from "react";
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
  Eye,
  ShoppingCart,
  UserCheck,
  Clock,
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
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
);

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
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const revenueChartData = {
    labels: revenueData?.labels || [],
    datasets: [
      {
        label: "Revenue ($)",
        data: revenueData?.values || [],
        borderColor: "#0D7C66",
        backgroundColor: "rgba(13, 124, 102, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#0D7C66",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const userDistributionData = {
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
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#e2e8f0" },
        ticks: { callback: (v) => `$${v}` },
      },
      x: { grid: { display: false } },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true, boxWidth: 10, padding: 15 },
      },
      tooltip: { backgroundColor: "#1F2937" },
    },
  };

  const formatTimeAgo = (timestamp) => {
    const mins = Math.floor((new Date() - new Date(timestamp)) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min ago`;
    return `${Math.floor(mins / 60)} hour ago`;
  };

  const getActivityIcon = (action) => {
    if (action === "purchased_course") return "🛒";
    if (action === "joined_platform") return "🎉";
    if (action === "logged_in") return "🔓";
    return "📌";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0D7C66] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          icon={Users}
          title="Total Users"
          value={stats?.users?.total?.toLocaleString() || "0"}
          change={`+${stats?.users?.newToday || 0} today`}
          changeType="up"
          color="bg-blue-500"
        />
        <DashboardCard
          icon={BookOpen}
          title="Total Courses"
          value={stats?.courses?.total?.toLocaleString() || "0"}
          color="bg-purple-500"
        />
        <DashboardCard
          icon={DollarSign}
          title="Total Revenue"
          value={`$${stats?.payments?.totalRevenue || "0"}`}
          change={`$${stats?.payments?.todayRevenue || "0"} today`}
          changeType="up"
          color="bg-green-500"
        />
        <DashboardCard
          icon={Activity}
          title="Active Today"
          value={stats?.activity?.activeToday?.toLocaleString() || "0"}
          color="bg-orange-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📈 Revenue Trend (Last 7 Days)
          </h2>
          <div className="h-64">
            {revenueData && (
              <Line data={revenueChartData} options={lineOptions} />
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            👥 User Distribution
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-48">
              <Pie data={userDistributionData} options={pieOptions} />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Students</span>
                </div>
                <span className="font-semibold">
                  {stats?.users?.students || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Instructors</span>
                </div>
                <span className="font-semibold">
                  {stats?.users?.instructors || 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Admins</span>
                </div>
                <span className="font-semibold">
                  {stats?.users?.admins || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">💰 Payment Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Transactions</span>
              <span className="font-bold">
                {stats?.payments?.totalTransactions || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Transaction</span>
              <span className="font-bold text-[#0D7C66]">
                ${stats?.payments?.averageTransaction || "0.00"}
              </span>
            </div>
            <div className="flex justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-700">
                Today&apos;s Revenue
              </span>
              <span className="font-bold text-xl text-green-700">
                ${stats?.payments?.todayRevenue || "0"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">⚡ Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/dashboard/admin/users">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Manage Users</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
            <Link href="/dashboard/admin/inactive-users">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-red-600" />
                  <span>Inactive Users</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
            <Link href="/dashboard/admin/reports">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>View Reports</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
            <Link href="/dashboard/admin/analytics">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span>Analytics</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">🕒 Recent Activities</h2>
          <div className="space-y-3">
            {recentActivities.map((act, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-[#0D7C66] flex items-center justify-center text-white">
                  {getActivityIcon(act.action)}
                </div>
                <div>
                  <p className="text-sm font-medium">{act.userName}</p>
                  <p className="text-xs text-gray-500">{act.details}</p>
                  <p className="text-xs text-gray-400">
                    {formatTimeAgo(act.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  icon: Icon,
  title,
  value,
  change,
  changeType,
  color,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <p
              className={`text-xs mt-2 flex items-center gap-1 ${changeType === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {changeType === "up" ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              {change}
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
