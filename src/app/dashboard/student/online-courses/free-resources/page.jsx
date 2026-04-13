// import Link from "next/link";

// export default function FreeResourcesPage() {
//   return (
//     <main className="p-8 max-w-7xl mx-auto min-h-screen">
//       <div className="flex justify-between items-center mb-8 border-b pb-6">
//         <div>
//           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Free Resources</h1>
//           <p className="text-gray-500 text-lg">
//             Explore exactly what you need.
//           </p>
//         </div>

//         <Link
//           href="/dashboard/student/online-courses"
//           className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition shadow-sm"
//         >
//           ← Back to Categories
//         </Link>
//       </div>

//       <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-50">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-3">
//             <span className="text-3xl">📚</span>
//             Free Learning Resources
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           <a href="#" className="p-6 border rounded-xl hover:bg-blue-50 transition cursor-pointer">
//             <h3 className="text-lg font-bold text-gray-800 mb-2">Getting Started Guides</h3>
//             <p className="text-gray-500 text-sm">Step-by-step guides for absolute beginners.</p>
//           </a>
//           <Link
//             href="/dashboard/student/online-courses/free-videos"
//             className="p-6 border rounded-xl hover:bg-blue-50 transition cursor-pointer border-blue-200 bg-blue-50/30 block"
//           >
//             <h3 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
//               <span className="text-red-500">▶</span> Free Video Tutorials
//             </h3>
//             <p className="text-gray-500 text-sm">Watch expert instructors cover the basics of Web Development.</p>
//           </Link>
//           <a href="#" className="p-6 border rounded-xl hover:bg-blue-50 transition cursor-pointer">
//             <h3 className="text-lg font-bold text-gray-800 mb-2">Practice Worksheets</h3>
//             <p className="text-gray-500 text-sm">Downloadable PDFs with exercises and answers.</p>
//           </a>
//           <a href="#" className="p-6 border rounded-xl hover:bg-blue-50 transition cursor-pointer">
//             <h3 className="text-lg font-bold text-gray-800 mb-2">Community Forum</h3>
//             <p className="text-gray-500 text-sm">Connect with peers and mentors for free support.</p>
//           </a>
//         </div>
//       </div>
//     </main>
//   );
// }

//after final presentation

"use client";

import Link from "next/link";
import {
  BookOpen,
  PlayCircle,
  FileText,
  Users,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FreeResourcesPage() {
  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.3em] mb-3">
              <Sparkles size={16} /> Knowledge for Everyone
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
              Free <span className="text-emerald-500">Resources</span>
            </h1>
            <p className="text-emerald-100/60 font-medium text-lg">
              Unlock your potential with our curated learning materials.
            </p>
          </motion.div>

          <Link
            href="/dashboard/student/online-courses"
            className="group flex items-center gap-3 px-6 py-3 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-400 border border-emerald-800/50 rounded-2xl transition-all font-bold text-sm"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Categories
          </Link>
        </div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-900/20 border border-emerald-500/20 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20">
              <BookOpen className="text-emerald-950" size={28} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Learning Library
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guide Card */}
            <ResourceCard
              icon={<ShieldCheck size={24} className="text-emerald-400" />}
              title="Getting Started Guides"
              description="Step-by-step documentation for absolute beginners to kickstart their journey."
              href="/resources/docs" // ← Update this if needed
            />

            {/* Video Tutorials Card - Highlighted */}
            <Link
              href="/resources/tutorials" // ← Changed to your actual tutorials page
              className="group p-8 rounded-[2rem] border-2 border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <PlayCircle className="text-emerald-950" size={28} />
                </div>
                <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
                  Free Video Tutorials{" "}
                  <Sparkles size={16} className="text-emerald-500" />
                </h3>
                <p className="text-emerald-100/60 text-sm font-medium leading-relaxed">
                  High-quality video content covering the fundamentals of Web
                  Development and Design.
                </p>
              </div>
              <div className="mt-8 flex items-center text-emerald-400 font-black text-xs uppercase tracking-widest gap-2">
                Watch Now{" "}
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>

            {/* Worksheets Card */}
            <ResourceCard
              icon={<FileText size={24} className="text-emerald-400" />}
              title="Practice Worksheets"
              description="Downloadable PDF exercises designed to reinforce your practical skills."
              href="#"
            />

            {/* Community Forum Card - FIXED */}
            <ResourceCard
              icon={<Users size={24} className="text-emerald-400" />}
              title="Community Forum"
              description="Connect with thousands of peers and mentors for shared learning and support."
              href="/community/forum"
            />
          </div>
        </motion.div>

        {/* Bottom Tagline */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.5em]">
            Education is a right, not a privilege
          </p>
        </div>
      </div>
    </main>
  );
}

// Reusable ResourceCard using Next.js Link (Fixed)
function ResourceCard({ icon, title, description, href }) {
  return (
    <Link
      href={href}
      className="group p-8 bg-emerald-950/40 border border-emerald-800/50 rounded-[2rem] hover:border-emerald-500/40 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="mb-6 p-3 bg-emerald-900/50 rounded-xl w-fit group-hover:bg-emerald-500 group-hover:text-emerald-950 transition-all">
          {icon}
        </div>
        <h3 className="text-xl font-black text-white mb-2">{title}</h3>
        <p className="text-emerald-100/50 text-sm font-medium leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-8 flex items-center text-emerald-800 font-black text-xs uppercase tracking-widest gap-2 group-hover:text-emerald-500 transition-colors">
        Access Content <ChevronRight size={14} />
      </div>
    </Link>
  );
}
