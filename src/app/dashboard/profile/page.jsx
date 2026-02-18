"use client";

import React, { useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    fullName: "Saima Khan",
    email: "saima@example.com",
    phone: "0123456789",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-[var(--color-white)] p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6">
        My Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[var(--color-gray-200)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-[var(--color-primary-dark)] text-white px-6 py-2 rounded hover:bg-[var(--color-primary)] transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
