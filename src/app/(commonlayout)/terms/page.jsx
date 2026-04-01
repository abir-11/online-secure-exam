"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#022c22] text-gray-200">
      <Navbar />

      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto w-full">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-[#34d399] to-[#10b981] text-transparent bg-clip-text">
          Terms of Service
        </h1>

        {/* Content Card */}
        <section className="space-y-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-10 shadow-lg">
          <p className="text-gray-300 leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-[#34d399]">SecureExam</span>. By
            using our platform, you agree to comply with and be bound by the
            following terms and conditions of use.
          </p>

          <h2 className="text-2xl font-semibold text-[#34d399] mt-6">
            1. Use of Platform
          </h2>
          <p className="text-gray-300 leading-relaxed">
            <span className="text-[#34d399] font-medium">SecureExam</span> is
            provided to facilitate online examinations in a secure and
            controlled environment. You may not use the platform for any
            unlawful or unauthorized purpose.
          </p>

          <h2 className="text-2xl font-semibold text-[#34d399] mt-6">
            2. User Accounts
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Users are responsible for maintaining the confidentiality of their
            account credentials. Any activity under your account is your
            responsibility.
          </p>

          <h2 className="text-2xl font-semibold text-[#34d399] mt-6">
            3. Prohibited Conduct
          </h2>
          <p className="text-gray-300 leading-relaxed">
            You may not attempt to bypass the security measures of the platform,
            share exam content, or interfere with other users’ sessions.
          </p>

          <h2 className="text-2xl font-semibold text-[#34d399] mt-6">
            4. Disclaimer
          </h2>
          <p className="text-gray-300 leading-relaxed">
            <span className="text-[#34d399] font-medium">SecureExam</span> is
            provided “as is” without warranties of any kind. While we aim to
            maintain uptime and security, we are not responsible for exam
            disruptions caused by user devices or internet connectivity.
          </p>

          <h2 className="text-2xl font-semibold text-[#34d399] mt-6">
            5. Modifications
          </h2>
          <p className="text-gray-300 leading-relaxed">
            SecureExam may update these terms at any time. Continued use of the
            platform constitutes acceptance of any changes.
          </p>

          <p className="mt-8 text-sm text-gray-500 text-center">
            Last updated: March 2026
          </p>
        </section>
      </main>
    </div>
  );
}
