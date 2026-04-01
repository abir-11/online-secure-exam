"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { blogs } from "./data";

export default function BlogPage() {
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

  return (
    <div className="min-h-screen bg-emerald-950 text-white px-4 sm:px-6 lg:px-12 py-20 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Heading Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 drop-shadow-sm">
            Community & Blogs
          </h1>
          <p className="text-emerald-100/80 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Explore insights, tips, and the latest updates about the SecureExam platform.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs.map((blog) => (
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8 }}
              key={blog.id}
              className="bg-emerald-900/40 backdrop-blur-lg border border-emerald-700/50 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgb(0,0,0,0.3)] flex flex-col group"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold mb-3 text-emerald-300 drop-shadow-sm line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-emerald-100/70 text-base mb-6 flex-grow line-clamp-3">
                  {blog.description}
                </p>

                {/* ✅ Fixed Link (Removed nested button) */}
                <Link 
                  href={`/community/blog/${blog.id}`}
                  className="inline-block"
                >
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 px-5 py-3 rounded-xl text-center font-bold transition-all duration-300 shadow-md border border-emerald-500/30 text-white"
                  >
                    Read More →
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}