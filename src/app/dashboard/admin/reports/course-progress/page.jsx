"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Search,
  ChevronRight,
  BarChart3,
  CheckCircle,
  RefreshCw,
  LayoutDashboard,
  Calendar,
  Layers,
  GraduationCap
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CourseProgressPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/reports/course-progress");
      const courseList = res.data.courses || [];
      setAllCourses(courseList);
      setCourses(courseList.slice(0, 5));
    } catch (error) {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetail = async (courseId) => {
    try {
      setDetailLoading(true);
      setSelectedCourse(courseId);
      const res = await axios.get(`/api/admin/reports/course-progress?courseId=${courseId}`);
      setCourseDetail(res.data);
      setPagination(res.data.pagination || {});
    } catch (error) {
      toast.error("Failed to load course details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = allCourses.filter(
      (course) =>
        course.title?.toLowerCase().includes(term.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(term.toLowerCase())
    );
    setCourses(showAllCourses ? filtered : filtered.slice(0, 5));
  };

  const getProgressColor = (p) => {
    if (p >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (p >= 60) return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    if (p >= 40) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  const getStatusBadge = (status) => {
    const styles = {
      Completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      Advanced: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Halfway: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      Started: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "Not Started": "bg-emerald-900/40 text-emerald-100/40 border-emerald-800/50",
    };
    return styles[status] || styles["Not Started"];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-800 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 p-4 md:p-8 text-emerald-100/70 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] pointer-events-none" />

      {/* Top Nav */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Reports</span>
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-800/50 rounded-lg border border-emerald-700/50 shadow-inner">
            <BookOpen className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Course <span className="text-emerald-400">Progress</span>
          </h1>
        </div>
        <p className="text-emerald-100/60 ml-12 italic">Monitor curriculum completion and engagement rates</p>
      </motion.div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/60 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by course title or instructor..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-emerald-900/20 border border-emerald-800/50 rounded-2xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all backdrop-blur-md placeholder:text-emerald-700"
        />
      </div>

      {/* Course Cards Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <AnimatePresence mode="popLayout">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              layout
              onClick={() => fetchCourseDetail(course.id)}
              className={`group p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                selectedCourse === course.id 
                ? "bg-emerald-800/40 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                : "bg-emerald-900/30 border-emerald-800/50 hover:border-emerald-600/50"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-emerald-950/60 rounded-xl flex items-center justify-center border border-emerald-800/50">
                  <Layers className="w-5 h-5 text-emerald-400" />
                </div>
                <ChevronRight className={`w-5 h-5 transition-all ${selectedCourse === course.id ? "rotate-90 text-emerald-400" : "text-emerald-700 group-hover:text-emerald-400"}`} />
              </div>
              <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-emerald-400 transition-colors line-clamp-1">{course.title}</h3>
              <p className="text-xs text-emerald-500 mb-4 font-medium">Instructor: {course.instructor || "N/A"}</p>
              
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-100/50 bg-emerald-950/40 p-2 rounded-lg">
                  <Users className="w-3.5 h-3.5 text-emerald-500" /> {course.totalStudents} Enrolled
                </div>
                <div className="flex items-center gap-1.5 text-emerald-100/50 bg-emerald-950/40 p-2 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> {course.averageProgress}% Avg
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detailed View Section */}
      <AnimatePresence>
        {detailLoading ? (
          <div className="flex flex-col items-center py-20 bg-emerald-900/10 rounded-3xl border border-emerald-800/20">
            <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
            <p className="text-emerald-400 animate-pulse font-medium">Analyzing course data...</p>
          </div>
        ) : courseDetail && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} title="Enrolled" value={courseDetail.stats.totalStudents} color="text-blue-400" bg="bg-blue-500/5" />
              <StatCard icon={TrendingUp} title="Avg Progress" value={courseDetail.stats.averageProgress} suffix="%" color="text-emerald-400" bg="bg-emerald-500/5" />
              <StatCard icon={Award} title="Completion" value={courseDetail.stats.completionRate} suffix="%" color="text-purple-400" bg="bg-purple-500/5" />
              <StatCard icon={CheckCircle} title="Completed" value={courseDetail.stats.completedCount} color="text-amber-400" bg="bg-amber-500/5" />
            </div>

            {/* Distribution Map */}
            <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-[2rem] p-6 md:p-8 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                   <BarChart3 className="w-6 h-6 text-emerald-400" /> Progress Distribution
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {[
                      { label: "Not Started", key: "notStarted", color: "bg-emerald-800" },
                      { label: "Just Started (0-25%)", key: "started", color: "bg-rose-500" },
                      { label: "Halfway (25-50%)", key: "halfway", color: "bg-orange-500" },
                      { label: "Advanced (50-75%)", key: "advanced", color: "bg-amber-500" },
                      { label: "Nearly Done (75-99%)", key: "nearlyDone", color: "bg-blue-500" },
                      { label: "Completed", key: "completed", color: "bg-emerald-500" },
                    ].map((item) => {
                      const count = courseDetail.stats.distribution[item.key];
                      const percentage = courseDetail.stats.totalStudents > 0 ? (count / courseDetail.stats.totalStudents) * 100 : 0;
                      return (
                        <div key={item.key} className="space-y-2">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                            <span className="text-emerald-100/40">{item.label}</span>
                            <span className="text-emerald-400">{count} students</span>
                          </div>
                          <div className="h-2 w-full bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/30">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${percentage}%` }} 
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-full ${item.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} 
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-[2rem] overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="p-6 border-b border-emerald-800/50 bg-emerald-900/40">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-emerald-400" /> Student Progress Report
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-emerald-400/50 text-[10px] uppercase tracking-widest bg-emerald-950/50 font-bold">
                      <th className="px-6 py-5">Learner</th>
                      <th className="px-6 py-5">Visual Progress</th>
                      <th className="px-6 py-5">Modules</th>
                      <th className="px-6 py-5">Current Status</th>
                      <th className="px-6 py-5">Last Online</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-800/30">
                    {courseDetail.studentProgress?.map((student, i) => (
                      <tr key={i} className="hover:bg-emerald-800/20 transition-colors group">
                        <td className="px-6 py-4">
                          <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">{student.studentName}</p>
                          <p className="text-xs text-emerald-100/30">{student.studentEmail}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800/50">
                                <div className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" style={{ width: `${student.progress}%` }} />
                            </div>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${getProgressColor(student.progress)}`}>
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-emerald-100/60 font-mono text-sm">
                          {student.completedModules} <span className="text-emerald-800">/</span> {student.totalModules}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter shadow-sm ${getStatusBadge(student.status)}`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-emerald-100/40">
                          {student.lastActivity ? new Date(student.lastActivity).toLocaleDateString() : "Never"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, title, value, suffix = "", color, bg }) {
  return (
    <div className={`${bg} border border-emerald-800/50 p-6 rounded-[1.5rem] shadow-xl group hover:border-emerald-500/40 transition-all`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-emerald-100/30 uppercase tracking-widest mb-1">{title}</p>
          <p className={`text-2xl font-black ${color}`}>
            {value}{suffix}
          </p>
        </div>
        <div className={`p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800/50 ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}