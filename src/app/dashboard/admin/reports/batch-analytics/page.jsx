"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Layers,
  Users,
  GraduationCap,
  TrendingUp,
  Award,
  Search,
  ChevronRight,
  BarChart3,
  CheckCircle,
  Star,
  Eye,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function BatchAnalyticsPage() {
  const router = useRouter();
  const [batches, setBatches] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batchDetail, setBatchDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllBatches, setShowAllBatches] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/reports/batch-analytics");
      const batchList = res.data.batches || [];
      setAllBatches(batchList);
      setBatches(batchList.slice(0, 5));
    } catch (error) {
      toast.error("Failed to load batches");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBatchDetail = async (batchId) => {
    try {
      setDetailLoading(true);
      setSelectedBatch(batchId);
      const res = await axios.get(
        `/api/admin/reports/batch-analytics?batchId=${batchId}`,
      );
      setBatchDetail(res.data);
      setPagination(res.data.pagination || {});
    } catch (error) {
      toast.error("Failed to load batch details");
      console.error(error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleShowAll = () => {
    setShowAllBatches(true);
    setBatches(allBatches);
  };

  const handleShowLess = () => {
    setShowAllBatches(false);
    setBatches(allBatches.slice(0, 5));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = allBatches.filter((batch) =>
      batch.name?.toLowerCase().includes(term.toLowerCase()),
    );
    if (showAllBatches) {
      setBatches(filtered);
    } else {
      setBatches(filtered.slice(0, 5));
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (selectedBatch) {
      fetchBatchDetail(selectedBatch);
    }
  };

  const getScoreColor = (percentage) => {
    const p = parseFloat(percentage);
    if (p >= 80) return "text-green-600 bg-green-100";
    if (p >= 60) return "text-blue-600 bg-blue-100";
    if (p >= 40) return "text-yellow-600 bg-yellow-100";
    if (p >= 20) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#0D7C66] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 p-4 md:p-6 text-gray-800">
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
        <h1 className="text-xl md:text-2xl font-bold">📊 Batch Analytics</h1>
        <p className="text-white/80 text-sm mt-1">Insights per batch</p>
      </div>

      {/* Search */}
      <div className="bg-gray-800/90 rounded-xl shadow-sm p-3 md:p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4 md:w-5 md:h-5" />
          <input
            type="text"
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 md:pl-10 pr-4 py-2 text-sm text-white bg-gray-800 border border-emerald-700 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#41B3A2]"
          />
        </div>
      </div>

      {/* Batch List */}
      <div className="bg-gray-800/90 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="divide-y divide-emerald-700">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className={`p-4 md:p-5 hover:bg-emerald-700/50 transition-all cursor-pointer rounded ${
                selectedBatch === batch.id ? "bg-emerald-700/40" : ""
              }`}
              onClick={() => fetchBatchDetail(batch.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 text-white">
                    <Layers className="w-5 h-5 text-white" />
                    <h2 className="font-semibold text-base md:text-lg">
                      {batch.name}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{batch.totalStudents} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" />
                      <span>{batch.totalExams} exams</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Avg: {batch.avgScore}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>Pass: {batch.passRate}%</span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 text-white/70 transition-transform ${
                    selectedBatch === batch.id ? "rotate-90" : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All / Show Less */}
        {!showAllBatches && allBatches.length > 5 && (
          <div className="p-3 border-t border-emerald-700 text-center">
            <button
              onClick={handleShowAll}
              className="text-white hover:text-[#41B3A2] text-sm font-medium flex items-center justify-center gap-1 mx-auto"
            >
              View All ({allBatches.length} batches)
              <Eye className="w-4 h-4" />
            </button>
          </div>
        )}

        {showAllBatches && allBatches.length > 5 && (
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

        {batches.length === 0 && (
          <div className="p-8 text-center text-white/70">No batches found</div>
        )}
      </div>

      {/* Batch Details */}
      {detailLoading && (
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#0D7C66] border-t-transparent mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Loading batch details...</p>
        </div>
      )}

      {batchDetail && !detailLoading && (
        <div className="space-y-6">
          {/* Batch Info */}
          <div className="bg-gradient-to-r from-[#0D7C66]/10 to-[#41B3A2]/10 rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-8 h-8 text-[#0D7C66]" />
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {batchDetail.batch.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Instructor:{" "}
                  {batchDetail.batch.instructorEmail || "Not assigned"}
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <StatCard
                icon={Users}
                title="Total Students"
                value={batchDetail.stats.totalStudents}
                color="bg-blue-100 text-blue-600"
              />
              <StatCard
                icon={GraduationCap}
                title="Total Exams"
                value={batchDetail.stats.totalExams}
                color="bg-green-100 text-green-600"
              />
              <StatCard
                icon={TrendingUp}
                title="Avg Score"
                value={batchDetail.stats.avgScore}
                suffix="%"
                color="bg-purple-100 text-purple-600"
              />
              <StatCard
                icon={Award}
                title="Total Gems"
                value={batchDetail.stats.totalGems}
                color="bg-yellow-100 text-yellow-600"
              />
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold flex items-center gap-2 text-gray-800">
                <Users className="w-5 h-5 text-gray-800" />
                Student Performance in {batchDetail.batch.name}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-gray-800">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Exams
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Avg Score
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Pass Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Gems
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {batchDetail.studentPerformance?.map((student, i) => (
                    <tr key={i} className="hover:bg-gray-100">
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
                      <td className="px-4 py-3 text-sm">
                        {student.totalExams}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(student.avgPercentage)}`}
                        >
                          {student.avgPercentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(student.passRate)}`}
                        >
                          {student.passRate}%
                        </span>
                      </td>
                      <td className="px-4 py-3 flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">{student.totalGems}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center text-gray-800">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm">
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
