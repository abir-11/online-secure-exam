"use client";

import { motion } from "framer-motion";
import { FiPlayCircle, FiFileText, FiTool } from "react-icons/fi";

export default function Tutorials() {
  const tutorials = [
    {
      title: "Beginner's Guide to SecureExam",
      desc: "Learn the basics of setting up your first exam in just 10 minutes. Perfect for absolute beginners.",
      icon: <FiPlayCircle size={40} />,
      btnText: "Watch Video",
    },
    {
      title: "Advanced API Integration",
      desc: "Deep dive into connecting our proctoring API with your existing backend servers safely.",
      icon: <FiFileText size={40} />,
      btnText: "Read Article",
    },
    {
      title: "Troubleshooting & Support",
      desc: "Stuck? Here is how to fix the most common issues students and admins face during exams.",
      icon: <FiTool size={40} />,
      btnText: "View Guide",
    },
    {
      title: "Customizing the Dashboard",
      desc: "Learn how to tweak the UI/UX of the examiner dashboard to fit your institutional branding.",
      icon: <FiPlayCircle size={40} />,
      btnText: "Watch Video",
    },
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-[#c9ebd8] py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#5FDC9E]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#5FDC9E] drop-shadow-sm">
          Latest Tutorials
        </h1>
        <p className="text-[#c9ebd8]/80 text-lg font-medium max-w-xl mx-auto">
          Master the tools with our step-by-step guides and video tutorials.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
      >
        {tutorials.map((tut, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
            className="bg-[#024936] border border-[#035c44] rounded-2xl overflow-hidden flex flex-col group"
          >
            {/* Card Header / Icon Area */}
            <div className="h-40 bg-[#1e2925] flex items-center justify-center text-[#5FDC9E] group-hover:scale-105 transition-transform duration-500">
              {tut.icon}
            </div>

            {/* Card Body */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#5FDC9E] transition-colors">
                {tut.title}
              </h3>
              <p className="text-[#c9ebd8]/80 mb-6 flex-1">
                {tut.desc}
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-[#035c44] hover:bg-[#5FDC9E] text-[#5FDC9E] hover:text-[#024936] font-bold rounded-xl transition-all border border-[#5FDC9E]/30 hover:border-transparent"
              >
                {tut.btnText}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}