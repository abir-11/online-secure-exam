"use client";

import Link from "next/link";
import { 
  Play, 
  ArrowLeft, 
  Youtube, 
  Sparkles, 
  ShieldCheck,
  Video,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

export default function FreeVideosPage() {
  const videos = [
    {
      id: "mU6anWqZJcc",
      title: "HTML & CSS Full Course - Beginner to Pro",
      channel: "SuperSimpleDev",
    },
    {
      id: "W6NZfCO5SIk",
      title: "JavaScript Tutorial for Beginners: Learn JS in 1 Hour",
      channel: "Programming with Mosh",
    },
    {
      id: "SqcY0GlETPk",
      title: "React Tutorial for Beginners",
      channel: "Programming with Mosh",
    },
    {
      id: "Oe421EPjeBE",
      title: "Node.js and Express.js - Full Course",
      channel: "freeCodeCamp.org",
    },
    {
      id: "3m3j-0d3j-U",
      title: "Tailwind CSS Full Course for Beginners",
      channel: "Developedbyed",
    },
    {
      id: "rfscVS0vtbw",
      title: "Next.js Full Course for Beginners",
      channel: "freeCodeCamp.org",
    }
  ];

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50 pb-24 pt-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-[0.3em] mb-3">
              <Youtube size={16} className="text-red-500" /> Curated Video Content
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
              Free <span className="text-emerald-500 text-shadow-glow">Tutorials</span>
            </h1>
            <p className="text-emerald-100/60 font-medium text-lg">
              Master industry-leading technologies with zero cost.
            </p>
          </motion.div>

          <Link 
            href="/dashboard/student/online-courses/free-resources"
            className="group flex items-center gap-3 px-6 py-3 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-400 border border-emerald-800/50 rounded-2xl transition-all font-bold text-sm"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Resources
          </Link>
        </div>

        {/* Video Grid Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-900/20 border border-emerald-500/10 p-6 md:p-10 rounded-[3rem] backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8 px-2">
            <Video className="text-emerald-500" size={24} />
            <h2 className="text-xl font-black text-white uppercase tracking-widest">Masterclass Collection</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-emerald-950/60 border border-emerald-800/50 rounded-[2rem] overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col h-full shadow-lg"
              >
                {/* Video Player Section */}
                <div className="relative aspect-video overflow-hidden">
                  <iframe 
                    className="w-full h-full" 
                    src={`https://www.youtube.com/embed/${video.id}`} 
                    title={video.title} 
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                  <div className="absolute inset-0 pointer-events-none border-b border-emerald-800/50 group-hover:border-emerald-500/20 transition-colors"></div>
                </div>

                {/* Video Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="font-black text-emerald-50 text-md leading-tight line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-6 h-6 bg-emerald-900 rounded-full flex items-center justify-center border border-emerald-700">
                        <Youtube size={12} className="text-red-500" />
                      </div>
                      <p className="text-emerald-500/60 text-xs font-black uppercase tracking-widest">
                        {video.channel}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-emerald-900/50 flex justify-between items-center">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                      <ShieldCheck size={12} /> Verified Source
                    </span>
                    <button className="text-emerald-500 group-hover:scale-125 transition-transform">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Motivation Footer */}
        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-[10px] uppercase tracking-[0.5em] mb-4">
            <Sparkles size={14} /> Knowledge is Power <Sparkles size={14} />
          </div>
          <p className="text-emerald-100/30 text-xs italic">All videos are sourced from official educational YouTube channels.</p>
        </div>
      </div>
    </main>
  );
}