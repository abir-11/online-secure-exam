// "use client";

// import { useState, useEffect } from "react";

// export default function CreateExamPage() {
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState(60);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [batches, setBatches] = useState([]);
//   const [selectedBatches, setSelectedBatches] = useState([]);

//   useEffect(() => {
//     async function fetchBatches() {
//       const res = await fetch("/api/batches");
//       const data = await res.json();
//       setBatches(data);
//     }
//     fetchBatches();
//   }, []);

//   // Helper: format date for datetime-local min attribute
//   const getMinDateTime = () => {
//     const now = new Date();
//     const tzOffset = now.getTimezoneOffset() * 60000; // local time offset
//     const localISOTime = new Date(now - tzOffset).toISOString().slice(0, 16);
//     return localISOTime;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check required fields
//     if (
//       !title ||
//       !duration ||
//       !startTime ||
//       !endTime ||
//       selectedBatches.length === 0
//     ) {
//       alert("All fields are required");
//       return;
//     }

//     const now = new Date();
//     const start = new Date(startTime);
//     const end = new Date(endTime);

//     // Prevent past start times
//     if (start < now) {
//       alert("Start time cannot be in the past");
//       return;
//     }

//     // Ensure end time is strictly after start time
//     if (end <= start) {
//       alert("End time must be after start time");
//       return;
//     }

//     if (duration <= 0) {
//       alert("Duration must be greater than 0");
//       return;
//     }

//     // Send request to backend
//     const res = await fetch("/api/exams", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title,
//         duration: Number(duration),
//         startTime,
//         endTime,
//         batchIds: selectedBatches,
//       }),
//     });

//     const data = await res.json();
//     alert(data.message);

//     if (res.ok) {
//       // Reset form
//       setTitle("");
//       setDuration(60);
//       setStartTime("");
//       setEndTime("");
//       setSelectedBatches([]);
//     }
//   };

//   return (
//     <main className="p-6 mt-20">
//       <h1 className="text-2xl font-bold mb-4">Create Exam</h1>

//       <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//         <div>
//           <label className="block mb-1 font-medium">Exam Title</label>
//           <input
//             type="text"
//             placeholder="Exam Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Duration (minutes)</label>
//           <input
//             type="number"
//             min={1}
//             placeholder="Duration (minutes)"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Start Time</label>
//           <input
//             type="datetime-local"
//             value={startTime}
//             min={getMinDateTime()} // prevent past dates
//             onChange={(e) => setStartTime(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">End Time</label>
//           <input
//             type="datetime-local"
//             value={endTime}
//             min={startTime || getMinDateTime()} // ensures endTime >= startTime
//             onChange={(e) => setEndTime(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Assign Batches</label>
//           <select
//             multiple
//             value={selectedBatches}
//             onChange={(e) =>
//               setSelectedBatches(
//                 Array.from(e.target.selectedOptions, (opt) => opt.value),
//               )
//             }
//             className="w-full p-2 border rounded"
//           >
//             {batches.map((b) => (
//               <option key={b._id} value={b._id}>
//                 {b.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600"
//         >
//           Create Exam
//         </button>
//       </form>
//     </main>
//   );
// }

//----------------------------------

"use client";

import { useState, useEffect } from "react";

export default function CreateExamPage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("mcq");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [duration, setDuration] = useState(60);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);

  useEffect(() => {
    fetch("/api/batches")
      .then((r) => r.json())
      .then(setBatches);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        type,
        totalQuestions: type === "mcq" ? totalQuestions : 0,
        duration,
        startTime,
        endTime,
        batchIds: selectedBatches,
      }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setTitle("");
      setTotalQuestions(0);
      setSelectedBatches([]);
    }
  };

  return (
    <main className="p-6 mt-20 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Create Exam</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Exam Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="mcq">MCQ Exam</option>
          <option value="theory">Theoretical Exam</option>
        </select>

        {type === "mcq" && (
          <input
            type="number"
            min={1}
            placeholder="Total MCQ Questions"
            className="w-full p-2 border rounded"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(e.target.value)}
          />
        )}

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <select
          multiple
          className="w-full p-2 border rounded"
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

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create Exam
        </button>
      </form>
    </main>
  );
}
