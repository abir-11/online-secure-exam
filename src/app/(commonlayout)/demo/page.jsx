// "use client";

// import Link from "next/link";
// import { useSession } from "next-auth/react";

// export default function DemoPage() {
//   const { data: session, status } = useSession();

//   if (status === "loading") return <p>Loading...</p>;

//   return <div>hello</div>;
// }

"use client";

import Image from "next/image";
import { FiCheckCircle, FiCpu, FiShield } from "react-icons/fi";

export default function DemoPage() {
  const features = [
    {
      icon: <FiShield size={28} />,
      title: "Secure Exams",
      description:
        "AI-based proctoring ensures cheating is minimized, providing a secure testing environment.",
    },
    {
      icon: <FiCpu size={28} />,
      title: "Smart Analytics",
      description:
        "Track student performance and generate insightful reports in real-time.",
    },
    {
      icon: <FiCheckCircle size={28} />,
      title: "Instant Feedback",
      description:
        "Examinees receive immediate results and performance analysis after completing exams.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] text-white">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-emerald-400">SecureExam Demo</span>
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">
          Experience a modern, secure, and AI-powered online examination
          platform designed to make testing seamless for both students and
          instructors.
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a
            href="/auth/login"
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold text-black transition"
          >
            Try Demo Now
          </a>
          <a
            href="#features"
            className="px-8 py-4 border border-emerald-500 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white/5 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-400">
            Platform Features
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            SecureExam combines technology and intelligence to provide a smooth,
            fair, and insightful testing experience.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/10 p-8 rounded-xl border border-white/20 flex flex-col items-center text-center hover:scale-105 transition"
            >
              <div className="text-emerald-400 mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Screens Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-400">
            Live Demo Screens
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Get a glimpse of the SecureExam interface and user experience.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Image
            src="/demo/login-screen.png"
            alt="Login Screen"
            width={400}
            height={300}
            className="rounded-lg border border-white/20 shadow-lg"
          />
          <Image
            src="/demo/exam-screen.png"
            alt="Exam Screen"
            width={400}
            height={300}
            className="rounded-lg border border-white/20 shadow-lg"
          />
          <Image
            src="/demo/admin-dashboard.png"
            alt="Admin Dashboard"
            width={400}
            height={300}
            className="rounded-lg border border-white/20 shadow-lg"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-white/5 backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-emerald-400 mb-4">
          Ready to Try SecureExam?
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Log in and explore the features firsthand. Experience how exams can be
          secure, smooth, and fair with AI-powered proctoring.
        </p>
        <a
          href="/auth/login"
          className="px-12 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold text-black transition"
        >
          Start Demo
        </a>
      </section>
    </div>
  );
}
