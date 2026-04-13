"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function CreateExamPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("mcq");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [duration, setDuration] = useState(60);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);

  /* ---------------- Fetch batches ---------------- */
  useEffect(() => {
    fetch("/api/batches")
      .then((r) => r.json())
      .then(setBatches)
      .catch(console.error);
  }, []);

  /* -------- Auto calculate end time -------- */
  useEffect(() => {
    if (!startTime || !duration) return;
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);
    const offset = end.getTimezoneOffset() * 60000;
    setEndTime(new Date(end - offset).toISOString().slice(0, 16));
  }, [startTime, duration]);

  const getMinDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now - offset).toISOString().slice(0, 16);
  };

  /* ---------------- Submit ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Exam title required",
      });
    }

    if (duration <= 0) {
      return Swal.fire({
        icon: "warning",
        title: "Invalid duration",
      });
    }

    if (!startTime || !endTime) {
      return Swal.fire({
        icon: "warning",
        title: "Start and end time required",
      });
    }

    if (new Date(endTime) <= new Date(startTime)) {
      return Swal.fire({
        icon: "warning",
        title: "End time must be after start time",
      });
    }

    if (selectedBatches.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "Select at least one batch",
      });
    }

    const res = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        type,
        duration,
        startTime,
        endTime,
        batchIds: selectedBatches,
        totalQuestions: type === "mcq" ? Number(totalQuestions) : 0,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return Swal.fire({
        icon: "error",
        title: "Failed",
        text: data.message || "Failed to create exam",
      });
    }

    Swal.fire({
      icon: "success",
      title: "Exam created successfully 🎉",
      timer: 2000,
      showConfirmButton: false,
    });

    setTitle("");
    setTotalQuestions(0);
    setSelectedBatches([]);
    setDuration(60);
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="bg-emerald-950 min-h-screen relative overflow-hidden p-6 flex justify-center">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/50 backdrop-blur-md border border-emerald-700/50 shadow-2xl rounded-2xl p-8 w-full max-w-2xl space-y-6 relative z-10"
      >
        <h1 className="text-3xl font-bold text-center text-emerald-50">
          Create Exam
        </h1>

        {/* Exam Title */}
        <div>
          <label className="block font-medium mb-1 text-emerald-200">
            Exam Title
          </label>
          <input
            className="w-full p-3 border border-emerald-700/50 rounded-lg bg-slate-800/50 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Exam Type */}
        <div>
          <label className="block font-medium mb-1 text-emerald-200">
            Exam Type
          </label>
          <select
            className="w-full p-3 border border-emerald-700/50 rounded-lg bg-slate-800/50 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="mcq">MCQ</option>
            <option value="theory">Theoretical</option>
          </select>
        </div>

        {/* MCQ Only */}
        {type === "mcq" && (
          <div>
            <label className="block font-medium mb-1 text-emerald-200">
              Total MCQ Questions
            </label>
            <input
              type="number"
              min={1}
              className="w-full p-3 border border-emerald-700/50 rounded-lg bg-slate-800/50 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-400"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(e.target.value)}
              required
            />
          </div>
        )}

        {/* Duration */}
        <div>
          <label className="block font-medium mb-1 text-emerald-200">
            Duration (minutes)
          </label>
          <input
            type="number"
            min={1}
            className="w-full p-3 border border-emerald-700/50 rounded-lg bg-slate-800/50 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-emerald-400"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-emerald-200">
              Start Time
            </label>
            <input
              type="datetime-local"
              className="w-full p-3 border border-emerald-700/50 rounded-lg bg-slate-800/50 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              min={getMinDateTime()}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-emerald-200">
              End Time
            </label>
            <input
              type="datetime-local"
              className="w-full p-3 border border-emerald-700/50 rounded-lg bg-slate-800/50 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={endTime}
              readOnly
            />
          </div>
        </div>

        {/* Batches */}
        <div>
          <label className="block font-medium mb-1 text-emerald-200">
            Assign Batches
          </label>
          <select
            multiple
            className="w-full p-3 border border-emerald-700/50 rounded-lg bg-slate-800/50 text-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={selectedBatches}
            onChange={(e) =>
              setSelectedBatches(
                Array.from(e.target.selectedOptions, (o) => o.value),
              )
            }
          >
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-200">
          Create Exam
        </button>
      </form>
    </div>
  );
}
