// components/Footer.jsx
"use client";

import { FaHeart } from "react-icons/fa";
import { BsShieldFillCheck } from "react-icons/bs";
import { IoShield } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-15 text-[1.2rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-primary">
              <span className="text-primary gradient-badge p-2 rounded-lg"><IoShield /></span> 
              SecureExam
            </div>
            <p className="text-gray-400 text-[1.3rem]">
              Making online examinations secure, fair, and automated.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-2">Product</h3>
            <ul className="space-y-1 text-gray-400 text-2xl">
              <li><a href="#" className="hover:text-green-700">Features</a></li>
              <li><a href="#" className="hover:text-green-700">Pricing</a></li>
              <li><a href="#" className="hover:text-green-700">Demo</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-2">Company</h3>
            <ul className="space-y-1 text-gray-400 text-2xl">
              <li><a href="#" className="hover:text-green-700">About</a></li>
              <li><a href="#" className="hover:text-green-700">Blog</a></li>
              <li><a href="#" className="hover:text-green-700">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-2">Legal</h3>
            <ul className="space-y-1 text-gray-400 text-2xl">
              <li><a href="#" className="hover:text-green-700">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-700">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 mb-4" />

        {/* Bottom copyright */}
        <div className="text-center text-gray-500 text-2xl flex flex-col sm:flex-row items-center justify-center gap-1 text-[1.2rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-2xl">
          <span>© 2024 SecureExam. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <FaHeart className="text-primary" /> for education
          </span>
        </div>
      </div>
    </footer>
  );
}
