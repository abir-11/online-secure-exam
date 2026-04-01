import Link from "next/link";
import { FaArrowLeft, FaCode, FaKey, FaServer, FaDatabase } from "react-icons/fa";

export default function ApiPage() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/exams",
      description: "Retrieve a list of all exams",
      category: "Exams"
    },
    {
      method: "POST",
      path: "/api/exams",
      description: "Create a new exam",
      category: "Exams"
    },
    {
      method: "GET",
      path: "/api/exams/{id}",
      description: "Get details of a specific exam",
      category: "Exams"
    },
    {
      method: "PUT",
      path: "/api/exams/{id}",
      description: "Update an existing exam",
      category: "Exams"
    },
    {
      method: "DELETE",
      path: "/api/exams/{id}",
      description: "Delete an exam",
      category: "Exams"
    },
    {
      method: "GET",
      path: "/api/questions",
      description: "Retrieve questions from the question bank",
      category: "Questions"
    },
    {
      method: "POST",
      path: "/api/questions",
      description: "Add a new question to the bank",
      category: "Questions"
    },
    {
      method: "GET",
      path: "/api/results/{examId}",
      description: "Get exam results and analytics",
      category: "Results"
    },
    {
      method: "POST",
      path: "/api/auth/login",
      description: "Authenticate a user",
      category: "Authentication"
    },
    {
      method: "GET",
      path: "/api/users",
      description: "Retrieve user information",
      category: "Users"
    }
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case "GET": return "bg-green-100 text-green-800";
      case "POST": return "bg-blue-100 text-blue-800";
      case "PUT": return "bg-yellow-100 text-yellow-800";
      case "DELETE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const categories = ["Exams", "Questions", "Results", "Authentication", "Users"];

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
          <h1 className="text-3xl md:text-4xl font-bold">API Reference</h1>
          <p className="text-xl mt-2">Complete API documentation for developers</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">API Categories</h2>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`#${category.toLowerCase()}`}
                    className="block text-gray-600 hover:text-[#0D7C66] transition-colors duration-300"
                  >
                    {category}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Start</h3>
                <div className="space-y-2 text-sm">
                  <a href="#authentication" className="block text-gray-600 hover:text-[#0D7C66] transition-colors duration-300">
                    Authentication
                  </a>
                  <a href="#rate-limits" className="block text-gray-600 hover:text-[#0D7C66] transition-colors duration-300">
                    Rate Limits
                  </a>
                  <a href="#errors" className="block text-gray-600 hover:text-[#0D7C66] transition-colors duration-300">
                    Error Handling
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* API Key Section */}
            <section className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FaKey className="text-[#0D7C66] text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Getting Started</h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  To use the SecureExam API, you'll need an API key. You can generate one from your dashboard under Settings > API Keys.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <code className="text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                </div>
                <p className="text-gray-600">
                  Include this header in all your API requests for authentication.
                </p>
              </div>
            </section>

            {/* Base URL */}
            <section className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FaServer className="text-[#0D7C66] text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Base URL</h2>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <code className="text-lg font-mono text-blue-800">
                  https://api.secureexam.com/v1
                </code>
              </div>
            </section>

            {/* API Endpoints by Category */}
            {categories.map((category) => (
              <section key={category} id={category.toLowerCase()} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <FaDatabase className="text-[#0D7C66] text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{category} API</h2>
                </div>

                <div className="space-y-4">
                  {endpoints
                    .filter(endpoint => endpoint.category === category)
                    .map((endpoint, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#0D7C66] transition-colors duration-300">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded text-xs font-bold mr-3 ${getMethodColor(endpoint.method)}`}>
                              {endpoint.method}
                            </span>
                            <code className="text-gray-800 font-mono">
                              {endpoint.path}
                            </code>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {endpoint.description}
                        </p>
                      </div>
                    ))}
                </div>
              </section>
            ))}

            {/* Error Handling */}
            <section id="errors" className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Error Handling</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">400 Bad Request</h3>
                  <p className="text-red-700 text-sm">Invalid request parameters or missing required fields.</p>
                </div>
                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">401 Unauthorized</h3>
                  <p className="text-red-700 text-sm">Invalid or missing API key.</p>
                </div>
                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">403 Forbidden</h3>
                  <p className="text-red-700 text-sm">Insufficient permissions for the requested operation.</p>
                </div>
                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">404 Not Found</h3>
                  <p className="text-red-700 text-sm">The requested resource was not found.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}