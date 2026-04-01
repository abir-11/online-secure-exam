"use client";

import Link from "next/link";
import { blogs } from "./data";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white px-6 py-16">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Community & Blogs
        </h1>
        <p className="text-emerald-300 max-w-xl mx-auto">
          Explore insights, tips, and updates about SecureExam platform.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-emerald-900/40 backdrop-blur-lg border border-emerald-700 rounded-2xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg"
          >
            {/* Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-emerald-300 text-sm mb-4">
                {blog.description}
              </p>

              <Link href={`/community/blog/${blog.id}`}>
                <button className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg text-sm font-medium transition">
                  Read More →
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
