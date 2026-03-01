"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
                createdAt: new Date().toISOString(),
              };
            }
            return null;
          })
          .filter(Boolean);

        // 4️⃣ Merge messages & sort by newest first
        setMessages(
          [...baseMessages, ...examNotifications].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ),
        );
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    }

    fetchNotifications();
  }, [session]);

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {messages.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <ul className="space-y-3">
          {messages.map((msg) => (
            <li
              key={msg._id}
              className="bg-gray-200 p-4 rounded shadow flex justify-between"
            >
              <span>{msg.message}</span>
              <span className="text-gray-500 text-sm">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
