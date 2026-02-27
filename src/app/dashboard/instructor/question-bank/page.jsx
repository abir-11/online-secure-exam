// // "use client";

// // import { useState, useEffect } from "react";

// // export default function QuestionBankPage() {
// //   const [exams, setExams] = useState([]);
// //   const [selectedExam, setSelectedExam] = useState("");
// //   const [questionText, setQuestionText] = useState("");
// //   const [options, setOptions] = useState(["", "", "", ""]);
// //   const [correctOption, setCorrectOption] = useState(0);
// //   const [marks, setMarks] = useState(1);

// //   useEffect(() => {
// //     async function fetchExams() {
// //       const res = await fetch("/api/exams");
// //       const data = await res.json();
// //       setExams(data);
// //     }
// //     fetchExams();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!selectedExam || !questionText || options.some((o) => !o)) {
// //       alert("All fields are required");
// //       return;
// //     }

// //     if (correctOption < 0 || correctOption > 3) {
// //       alert("Correct option must be between 0 and 3");
// //       return;
// //     }

// //     const res = await fetch("/api/questions", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         examId: selectedExam,
// //         questionText,
// //         options,
// //         correctOption,
// //         marks,
// //       }),
// //     });

// //     const data = await res.json();
// //     alert(data.message);

// //     if (res.ok) {
// //       setQuestionText("");
// //       setOptions(["", "", "", ""]);
// //       setCorrectOption(0);
// //       setMarks(1);
// //     }
// //   };

// //   return (
// //     <main className="p-6 mt-20">
// //       <h1 className="text-2xl font-bold mb-4">Add Questions</h1>

// //       <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
// //         <div>
// //           <label className="block mb-1 font-medium">Select Exam</label>
// //           <select
// //             value={selectedExam}
// //             onChange={(e) => setSelectedExam(e.target.value)}
// //             className="w-full p-2 border rounded"
// //           >
// //             <option value="">Select Exam</option>
// //             {exams.map((e) => (
// //               <option key={e._id} value={e._id}>
// //                 {e.title}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Question Text</label>
// //           <textarea
// //             value={questionText}
// //             onChange={(e) => setQuestionText(e.target.value)}
// //             className="w-full p-2 border rounded"
// //           />
// //         </div>

// //         <label className="block font-medium">Options</label>
// //         {options.map((opt, idx) => (
// //           <input
// //             key={idx}
// //             type="text"
// //             placeholder={`Option ${idx + 1}`}
// //             value={opt}
// //             onChange={(e) => {
// //               const newOpts = [...options];
// //               newOpts[idx] = e.target.value;
// //               setOptions(newOpts);
// //             }}
// //             className="w-full p-2 border rounded"
// //           />
// //         ))}

// //         <div>
// //           <label className="block mb-1 font-medium">
// //             Correct Option Index (0-3)
// //           </label>
// //           <input
// //             type="number"
// //             min={0}
// //             max={3}
// //             value={correctOption}
// //             onChange={(e) => setCorrectOption(parseInt(e.target.value))}
// //             className="w-full p-2 border rounded"
// //           />
// //         </div>

// //         <div>
// //           <label className="block mb-1 font-medium">Marks</label>
// //           <input
// //             type="number"
// //             min={1}
// //             value={marks}
// //             onChange={(e) => setMarks(parseInt(e.target.value))}
// //             className="w-full p-2 border rounded"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           className="bg-purple-500 px-4 py-2 rounded text-white hover:bg-purple-600"
// //         >
// //           Add Question
// //         </button>
// //       </form>
// //     </main>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";

// export default function QuestionBankPage() {
//   const [exams, setExams] = useState([]);
//   const [selectedExam, setSelectedExam] = useState("");
//   const [questionText, setQuestionText] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctOption, setCorrectOption] = useState(0);
//   const [marks, setMarks] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchExams() {
//       try {
//         const res = await fetch("/api/exams");

//         // Check if response is ok
//         if (!res.ok) {
//           const text = await res.text();
//           console.error("API Error:", res.status, text);
//           alert("Failed to fetch exams. Please login or try again.");
//           setExams([]);
//           setLoading(false);
//           return;
//         }

//         const data = await res.json();

//         // Ensure data.exams exists
//         if (!data || !Array.isArray(data.exams)) {
//           console.error("Unexpected API response:", data);
//           alert("Invalid data received from server.");
//           setExams([]);
//           setLoading(false);
//           return;
//         }

//         setExams(data.exams);
//         setLoading(false);
//       } catch (err) {
//         console.error("Fetch exams error:", err);
//         alert("Error fetching exams.");
//         setExams([]);
//         setLoading(false);
//       }
//     }

//     fetchExams();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedExam || !questionText || options.some((o) => !o)) {
//       alert("All fields are required");
//       return;
//     }

