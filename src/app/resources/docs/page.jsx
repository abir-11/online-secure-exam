"use client";

import Link from "next/link";
import { FaArrowLeft, FaBook, FaGraduationCap, FaChalkboardTeacher, FaFileAlt, FaVideo, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DocsPage() {
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

  const studentResources = [
    {
      title: "Study Skills & Time Management",
      description: "Learn effective study techniques, time management strategies, and exam preparation methods.",
      icon: <FaBook className="text-blue-500 text-2xl" />,
      items: [
        "Effective Note-Taking Methods",
        "Memory Techniques & Mnemonics",
        "Time Management for Students",
        "Test Anxiety Management",
        "Active Learning Strategies"
      ]
    },
    {
      title: "Academic Writing & Research",
      description: "Master academic writing, research skills, and citation methods.",
      icon: <FaFileAlt className="text-green-500 text-2xl" />,
      items: [
        "Essay Writing Fundamentals",
        "Research Paper Structure",
        "APA & MLA Citation Guides",
        "Critical Thinking Skills",
        "Plagiarism Prevention"
      ]
    },
    {
      title: "Digital Learning Resources",
      description: "Access online learning platforms, educational apps, and digital study tools.",
      icon: <FaVideo className="text-purple-500 text-2xl" />,
      items: [
        "Khan Academy Courses",
        "Coursera Specializations",
        "edX Micro-credentials",
        "Duolingo Language Learning",
        "Quizlet Flashcards"
      ]
    }
  ];

  const teacherResources = [
    {
      title: "Teaching Methodologies",
      description: "Explore different teaching approaches, classroom management, and student engagement techniques.",
      icon: <FaChalkboardTeacher className="text-red-500 text-2xl" />,
      items: [
        "Active Learning Techniques",
        "Differentiated Instruction",
        "Project-Based Learning",
        "Flipped Classroom Model",
        "Assessment Strategies"
      ]
    },
    {
      title: "Curriculum Development",
      description: "Learn to design effective curricula, create lesson plans, and align with educational standards.",
      icon: <FaGraduationCap className="text-orange-500 text-2xl" />,
      items: [
        "Curriculum Mapping",
        "Lesson Planning Templates",
        "Bloom's Taxonomy Application",
        "Standards-Based Planning",
        "Assessment Design"
      ]
    },
    {
      title: "Educational Technology",
      description: "Integrate technology in teaching, use learning management systems, and digital tools.",
      icon: <FaDownload className="text-teal-500 text-2xl" />,
      items: [
        "Google Classroom Setup",
        "Interactive Whiteboard Tools",
        "Online Assessment Platforms",
        "Video Conferencing Best Practices",
        "Educational Apps Integration"
      ]
    }
  ];

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
          <h1 className="text-3xl md:text-4xl font-bold">Educational Resources</h1>
          <p className="text-xl mt-2">Comprehensive learning materials for students and teaching guides for educators</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Students Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FaGraduationCap className="text-[#0D7C66] text-4xl mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">For Students</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your learning experience with these comprehensive educational resources designed to help you succeed academically and develop essential skills for lifelong learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentResources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {resource.icon}
                  <h3 className="text-xl font-bold text-gray-800 ml-3">{resource.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <ul className="space-y-2">
                  {resource.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-[#0D7C66] rounded-full mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={
                    index === 0 ? "https://www.khanacademy.org/study-skills" :
                    index === 1 ? "https://owl.purdue.edu/" :
                    "https://www.coursera.org/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full bg-[#0D7C66] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#41B3A2] transition-colors duration-300 text-center block"
                >
                  Explore Resources
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Teachers Section */}
        <section>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FaChalkboardTeacher className="text-[#0D7C66] text-4xl mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">For Teachers</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access professional development resources, teaching strategies, and tools to enhance your instructional effectiveness and create engaging learning environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teacherResources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {resource.icon}
                  <h3 className="text-xl font-bold text-gray-800 ml-3">{resource.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <ul className="space-y-2">
                  {resource.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-[#0D7C66] rounded-full mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={
                    index === 0 ? "https://www.edutopia.org/" :
                    index === 1 ? "https://www.ascd.org/" :
                    "https://www.iste.org/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full bg-[#0D7C66] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#41B3A2] transition-colors duration-300 text-center block"
                >
                  Access Guides
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need More Specific Resources?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our educational resource library is continuously growing. If you need materials for a specific subject, grade level, or teaching methodology, let us know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support/contact"
              className="bg-[#0D7C66] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#41B3A2] transition-colors duration-300"
            >
              Request Resources
            </Link>
            <Link
              href="/community/forum"
              className="border border-[#0D7C66] text-[#0D7C66] px-6 py-3 rounded-lg font-medium hover:bg-[#0D7C66] hover:text-white transition-colors duration-300"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}