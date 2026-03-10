export default function StudentAwardsPage() {
  const awards = [
    {
      id: 1,
      title: "Best Academic Performance",
      student: "Ayesha Rahman",
      course: "Compiler Design",
      date: "15 Feb 2026",
    },
    {
      id: 2,
      title: "Top React Developer",
      student: "Mahim Hasan",
      course: "MERN Stack",
      date: "10 Feb 2026",
    },
    {
      id: 3,
      title: "Outstanding Project",
      student: "Nusrat Jahan",
      course: "Web Development",
      date: "05 Feb 2026",
    },
    {
      id: 4,
      title: "Best Problem Solver",
      student: "Rafiul Islam",
      course: "Algorithms",
      date: "28 Jan 2026",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Awards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {awards.map((award) => (
          <div
            key={award.id}
            className="bg-white shadow-md rounded-xl p-5 border"
          >
            <h2 className="text-lg font-semibold text-blue-600">
              {award.title}
            </h2>

            <p className="mt-2 text-gray-700">
              <span className="font-medium">Student:</span> {award.student}
            </p>

            <p className="text-gray-700">
              <span className="font-medium">Course:</span> {award.course}
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Awarded on: {award.date}
            </p>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
