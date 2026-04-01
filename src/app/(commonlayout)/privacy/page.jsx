"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#022c22] text-gray-200">
      <Navbar />

      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
        {/* Heading */}
        <h1 className=" text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-[#34d399] to-[#10b981] text-transparent bg-clip-text">
          Privacy Policy
        </h1>

        {/* Content Card */}
        <section className="space-y-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg">
          <p className="text-gray-300 leading-relaxed">
            At <span className="font-semibold text-[#34d399]">SecureExam</span>,
            we value your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and
            safeguard your data when you use our platform.
          </p>

          <h2 className="text-2xl font-semibold text-[#34d399]">
            1. Information We Collect
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We collect information you provide when registering, such as your
            name, email address, and role (student, teacher, admin). We also
            collect data on exam activity, login history, and device information
            to ensure security and proper functioning of the platform.
          </p>

          <h2 className="text-2xl font-semibold text-[#34d399]">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-300">Your information is used to:</p>
          <ul className="list-disc list-inside ml-4 text-gray-400 space-y-1">
            <li>Enable login and account management</li>
            <li>Monitor exams and prevent cheating</li>
            <li>Provide analytics and results to instructors and admins</li>
            <li>Improve platform performance and user experience</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#34d399]">
            3. Data Sharing
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We do not sell or share your personal information with third
            parties, except when required by law or to trusted service providers
            who help us run the platform securely.
          </p>

          <h2 className="text-2xl font-semibold text-[#34d399]">4. Security</h2>
          <p className="text-gray-300 leading-relaxed">
            We implement reasonable technical and organizational measures to
            protect your data against unauthorized access, alteration, or
            disclosure. However, no system is completely secure, and we cannot
            guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-[#34d399]">
            5. Your Rights
          </h2>
          <p className="text-gray-300 leading-relaxed">
            You can request access to your personal data, correct inaccuracies,
            or request deletion by contacting our support team at
            <span className="text-[#34d399] font-medium">
              {" "}
              support@secureexam.com
            </span>
            .
          </p>

          <h2 className="text-2xl font-semibold text-[#34d399]">
            6. Changes to this Policy
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time. Continued use
            of SecureExam constitutes acceptance of any changes.
          </p>

          <p className="mt-8 text-sm text-gray-500 text-center">
            Last updated: March 2026
          </p>
        </section>
      </main>
    </div>
  );
}
