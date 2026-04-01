import Link from "next/link";
import { FaArrowLeft, FaBook, FaCog, FaShieldAlt, FaUsers } from "react-icons/fa";

export default function DocsPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold">Documentation</h1>
          <p className="text-xl mt-2">Comprehensive guides to help you get started with SecureExam</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Getting Started</h2>
              <nav className="space-y-2">
                <a href="#installation" className="block text-gray-600 hover:text-[#0D7C66] transition-colors duration-300">
                  Installation Guide
                </a>
                <a href="#setup" className="block text-gray-600 hover:text-[#0D7C66] transition-colors duration-300">
                  Initial Setup
                </a>
                <a href="#configuration" className="block text-gray-600 hover:text-[#0D7C66] transition-colors duration-300">
                  Configuration
                </a>
                <a href="#security" className="block text-gray-600 hover:text-[#0D7C66] transition-colors duration-300">
                  Security Settings
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Installation Section */}
            <section id="installation" className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FaCog className="text-[#0D7C66] text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Installation Guide</h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  Follow these steps to install SecureExam on your system. Make sure you have Node.js 18+ and MongoDB installed.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <code className="text-sm">
                    npm install<br/>
                    npm run build<br/>
                    npm start
                  </code>
                </div>
                <p className="text-gray-600">
                  For detailed installation instructions, check our deployment guide.
                </p>
              </div>
            </section>

            {/* Setup Section */}
            <section id="setup" className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FaUsers className="text-[#0D7C66] text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Initial Setup</h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  After installation, configure your first administrator account and set up your institution's basic information.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Create administrator account</li>
                  <li>Configure institution settings</li>
                  <li>Set up email notifications</li>
                  <li>Configure database connection</li>
                </ul>
              </div>
            </section>

            {/* Security Section */}
            <section id="security" className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FaShieldAlt className="text-[#0D7C66] text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Security Settings</h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  SecureExam provides multiple layers of security to ensure exam integrity. Learn how to configure security measures.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Browser Security</h3>
                    <p className="text-sm text-gray-600">Configure browser lockdown and tab switching detection</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Identity Verification</h3>
                    <p className="text-sm text-gray-600">Set up photo verification and ID checks</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Network Security</h3>
                    <p className="text-sm text-gray-600">Configure VPN requirements and IP restrictions</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Audit Logging</h3>
                    <p className="text-sm text-gray-600">Monitor and log all exam activities</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}