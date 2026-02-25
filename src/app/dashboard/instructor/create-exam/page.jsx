"use client";

import { useState, useEffect } from "react";

export default function CreateExamPage() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(60);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);

  useEffect(() => {
    async function fetchBatches() {
      const res = await fetch("/api/batches");
      const data = await res.json();
      setBatches(data);
    }
    fetchBatches();
  }, []);

  // Helper: format date for datetime-local min attribute
  const getMinDateTime = () => {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000; // local time offset
    const localISOTime = new Date(now - tzOffset).toISOString().slice(0, 16);
    return localISOTime;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (
      !title ||
      !duration ||
      !startTime ||
      !endTime ||
      selectedBatches.length === 0
    ) {
      alert("All fields are required");
      return;
    }

    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Prevent past start times
    if (start < now) {
      alert("Start time cannot be in the past");
      return;
    }

    // Ensure end time is strictly after start time
    if (end <= start) {
      alert("End time must be after start time");
      return;
    }

    if (duration <= 0) {
      alert("Duration must be greater than 0");
      return;
    }

    // Send request to backend
    const res = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        duration: Number(duration),
        startTime,
        endTime,
        batchIds: selectedBatches,
      }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      // Reset form
      setTitle("");
      setDuration(60);
      setStartTime("");
      setEndTime("");
      setSelectedBatches([]);
    }
  };

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Create Exam</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-medium">Exam Title</label>
          <input
            type="text"
            placeholder="Exam Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Duration (minutes)</label>
          <input
            type="number"
            min={1}
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            min={getMinDateTime()} // prevent past dates
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            min={startTime || getMinDateTime()} // ensures endTime >= startTime
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Assign Batches</label>
          <select
            multiple
            value={selectedBatches}
            onChange={(e) =>
              setSelectedBatches(
                Array.from(e.target.selectedOptions, (opt) => opt.value),
              )
            }
            className="w-full p-2 border rounded"
          >
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
        >
          Create Exam
        </button>
      </form>
    </main>
  );
}
