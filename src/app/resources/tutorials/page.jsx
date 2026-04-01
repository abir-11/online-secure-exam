import Link from "next/link";
import { FaArrowLeft, FaClock, FaUser } from "react-icons/fa";

export default function TutorialsPage() {
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
}