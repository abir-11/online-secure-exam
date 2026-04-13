"use client";

import { useEffect, useState } from "react";

export default function AdminReportIssuePage() {
  const [reportissues, setReportIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportIssues();
  }, []);

  const fetchReportIssues = async () => {
    try {
      const res = await fetch("/api/reportissue");
      const data = await res.json();
      if (data.success) setReportIssues(data.reportissues);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-emerald-950">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-6 text-white">User Report Issues</h1>

      {loading ? (
        <p className="text-white/80">Loading report issues...</p>
      ) : reportissues.length === 0 ? (
        <p className="text-white/80">No report issues submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {reportissues.map((report) => (
            <div
              key={report._id}
              className="bg-gray-800 p-4 rounded-xl shadow-md border border-emerald-300"
            >
              {/* User Info */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-white">
                  {report.name} ({report.email})
                </h2>
                <span className="text-sm text-white">
                  {new Date(report.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Report Details */}
              <p className="text-white mb-1">
                <strong>Category:</strong> {report.category}
              </p>
              <p className="text-white mb-1">
                <strong>Priority:</strong> {report.priority}
              </p>
              <p className="text-white mt-2">{report.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
