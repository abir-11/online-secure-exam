"use client";

import { useEffect, useState } from "react";
import { UserPlus, Users } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
      .catch((error) => {
        console.error("Failed to load batches", error);

        Swal.fire({
          icon: "error",
          title: "Failed to load batches",
          text: "Please refresh the page.",
        });
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBatch) {
      Swal.fire({
        icon: "warning",
        title: "Batch Required",
        text: "Please select a batch",
      });
      return;
    }

    if (!emails) {
      Swal.fire({
        icon: "warning",
        title: "Emails Required",
        text: "Please enter student emails",
      });
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success 🎉",
        text: "Students added successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      setEmails("");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="bg-emerald-950 min-h-screen relative overflow-hidden p-6">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* CENTERED CARD */}
      <div className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-md border border-emerald-700/50 p-8 rounded-2xl shadow-lg relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Users className="w-10 h-10 text-emerald-400 mb-2" />
          <h1 className="text-3xl font-bold text-emerald-50">
            Add Students to Batch
          </h1>
          <p className="text-emerald-300 text-sm">
            Assign students to a specific batch using their email addresses
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Batch Dropdown */}
          <div>
            <label className="block mb-2 font-medium text-emerald-200">
              Select Batch
            </label>

            <select
              className="w-full border border-emerald-700/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-800/50 text-emerald-50 placeholder:text-emerald-400 transition"
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
            <label className="block mb-2 font-medium text-emerald-200">
              Student Emails (comma separated)
            </label>

            <input
              type="text"
              placeholder="ronita@gmail.com, dina@gmail.com"
              className="w-full border border-emerald-700/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-800/50 text-emerald-50 placeholder:text-emerald-400 transition"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            <UserPlus className="w-5 h-5" />
            Add Students
          </button>
        </form>
      </div>
    </div>
  );
}