//     if (correctOption < 0 || correctOption > 3) {
//       alert("Correct option must be between 0 and 3");
//       return;
//     }

//     try {
//       const res = await fetch("/api/questions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           examId: selectedExam,
//           questionText,
//           options,
//           correctOption,
//           marks,
//         }),
//       });

//       // Safe parse
//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         data = { message: "Question added (but server returned invalid JSON)" };
//       }

//       alert(data.message || "Question added successfully");

//       if (res.ok) {
//         setQuestionText("");
//         setOptions(["", "", "", ""]);
//         setCorrectOption(0);
//         setMarks(1);
//       }
//     } catch (err) {
//       console.error("Submit question error:", err);
//       alert("Failed to add question.");
//     }
//   };

//   return (
//     <main className="p-6 mt-20">
//       <h1 className="text-2xl font-bold mb-4">Add Questions</h1>

//       {loading ? (
//         <p>Loading exams...</p>
//       ) : exams.length === 0 ? (
//         <p>No exams available. Please create an exam first.</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//           <div>
//             <label className="block mb-1 font-medium">Select Exam</label>
//             <select
//               value={selectedExam}
//               onChange={(e) => setSelectedExam(e.target.value)}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Exam</option>
//               {exams.map((e) => (
//                 <option key={e._id} value={e._id}>
//                   {e.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Question Text</label>
//             <textarea
//               value={questionText}
//               onChange={(e) => setQuestionText(e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <label className="block font-medium">Options</label>
//           {options.map((opt, idx) => (
//             <input
//               key={idx}
//               type="text"
//               placeholder={`Option ${idx + 1}`}
//               value={opt}
//               onChange={(e) => {
//                 const newOpts = [...options];
//                 newOpts[idx] = e.target.value;
//                 setOptions(newOpts);
//               }}
//               className="w-full p-2 border rounded"
//             />
//           ))}

//           <div>
//             <label className="block mb-1 font-medium">
//               Correct Option Index (0-3)
//             </label>
//             <input
//               type="number"
//               min={0}
//               max={3}
//               value={correctOption}
//               onChange={(e) => setCorrectOption(parseInt(e.target.value))}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Marks</label>
//             <input
//               type="number"
//               min={1}
//               value={marks}
//               onChange={(e) => setMarks(parseInt(e.target.value))}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-purple-500 px-4 py-2 rounded text-white hover:bg-purple-600"
//           >
//             Add Question
//           </button>
//         </form>
//       )}
//     </main>
//   );
// }

"use client";

import { useState, useEffect } from "react";

export default function QuestionBankPage() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [marks, setMarks] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/exams");

        if (!res.ok) {
          // Safe parse error
          const data = await res.json().catch(() => ({}));
          alert(
            data.error || "Failed to fetch exams. Please login or try again.",
          );
          setExams([]);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setExams(data.exams || []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch exams error:", err);
        alert("Error fetching exams. Please try again.");
        setExams([]);
        setLoading(false);
      }
    }

    fetchExams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedExam || !questionText || options.some((o) => !o)) {
      alert("All fields are required");
      return;
    }

    if (correctOption < 0 || correctOption > 3) {
      alert("Correct option must be between 0 and 3");
      return;
    }

    try {
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId: selectedExam,
          questionText,
          options,
          correctOption,
          marks,
        }),
      });

      const data = await res.json().catch(() => ({
        message: "Question added (server returned invalid JSON)",
      }));
      alert(data.message || "Question added successfully");

      if (res.ok) {
        setQuestionText("");
        setOptions(["", "", "", ""]);
        setCorrectOption(0);
        setMarks(1);
      }
    } catch (err) {
      console.error("Submit question error:", err);
      alert("Failed to add question.");
    }
  };

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Add Questions</h1>

      {loading ? (
        <p>Loading exams...</p>
      ) : exams.length === 0 ? (
        <p>No exams available. Please create an exam first.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1 font-medium">Select Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Exam</option>
              {exams.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Question Text</label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <label className="block font-medium">Options</label>
          {options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const newOpts = [...options];
                newOpts[idx] = e.target.value;
                setOptions(newOpts);
              }}
              className="w-full p-2 border rounded"
            />
          ))}

          <div>
            <label className="block mb-1 font-medium">
              Correct Option Index (0-3)
            </label>
            <input
              type="number"
              min={0}
              max={3}
              value={correctOption}
              onChange={(e) => setCorrectOption(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Marks</label>
            <input
              type="number"
              min={1}
              value={marks}
              onChange={(e) => setMarks(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-500 px-4 py-2 rounded text-white hover:bg-purple-600"
          >
            Add Question
          </button>
        </form>
      )}
    </main>
  );
}
