"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Gem, 
  Star, 
  Medal, 
  Calendar, 
  BookOpen, 
  User,
  Sparkles
} from "lucide-react";

export default function StudentAwardsPage() {
  const [myAwards, setMyAwards] = useState([]);
  const [totalGems, setTotalGems] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);

  // Static Featured Awards (As per your requirement)
  const featuredAwards = [
    { id: 1, title: "Top React Developer", student: "Mahim Hasan", course: "MERN Stack", date: "10 Feb 2026" },
    { id: 2, title: "Outstanding Project", student: "Nusrat Jahan", course: "Web Development", date: "05 Feb 2026" },
    { id: 3, title: "Best Problem Solver", student: "Rafiul Islam", course: "Algorithms", date: "28 Jan 2026" },
  ];

  useEffect(() => {
    async function loadAwards() {
      try {
        const res = await fetch("/api/student/awards");
        const data = await res.json();
        setMyAwards(data.awards || []);
        setTotalGems(data.totalGems || 0);
        setStudentName(data.studentName || "");
      } catch (err) {
        console.error("Awards load error", err);
      } finally {
        setLoading(false);
      }
    }
    loadAwards();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center text-emerald-400">
      <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="animate-pulse font-bold tracking-widest text-xs uppercase">Unlocking Achievements...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-emerald-950 p-6 sm:p-10 pt-24 relative overflow-hidden text-emerald-50">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
            <Trophy size={16} /> Achievement Center
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Hall of <span className="text-emerald-400">Excellence</span>
          </h1>
          <p className="text-emerald-100/40 font-medium mt-2">Recognizing top performers and your personal achievements.</p>
        </header>

        {/* TOP GEMS BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border border-emerald-500/20 p-8 rounded-[2.5rem] mb-12 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center border border-yellow-500/30 text-yellow-400 relative">
               <Gem size={40} className="animate-bounce" />
               <Sparkles size={20} className="absolute -top-2 -right-2 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Hello, {studentName || "Scholar"}!</h2>
              <p className="text-emerald-100/50 text-sm">You are doing a fantastic job. Keep collecting gems!</p>
            </div>
          </div>
          <div className="bg-emerald-950/50 border border-emerald-500/20 px-10 py-4 rounded-2xl text-center">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Total Gems Earned</p>
            <div className="text-4xl font-black text-yellow-400 flex items-center gap-2">
               <Gem size={30} /> {totalGems}
            </div>
          </div>
        </motion.div>

        {/* FEATURED AWARDS SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <Medal className="text-yellow-400" />
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">Top Contributors</h2>
            <div className="flex-1 h-px bg-emerald-800/50"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAwards.map((award, idx) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-emerald-900/20 border border-emerald-800/50 p-6 rounded-3xl hover:border-emerald-500/40 transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-emerald-950 transition-colors">
                  <Star size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{award.title}</h3>
                
                <div className="space-y-2 text-sm text-emerald-100/60">
                  <div className="flex items-center gap-2"><User size={14} className="text-emerald-500" /> {award.student}</div>
                  <div className="flex items-center gap-2"><BookOpen size={14} className="text-emerald-500" /> {award.course}</div>
                  <div className="flex items-center gap-2 mt-4 text-[10px] font-bold uppercase tracking-widest text-emerald-100/30">
                    <Calendar size={12} /> {award.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MY GEMS / AWARDS LIST */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <Trophy className="text-emerald-400" />
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">Your Milestones</h2>
            <div className="flex-1 h-px bg-emerald-800/50"></div>
          </div>

          {myAwards.length === 0 ? (
            <div className="text-center py-20 bg-emerald-900/10 border border-dashed border-emerald-800 rounded-[2.5rem]">
              <Gem size={48} className="mx-auto text-emerald-900 mb-4" />
              <p className="text-emerald-100/20 font-bold uppercase tracking-widest">No milestones unlocked yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myAwards.map((award, idx) => (
                <motion.div
                  key={award._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-emerald-950 border border-emerald-800/50 p-6 rounded-3xl relative overflow-hidden group hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -right-4 -bottom-4 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors">
                    <Gem size={100} />
                  </div>

                  <h3 className="text-lg font-black text-emerald-400 mb-2 truncate pr-10">{award.examTitle}</h3>
                  
                  <div className="flex items-end justify-between relative z-10 mt-6">
                    <div>
                      <p className="text-[10px] font-bold text-emerald-100/40 uppercase tracking-widest">Score</p>
                      <p className="text-2xl font-black text-white">{award.percentage}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-yellow-500/60 uppercase tracking-widest">Gems</p>
                      <p className="text-2xl font-black text-yellow-400 flex items-center justify-end gap-1">
                        <Gem size={18} /> {award.gems}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-emerald-800/50 flex items-center justify-between text-[10px] font-bold text-emerald-100/20 uppercase tracking-tighter">
                    <span>Certificate Locked</span>
                    <span>{new Date(award.createdAt).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}