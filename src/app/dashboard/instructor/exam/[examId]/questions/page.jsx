"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Eye, Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ExamQuestionsPage() {
  const { examId } = useParams();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);

  // Form state
  const [qText, setQText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [marks, setMarks] = useState(1);
  const [category, setCategory] = useState("");

  // Fetch exam & questions
  useEffect(() => {
    async function fetchExam() {
      try {
        const res = await fetch(`/api/exams/${examId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch exam");
        setExam(data.exam);
        setQuestions(data.exam.questions || []);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", err.message, "error");
      } finally {
        setLoading(false);
      }
    }
    fetchExam();
  }, [examId]);

  // ------------------- Add Question -------------------
  const openAdd = () => {
    setEditingQuestion(null);
    setQText("");
    setOptions(["", "", "", ""]);
    setCorrectOption(0);
    setMarks(1);
    setCategory("");
    setAddOpen(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      exam.type === "mcq" ? "/api/questions/create" : "/api/theory-questions";

    const payload =
      exam.type === "mcq"
        ? {
            examId,
            questionText: qText,
            options,
            correctOption,
            marks,
            category,
          }
        : { examId, questionText: qText, marks, category };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add question");

      setQuestions((prev) => [...prev, data.question]);

      setAddOpen(false);
      Swal.fire({
        icon: "success",
        title: "Question Added",
        text: "Question added successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
    }
  };

  // ------------------- Edit Question -------------------
  const openEdit = (q) => {
    setEditingQuestion(q);
    setQText(q.questionText);
    setMarks(q.marks || 1);
    setCategory(q.category || "");
    if (exam.type === "mcq") {
      setOptions(q.options || ["", "", "", ""]);
      setCorrectOption(q.correctOption || 0);
    }
    setEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingQuestion) return;

    const endpoint =
      exam.type === "mcq"
        ? "/api/questions/edit"
        : "/api/theory-questions/edit";

    const payload =
      exam.type === "mcq"
        ? {
            questionId: editingQuestion._id,
            questionText: qText,
            options,
            correctOption,
            marks,
            category,
          }
        : {
            questionId: editingQuestion._id,
            questionText: qText,
            marks,
            category,
          };

    try {
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to edit question");

      setQuestions((prev) =>
        prev.map((q) =>
          q._id === editingQuestion._id
            ? {
                ...q,
                questionText: qText,
                marks,
                category,
                options: exam.type === "mcq" ? options : q.options,
                correctOption:
                  exam.type === "mcq" ? correctOption : q.correctOption,
              }
            : q,
        ),
      );

      setEditOpen(false);
      setEditingQuestion(null);

      Swal.fire({
        icon: "success",
        title: "Question Updated",
        text: "Question updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
    }
  };

  // ------------------- Delete Question -------------------
  const handleDelete = async (q) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This question will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    const endpoint =
      exam.type === "mcq"
        ? "/api/questions/delete"
        : "/api/theory-questions/delete";

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: q._id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete question");

      setQuestions((prev) => prev.filter((item) => item._id !== q._id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Question deleted successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 p-8 text-center text-teal-600 font-semibold text-lg">
        <svg
          className="w-6 h-6 animate-spin text-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="text-teal-700 animate-pulse tracking-wide">
          Loading Exams...
        </span>
      </div>
    );

  return (
    <main className="bg-primary min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Exam: {exam?.title || "-"}
        </h1>

        <div className="mb-4">
          <button
            onClick={openAdd}
            className="px-4 py-2 bg-teal-600 text-white rounded"
          >
            Add Question
          </button>
        </div>

        {questions.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((q) => (
              <li
                key={q._id}
                className="p-4 bg-white shadow rounded-lg flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">{q.questionText}</p>

                  {exam.type === "mcq" && (
                    <ul className="list-disc pl-5 mt-1 text-sm text-gray-700">
                      {q.options?.map((opt, i) => (
                        <li
                          key={i}
                          className={
                            i === q.correctOption ? "text-green-600" : ""
                          }
                        >
                          {opt}
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="text-xs text-gray-500">
                    Marks: {q.marks || 1} | Category: {q.category || "-"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openEdit(q)}
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(q)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Add & Edit modals remain same */}
        {addOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 overflow-y-auto p-6">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Add Question</h2>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                {/* Question text */}
                <div>
                  <label className="block font-medium mb-1">
                    Question Text
                  </label>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    required
                  />
                </div>

                {/* MCQ options */}
                {exam.type === "mcq" &&
                  options.map((opt, i) => (
                    <div key={i}>
                      <label className="block mb-1">Option {i + 1}</label>
                      <input
                        className="w-full p-2 border rounded mb-1"
                        value={opt}
                        onChange={(e) => {
                          const arr = [...options];
                          arr[i] = e.target.value;
                          setOptions(arr);
                        }}
                        required
                      />
                    </div>
                  ))}

                {exam.type === "mcq" && (
                  <div>
                    <label className="block mb-1">Correct Option (0–3)</label>
                    <input
                      type="number"
                      min={0}
                      max={3}
                      value={correctOption}
                      onChange={(e) => setCorrectOption(Number(e.target.value))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}

                {/* Marks & Category */}
                <div>
                  <label className="block mb-1">Marks</label>
                  <input
                    type="number"
                    min={1}
                    value={marks}
                    onChange={(e) => setMarks(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Category</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">-- Select Category --</option>
                    <option value="Math">Math</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-300"
                    onClick={() => setAddOpen(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-green-600 text-white"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 overflow-y-auto p-6">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Edit Question</h2>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                {/* Question text */}
                <div>
                  <label className="block font-medium mb-1">
                    Question Text
                  </label>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    required
                  />
                </div>

                {/* MCQ options */}
                {exam.type === "mcq" &&
                  options.map((opt, i) => (
                    <div key={i}>
                      <label className="block mb-1">Option {i + 1}</label>
                      <input
                        className="w-full p-2 border rounded mb-1"
                        value={opt}
                        onChange={(e) => {
                          const arr = [...options];
                          arr[i] = e.target.value;
                          setOptions(arr);
                        }}
                        required
                      />
                    </div>
                  ))}

                {exam.type === "mcq" && (
                  <div>
                    <label className="block mb-1">Correct Option (0–3)</label>
                    <input
                      type="number"
                      min={0}
                      max={3}
                      value={correctOption}
                      onChange={(e) => setCorrectOption(Number(e.target.value))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                )}

                {/* Marks & Category */}
                <div>
                  <label className="block mb-1">Marks</label>
                  <input
                    type="number"
                    min={1}
                    value={marks}
                    onChange={(e) => setMarks(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1">Category</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">-- Select Category --</option>
                    <option value="Math">Math</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-300"
                    onClick={() => setEditOpen(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-teal-600 text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
