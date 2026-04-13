"use client";

import Link from "next/link";

export default function OnlineCoursesPage() {
  return (
    <main className="min-h-screen bg-emerald-950 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 border-b border-emerald-700/50 pb-6 relative z-10">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
              Learning Hub
            </h1>
            <p className="text-emerald-200/70 text-lg">
              Select a category below to explore our resources.
            </p>
          </div>
        </div>

        <div className="mt-8 transition-all duration-300 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Widget 1: Free Learning */}
            <Link
              href="/dashboard/student/online-courses/free-resources"
              className="bg-emerald-900/30 border-2 border-emerald-700/50 hover:border-emerald-500/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col items-center justify-center text-center group backdrop-blur-md"
            >
              <div className="bg-emerald-600/30 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform border border-emerald-500/50">
                <span className="text-4xl">📚</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                Free Resources
              </h2>
              <p className="text-emerald-200/70">
                Access carefully curated free learning materials to kickstart
                your journey.
              </p>
            </Link>

            {/* Widget 2: Premium Resources (Courses) */}
            <Link
              href="/dashboard/student/online-courses/premium-courses"
              className="bg-emerald-900/30 border-2 border-emerald-700/50 hover:border-emerald-500/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col items-center justify-center text-center group backdrop-blur-md"
            >
              <div className="bg-teal-600/30 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform border border-teal-500/50">
                <span className="text-4xl">💎</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                Premium Resources
              </h2>
              <p className="text-emerald-200/70">
                Unlock advanced courses, premium tutorials, and exclusive
                interactive content.
              </p>
            </Link>

            {/* Widget 3: Paid Exam */}
            <Link
              href="/dashboard/student/online-courses/certification-exams"
              className="bg-emerald-900/30 border-2 border-emerald-700/50 hover:border-emerald-500/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col items-center justify-center text-center group backdrop-blur-md"
            >
              <div className="bg-yellow-600/30 p-4 rounded-full mb-6 group-hover:scale-110 transition-transform border border-yellow-500/50">
                <span className="text-4xl">🎓</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                Take an Exam
              </h2>
              <p className="text-emerald-200/70">
                Ready to test your knowledge and get certified? Browse our paid
                exams.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
