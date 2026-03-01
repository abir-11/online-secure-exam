"use client";

import { useEffect, useState } from "react";

export default function AddStudentsPage() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [emails, setEmails] = useState("");

  useEffect(() => {
    fetch("/api/batches")
      .then((res) => res.json())
      .then((data) => {
        setBatches(data);
      })
      .catch((error) => console.error("Failed to load batches", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBatch) {
      alert("Please select a batch");
      return;
    }

    if (!emails) {
      alert("Please enter student emails");
      return;
    }

    const emailArray = emails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "");

    try {
      const res = await fetch("/api/batches/add-students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batchId: selectedBatch,
          studentEmails: emailArray,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Students added successfully");
      setEmails("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl font-bold mb-6">Add Students to Batch</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        {/* Batch Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Select Batch</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.name}
              </option>
            ))}
          </select>
        </div>

        {/* Emails Input */}
        <div>
          <label className="block mb-1 font-medium">
            Student Emails (comma separated)
          </label>
          <input
            type="text"
            placeholder="ronita@gmail.com, dina@gmail.com"
            className="w-full border p-2 rounded"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
        </div>

        <button className="bg-[#0D7C66] text-white px-4 py-2 rounded">
          Add Students
        </button>
      </form>
    </div>
  );
}
