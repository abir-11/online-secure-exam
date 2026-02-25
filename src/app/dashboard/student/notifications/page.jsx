"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function NotificationsPage() {
  const [messages, setMessages] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();

        // Filter messages for logged-in student
        const studentMessages = data.filter(
          (msg) => msg.to === session.user.email,
        );

        setMessages(studentMessages);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    }

    if (session?.user?.email) {
      fetchMessages();
    }
  }, [session]);

  return (
    <main className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {messages.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <ul className="space-y-2">
          {messages
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((msg) => (
              <li
                key={msg._id}
                className="bg-gray-200 p-4 rounded shadow flex justify-between items-center"
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
