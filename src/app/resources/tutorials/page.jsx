"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaClock, FaUser } from "react-icons/fa";
import { FiCode, FiFileText, FiPlayCircle, FiTool, FiX } from "react-icons/fi";

export default function TutorialsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTutorial, setActiveTutorial] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/auth/login");
  }, [session, status, router]);

  useEffect(() => {
    if (!activeTutorial) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveTutorial(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeTutorial]);

  const tutorials = useMemo(
    () => [
      {
        id: 1,
        title: "HTML & CSS Full Course - Beginner to Pro",
        description:
          "Complete guide to HTML and CSS fundamentals, from basic markup to advanced styling techniques.",
        duration: "2+ hours",
        level: "Beginner",
        instructor: "SuperSimpleDev",
        embedUrl: "https://www.youtube.com/embed/mU6anWqZJcc",
        icon: <FiFileText size={40} />,
      },
      {
        id: 2,
        title: "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
        description:
          "Comprehensive introduction to JavaScript programming, covering variables, functions, and DOM manipulation.",
        duration: "1 hour",
        level: "Beginner",
        instructor: "Programming with Mosh",
        embedUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
        icon: <FiPlayCircle size={40} />,
      },
      {
        id: 3,
        title: "React Tutorial for Beginners",
        description:
          "Learn React from scratch with practical examples and build your first React applications.",
        duration: "1.5 hours",
        level: "Intermediate",
        instructor: "Programming with Mosh",
        embedUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        icon: <FiTool size={40} />,
      },
      {
        id: 4,
        title: "Node.js and Express.js - Full Course",
        description:
          "Build server-side applications with Node.js and create REST APIs using Express.js framework.",
        duration: "3 hours",
        level: "Intermediate",
        instructor: "freeCodeCamp.org",
        embedUrl: "https://www.youtube.com/embed/Oe421EPjeBE",
        icon: <FiCode size={40} />,
      },
      {
        id: 5,
        title: "Tailwind CSS Full Course",
        description:
          "Master utility-first CSS framework and learn to build modern, responsive web interfaces.",
        duration: "2 hours",
        level: "Beginner",
        instructor: "Developedbyed",
        embedUrl: "https://www.youtube.com/embed/3m3j-0d3j-U",
        icon: <FiFileText size={40} />,
      },
      {
        id: 6,
        title: "Python for Beginners - Learn Python in 1 Hour",
        description:
          "Quick introduction to Python programming language, perfect for getting started with coding.",
        duration: "1 hour",
        level: "Beginner",
        instructor: "Programming with Mosh",
        embedUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
        icon: <FiTool size={40} />,
      },
    ],
    []
  );

  const getLevelBadgeClasses = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-[#035c44] text-[#5FDC9E] border border-[#035c44]/60";
      case "Intermediate":
        return "bg-yellow-500/15 text-yellow-200 border border-yellow-500/20";
      case "Advanced":
        return "bg-red-500/15 text-red-200 border border-red-500/20";
      default:
        return "bg-[#1e2925] text-[#c9ebd8] border border-[#035c44]";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-emerald-950 text-[#c9ebd8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5FDC9E] mx-auto" />
          <p className="mt-4 text-[#c9ebd8]/80">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-emerald-950 text-[#c9ebd8] py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#5FDC9E]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 flex items-start justify-between gap-6 flex-wrap">
          <Link
            href="/resources"
            className="inline-flex items-center text-[#c9ebd8] hover:text-[#5FDC9E] transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Resources
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center flex-1 min-w-[260px]"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#5FDC9E] drop-shadow-sm">
              Latest Tutorials
            </h1>
            <p className="text-[#c9ebd8]/80 text-lg font-medium max-w-xl mx-auto">
              Master the tools with step-by-step guides and video tutorials.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {tutorials.map((tut) => (
            <motion.div
              key={tut.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
              }}
              className="bg-[#024936] border border-[#035c44] rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="h-40 bg-[#1e2925] flex items-center justify-center text-[#5FDC9E] group-hover:scale-105 transition-transform duration-500">
                {tut.icon}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#5FDC9E] transition-colors">
                  {tut.title}
                </h3>
                <p className="text-[#c9ebd8]/80 mb-4 flex-1">{tut.description}</p>

                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center text-[#c9ebd8]/80">
                    <FaClock className="mr-2 text-[#5FDC9E]" />
                    {tut.duration}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeClasses(
                      tut.level
                    )}`}
                  >
                    {tut.level}
                  </span>
                </div>

                <div className="flex items-center text-sm text-[#c9ebd8]/70 mb-5">
                  <FaUser className="mr-2 text-[#5FDC9E]" />
                  {tut.instructor}
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTutorial(tut)}
                  className="w-full py-3 bg-[#035c44] hover:bg-[#5FDC9E] text-[#5FDC9E] hover:text-[#024936] font-bold rounded-xl transition-all border border-[#5FDC9E]/30 hover:border-transparent"
                >
                  Watch Video
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 bg-[#024936] border border-[#035c44] rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Enhance Your Learning Journey
          </h2>
          <p className="text-[#c9ebd8]/80 mb-6 max-w-2xl mx-auto">
            These tutorials are designed to strengthen your skills and prepare you
            for real technical challenges. Continue exploring documentation or
            reach out for additional support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources/docs"
              className="bg-[#035c44] hover:bg-[#5FDC9E] text-[#5FDC9E] hover:text-[#024936] px-6 py-3 rounded-xl font-bold transition-all border border-[#5FDC9E]/30 hover:border-transparent text-center"
            >
              View Documentation
            </Link>
            <Link
              href="/support/contact"
              className="border border-[#5FDC9E]/40 text-[#5FDC9E] px-6 py-3 rounded-xl font-bold hover:bg-[#035c44] hover:border-transparent transition-all text-center"
            >
              Get Support
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveTutorial(null)}
            />

            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#024936] border border-[#035c44] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 p-4 border-b border-[#035c44]">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    {activeTutorial.title}
                  </h2>
                  <p className="text-sm text-[#c9ebd8]/70 mt-1">
                    {activeTutorial.duration} • {activeTutorial.level} •{" "}
                    {activeTutorial.instructor}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTutorial(null)}
                  aria-label="Close"
                  className="p-2 rounded-lg hover:bg-[#035c44] transition-colors text-[#c9ebd8]"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="p-4">
                <iframe
                  className="w-full aspect-video"
                  src={activeTutorial.embedUrl}
                  title={activeTutorial.title}
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaClock, FaUser } from "react-icons/fa";
import { FiCode, FiFileText, FiPlayCircle, FiTool, FiX } from "react-icons/fi";

export default function TutorialsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTutorial, setActiveTutorial] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/auth/login");
  }, [session, status, router]);

  useEffect(() => {
    if (!activeTutorial) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveTutorial(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeTutorial]);

  const tutorials = useMemo(
    () => [
      {
        id: 1,
        title: "HTML & CSS Full Course - Beginner to Pro",
        description:
          "Complete guide to HTML and CSS fundamentals, from basic markup to advanced styling techniques.",
        duration: "2+ hours",
        level: "Beginner",
        instructor: "SuperSimpleDev",
        embedUrl: "https://www.youtube.com/embed/mU6anWqZJcc",
        icon: <FiFileText size={40} />,
      },
      {
        id: 2,
        title: "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
        description:
          "Comprehensive introduction to JavaScript programming, covering variables, functions, and DOM manipulation.",
        duration: "1 hour",
        level: "Beginner",
        instructor: "Programming with Mosh",
        embedUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
        icon: <FiPlayCircle size={40} />,
      },
      {
        id: 3,
        title: "React Tutorial for Beginners",
        description:
          "Learn React from scratch with practical examples and build your first React applications.",
        duration: "1.5 hours",
        level: "Intermediate",
        instructor: "Programming with Mosh",
        embedUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        icon: <FiTool size={40} />,
      },
      {
        id: 4,
        title: "Node.js and Express.js - Full Course",
        description:
          "Build server-side applications with Node.js and create REST APIs using Express.js framework.",
        duration: "3 hours",
        level: "Intermediate",
        instructor: "freeCodeCamp.org",
        embedUrl: "https://www.youtube.com/embed/Oe421EPjeBE",
        icon: <FiCode size={40} />,
      },
      {
        id: 5,
        title: "Tailwind CSS Full Course",
        description:
          "Master utility-first CSS framework and learn to build modern, responsive web interfaces.",
        duration: "2 hours",
        level: "Beginner",
        instructor: "Developedbyed",
        embedUrl: "https://www.youtube.com/embed/3m3j-0d3j-U",
        icon: <FiFileText size={40} />,
      },
      {
        id: 6,
        title: "Python for Beginners - Learn Python in 1 Hour",
        description:
          "Quick introduction to Python programming language, perfect for getting started with coding.",
        duration: "1 hour",
        level: "Beginner",
        instructor: "Programming with Mosh",
        embedUrl: "https://www.youtube.com/embed/kqtD5dpn9C8",
        icon: <FiTool size={40} />,
      },
    ],
    []
  );

  const getLevelBadgeClasses = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-[#035c44] text-[#5FDC9E] border border-[#035c44]/60";
      case "Intermediate":
        return "bg-yellow-500/15 text-yellow-200 border border-yellow-500/20";
      case "Advanced":
        return "bg-red-500/15 text-red-200 border border-red-500/20";
      default:
        return "bg-[#1e2925] text-[#c9ebd8] border border-[#035c44]";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-emerald-950 text-[#c9ebd8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5FDC9E] mx-auto" />
          <p className="mt-4 text-[#c9ebd8]/80">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-emerald-950 text-[#c9ebd8] py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#5FDC9E]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 flex items-start justify-between gap-6 flex-wrap">
          <Link
            href="/resources"
            className="inline-flex items-center text-[#c9ebd8] hover:text-[#5FDC9E] transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Resources
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center flex-1 min-w-[260px]"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#5FDC9E] drop-shadow-sm">
              Latest Tutorials
            </h1>
            <p className="text-[#c9ebd8]/80 text-lg font-medium max-w-xl mx-auto">
              Master the tools with step-by-step guides and video tutorials.
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {tutorials.map((tut) => (
            <motion.div
              key={tut.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
              }}
              className="bg-[#024936] border border-[#035c44] rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="h-40 bg-[#1e2925] flex items-center justify-center text-[#5FDC9E] group-hover:scale-105 transition-transform duration-500">
                {tut.icon}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#5FDC9E] transition-colors">
                  {tut.title}
                </h3>
                <p className="text-[#c9ebd8]/80 mb-4 flex-1">{tut.description}</p>

                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center text-[#c9ebd8]/80">
                    <FaClock className="mr-2 text-[#5FDC9E]" />
                    {tut.duration}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeClasses(
                      tut.level
                    )}`}
                  >
                    {tut.level}
                  </span>
                </div>

                <div className="flex items-center text-sm text-[#c9ebd8]/70 mb-5">
                  <FaUser className="mr-2 text-[#5FDC9E]" />
                  {tut.instructor}
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTutorial(tut)}
                  className="w-full py-3 bg-[#035c44] hover:bg-[#5FDC9E] text-[#5FDC9E] hover:text-[#024936] font-bold rounded-xl transition-all border border-[#5FDC9E]/30 hover:border-transparent"
                >
                  Watch Video
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-16 bg-[#024936] border border-[#035c44] rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Enhance Your Learning Journey
          </h2>
          <p className="text-[#c9ebd8]/80 mb-6 max-w-2xl mx-auto">
            These tutorials are designed to strengthen your skills and prepare you
            for real technical challenges. Continue exploring documentation or
            reach out for additional support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources/docs"
              className="bg-[#035c44] hover:bg-[#5FDC9E] text-[#5FDC9E] hover:text-[#024936] px-6 py-3 rounded-xl font-bold transition-all border border-[#5FDC9E]/30 hover:border-transparent text-center"
            >
              View Documentation
            </Link>
            <Link
              href="/support/contact"
              className="border border-[#5FDC9E]/40 text-[#5FDC9E] px-6 py-3 rounded-xl font-bold hover:bg-[#035c44] hover:border-transparent transition-all text-center"
            >
              Get Support
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveTutorial(null)}
            />

            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#024936] border border-[#035c44] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 p-4 border-b border-[#035c44]">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    {activeTutorial.title}
                  </h2>
                  <p className="text-sm text-[#c9ebd8]/70 mt-1">
                    {activeTutorial.duration} • {activeTutorial.level} •{" "}
                    {activeTutorial.instructor}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTutorial(null)}
                  aria-label="Close"
                  className="p-2 rounded-lg hover:bg-[#035c44] transition-colors text-[#c9ebd8]"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="p-4">
                <iframe
                  className="w-full aspect-video"
                  src={activeTutorial.embedUrl}
                  title={activeTutorial.title}
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

<<<<<<< HEAD
"use client";

import Link from "next/link";
import { FaArrowLeft, FaClock, FaUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TutorialsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D7C66] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  const tutorials = [
    {
      id: 1,
      title: "HTML & CSS Full Course - Beginner to Pro",
      description: "Complete guide to HTML and CSS fundamentals, from basic markup to advanced styling techniques.",
      duration: "2+ hours",
      level: "Beginner",
      instructor: "SuperSimpleDev",
      embedUrl: "https://www.youtube.com/embed/mU6anWqZJcc"
    },
    {
      id: 2,
      title: "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
      description: "Comprehensive introduction to JavaScript programming, covering variables, functions, and DOM manipulation.",
      duration: "1 hour",
      level: "Beginner",
      instructor: "Programming with Mosh",
      embedUrl: "https://www.youtube.com/embed/W6NZfCO5SIk"
    },
    {
      id: 3,
      title: "React Tutorial for Beginners",
      description: "Learn React from scratch with practical examples and build your first React applications.",
      duration: "1.5 hours",
      level: "Intermediate",
      instructor: "Programming with Mosh",
      embedUrl: "https://www.youtube.com/embed/SqcY0GlETPk"
    },
    {
      id: 4,
      title: "Node.js and Express.js - Full Course",
      description: "Build server-side applications with Node.js and create REST APIs using Express.js framework.",
      duration: "3 hours",
      level: "Intermediate",
      instructor: "freeCodeCamp.org",
      embedUrl: "https://www.youtube.com/embed/Oe421EPjeBE"
    },
    {
      id: 5,
      title: "Tailwind CSS Full Course",
      description: "Master utility-first CSS framework and learn to build modern, responsive web interfaces.",
      duration: "2 hours",
      level: "Beginner",
      instructor: "Developedbyed",
      embedUrl: "https://www.youtube.com/embed/3m3j-0d3j-U"
    },
    {
      id: 6,
      title: "Python for Beginners - Learn Python in 1 Hour",
      description: "Quick introduction to Python programming language, perfect for getting started with coding.",
      duration: "1 hour",
      level: "Beginner",
      instructor: "Programming with Mosh",
      embedUrl: "https://www.youtube.com/embed/kqtD5dpn9C8"
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0D7C66] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center text-white hover:text-gray-200 mb-4 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Resources
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Free Educational Videos</h1>
          <p className="text-xl mt-2">Access high-quality programming tutorials from expert instructors</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Video Embed */}
              <div className="relative">
                <iframe 
                  className="w-full aspect-video" 
                  src={tutorial.embedUrl} 
                  title={tutorial.title} 
                  allowFullScreen
                ></iframe>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {tutorial.description}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    {tutorial.duration}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(tutorial.level)}`}>
                    {tutorial.level}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <FaUser className="mr-1" />
                  {tutorial.instructor}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Enhance Your Learning Journey
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            These free educational videos are designed to strengthen your programming skills and prepare you for technical challenges. Continue exploring our platform resources or reach out for additional support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources/docs"
              className="bg-[#0D7C66] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#41B3A2] transition-colors duration-300"
            >
              View Documentation
            </Link>
            <Link
              href="/support/contact"
              className="border border-[#0D7C66] text-[#0D7C66] px-6 py-3 rounded-lg font-medium hover:bg-[#0D7C66] hover:text-white transition-colors duration-300"
            >
              Get Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
=======
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
>>>>>>> eb2a0b4bdf016207b2560cd7b5ebbb7fe799b961
}