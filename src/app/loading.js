"use client";

import { GraduationCap, BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-emerald-950 overflow-hidden">
      
      {/* Background Decorative Glows (Ager collection theke neya) */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Educational Animated Icon Container */}
        <div className="relative mb-10">
          <div className="relative z-10 animate-bounce bg-emerald-900/60 p-4 rounded-full border border-emerald-700/50 backdrop-blur-sm shadow-[0_0_30px_rgb(16,185,129,0.2)]">
            <GraduationCap className="w-16 h-16 text-emerald-300" />
          </div>
          {/* Background decorative ring */}
          <div className="absolute inset-0 border border-emerald-400/30 rounded-full animate-ping"></div>
        </div>

        {/* Modern Spinner Design */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-emerald-900/50 rounded-full"></div>
          {/* Spinning Progress */}
          <div className="absolute inset-0 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          
          {/* Inner Icon */}
          <BookOpen className="w-8 h-8 text-emerald-400/80" />
        </div>

        {/* Educational Text (Gradient Title & Muted Body) */}
        <div className="text-center space-y-4 px-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Preparing{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
              Dashboard
            </span>
          </h1>
          <p className="text-emerald-100/70 max-w-sm mx-auto text-sm md:text-base leading-relaxed">
            Tomar shikkhar environment shajano hocche. Shundor kichu shuru hote jachche!
          </p>
        </div>

        {/* Modern Progress Dots */}
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_0ms]"></span>
          <span className="w-3 h-3 bg-teal-300 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
          <span className="w-3 h-3 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
        </div>

      </div>
    </div>
  );
}