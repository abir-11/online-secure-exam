import Link from "next/link";
import { FaBook, FaVideo, FaCode } from "react-icons/fa";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            SecureExam Resources Hub
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Welcome to the SecureExam Resources Hub. Our online secure examination platform provides comprehensive tools for conducting fair and secure exams. Explore our documentation, tutorials, and API references to maximize the potential of our system for students, instructors, and administrators.
          </p>
        </div>
      </div>

      {/* Resource Widgets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Documentation Widget */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <FaBook className="text-[#0D7C66] text-3xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Documentation</h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Comprehensive guides and setup instructions to help you get started with SecureExam. Learn about installation, configuration, and best practices for running secure examinations.
            </p>
            <Link
              href="/resources/docs"
              className="inline-block bg-[#0D7C66] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#41B3A2] transition-colors duration-300"
            >
              View Documentation →
            </Link>
          </div>

          {/* Tutorials Widget */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <FaVideo className="text-[#0D7C66] text-3xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Tutorials</h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Step-by-step video tutorials and walkthroughs to help you master SecureExam. From creating your first exam to advanced features and troubleshooting common issues.
            </p>
            <Link
              href="/resources/tutorials"
              className="inline-block bg-[#0D7C66] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#41B3A2] transition-colors duration-300"
            >
              Watch Tutorials →
            </Link>
          </div>

          {/* API Reference Widget */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <FaCode className="text-[#0D7C66] text-3xl mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">API Reference</h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Complete API documentation for developers. Integrate SecureExam with your existing systems, automate workflows, and build custom applications using our REST API.
            </p>
            <Link
              href="/resources/api"
              className="inline-block bg-[#0D7C66] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#41B3A2] transition-colors duration-300"
            >
              Explore API →
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Resources Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Additional Resources
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore more ways to get the most out of SecureExam with our community resources and support options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-[#0D7C66] transition-colors duration-300">
              <h3 className="font-semibold text-gray-800 mb-2">Community Forum</h3>
              <p className="text-gray-600 text-sm">Connect with other users and share experiences</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-[#0D7C66] transition-colors duration-300">
              <h3 className="font-semibold text-gray-800 mb-2">Blog</h3>
              <p className="text-gray-600 text-sm">Latest updates and best practices</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-[#0D7C66] transition-colors duration-300">
              <h3 className="font-semibold text-gray-800 mb-2">Support Center</h3>
              <p className="text-gray-600 text-sm">Get help from our support team</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-[#0D7C66] transition-colors duration-300">
              <h3 className="font-semibold text-gray-800 mb-2">Webinars</h3>
              <p className="text-gray-600 text-sm">Live training and Q&A sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}