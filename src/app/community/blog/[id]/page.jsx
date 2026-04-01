import { blogs } from "../data";
import Link from "next/link";

export default async function BlogDetails({ params }) {
  // Next.js 15+ এ params একটি promise, তাই আগে await করে নিতে হবে
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // URL id সবসময় String হয়, তাই toString() করে ম্যাচ করতে হবে
  const blog = blogs.find((b) => b.id.toString() === id);

  // ব্লগ না পাওয়া গেলে সুন্দর একটি error page দেখাবে
  if (!blog) {
    return (
      <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-white p-6">
        <h2 className="text-4xl font-bold text-emerald-400 mb-4 drop-shadow-md">404 - Blog Not Found</h2>
        <p className="text-emerald-200 mb-8">The blog post you are looking for does not exist.</p>
        <Link 
          href="/community/blog"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 transition-colors rounded-xl font-semibold shadow-lg"
        >
          ← Return to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 text-white px-4 sm:px-6 lg:px-12 py-20 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Button */}
        <Link 
          href="/community/blog"
          className="inline-flex items-center text-emerald-400 hover:text-emerald-200 mb-8 font-semibold transition-transform duration-300 hover:-translate-x-1"
        >
          ← Back to Blogs
        </Link>

        {/* Blog Content Card */}
        <div className="bg-emerald-900/40 backdrop-blur-xl border border-emerald-700/50 rounded-3xl p-6 md:p-10 shadow-[0_8px_32px_rgb(0,0,0,0.4)]">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-72 md:h-[400px] object-cover rounded-2xl mb-8 shadow-lg brightness-90"
          />

          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200 leading-tight">
            {blog.title}
          </h1>

          {/* Divider */}
          <div className="w-full h-px bg-emerald-700/50 mb-8"></div>

          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-emerald-50/90 text-lg md:text-xl leading-relaxed whitespace-pre-line font-medium">
              {blog.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}