// "use client";

// import React from "react";

// const eventsData = [
//   {
//     id: 1,
//     title: "AI & Future of Education",
//     date: "April 15, 2026",
//     time: "10:00 AM - 12:00 PM",
//     location: "Online Webinar",
//     description:
//       "Explore how AI is transforming education, learning techniques, and online assessment methods. Experts from around the world will share insights.",
//     image:
//       "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
//   },
//   {
//     id: 2,
//     title: "Hackathon 2026",
//     date: "May 2, 2026",
//     time: "9:00 AM - 6:00 PM",
//     location: "Tech Hub, Dhaka",
//     description:
//       "A full-day hackathon where students and professionals collaborate to build innovative tech solutions. Exciting prizes and networking opportunities await!",
//     image:
//       "https://images.unsplash.com/photo-1555949963-6c9c1c0e77c5?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
//   },
//   {
//     id: 3,
//     title: "Cybersecurity Workshop",
//     date: "May 20, 2026",
//     time: "2:00 PM - 5:00 PM",
//     location: "Online",
//     description:
//       "Learn practical cybersecurity skills to protect personal and organizational data. The workshop includes hands-on exercises and live demos.",
//     image:
//       "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
//   },
//   {
//     id: 4,
//     title: "Web Development Bootcamp",
//     date: "June 5, 2026",
//     time: "9:00 AM - 4:00 PM",
//     location: "Tech Park, Dhaka",
//     description:
//       "Intensive bootcamp covering HTML, CSS, JavaScript, and React. Build real projects and enhance your portfolio.",
//     image:
//       "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
//   },
//   {
//     id: 5,
//     title: "Data Science Seminar",
//     date: "June 18, 2026",
//     time: "1:00 PM - 3:00 PM",
//     location: "Online",
//     description:
//       "Discover the latest trends in data science, machine learning, and AI applications. Experts provide real-world case studies.",
//     image:
//       "https://images.unsplash.com/photo-1581090700227-1a0cf4a0e50f?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
//   },
//   {
//     id: 6,
//     title: "Startup Networking Event",
//     date: "July 2, 2026",
//     time: "6:00 PM - 9:00 PM",
//     location: "Innovation Hub, Dhaka",
//     description:
//       "Meet startup founders, investors, and tech enthusiasts. A great opportunity to pitch ideas and form collaborations.",
//     image:
//       "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
//   },
//   {
//     id: 7,
//     title: "Mobile App Development Workshop",
//     date: "July 15, 2026",
//     time: "10:00 AM - 4:00 PM",
//     location: "Online",
//     description:
//       "Hands-on workshop teaching Flutter and React Native. Create cross-platform apps and learn deployment tips.",
//     image:
//       "https://images.unsplash.com/photo-1581091215360-6a7b6a1c0b44?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
//   },
//   {
//     id: 8,
//     title: "Blockchain & Crypto Seminar",
//     date: "August 1, 2026",
//     time: "2:00 PM - 5:00 PM",
//     location: "Tech Center, Dhaka",
//     description:
//       "Understand blockchain technology, cryptocurrency trends, and decentralized applications. Suitable for beginners and enthusiasts.",
//     image:
//       "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
//   },
//   {
//     id: 9,
//     title: "Women in Tech Conference",
//     date: "August 12, 2026",
//     time: "9:00 AM - 5:00 PM",
//     location: "Conference Hall, Dhaka",
//     description:
//       "Empowering women in technology. Keynote speeches, panel discussions, and networking sessions with leading female tech leaders.",
//     image:
//       "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
//   },
//   {
//     id: 10,
//     title: "Digital Marketing Bootcamp",
//     date: "August 25, 2026",
//     time: "11:00 AM - 3:00 PM",
//     location: "Online",
//     description:
//       "Learn SEO, social media marketing, and analytics. Practical exercises to boost your digital presence and campaign performance.",
//     image:
//       "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
//   },
// ];

// const EventCard = ({ event }) => (
//   <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-transform duration-300 hover:scale-105">
//     <img
//       src={event.image}
//       alt={event.title}
//       className="w-full h-48 object-cover"
//     />
//     <div className="p-6">
//       <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-green-400">
//         {event.title}
//       </h3>
//       <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
//         {event.date} | {event.time} | {event.location}
//       </p>
//       <p className="text-gray-700 dark:text-gray-300 mb-4">
//         {event.description}
//       </p>
//       <button className="bg-green-800 dark:bg-green-700 text-white font-medium px-4 py-2 rounded hover:bg-green-900 dark:hover:bg-green-600 transition">
//         Register
//       </button>
//     </div>
//   </div>
// );

// const EventsPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 md:px-12">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-12">
//           Upcoming Events
//         </h1>
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {eventsData.map((event) => (
//             <EventCard key={event.id} event={event} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventsPage;

"use client";

import React, { useState } from "react";

// Previous events (no register button)
const previousEvents = [
  {
    id: 1,
    title: "AI & Future of Education",
    date: "April 15, 2026",
    location: "Online Webinar",
    image:
      "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
  },
  {
    id: 2,
    title: "Cybersecurity Workshop",
    date: "May 20, 2026",
    location: "Online",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    date: "June 5, 2026",
    location: "Tech Park, Dhaka",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?crop=entropy&cs=tinysrgb&fit=max&w=800&q=80",
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
