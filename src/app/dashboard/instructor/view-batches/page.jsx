// "use client";

// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";

// import { Users, User, Trash2, Layers, Mail } from "lucide-react";

// export default function ViewBatchesPage() {
//   const [batches, setBatches] = useState([]);

//   useEffect(() => {
//     async function fetchBatches() {
//       try {
//         const res = await fetch("/api/batches");
//         const data = await res.json();
//         setBatches(data);
//       } catch (error) {
//         console.error("Failed to fetch batches", error);
//       }
//     }
//     fetchBatches();
//   }, []);

//   const handleDeleteStudent = async (batchId, studentEmail) => {
//     const confirmResult = await Swal.fire({
//       title: `Remove ${studentEmail}?`,
//       text: "This student will be removed from the batch.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, remove",
//       cancelButtonText: "Cancel",
//     });

//     if (!confirmResult.isConfirmed) return;

//     try {
//       const res = await fetch("/api/batches/remove-students", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ batchId, studentEmail }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setBatches((prev) =>
//           prev.map((batch) =>
//             batch._id === batchId
//               ? {
//                   ...batch,
//                   students: batch.students.filter((s) => s !== studentEmail),
//                 }
//               : batch,
//           ),
//         );

//         Swal.fire({
//           title: "Removed!",
//           text: `${studentEmail} has been removed from the batch.`,
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } else {
//         Swal.fire("Error", data.message || "Failed to remove student", "error");
//       }
//     } catch (error) {
//       console.error("Error removing student:", error);
//       Swal.fire("Error", "Failed to remove student", "error");
//     }
//   };

//   return (
//     <main className="min-h-screen  p-6 bg-primary dark:bg-gray-900">
//       {/* CENTERED WHITE CONTAINER */}
//       <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
//         {/* Header */}
//         <div className="flex flex-col items-center text-center mb-10">
//           <Layers className="w-10 h-10 text-teal-600 mb-2" />
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//             Batch Management
//           </h1>
//           <p className="text-gray-500 text-sm">
//             View and manage students inside each batch
//           </p>
//         </div>

//         {/* Grid */}
//         <div className="grid gap-6 md:grid-cols-1">
//           {batches.map((batch) => (
//             <div
//               key={batch._id}
//               className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 dark:border-gray-700"
//             >
//               {/* Header */}
//               <div className=" flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center gap-2">
//                   <Users className="w-5 h-5 text-teal-600" />
//                   <h2 className="font-semibold text-gray-800 dark:text-white">
//                     {batch.name}
//                   </h2>
//                 </div>

//                 <span className="text-xs bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 px-2 py-1 rounded-full">
//                   {batch.students?.length || 0} Students
//                 </span>
//               </div>

//               {/* Students */}
//               <div className="p-4 space-y-2">
//                 {batch.students?.length > 0 ? (
//                   batch.students.map((studentEmail) => (
//                     <div
//                       key={studentEmail}
//                       className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg"
//                     >
//                       <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
//                         <Mail size={16} />
//                         {studentEmail}
//                       </div>

//                       <button
//                         onClick={() =>
//                           handleDeleteStudent(batch._id, studentEmail)
//                         }
//                         className="flex items-center gap-1 text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                       >
//                         <Trash2 size={14} />
//                         Remove
//                       </button>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="flex items-center gap-2 text-sm text-gray-400 justify-center">
//                     <User size={16} />
//                     No students yet
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

//responsive

"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { Users, User, Trash2, Layers, Mail } from "lucide-react";

export default function ViewBatchesPage() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    async function fetchBatches() {
      try {
        const res = await fetch("/api/batches");
        const data = await res.json();
        setBatches(data);
      } catch (error) {
        console.error("Failed to fetch batches", error);
      }
    }
    fetchBatches();
  }, []);

  const handleDeleteStudent = async (batchId, studentEmail) => {
    const confirmResult = await Swal.fire({
      title: `Remove ${studentEmail}?`,
      text: "This student will be removed from the batch.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await fetch("/api/batches/remove-students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ batchId, studentEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setBatches((prev) =>
          prev.map((batch) =>
            batch._id === batchId
              ? {
                  ...batch,
                  students: batch.students.filter((s) => s !== studentEmail),
                }
              : batch,
          ),
        );

        Swal.fire({
          title: "Removed!",
          text: `${studentEmail} has been removed from the batch.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", data.message || "Failed to remove student", "error");
      }
    } catch (error) {
      console.error("Error removing student:", error);
      Swal.fire("Error", "Failed to remove student", "error");
    }
  };

  return (
    <div className="bg-emerald-950 min-h-screen relative overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* CENTERED WHITE CONTAINER */}
      <div className="max-w-6xl mx-auto bg-slate-800/50 backdrop-blur-md border border-emerald-700/50 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <Layers className="w-12 h-12 sm:w-10 sm:h-10 text-emerald-400 mb-2" />
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-50">
            Batch Management
          </h1>
          <p className="text-emerald-300 text-sm sm:text-base">
            View and manage students inside each batch
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {batches.map((batch) => (
            <div
              key={batch._id}
              className="flex flex-col justify-between bg-slate-700/50 rounded-xl shadow-sm hover:shadow-md transition border border-emerald-700/30"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-emerald-700/30 gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-semibold text-emerald-50 text-sm sm:text-base">
                    {batch.name}
                  </h2>
                </div>

                <span className="text-xs sm:text-sm bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded-full mt-1 sm:mt-0 border border-emerald-700/50">
                  {batch.students?.length || 0} Students
                </span>
              </div>

              {/* Students */}
              <div className="p-4 space-y-2">
                {batch.students?.length > 0 ? (
                  batch.students.map((studentEmail) => (
                    <div
                      key={studentEmail}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-600/50 px-3 py-2 rounded-lg gap-2 sm:gap-0 border border-emerald-700/20"
                    >
                      <div className="flex items-center gap-2 text-sm text-emerald-200 break-all">
                        <Mail size={16} />
                        {studentEmail}
                      </div>

                      <button
                        onClick={() =>
                          handleDeleteStudent(batch._id, studentEmail)
                        }
                        className="flex items-center gap-1 text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition w-full sm:w-auto justify-center mt-2 sm:mt-0"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-sm text-emerald-400 justify-center">
                    <User size={16} />
                    No students yet
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
