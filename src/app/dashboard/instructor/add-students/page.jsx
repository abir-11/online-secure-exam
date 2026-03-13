// "use client";

// import { useEffect, useState } from "react";
// import { UserPlus, Users } from "lucide-react";

// export default function AddStudentsPage() {
//   const [batches, setBatches] = useState([]);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const [emails, setEmails] = useState("");

//   useEffect(() => {
//     fetch("/api/batches")
//       .then((res) => res.json())
//       .then((data) => {
//         setBatches(data);
//       })
//       .catch((error) => console.error("Failed to load batches", error));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedBatch) {
//       alert("Please select a batch");
//       return;
//     }

//     if (!emails) {
//       alert("Please enter student emails");
//       return;
//     }

//     const emailArray = emails
//       .split(",")
//       .map((email) => email.trim())
//       .filter((email) => email !== "");

//     try {
//       const res = await fetch("/api/batches/add-students", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           batchId: selectedBatch,
//           studentEmails: emailArray,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message);
//         return;
//       }

//       alert("Students added successfully");
//       setEmails("");
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen  p-6 bg-primary dark:bg-gray-900">
//       {/* CENTERED CARD */}
//       <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
//         {/* Header */}
//         <div className="flex flex-col items-center text-center mb-8">
//           <Users className="w-10 h-10 text-teal-600 mb-2" />
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
//             Add Students to Batch
//           </h1>
//           <p className="text-gray-500 text-sm">
//             Assign students to a specific batch using their email addresses
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Batch Dropdown */}
//           <div>
//             <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
//               Select Batch
//             </label>

//             <select
//               className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3
//               focus:outline-none focus:ring-2 focus:ring-teal-400
//               dark:bg-gray-800 dark:text-gray-100 transition"
//               value={selectedBatch}
//               onChange={(e) => setSelectedBatch(e.target.value)}
//             >
//               <option value="">Select Batch</option>

//               {batches.map((batch) => (
//                 <option key={batch._id} value={batch._id}>
//                   {batch.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Emails Input */}
//           <div>
//             <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
//               Student Emails (comma separated)
//             </label>

//             <input
//               type="text"
//               placeholder="ronita@gmail.com, dina@gmail.com"
//               className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3
//               focus:outline-none focus:ring-2 focus:ring-teal-400
//               dark:bg-gray-800 dark:text-gray-100 transition"
//               value={emails}
//               onChange={(e) => setEmails(e.target.value)}
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             className="w-full flex items-center justify-center gap-2
//             bg-[#0D7C66] hover:bg-[#0b6b58]
//             text-white font-semibold px-6 py-3 rounded-xl
//             shadow-md hover:shadow-lg
//             transition-all duration-200"
//           >
//             <UserPlus className="w-5 h-5" />
//             Add Students
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

//sweet alert

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
    <div className="min-h-screen  p-6 bg-primary dark:bg-gray-900">
      {/* CENTERED CARD */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Users className="w-10 h-10 text-teal-600 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Add Students to Batch
          </h1>
          <p className="text-gray-500 text-sm">
            Assign students to a specific batch using their email addresses
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Batch Dropdown */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Select Batch
            </label>

            <select
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3 
              focus:outline-none focus:ring-2 focus:ring-teal-400 
              dark:bg-gray-800 dark:text-gray-100 transition"
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
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Student Emails (comma separated)
            </label>

            <input
              type="text"
              placeholder="ronita@gmail.com, dina@gmail.com"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-3 
              focus:outline-none focus:ring-2 focus:ring-teal-400 
              dark:bg-gray-800 dark:text-gray-100 transition"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full flex items-center justify-center gap-2 
            bg-[#0D7C66] hover:bg-[#0b6b58] 
            text-white font-semibold px-6 py-3 rounded-xl 
            shadow-md hover:shadow-lg 
            transition-all duration-200"
          >
            <UserPlus className="w-5 h-5" />
            Add Students
          </button>
        </form>
      </div>
    </div>
  );
}
