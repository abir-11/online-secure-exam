// // "use client";

// // import { useState, useEffect } from "react";
// // import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

// // export default function CreateBatchPage() {
// //   const [batchName, setBatchName] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [batches, setBatches] = useState([]);

// //   const fetchBatches = async () => {
// //     const res = await fetch("/api/batches");
// //     const data = await res.json();
// //     setBatches(data);
// //   };

// //   useEffect(() => {
// //     fetchBatches();
// //   }, []);

// //   const handleAddBatch = async () => {
// //     if (!batchName) {
// //       setMessage("Enter batch name");
// //       return;
// //     }

// //     const res = await fetch("/api/batches", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ name: batchName }),
// //     });

// //     const data = await res.json();
// //     if (res.ok) {
// //       setMessage("Batch added successfully");
// //       setBatchName("");
// //       fetchBatches();
// //     } else {
// //       setMessage(data.error || "Failed to add batch");
// //     }
// //   };

// //   const handleDeleteBatch = async (id) => {
// //     if (!confirm("Are you sure you want to delete this batch?")) return;

// //     const res = await fetch(`/api/batches?id=${id}`, { method: "DELETE" });
// //     const data = await res.json();

// //     if (res.ok) {
// //       setMessage(data.message);
// //       fetchBatches();
// //     } else {
// //       setMessage(data.error || "Failed to delete batch");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen p-6  bg-primary dark:bg-gray-900">
// //       <div className="max-w-3xl mx-auto p-6  bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
// //         <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
// //           Create Batch
// //         </h1>

// //         <div className="flex items-center gap-3 mb-4">
// //           <input
// //             type="text"
// //             placeholder="Enter batch name"
// //             value={batchName}
// //             onChange={(e) => setBatchName(e.target.value)}
// //             className="flex-1 border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-800 dark:text-gray-100 transition"
// //           />
// //           <button
// //             onClick={handleAddBatch}
// //             className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
// //           >
// //             <PlusIcon className="w-5 h-5" />
// //             Add Batch
// //           </button>
// //         </div>

// //         {message && (
// //           <p className="mb-4 text-sm text-gray-700 dark:text-gray-300 animate-pulse">
// //             {message}
// //           </p>
// //         )}

// //         <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-100">
// //           Existing Batches
// //         </h2>

// //         <ul className="space-y-3">
// //           {batches.map((b) => (
// //             <li
// //               key={b._id}
// //               className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
// //             >
// //               <span className="text-gray-800 dark:text-gray-100 font-medium">
// //                 {b.name}
// //               </span>
// //               <button
// //                 onClick={() => handleDeleteBatch(b._id)}
// //                 className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
// //               >
// //                 <TrashIcon className="w-4 h-4" />
// //                 Delete
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// //responsive
// "use client";

// import { useState, useEffect } from "react";
// import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

// export default function CreateBatchPage() {
//   const [batchName, setBatchName] = useState("");
//   const [message, setMessage] = useState("");
//   const [batches, setBatches] = useState([]);

//   const fetchBatches = async () => {
//     const res = await fetch("/api/batches");
//     const data = await res.json();
//     setBatches(data);
//   };

//   useEffect(() => {
//     fetchBatches();
//   }, []);

//   const handleAddBatch = async () => {
//     if (!batchName) {
//       setMessage("Enter batch name");
//       return;
//     }

//     const res = await fetch("/api/batches", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: batchName }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       setMessage("Batch added successfully");
//       setBatchName("");
//       fetchBatches();
//     } else {
//       setMessage(data.error || "Failed to add batch");
//     }
//   };

//   const handleDeleteBatch = async (id) => {
//     if (!confirm("Are you sure you want to delete this batch?")) return;

//     const res = await fetch(`/api/batches?id=${id}`, { method: "DELETE" });
//     const data = await res.json();

//     if (res.ok) {
//       setMessage(data.message);
//       fetchBatches();
//     } else {
//       setMessage(data.error || "Failed to delete batch");
//     }
//   };

//   return (
//     <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-primary dark:bg-gray-900">
//       <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
//         <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center sm:text-left">
//           Create Batch
//         </h1>

//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
//           <input
//             type="text"
//             placeholder="Enter batch name"
//             value={batchName}
//             onChange={(e) => setBatchName(e.target.value)}
//             className="flex-1 border border-gray-300 dark:border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-800 dark:text-gray-100 transition w-full sm:w-auto"
//           />
//           <button
//             onClick={handleAddBatch}
//             className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
//           >
//             <PlusIcon className="w-5 h-5" />
//             Add Batch
//           </button>
//         </div>

//         {message && (
//           <p className="mb-4 text-sm text-gray-700 dark:text-gray-300 animate-pulse text-center sm:text-left">
//             {message}
//           </p>
//         )}

//         <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-100 text-center sm:text-left">
//           Existing Batches
//         </h2>

//         <ul className="space-y-3">
//           {batches.map((b) => (
//             <li
//               key={b._id}
//               className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
//             >
//               <span className="text-gray-800 dark:text-gray-100 font-medium mb-2 sm:mb-0">
//                 {b.name}
//               </span>
//               <button
//                 onClick={() => handleDeleteBatch(b._id)}
//                 className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto justify-center"
//               >
//                 <TrashIcon className="w-4 h-4" />
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

//delete batch issue..

"use client";

import { useState, useEffect } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function CreateBatchPage() {
  const [batchName, setBatchName] = useState("");
  const [message, setMessage] = useState("");
  const [batches, setBatches] = useState([]);

  const fetchBatches = async () => {
    try {
      const res = await fetch("/api/batches");
      const data = await res.json();
      setBatches(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch batches");
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleAddBatch = async () => {
    if (!batchName) {
      setMessage("Enter batch name");
      return;
    }

    try {
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
        Swal.fire({
          icon: "success",
          title: "Batch added",
          text: data.message || "Batch created successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        setMessage(data.error || "Failed to add batch");
        Swal.fire("Error", data.error || "Failed to add batch", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add batch", "error");
    }
  };

  const handleDeleteBatch = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this batch deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/batches?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        fetchBatches();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: data.message || "Batch deleted successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", data.error || "Failed to delete batch", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete batch", "error");
    }
  };

  return (
    <div className="bg-emerald-950 min-h-screen relative overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-slate-800/50 backdrop-blur-md border border-emerald-700/50 rounded-2xl shadow-lg relative z-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-emerald-50 text-center sm:text-left">
          Create Batch
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter batch name"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            className="flex-1 border border-emerald-700/50 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-800/50 text-emerald-50 placeholder:text-emerald-400 transition w-full sm:w-auto"
          />
          <button
            onClick={handleAddBatch}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
          >
            <PlusIcon className="w-5 h-5" />
            Add Batch
          </button>
        </div>

        {message && (
          <p className="mb-4 text-sm text-emerald-300 animate-pulse text-center sm:text-left">
            {message}
          </p>
        )}

        <h2 className="text-xl sm:text-2xl font-semibold mt-6 mb-4 text-emerald-50 text-center sm:text-left">
          Existing Batches
        </h2>

        <ul className="space-y-3">
          {batches.map((b) => (
            <li
              key={b._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-700/50 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-emerald-700/30"
            >
              <span className="text-emerald-50 font-medium mb-2 sm:mb-0">
                {b.name}
              </span>
              <button
                onClick={() => handleDeleteBatch(b._id)}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
