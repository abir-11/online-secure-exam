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
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        User Report Issues
      </h1>

      {loading ? (
        <p>Loading report issues...</p>
      ) : reportissues.length === 0 ? (
        <p>No report issues submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {reportissues.map((report) => (
            <div
              key={report._id}
              className="bg-white p-4 rounded-xl shadow border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-gray-700">
                  {report.name} ({report.email})
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 mb-1">
                <strong>Category:</strong> {report.category}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Priority:</strong> {report.priority}
              </p>
              <p className="text-gray-700 mt-2">{report.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
