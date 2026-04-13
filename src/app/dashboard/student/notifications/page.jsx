"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FiBell, FiCalendar } from "react-icons/fi"; // Feather icons

export default function NotificationsPage() {
  const [messages, setMessages] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;

    async function fetchNotifications() {
      try {
        // 1️⃣ Fetch existing messages (batch, manual, published exams)
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

        // 4️⃣ Merge messages & sort by newest first
        setMessages(
          [
            ...baseMessages.map((m) => ({ ...m, type: "general" })),
            ...examNotifications,
          ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        );
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    }

    fetchNotifications();
  }, [session]);

  return (
    <main className="min-h-screen bg-emerald-950 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6 lg:px-0 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FiBell className="text-emerald-400 w-8 h-8" />
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
        </div>

        {/* Notifications List */}
        {messages.length === 0 ? (
          <div className="p-6 bg-emerald-900/30 border-l-4 border-emerald-400 text-emerald-100/90 rounded shadow-md flex items-center gap-3 backdrop-blur-md border border-emerald-700/50">
            <FiBell className="w-6 h-6" />
            <span>No notifications yet</span>
          </div>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className="bg-emerald-900/30 backdrop-blur-md p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 border-l-4 border border-emerald-700/50"
                style={{
                  borderLeftColor: msg.type === "exam" ? "#34D399" : "#10B981",
                }}
              >
                <div className="flex items-center gap-2">
                  {msg.type === "exam" ? (
                    <FiCalendar className="text-emerald-400 w-5 h-5" />
                  ) : (
                    <FiBell className="text-emerald-400 w-5 h-5" />
                  )}
                  <span className="text-white font-medium">{msg.message}</span>
                </div>
                <span className="text-emerald-300/70 text-sm mt-1 sm:mt-0">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
