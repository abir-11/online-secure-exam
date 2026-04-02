"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  History, 
  Search, 
  CreditCard, 
  Calendar, 
  Clock, 
  Hash, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Loader2,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentHistoryPage() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const res = await fetch("/api/payments/history");
      const data = await res.json();
      setPayments(data.payments || []);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="font-black tracking-widest text-xs uppercase animate-pulse">Syncing Transactions...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.4em] mb-3">
              <ShieldCheck size={16} /> Secure Billing Portal
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Payment <span className="text-emerald-500">History.</span>
            </h1>
          </motion.div>
          
          {payments.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-900/30 backdrop-blur-md border border-emerald-500/20 p-6 rounded-[2rem] flex items-center gap-6 shadow-2xl"
            >
              <div className="flex flex-col">
                <span className="text-emerald-500/60 text-[10px] font-black uppercase tracking-widest">Total Investment</span>
                <span className="text-2xl font-black text-white">
                  ${(payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0) / 100).toFixed(2)}
                </span>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-emerald-950 shadow-lg shadow-emerald-500/20">
                <TrendingUp size={24} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Content Area */}
        {payments.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-20 bg-emerald-900/10 border-2 border-dashed border-emerald-800/50 rounded-[3rem] text-center"
          >
            <CreditCard className="w-16 h-16 text-emerald-800 mx-auto mb-4" />
            <p className="text-emerald-600 font-black uppercase tracking-widest text-sm">No transactions found</p>
          </motion.div>
        ) : (
          <div className="bg-emerald-900/10 border border-emerald-500/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-emerald-500/10 text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em]">
                    <th className="px-8 py-6 text-left">Item Details</th>
                    <th className="px-8 py-6 text-left">Amount</th>
                    <th className="px-8 py-6 text-left">Status</th>
                    <th className="px-8 py-6 text-left">Date & Time</th>
                    <th className="px-8 py-6 text-left">Transaction ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-500/5">
                  {payments.map((payment, index) => (
                    <motion.tr 
                      key={payment._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-emerald-500/5 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-800 group-hover:bg-emerald-500 group-hover:text-emerald-950 transition-all">
                            <History size={18} />
                          </div>
                          <span className="font-bold text-white text-md">{payment.courseName}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-emerald-400 font-black text-lg">
                          ${(payment.amount / 100).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 text-emerald-50/70 text-sm font-bold">
                            <Calendar size={14} className="text-emerald-500" /> {formatDate(payment.createdAt)}
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-500/40 text-[10px] font-black">
                            <Clock size={12} /> {formatTime(payment.createdAt)}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-emerald-100/30 group-hover:text-emerald-100/60 transition-colors font-mono text-xs">
                          <Hash size={14} /> {payment.transactionId || "N/A"}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.5em]">End of Billing Statement</p>
        </div>
      </div>
    </main>
  );
}

function StatusBadge({ status }) {
  const configs = {
    completed: { icon: <CheckCircle2 size={14} />, classes: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    pending: { icon: <AlertCircle size={14} />, classes: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    failed: { icon: <XCircle size={14} />, classes: "bg-red-500/10 text-red-500 border-red-500/20" },
  };

  const config = configs[status.toLowerCase()] || configs.pending;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${config.classes}`}>
      {config.icon}
      {status}
    </div>
  );
}