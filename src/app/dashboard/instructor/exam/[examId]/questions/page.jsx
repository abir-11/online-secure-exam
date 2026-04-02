"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Eye, Edit, Trash2, Plus, ArrowLeft, BookOpen, CheckCircle2, ListNumbers } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ExamQuestionsPage() {
  const { examId } = useParams();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Form state
  const [qText, setQText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [marks, setMarks] = useState(1);
  const [category, setCategory] = useState("");

  const swalTheme = {
    background: "#022c22",
    color: "#fff",
    confirmButtonColor: "#10B981",
    cancelButtonColor: "#ef4444",
  };

  useEffect(() => {
    async function fetchExam() {
      try {
        const res = await fetch(`/api/exams/${examId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch exam");
        setExam(data.exam);
        setQuestions(data.exam.questions || []);
      } catch (err) {
        Swal.fire({ icon: "error", title: "Error", text: err.message, ...swalTheme });
      } finally {
        setLoading(false);
      }
    }
    fetchExam();
  }, [examId]);

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
    const endpoint = exam.type === "mcq" ? "/api/questions/create" : "/api/theory-questions";
    const payload = exam.type === "mcq" 
      ? { examId, questionText: qText, options, correctOption, marks, category }
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
      Swal.fire({ icon: "success", title: "Added!", timer: 1500, showConfirmButton: false, ...swalTheme });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message, ...swalTheme });
    }
  };

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
    const endpoint = exam.type === "mcq" ? "/api/questions/edit" : "/api/theory-questions/edit";
    const payload = exam.type === "mcq"
      ? { questionId: editingQuestion._id, questionText: qText, options, correctOption, marks, category }
      : { questionId: editingQuestion._id, questionText: qText, marks, category };

    try {
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Update failed");

      setQuestions((prev) => prev.map((q) => q._id === editingQuestion._id ? { ...q, questionText: qText, marks, category, options, correctOption } : q));
      setEditOpen(false);
      Swal.fire({ icon: "success", title: "Updated!", timer: 1500, showConfirmButton: false, ...swalTheme });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message, ...swalTheme });
    }
  };

  const handleDelete = async (q) => {
    const result = await Swal.fire({
      title: "Delete Question?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      ...swalTheme
    });

    if (!result.isConfirmed) return;
    const endpoint = exam.type === "mcq" ? "/api/questions/delete" : "/api/theory-questions/delete";

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: q._id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setQuestions((prev) => prev.filter((item) => item._id !== q._id));
      Swal.fire({ icon: "success", title: "Deleted!", timer: 1500, ...swalTheme });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message, ...swalTheme });
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="animate-pulse">Loading Exam Data...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 p-4 sm:p-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Link href="/instructor/exams" className="text-emerald-400 flex items-center gap-2 text-sm hover:underline mb-2">
              <ArrowLeft size={14} /> Back to Exams
            </Link>
            <h1 className="text-3xl font-black text-white">
              {exam?.title} <span className="text-emerald-500 text-lg font-normal ml-2">({exam?.type?.toUpperCase()})</span>
            </h1>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg"
          >
            <Plus size={20} /> Add New Question
          </button>
        </div>

        {/* Questions List */}
        {questions.length === 0 ? (
          <div className="text-center py-20 bg-emerald-900/20 border border-emerald-800/50 rounded-3xl">
            <BookOpen size={48} className="mx-auto text-emerald-700 mb-4" />
            <p className="text-emerald-100/50">No questions added to this exam yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {questions.map((q, idx) => (
              <motion.div
                key={q._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-emerald-900/30 border border-emerald-800/40 p-5 rounded-2xl flex justify-between items-start group hover:border-emerald-500/30 transition-all shadow-md"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-emerald-800 text-emerald-300 text-xs font-bold px-2 py-1 rounded">Q{idx + 1}</span>
                    <span className="text-emerald-500/60 text-xs font-medium uppercase tracking-wider">{q.category} • {q.marks} Marks</span>
                  </div>
                  <p className="text-white text-lg font-medium mb-3">{q.questionText}</p>

                  {exam.type === "mcq" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options?.map((opt, i) => (
                        <div key={i} className={`text-sm p-2 rounded-lg flex items-center gap-2 ${i === q.correctOption ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-emerald-950/40 text-emerald-100/50"}`}>
                          {i === q.correctOption ? <CheckCircle2 size={14}/> : <div className="w-3.5 h-3.5 rounded-full border border-emerald-700"/>}
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button onClick={() => openEdit(q)} className="p-2 bg-emerald-800/50 text-emerald-400 hover:bg-emerald-400 hover:text-emerald-950 rounded-lg transition-all">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(q)} className="p-2 bg-rose-900/30 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Overlay Component */}
      <AnimatePresence>
        {(addOpen || editOpen) && (
          <div className="fixed inset-0 bg-emerald-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-emerald-900 border border-emerald-700 w-full max-w-xl rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                {addOpen ? <Plus className="text-emerald-400"/> : <Edit className="text-emerald-400"/>}
                {addOpen ? "Add Question" : "Edit Question"}
              </h2>

              <form onSubmit={addOpen ? handleAddSubmit : handleEditSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-emerald-200 text-sm font-medium">Question Text</label>
                  <textarea
                    className="w-full bg-emerald-950 border border-emerald-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    rows="3"
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    required
                  />
                </div>

                {exam.type === "mcq" && (
                  <div className="space-y-3">
                    <label className="text-emerald-200 text-sm font-medium">Options</label>
                    <div className="grid gap-3">
                      {options.map((opt, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            placeholder={`Option ${i + 1}`}
                            className={`flex-1 bg-emerald-950 border rounded-xl p-3 text-white outline-none transition-all ${correctOption === i ? "border-emerald-500 ring-1 ring-emerald-500" : "border-emerald-700"}`}
                            value={opt}
                            onChange={(e) => {
                              const arr = [...options];
                              arr[i] = e.target.value;
                              setOptions(arr);
                            }}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setCorrectOption(i)}
                            className={`px-3 rounded-xl transition-all ${correctOption === i ? "bg-emerald-500 text-emerald-950" : "bg-emerald-800 text-emerald-400"}`}
                          >
                            <CheckCircle2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-emerald-200 text-sm font-medium">Marks</label>
                    <input
                      type="number"
                      className="w-full bg-emerald-950 border border-emerald-700 rounded-xl p-3 text-white outline-none"
                      value={marks}
                      onChange={(e) => setMarks(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-emerald-200 text-sm font-medium">Category</label>
                    <select
                      className="w-full bg-emerald-950 border border-emerald-700 rounded-xl p-3 text-white outline-none"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option value="Math">Math</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    className="flex-1 py-3 bg-emerald-800 text-emerald-300 rounded-xl font-bold hover:bg-emerald-700 transition-all"
                    onClick={() => { setAddOpen(false); setEditOpen(false); }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-emerald-500 text-emerald-950 rounded-xl font-bold hover:bg-emerald-400 transition-all shadow-lg"
                  >
                    {addOpen ? "Add Question" : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}