// // // "use client";

// // // import { useState, useEffect } from "react";

// // // export default function AddStudents({ batchId }) {
// // //   const [emails, setEmails] = useState("");
// // //   const [message, setMessage] = useState("");

// // //   const handleAddStudents = async () => {
// // //     const emailArray = emails.split(",").map((e) => e.trim());

// // //     const res = await fetch("/api/batches", {
// // //       method: "PATCH",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({ batchId, studentEmails: emailArray }),
// // //     });

// // //     const data = await res.json();
// // //     if (res.ok) setMessage("Students added successfully!");
// // //     else setMessage(data.error || "Failed to add students");
// // //   };

// // //   return (
// // //     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
// // //       <h2 className="text-2xl font-bold mb-4">Add Students to Batch</h2>
// // //       <textarea
// // //         placeholder="Enter student emails, comma separated"
// // //         value={emails}
// // //         onChange={(e) => setEmails(e.target.value)}
// // //         className="w-full p-3 border rounded-lg mb-3"
// // //       />
// // //       <button
// // //         onClick={handleAddStudents}
// // //         className="px-4 py-2 bg-[#0D7C66] text-white rounded-lg hover:bg-[#41B3A2]"
// // //       >
// // //         Add Students
// // //       </button>
// // //       {message && <p className="mt-3 text-green-600">{message}</p>}
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect } from "react";

// // export default function AddStudentsPage() {
// //   const [batches, setBatches] = useState([]);
// //   const [selectedBatchId, setSelectedBatchId] = useState("");
// //   const [emails, setEmails] = useState("");
// //   const [message, setMessage] = useState("");

// //   // fetch batches on load
// //   useEffect(() => {
// //     async function fetchBatches() {
// //       const res = await fetch("/api/batches");
// //       const data = await res.json();
// //       setBatches(data);
// //       if (data.length > 0) setSelectedBatchId(data[0]._id);
// //     }
// //     fetchBatches();
// //   }, []);

// //   const handleAddStudents = async () => {
// //     const studentArray = emails
// //       .split(",")
// //       .map((e) => e.trim())
// //       .filter((e) => e);

// //     if (!selectedBatchId || studentArray.length === 0) {
// //       setMessage("Select a batch and enter at least one email");
// //       return;
// //     }

// //     try {
// //       const res = await fetch("/api/batches/add-students", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           batchId: selectedBatchId,
// //           studentEmails: studentArray,
// //         }),
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         setMessage("Students added successfully!");
// //         setEmails("");
// //       } else {
// //         setMessage(data.error || "Failed to add students");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setMessage("Error: " + err.message);
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-xl font-bold mb-4">Add Students to Batch</h1>

// //       <label className="block mb-2">Select Batch:</label>
// //       <select
// //         value={selectedBatchId}
// //         onChange={(e) => setSelectedBatchId(e.target.value)}
// //         className="mb-4 p-2 border rounded w-full"
// //       >
// //         {batches.map((batch) => (
// //           <option key={batch._id} value={batch._id}>
// //             {batch.name}
// //           </option>
// //         ))}
// //       </select>

// //       <label className="block mb-2">
// //         Enter Student Emails (comma separated)
// //       </label>
// //       <textarea
// //         placeholder="e.g., ronita@gmail.com, dina@gmail.com"
// //         value={emails}
// //         onChange={(e) => setEmails(e.target.value)}
// //         className="w-full p-2 border rounded mb-4"
// //       />

// //       <button
// //         onClick={handleAddStudents}
// //         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
// //       >
// //         Add Students
// //       </button>

// //       {message && <p className="mt-4">{message}</p>}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";

// export default function AddStudentsPage() {
//   const [batches, setBatches] = useState([]);
//   const [selectedBatchId, setSelectedBatchId] = useState("");
//   const [studentEmails, setStudentEmails] = useState("");
//   const [message, setMessage] = useState("");

//   // Fetch all batches for instructor
//   useEffect(() => {
//     fetch("/api/batches")
//       .then((res) => res.json())
//       .then((data) => setBatches(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleAddStudents = async (e) => {
//     e.preventDefault();

//     if (!selectedBatchId) {
//       setMessage("Please select a batch");
//       return;
//     }

//     // Split by comma and remove extra spaces
//     const emailsArray = studentEmails
//       .split(",")
//       .map((email) => email.trim())
//       .filter((email) => email.length > 0);

//     if (emailsArray.length === 0) {
//       setMessage("Please enter at least one valid email");
//       return;
//     }

//     try {
//       const res = await fetch("/api/batches/add-students", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           batchId: selectedBatchId,
//           studentEmails: emailsArray,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage(data.error || "Failed to add students");
//         return;
//       }

//       setMessage(data.message);
//       setStudentEmails(""); // clear input
//     } catch (error) {
//       console.error(error);
//       setMessage("Server error. Try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">Add Students to Batch</h2>

//       <form onSubmit={handleAddStudents} className="space-y-4">
//         {/* Batch Select */}
//         <div>
//           <label className="block mb-1">Select Batch</label>
//           <select
//             value={selectedBatchId}
//             onChange={(e) => setSelectedBatchId(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//             <option value="">-- Select Batch --</option>
//             {batches.map((batch) => (
//               <option key={batch._id} value={batch._id}>
//                 {batch.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Student Emails */}
//         <div>
//           <label className="block mb-1">Student Emails (comma separated)</label>
//           <input
//             type="text"
//             placeholder="ronita@gmail.com, dina@gmail.com"
//             value={studentEmails}
//             onChange={(e) => setStudentEmails(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
//         >
//           Add Students
//         </button>
//       </form>

//       {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//     </div>
//   );
// }

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
