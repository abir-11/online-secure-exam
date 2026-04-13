"use client";

import { FiCheck } from "react-icons/fi";

export default function EnterprisePlanPage() {
  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Enterprise Plan</h1>
          <p className="text-emerald-200">
            Custom solutions for large universities and organizations.
          </p>
        </div>

        <div className="bg-emerald-900/50 border border-emerald-500/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-5xl font-extrabold text-emerald-400 mb-4">
              Custom Pricing
            </div>
            <p className="text-emerald-200">Contact us for a tailored quote</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" />
              <span>University Level Deployment</span>
            </li>
            <li className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" />
              <span>Dedicated Server</span>
            </li>
            <li className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" />
              <span>Custom Features</span>
            </li>
            <li className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" />
              <span>24/7 Support</span>
            </li>
          </ul>

          <button
            className="btn w-full bg-emerald-600 hover:bg-emerald-500 text-emerald-50"
            onClick={() => (window.location.href = "/support/contact")}
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
