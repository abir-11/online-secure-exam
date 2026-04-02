"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal";
import { 
  Trophy, 
  Clock, 
  HelpCircle, 
  ArrowLeft, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Loader2,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CertificationExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 6;

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await fetch("/api/exam/paid-exam");
      const data = await res.json();
      setExams(data.exams || []);
    } catch (error) {
      console.error("Error fetching exams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyExam = (exam) => {
    setSelectedExam(exam);
    setShowPaymentModal(true);
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
    setSelectedExam(null);
  };

  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);
  const totalPages = Math.ceil(exams.length / examsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-black tracking-widest text-xs uppercase animate-pulse">Loading Certifications...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.3em] mb-3">
              <ShieldCheck size={16} /> Industry Recognized
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Certification <span className="text-emerald-500">Exams</span>
            </h1>
            <p className="text-emerald-100/60 font-medium text-lg max-w-xl">
              Validate your expertise and accelerate your career with our specialized assessments.
            </p>
          </div>

          <Link 
            href="/dashboard/student/online-courses"
            className="group flex items-center gap-3 px-6 py-3 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-400 border border-emerald-800/50 rounded-2xl transition-all font-bold text-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Categories
          </Link>
        </div>

        {/* Info Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/10 border border-emerald-500/20 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl mb-12 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
              <Trophy className="text-emerald-950" size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Professional Standards</h2>
              <p className="text-emerald-100/70 leading-relaxed font-medium">
                Choose an exam to begin. Each certification is designed by industry experts to ensure your skills meet modern market demands. 
                Upon successful completion, you will receive a verifiable digital credential.
              </p>
            </div>
          </div>
        </motion.div>
        
        {exams.length === 0 ? (
          <div className="bg-emerald-950/50 border-2 border-dashed border-emerald-800 p-20 rounded-[3rem] text-center">
            <Sparkles className="w-12 h-12 text-emerald-800 mx-auto mb-4" />
            <p className="text-emerald-600 font-black uppercase tracking-widest">No active certifications available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentExams.map((exam, index) => (
              <motion.div 
                key={exam._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-emerald-900/20 border border-emerald-800/50 rounded-[2.5rem] p-8 hover:border-emerald-500/40 transition-all group flex flex-col h-full"
              >
                <div className="mb-6">
                  <h3 className="font-black text-2xl text-white group-hover:text-emerald-400 transition-colors leading-tight mb-2">
                    {exam.title}
                  </h3>
                  <p className="text-emerald-100/50 text-sm line-clamp-2 font-medium">
                    {exam.description}
                  </p>
                </div>

                <div className="flex gap-3 mb-8 mt-auto">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/60 border border-emerald-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    <Clock size={12} /> {exam.duration}m
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/60 border border-emerald-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-400">
                    <HelpCircle size={12} /> {exam.totalQuestions} Qs
                  </div>
                </div>

                <button 
                  onClick={() => handleBuyExam(exam)}
                  className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
                >
                  <CreditCard size={18} /> Enroll - ${(exam.price / 100).toFixed(2)}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Premium Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 gap-3">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-3 rounded-xl transition-all ${
                currentPage === 1 
                  ? "text-emerald-900 bg-emerald-900/10 cursor-not-allowed" 
                  : "text-emerald-400 bg-emerald-900/40 hover:bg-emerald-500 hover:text-emerald-950"
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-12 h-12 rounded-xl font-black transition-all ${
                    currentPage === index + 1
                      ? "bg-emerald-500 text-emerald-950 shadow-xl shadow-emerald-500/20"
                      : "bg-emerald-900/40 text-emerald-400 hover:bg-emerald-800"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-xl transition-all ${
                currentPage === totalPages 
                  ? "text-emerald-900 bg-emerald-900/10 cursor-not-allowed" 
                  : "text-emerald-400 bg-emerald-900/40 hover:bg-emerald-500 hover:text-emerald-950"
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedExam && (
          <PaymentModal 
            course={selectedExam} 
            onClose={handlePaymentClose} 
            itemType="exam" 
          />
        )}
      </AnimatePresence>
    </main>
  );
}