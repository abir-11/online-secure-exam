"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { 
  Bell, 
  Calendar, 
  ShieldCheck, 
  Mail, 
  Clock, 
  Inbox,
  Loader2,
  ChevronRight
} from "lucide-react"; // আধুনিক Lucide Icons
import { motion } from "framer-motion";

export default function NotificationsPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;

    async function fetchNotifications() {
      try {
        setLoading(true);
        // 1️⃣ Fetch existing messages
        const resMessages = await fetch("/api/messages");
        const dataMessages = await resMessages.json();
        const baseMessages = (
          Array.isArray(dataMessages) ? dataMessages : []
        ).filter((msg) => msg.to === session.user.email);

        // 2️⃣ Fetch student exams
        const resExams = await fetch("/api/student/exams");
        const dataExams = await resExams.json();
        const exams = dataExams.exams || [];

        // 3️⃣ Create notifications for upcoming exams (within 3 days)
        const now = new Date();
        const examNotifications = exams
          .map((exam) => {
            const start = new Date(exam.startTime);
            const diffDays = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
            if (diffDays > 0 && diffDays <= 3) {
              return {
                _id: `exam-${exam._id}-${diffDays}`,
                to: session.user.email,
                message: `Upcoming exam "${exam.title}" in ${diffDays} day(s).`,
                type: "exam",
                createdAt: new Date().toISOString(),
              };
            }
            return null;
          })
          .filter(Boolean);

        // 4️⃣ Merge & Sort
        setMessages(
          [
            ...baseMessages.map((m) => ({ ...m, type: "general" })),
            ...examNotifications,
          ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        );
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [session]);

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="font-black tracking-widest text-xs uppercase animate-pulse">Fetching Alerts...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-3 mb-2 text-emerald-500 font-black text-xs uppercase tracking-[0.4em]">
            <ShieldCheck size={18} /> Secured Alert System
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Notifications<span className="text-emerald-500">.</span>
          </h1>
        </div>

        {/* List Content */}
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-20 bg-emerald-900/10 border-2 border-dashed border-emerald-800/50 rounded-[3rem] text-center"
          >
            <Inbox className="w-16 h-16 text-emerald-800 mx-auto mb-4" />
            <p className="text-emerald-600 font-black uppercase tracking-widest text-sm">Your inbox is empty</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative bg-emerald-950/40 border-l-4 p-6 rounded-[2rem] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:bg-emerald-900/20 backdrop-blur-md
                  ${msg.type === "exam" ? "border-emerald-500" : "border-emerald-800"}`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110
                    ${msg.type === "exam" ? "bg-emerald-500 text-emerald-950 shadow-emerald-500/20" : "bg-emerald-900 text-emerald-400 border border-emerald-800"}`}>
                    {msg.type === "exam" ? <Calendar size={22} /> : <Mail size={22} />}
                  </div>
                  
                  <div className="flex flex-col">
                    <p className="text-white font-bold text-lg leading-snug group-hover:text-emerald-400 transition-colors">
                      {msg.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-emerald-500/50 text-[10px] font-black uppercase tracking-widest">
                      <Clock size={12} />
                      {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="text-emerald-500" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.5em]">End of notifications</p>
        </div>
      </div>
    </main>
  );
}