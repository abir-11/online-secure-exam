"use client";

import { useState, useEffect } from "react";

export default function CreateBatchPage() {
  const [batchName, setBatchName] = useState("");
  const [message, setMessage] = useState("");
  const [batches, setBatches] = useState([]);

  const fetchBatches = async () => {
    const res = await fetch("/api/batches");
    const data = await res.json();
    setBatches(data);
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleAddBatch = async () => {
    if (!batchName) {
      setMessage("Enter batch name");
      return;
    }

    const res = await fetch("/api/batches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: batchName }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Batch added successfully");
      setBatchName("");
      fetchBatches();
    } else {
      setMessage(data.error || "Failed to add batch");
    }
  };

  const handleDeleteBatch = async (id) => {
    if (!confirm("Are you sure you want to delete this batch?")) return;

    const res = await fetch(`/api/batches?id=${id}`, { method: "DELETE" });
    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
      fetchBatches();
    } else {
      setMessage(data.error || "Failed to delete batch");
    }
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Create Batch</h1>

      <input
        type="text"
        placeholder="Enter batch name"
        value={batchName}
        onChange={(e) => setBatchName(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <button
        onClick={handleAddBatch}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Batch
      </button>

      {message && <p className="mt-4">{message}</p>}

      <h2 className="text-xl font-semibold mt-6 mb-2">Existing Batches</h2>
      <ul className="list-disc pl-6">
        {batches.map((b) => (
          <li key={b._id} className="flex justify-between items-center">
            <span>{b.name}</span>
            <button
              onClick={() => handleDeleteBatch(b._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
