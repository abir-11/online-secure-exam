import Link from "next/link";
import { FaArrowLeft, FaPlay, FaClock, FaUser, FaVideo } from "react-icons/fa";

export default function TutorialsPage() {
  const tutorials = [
    {
      id: 1,
      title: "Getting Started with SecureExam",
      description: "Learn the basics of setting up your first exam and understanding the dashboard.",
      duration: "15 min",
      level: "Beginner",
      instructor: "Sarah Johnson",
      thumbnail: "/images/tutorial-1.jpg"
    },
    {
      id: 2,
      title: "Creating Your First Exam",
      description: "Step-by-step guide to building comprehensive exams with various question types.",
      duration: "25 min",
      level: "Beginner",
      instructor: "Mike Chen",
      thumbnail: "/images/tutorial-2.jpg"
    },
    {
      id: 3,
      title: "Advanced Security Configuration",
      description: "Configure advanced security features including browser lockdown and identity verification.",
      duration: "35 min",
      level: "Advanced",
      instructor: "Dr. Emily Davis",
      thumbnail: "/images/tutorial-3.jpg"
    },
    {
      id: 4,
      title: "Analytics and Reporting",
      description: "Understand exam analytics, generate reports, and track student performance.",
      duration: "20 min",
      level: "Intermediate",
      instructor: "Alex Rodriguez",
      thumbnail: "/images/tutorial-4.jpg"
    },
    {
      id: 5,
      title: "Managing Question Banks",
      description: "Create, organize, and manage large collections of questions for your exams.",
      duration: "30 min",
      level: "Intermediate",
      instructor: "Lisa Wang",
      thumbnail: "/images/tutorial-5.jpg"
    },
    {
      id: 6,
      title: "Troubleshooting Common Issues",
      description: "Solutions for the most frequently encountered problems and error scenarios.",
      duration: "18 min",
      level: "Intermediate",
      instructor: "Tom Anderson",
      thumbnail: "/images/tutorial-6.jpg"
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
          <h1 className="text-3xl md:text-4xl font-bold">Video Tutorials</h1>
          <p className="text-xl mt-2">Step-by-step video guides to master SecureExam</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Thumbnail */}
              <div className="relative bg-gray-200 h-48 flex items-center justify-center">
                <FaVideo className="text-gray-400 text-4xl" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <FaPlay className="text-white text-3xl" />
                </div>
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

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaUser className="mr-1" />
                  {tutorial.instructor}
                </div>

                {/* Watch Button */}
                <button className="w-full bg-[#0D7C66] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#41B3A2] transition-colors duration-300 flex items-center justify-center">
                  <FaPlay className="mr-2" />
                  Watch Tutorial
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our tutorial library is constantly growing. If you need help with a specific feature or have questions about SecureExam, reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support/contact"
              className="bg-[#0D7C66] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#41B3A2] transition-colors duration-300"
            >
              Contact Support
            </Link>
            <Link
              href="/community/forum"
              className="border border-[#0D7C66] text-[#0D7C66] px-6 py-3 rounded-lg font-medium hover:bg-[#0D7C66] hover:text-white transition-colors duration-300"
            >
              Ask Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}