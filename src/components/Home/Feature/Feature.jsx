"use client";

import { motion } from "framer-motion";


import { BsStopwatch } from "react-icons/bs";
import { FaHourglassEnd, FaChartPie, FaChartLine, FaDatabase, FaCalendarAlt, FaUsersCog } from "react-icons/fa";
import { SiLogstash } from "react-icons/si";
import { RiShuffleLine } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";

const features = [
  {
    id: 1,
    title: "Timed Examination",
    description: "Real-time countdown timer with automatic start and 1-minute warning notifications.",
    icon: BsStopwatch,
    image: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=600&auto=format&fit=crop" // Clock/Timer picture
  },
  {
    id: 2,
    title: "Auto Submission",
    description: "Strict time enforcement with automatic submission when timer reaches zero.",
    icon: FaHourglassEnd,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop" // Laptop working
  },
  {
    id: 3,
    title: "Proctor Activity Logs",
    description: "Detects and logs tab switching, window blur, and page reload attempts.",
    icon: SiLogstash,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&auto=format&fit=crop" // Screen/Logs
  },
  {
    id: 4,
    title: "Question & Option Shuffle",
    description: "Unique question and option order for each student to prevent cheating.",
    icon: RiShuffleLine,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop" // Paper/Exam desk
  },
  {
    id: 5,
    title: "Auto Grading System",
    description: "Instant MCQ grading with automatic marks calculation.",
    icon: IoIosCheckmarkCircle,
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=600&auto=format&fit=crop" // Grades/Tick mark
  },
  {
    id: 6,
    title: "Instant Score Breakdown",
    description: "View total score, correct/incorrect answers, percentage, and pass/fail status.",
    icon: FaChartPie,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop" // Pie chart/Dashboard
  },
  {
    id: 7,
    title: "Analytics Dashboard",
    description: "Track averages, highest/lowest marks, pass/fail ratios, and question accuracy.",
    icon: FaChartLine,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop" // Data charts
  },
  {
    id: 8,
    title: "Question Bank Management",
    description: "Add, edit, delete questions with marks and subject categorization.",
    icon: FaDatabase,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop" // Digital library/Database
  },
  {
    id: 9,
    title: "Exam Scheduling",
    description: "Create exams, set duration, and get upcoming exam notifications.",
    icon: FaCalendarAlt,
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=600&auto=format&fit=crop" // Calendar/Planning
  },
  {
    id: 10,
    title: "Role-Based Dashboards",
    description: "Separate dashboards for Admin, Instructor, and Students.",
    icon: FaUsersCog,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" // Team/Users
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Feature() {
  return (
    <section className="py-10 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0c7d66] mb-4">
            Advanced <span className="bg-linear-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">Exam Features</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a seamless, automated, and highly secure environment tailored for modern online assessments.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-white rounded-2xl shadow-md overflow-hidden group cursor-pointer flex flex-col transition-all duration-300 border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative w-full h-48 bg-gray-200 overflow-hidden shrink-0 block">
                <motion.img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.5 }}
                  // Error Fallback
                  onError={(e) => {
                    e.currentTarget.src = "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600";
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition duration-300 pointer-events-none z-10"></div>

                {/* Floating Icon inside Image */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-[#0c7d66] z-20 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-xl" />
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3 
                    group-hover:bg-gradient-to-r 
group-hover:from-[#0D7C66] 
group-hover:to-[#41B3A2] 
group-hover:bg-clip-text 
group-hover:text-transparent 
transition-all duration-300 
flex items-center gap-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}