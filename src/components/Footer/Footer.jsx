// components/Footer.jsx
"use client";

import { FaHeart, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoShield } from "react-icons/io5";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-gray-300 py-17 relative overflow-hidden border-t border-gray-800">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0D7C66] via-[#41B3A2] to-[#0D7C66]"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#0D7C66]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#41B3A2]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="bg-[#0D7C66]/10 p-2.5 rounded-xl text-[#41B3A2] group-hover:bg-[#0D7C66]/20 transition-all duration-300">
                <IoShield size={28} />
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">
                SecureExam
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering institutions with a secure, fair, and automated online
              examination platform. Built for the modern educational ecosystem.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="text-gray-500 hover:text-[#41B3A2] transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#41B3A2] transition-colors duration-300"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#41B3A2] transition-colors duration-300"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">
              Product
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link
                  href="/features"
                  className="hover:text-[#41B3A2] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-[#41B3A2] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/demo"
                  className="hover:text-[#41B3A2] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Request Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">
              Company
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#41B3A2] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#41B3A2] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#41B3A2] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">
              Legal
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#41B3A2] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#41B3A2] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="hover:text-[#41B3A2] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/60 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">
            © {currentYear} SecureExam. All rights reserved.
          </div>
          <div className="text-gray-500 text-sm flex items-center gap-1.5">
            Made with <FaHeart className="text-red-500 animate-pulse" /> for
            education
          </div>
        </div>
      </div>
    </footer>
  );
}
