"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

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

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

// --- Components ---

const EventCard = ({ event }) => (
  <motion.div 
    variants={cardVariants}
    whileHover={{ y: -8 }}
    className="relative overflow-hidden rounded-2xl shadow-lg group border border-emerald-700/50"
  >
    <img
      src={event.image}
      alt={event.title}
      className="w-full h-56 object-cover brightness-75 group-hover:brightness-100 transition duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent">
      <h3 className="text-xl font-bold text-emerald-300 drop-shadow-md">{event.title}</h3>
      <p className="text-emerald-100/80 text-sm mt-1 font-medium">
        {event.date} | {event.location}
      </p>
    </div>
  </motion.div>
);

const UpcomingEventCard = ({ event }) => {
  const [interested, setInterested] = useState(false);
  
  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="bg-emerald-900/40 backdrop-blur-lg border border-emerald-700/50 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgb(0,0,0,0.3)] flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover brightness-90 hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-emerald-300 mb-2">
          {event.title}
        </h3>
        <p className="text-emerald-100/70 text-sm mb-6 flex-grow font-medium">
          {event.date} | {event.location}
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setInterested(!interested)}
          className={`w-full py-3 rounded-xl font-bold transition-all duration-300 shadow-md ${
            interested
              ? "bg-emerald-800/60 text-emerald-200 border border-emerald-600/50"
              : "bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:from-emerald-400 hover:to-teal-300 border border-emerald-400/50"
          }`}
        >
          {interested ? "✅ Interested" : "I'm Interested"}
        </motion.button>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-emerald-950 text-white px-4 sm:px-6 lg:px-12 py-20 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Previous Events Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 mb-10 text-center drop-shadow-sm">
            Previous Events
          </h1>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24"
        >
          {previousEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>

        {/* Upcoming Events Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 mb-10 text-center drop-shadow-sm">
            Upcoming Events
          </h1>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {upcomingEventsData.map((event) => (
            <UpcomingEventCard key={event.id} event={event} />
          ))}
        </motion.div>
        
      </div>
    </div>
  );
};

export default EventsPage;