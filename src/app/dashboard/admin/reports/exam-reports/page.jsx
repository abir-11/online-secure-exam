"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Users,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Search,
  ChevronRight,
  BarChart3,
  PieChart,
  CheckCircle,
  XCircle,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ExamReportsPage() {
  const router = useRouter();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [examDetail, setExamDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/reports/exam-reports");
      setExams(res.data.exams || []);
    } catch (error) {
      toast.error("Failed to load exams");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExamDetail = async (examId) => {
    try {
      setDetailLoading(true);
      setSelectedExam(examId);
      const res = await axios.get(
        `/api/admin/reports/exam-reports?examId=${examId}`,
      );
      setExamDetail(res.data);
      setPagination(res.data.pagination || {});
    } catch (error) {
      toast.error("Failed to load exam details");
      console.error(error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (selectedExam) {
      fetchExamDetail(selectedExam);
    }
  };

  const filteredExams = exams.filter((exam) =>
    exam.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getScoreColor = (percentage) => {
    const p = parseFloat(percentage);
    if (p >= 80) return "text-green-600";
    if (p >= 60) return "text-blue-600";
    if (p >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (percentage) => {
    const p = parseFloat(percentage);
    if (p >= 80) return "bg-green-100";
    if (p >= 60) return "bg-blue-100";
    if (p >= 40) return "bg-yellow-100";
    return "bg-red-100";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#0D7C66] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-[#0D7C66] mb-4 md:mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Reports</span>
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] rounded-xl md:rounded-2xl p-5 md:p-6 mb-6 text-white">
        <h1 className="text-xl md:text-2xl font-bold">📝 Exam Reports</h1>
        <p className="text-white/80 text-sm mt-1">
          Detailed analysis of all exams
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
          <input
            type="text"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
          />
        </div>
      </div>

      {/* Exam List */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer ${
              selectedExam === exam.id ? "ring-2 ring-[#0D7C66]" : ""
            }`}
            onClick={() => fetchExamDetail(exam.id)}
          >
            <div className="p-4 md:p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-[#0D7C66]" />
                    <h2 className="font-semibold text-gray-800 text-base md:text-lg">
                      {exam.title}
                    </h2>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        exam.type === "mcq"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {exam.type === "mcq" ? "MCQ" : "Theoretical"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(exam.startTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{exam.totalStudents} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Avg: {exam.averageScore}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>Pass: {exam.passRate}%</span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    selectedExam === exam.id ? "rotate-90" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
        {filteredExams.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            No exams found
          </div>
        )}
      </div>

      {/* Exam Details */}
      {detailLoading && (
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0D7C66] border-t-transparent mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Loading exam details...</p>
        </div>
      )}

      {examDetail && !detailLoading && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <StatCard
              icon={Users}
              title="Total Students"
              value={examDetail.stats.totalStudents}
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              icon={TrendingUp}
              title="Average Score"
              value={examDetail.stats.averageScore}
              suffix="%"
              color="bg-green-50 text-green-600"
            />
            <StatCard
              icon={Award}
              title="Pass Rate"
              value={examDetail.stats.passRate}
              suffix="%"
              color="bg-purple-50 text-purple-600"
            />
            <StatCard
              icon={FileText}
              title="Total Marks"
              value={examDetail.exam.totalMarks}
              color="bg-orange-50 text-orange-600"
            />
          </div>

          {/* Score Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#0D7C66]" />
              Score Distribution
            </h2>
            <div className="space-y-3">
              {[
                { range: "0-20%", label: "Poor", color: "bg-red-500" },
                {
                  range: "20-40%",
                  label: "Below Average",
                  color: "bg-orange-500",
                },
                { range: "40-60%", label: "Average", color: "bg-yellow-500" },
                { range: "60-80%", label: "Good", color: "bg-blue-500" },
                { range: "80-100%", label: "Excellent", color: "bg-green-500" },
              ].map((item, i) => {
                const count = examDetail.stats.distribution[i];
                const percentage =
                  examDetail.stats.totalStudents > 0
                    ? (count / examDetail.stats.totalStudents) * 100
                    : 0;
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        {item.range} ({item.label})
                      </span>
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

          {/* Student Performance Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0D7C66]" />
                Student Performance
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Score
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Result
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {examDetail.studentPerformance?.map((student, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-sm">
                            {student.studentName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {student.studentEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBgColor(student.percentage)} ${getScoreColor(student.percentage)}`}
                        >
                          {student.score}/{student.totalMarks} (
                          {student.percentage}%)
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {student.passed ? (
                          <span className="flex items-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" /> Passed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-600 text-sm">
                            <XCircle className="w-4 h-4" /> Failed
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(student.submittedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-4 py-3 border-t flex justify-between items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-500">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
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
