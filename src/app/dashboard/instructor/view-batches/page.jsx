// "use client";

// import { useEffect, useState } from "react";

// export default function ViewBatchesPage() {
//   const [batches, setBatches] = useState([]);

//   // Fetch all batches
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

//   // Delete student from batch
//   const handleDeleteStudent = async (batchId, studentEmail) => {
//     if (!confirm(`Remove ${studentEmail} from this batch?`)) return;

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
//         // Update UI
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
//       } else {
//         alert(data.message || "Failed to remove student");
//       }
//     } catch (error) {
//       console.error("Error removing student:", error);
//       alert("Failed to remove student");
//     }
//   };

//   return (
//     <main className="p-6 mt-20">
//       <h1 className="text-2xl font-bold mb-4">All Batches</h1>
//       <ul className="space-y-4">
//         {batches.map((batch) => (
//           <li key={batch._id} className="bg-gray-200 p-4 rounded">
//             <p>
//               <strong>Name:</strong> {batch.name}
//             </p>

//             <p>
//               <strong>Students:</strong>
//             </p>
//             {batch.students?.length > 0 ? (
//               <ul className="list-disc list-inside ml-4">
//                 {batch.students.map((studentEmail) => (
//                   <li
//                     key={studentEmail}
//                     className="flex justify-between items-center"
//                   >
//                     {studentEmail}
//                     <button
//                       onClick={() =>
//                         handleDeleteStudent(batch._id, studentEmail)
//                       }
//                       className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No students yet</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // ✅ import SweetAlert2
import "sweetalert2/dist/sweetalert2.min.css";

export default function ViewBatchesPage() {
  const [batches, setBatches] = useState([]);

  // Fetch all batches
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

  // Delete student from batch
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
        // Update UI
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

        // Sweet alert success
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
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">All Batches</h1>
      <ul className="space-y-4">
        {batches.map((batch) => (
          <li key={batch._id} className="bg-gray-200 p-4 rounded">
            <p>
              <strong>Name:</strong> {batch.name}
            </p>

            <p>
              <strong>Students:</strong>
            </p>
            {batch.students?.length > 0 ? (
              <ul className="list-disc list-inside ml-4">
                {batch.students.map((studentEmail) => (
                  <li
                    key={studentEmail}
                    className="flex justify-between items-center"
                  >
                    {studentEmail}
                    <button
                      onClick={() =>
                        handleDeleteStudent(batch._id, studentEmail)
                      }
                      className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students yet</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
