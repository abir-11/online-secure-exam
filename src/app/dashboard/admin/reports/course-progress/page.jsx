"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetail = async (courseId) => {
    try {
      setDetailLoading(true);
      setSelectedCourse(courseId);
      const res = await axios.get(
        `/api/admin/reports/course-progress?courseId=${courseId}`,
      );
      setCourseDetail(res.data);
      setPagination(res.data.pagination || {});
    } catch (error) {
      toast.error("Failed to load course details");
      console.error(error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleShowAll = () => {
    setShowAllCourses(true);
    setCourses(allCourses);
  };

  const handleShowLess = () => {
    setShowAllCourses(false);
    setCourses(allCourses.slice(0, 5));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = allCourses.filter(
      (course) =>
        course.title?.toLowerCase().includes(term.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(term.toLowerCase()),
    );
    if (showAllCourses) {
      setCourses(filtered);
    } else {
      setCourses(filtered.slice(0, 5));
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (selectedCourse) {
      fetchCourseDetail(selectedCourse);
    }
  };

  const getProgressColor = (progress) => {
    const p = parseFloat(progress);
    if (p >= 80) return "text-green-600 bg-green-100";
    if (p >= 60) return "text-blue-600 bg-blue-100";
    if (p >= 40) return "text-yellow-600 bg-yellow-100";
    if (p >= 20) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getStatusBadge = (status) => {
    const badges = {
      Completed: "bg-green-100 text-green-800",
      Advanced: "bg-blue-100 text-blue-800",
      Halfway: "bg-yellow-100 text-yellow-800",
      Started: "bg-orange-100 text-orange-800",
      "Just Started": "bg-purple-100 text-purple-800",
      "Not Started": "bg-gray-100 text-gray-800",
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#0D7C66] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 p-4 md:p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white/80 hover:text-white mb-4 md:mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Reports</span>
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] rounded-xl md:rounded-2xl p-5 md:p-6 mb-6 text-white">
        <h1 className="text-xl md:text-2xl font-bold">📚 Course Progress</h1>
        <p className="text-white/80 text-sm mt-1">
          Track student course completion and progress
        </p>
      </div>

      {/* Search */}
      <div className="bg-gray-800/90 text-white rounded-xl shadow-sm p-3 md:p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4 md:w-5 md:h-5" />
          <input
            type="text"
            placeholder="Search courses by title or instructor..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm text-white bg-gray-800 border border-emerald-700 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
          />
        </div>
      </div>

      {/* Course List */}
      <div className="bg-gray-800/90 text-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="divide-y divide-emerald-700">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`p-4 md:p-5 hover:bg-emerald-700/50 transition-all cursor-pointer rounded ${
                selectedCourse === course.id ? "bg-emerald-700/40" : ""
              }`}
              onClick={() => fetchCourseDetail(course.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-white" />
                    <h2 className="font-semibold text-white text-base md:text-lg">
                      {course.title}
                    </h2>
                    <span className="text-sm text-white/70">
                      by {course.instructor || "Unknown"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-white/80" />
                      <span>{course.totalStudents} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-white/80" />
                      <span>Avg Progress: {course.averageProgress}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-white/80" />
                      <span>Completion: {course.completionRate}%</span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-white/70 transition-transform ${
                    selectedCourse === course.id ? "rotate-90" : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All / Show Less Button */}
        {!showAllCourses && allCourses.length > 5 && (
          <div className="p-3 border-t border-emerald-700 text-center">
            <button
              onClick={handleShowAll}
              className="text-white hover:text-[#41B3A2] text-sm font-medium flex items-center justify-center gap-1 mx-auto"
            >
              View All ({allCourses.length} courses)
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        )}

        {showAllCourses && allCourses.length > 5 && (
          <div className="p-3 border-t border-emerald-700 text-center">
            <button
              onClick={handleShowLess}
              className="text-white hover:text-[#41B3A2] text-sm font-medium flex items-center justify-center gap-1 mx-auto"
            >
              Show Less
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
        )}

        {courses.length === 0 && (
          <div className="p-8 text-center text-white/70">No courses found</div>
        )}
      </div>

      {/* Course Details remain same as before */}
      {detailLoading && (
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0D7C66] border-t-transparent mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">
            Loading course details...
          </p>
        </div>
      )}

      {courseDetail && !detailLoading && (
        <div className="space-y-6">
          {/* Course Info & Stats */}
          <div className="bg-gradient-to-r from-[#0D7C66]/10 to-[#41B3A2]/10 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-[#0D7C66]" />
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {courseDetail.course.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Instructor: {courseDetail.course.instructor || "Not assigned"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {courseDetail.course.totalModules} modules total
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <StatCard
                icon={Users}
                title="Enrolled Students"
                value={courseDetail.stats.totalStudents}
                color="bg-blue-50 text-blue-600"
              />
              <StatCard
                icon={TrendingUp}
                title="Avg Progress"
                value={courseDetail.stats.averageProgress}
                suffix="%"
                color="bg-green-50 text-green-600"
              />
              <StatCard
                icon={Award}
                title="Completion Rate"
                value={courseDetail.stats.completionRate}
                suffix="%"
                color="bg-purple-50 text-purple-600"
              />
              <StatCard
                icon={CheckCircle}
                title="Completed"
                value={courseDetail.stats.completedCount}
                color="bg-yellow-50 text-yellow-600"
              />
            </div>
          </div>

          {/* Progress Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#0D7C66]" />
              Student Progress Distribution
            </h2>
            <div className="space-y-3">
              {[
                {
                  label: "Not Started",
                  key: "notStarted",
                  color: "bg-gray-500",
                },
                {
                  label: "Just Started (0-25%)",
                  key: "started",
                  color: "bg-red-500",
                },
                {
                  label: "Halfway (25-50%)",
                  key: "halfway",
                  color: "bg-orange-500",
                },
                {
                  label: "Advanced (50-75%)",
                  key: "advanced",
                  color: "bg-yellow-500",
                },
                {
                  label: "Nearly Done (75-99%)",
                  key: "nearlyDone",
                  color: "bg-blue-500",
                },
                { label: "Completed", key: "completed", color: "bg-green-500" },
              ].map((item) => {
                const count = courseDetail.stats.distribution[item.key];
                const percentage =
                  courseDetail.stats.totalStudents > 0
                    ? (count / courseDetail.stats.totalStudents) * 100
                    : 0;
                return (
                  <div key={item.key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="text-gray-500">
                        {count} students ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${item.color} rounded-full h-2`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, title, value, suffix = "", color }) {
  return (
    <div className={`${color} rounded-xl p-3 md:p-4 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm opacity-80">{title}</p>
          <p className="text-lg md:text-xl font-bold mt-1">
            {value}
            {suffix}
          </p>
        </div>
        <Icon className="w-5 h-5 md:w-6 md:h-6 opacity-80" />
      </div>
    </div>
  );
}
