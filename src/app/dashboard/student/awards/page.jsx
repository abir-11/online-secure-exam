//app/dashboard/student/awards/page.jsx

"use client";

import { useEffect, useState } from "react";

export default function StudentAwardsPage() {
  const awards = [
    {
      id: 1,
      title: "Top React Developer",
      student: "Mahim Hasan",
      course: "MERN Stack",
      date: "10 Feb 2026",
    },
    {
      id: 2,
      title: "Outstanding Project",
      student: "Nusrat Jahan",
      course: "Web Development",
      date: "05 Feb 2026",
    },
    {
      id: 3,
      title: "Best Problem Solver",
      student: "Rafiul Islam",
      course: "Algorithms",
      date: "28 Jan 2026",
    },
  ];

  const [myAwards, setMyAwards] = useState([]);
  const [totalGems, setTotalGems] = useState(0);
  const [studentName, setStudentName] = useState("");

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
      }
    }

    loadAwards();
  }, []);

  return (
    <div className="bg-emerald-950 min-h-screen relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-teal-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="p-6 relative z-10">
        <div className="student-awards">
          <h1 className="text-2xl font-bold mb-6 text-white">Student Awards</h1>

          {/* Example Awards (existing UI preserved) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => (
              <div
                key={award.id}
                className="bg-emerald-900/30 backdrop-blur-md shadow-md rounded-xl p-5 border border-emerald-700/50"
              >
                <h2 className="text-lg font-semibold text-emerald-400">
                  {award.title}
                </h2>

                <p className="mt-2 text-emerald-200/90">
                  <span className="font-medium">Student:</span> {award.student}
                </p>

                <p className="text-emerald-200/90">
                  <span className="font-medium">Course:</span> {award.course}
                </p>

                <p className="text-emerald-300/60 text-sm mt-2">
                  Awarded on: {award.date}
                </p>
              </div>
            ))}
          </div>

          {/* My Gems Section */}
          <div className="my-awards mt-10">
            <h2 className="text-xl font-bold mb-4 text-white">My Awards</h2>

            <div className="bg-emerald-600/30 backdrop-blur-md p-4 rounded-lg mb-6 border border-emerald-700/50">
              <p className="font-semibold text-lg text-white">
                Hello {studentName || "Student"}!
              </p>

              <p className="text-emerald-300">
                Total Gems Earned: <strong>💎 {totalGems}</strong>
              </p>
            </div>

            {myAwards.length === 0 ? (
              <p className="text-emerald-300/70">No gems earned yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myAwards.map((award) => (
                  <div
                    key={award._id}
                    className="bg-emerald-900/30 backdrop-blur-md border border-emerald-700/50 rounded-xl p-5 shadow"
                  >
                    <h3 className="text-lg font-semibold text-emerald-400">
                      {award.examTitle}
                    </h3>

                    <p className="text-emerald-200/90 mt-2">
                      Score: {award.percentage}%
                    </p>

                    <p className="text-emerald-200/90">
                      Gems Earned: 💎 {award.gems}
                    </p>

                    <p className="text-emerald-300/60 text-sm mt-2">
                      {new Date(award.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
