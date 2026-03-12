"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LearnerResources() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleNavigation = (path) => {
    if (session) {
      router.push(path);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <section className="relative py-24 bg-emerald-900 overflow-hidden border-y border-emerald-800/40">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-400/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/50 border border-emerald-600/50 text-emerald-400 text-sm font-semibold mb-6 backdrop-blur-sm uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            Elevate Your Skills
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Explore Learning{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Resources
            </span>
          </h2>
          <p className="text-lg text-emerald-100/70 max-w-2xl mx-auto leading-relaxed">
            Everything you need to succeed. Browse our free community materials, expert premium courses, or get certified to elevate your career.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[160px] lg:auto-rows-[200px]">
          
          {/* Card 1: Free Resources (Spans 1 Column, 2 Rows) */}
          <div 
            onClick={() => handleNavigation("/dashboard/student/online-courses/free-resources")}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-emerald-800/40 shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-500 md:row-span-2 h-full"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500 z-10"></div>
            <Image 
              src="https://i.ibb.co.com/Bpbj3Tn/free-resource.avif"
              alt="Free Resources"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            {/* Hover Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center drop-shadow-lg mb-2">
                Free Resources
              </h3>
              <p className="text-gray-100 font-medium tracking-wider uppercase text-sm drop-shadow-md">
                View Materials
              </p>
            </div>
            {/* Always Visible Default Label ( fades out on hover ) */}
            <div className="absolute bottom-8 left-8 z-20 group-hover:opacity-0 transition-opacity duration-300">
               <h3 className="text-3xl font-bold text-white drop-shadow-xl bg-black/40 px-4 py-2 rounded-xl backdrop-blur-sm">
                 Free Resources
               </h3>
            </div>
          </div>

          {/* Card 2: Premium Courses (Spans 1 Row, 1 Column) */}
          <div 
            onClick={() => handleNavigation("/dashboard/student/online-courses/premium-courses")}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-emerald-800/40 shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-500 h-full"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500 z-10"></div>
            <Image 
              src="https://i.ibb.co.com/pBx3Ffh2/premium.jpg"
              alt="Premium Courses"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            {/* Hover Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg mb-2">
                Premium Courses
              </h3>
              <p className="text-gray-100 font-medium tracking-wider uppercase text-sm drop-shadow-md">
                Browse Catalog
              </p>
            </div>
            {/* Always Visible Default Label */}
            <div className="absolute bottom-6 left-6 z-20 group-hover:opacity-0 transition-opacity duration-300">
               <h3 className="text-2xl font-bold text-white drop-shadow-xl bg-black/40 px-4 py-2 rounded-xl backdrop-blur-sm">
                 Premium Courses
               </h3>
            </div>
          </div>

          {/* Card 3: Certificate Exams (Spans 1 Row, 1 Column) */}
          <div 
            onClick={() => handleNavigation("/dashboard/student/online-courses/certification-exams")}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-emerald-800/40 shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-500 h-full"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500 z-10"></div>
            <Image 
              src="https://i.ibb.co.com/VYjcTqSc/study-certificate.webp"
              alt="Certificate Exams"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            {/* Hover Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg mb-2">
                Certificate Exams
              </h3>
              <p className="text-gray-100 font-medium tracking-wider uppercase text-sm drop-shadow-md">
                Get Certified
              </p>
            </div>
            {/* Always Visible Default Label */}
            <div className="absolute bottom-6 left-6 z-20 group-hover:opacity-0 transition-opacity duration-300">
               <h3 className="text-2xl font-bold text-white drop-shadow-xl bg-black/40 px-4 py-2 rounded-xl backdrop-blur-sm">
                 Certificate Exams
               </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
