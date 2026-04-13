"use client";

import Link from "next/link";
import {
  FaArrowLeft,
  FaBook,
  FaGraduationCap,
  FaFileAlt,
  FaVideo,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DocsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
          <p className="mt-4 text-emerald-100/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  const studentResources = [
    {
      title: "Study Skills & Time Management",
      description:
        "Learn effective study techniques, time management strategies, and exam preparation methods.",
      icon: <FaBook className="text-[#0D7C66] text-2xl" />,
      items: [
        "Effective Note-Taking Methods",
        "Memory Techniques & Mnemonics",
        "Time Management for Students",
        "Test Anxiety Management",
        "Active Learning Strategies",
      ],
    },
    {
      title: "Academic Writing & Research",
      description:
        "Master academic writing, research skills, and citation methods.",
      icon: <FaFileAlt className="text-[#0D7C66] text-2xl" />,
      items: [
        "Essay Writing Fundamentals",
        "Research Paper Structure",
        "APA & MLA Citation Guides",
        "Critical Thinking Skills",
        "Plagiarism Prevention",
      ],
    },
    {
      title: "Digital Learning Resources",
      description:
        "Access online learning platforms, educational apps, and digital study tools.",
      icon: <FaVideo className="text-[#0D7C66] text-2xl" />,
      items: [
        "Khan Academy Courses",
        "Coursera Specializations",
        "edX Micro-credentials",
        "Duolingo Language Learning",
        "Quizlet Flashcards",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-950">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 border-b border-emerald-700/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button - Now correctly imported and functional */}
          <Link
            href="/dashboard/student/online-courses/free-resources"
            className="inline-flex items-center text-emerald-300 hover:text-emerald-200 mb-6 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Free Resources
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Educational Resources
          </h1>
          <p className="text-xl mt-2 text-emerald-100/70">
            Comprehensive learning materials for students
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Students Section */}
        <section>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FaGraduationCap className="text-emerald-400 text-4xl mr-3" />
              <h2 className="text-3xl font-bold text-white">For Students</h2>
            </div>
            <p className="text-xl text-emerald-100/70 max-w-3xl mx-auto">
              Enhance your learning experience with these comprehensive
              educational resources designed to help you succeed academically
              and develop essential skills for lifelong learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentResources.map((resource, index) => (
              <div
                key={index}
                className="bg-emerald-900/30 backdrop-blur-md border border-emerald-700/50 rounded-lg p-6 hover:bg-emerald-800/40 hover:border-emerald-500/50 transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {resource.icon}
                  <h3 className="text-xl font-bold text-white ml-3">
                    {resource.title}
                  </h3>
                </div>
                <p className="text-emerald-100/70 mb-4">
                  {resource.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {resource.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center text-sm text-emerald-100/60"
                    >
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={
                    index === 0
                      ? "https://www.khanacademy.org/study-skills"
                      : index === 1
                        ? "https://owl.purdue.edu/"
                        : "https://www.coursera.org/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-500 transition-colors duration-300 text-center block shadow-[0_0_15px_rgb(16,185,129,0.2)]"
                >
                  Explore Resources
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-16 bg-emerald-900/30 backdrop-blur-md border border-emerald-700/50 rounded-lg p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need More Specific Resources?
          </h2>
          <p className="text-emerald-100/70 mb-6 max-w-2xl mx-auto">
            Our educational resource library is continuously growing. If you
            need materials for a specific subject, grade level, or skill, let us
            know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support/contact"
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-500 transition-colors duration-300 shadow-[0_0_15px_rgb(16,185,129,0.2)]"
            >
              Request Resources
            </Link>
            <Link
              href="/community/forum"
              className="border border-emerald-700/50 text-emerald-300 px-6 py-3 rounded-lg font-medium hover:bg-emerald-800/60 hover:border-emerald-500/50 transition-colors duration-300 backdrop-blur-sm"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
