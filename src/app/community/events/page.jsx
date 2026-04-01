"use client";

import React, { useState } from "react";

// Previous events (no register button)
const previousEvents = [
  {
    id: 1,
    title: "AI & Future of Education",
    date: "January 15, 2026",
    location: "Online Webinar",
    image:
      "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
  },
  {
    id: 2,
    title: "Cybersecurity Workshop",
    date: "February 20, 2026",
    location: "Online",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    date: "March 5, 2026",
    location: "Tech Park, Dhaka",
    image:
      "https://plus.unsplash.com/premium_photo-1663040543387-cb7c78c4f012?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Upcoming events (with dynamic Interested button)
const upcomingEventsData = [
  {
    id: 1,
    title: "Blockchain & Crypto Seminar",
    date: "August 1, 2026",
    location: "Tech Center, Dhaka",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
  },
  {
    id: 2,
    title: "Women in Tech Conference",
    date: "August 12, 2026",
    location: "Conference Hall, Dhaka",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
  },
  {
    id: 3,
    title: "Digital Marketing Bootcamp",
    date: "August 25, 2026",
    location: "Online",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
  },
];

const EventCard = ({ event }) => (
  <div className="relative overflow-hidden rounded-xl shadow-lg group">
    <img
      src={event.image}
      alt={event.title}
      className="w-full h-48 object-cover brightness-75 group-hover:brightness-90 transition"
    />
    <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/50">
      <h3 className="text-xl font-semibold text-green-200">{event.title}</h3>
      <p className="text-gray-300 text-sm">
        {event.date} | {event.location}
      </p>
    </div>
  </div>
);

const UpcomingEventCard = ({ event }) => {
  const [interested, setInterested] = useState(false);
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover brightness-90"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-green-400 mb-2">
          {event.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          {event.date} | {event.location}
        </p>
        <button
          onClick={() => setInterested(!interested)}
          className={`px-4 py-2 rounded font-medium transition ${
            interested
              ? "bg-gray-600 text-white hover:bg-gray-500"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {interested ? "Interested ✅" : "I'm Interested"}
        </button>
      </div>
    </div>
  );
};

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] text-white px-4 sm:px-6 lg:px-12 py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-green-400 mb-12">
          Previous Events
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {previousEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <h1 className="text-4xl font-extrabold text-green-400 mb-12">
          Upcoming Events
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEventsData.map((event) => (
            <UpcomingEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
