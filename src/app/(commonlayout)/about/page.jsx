// import React from "react";
import Image from "next/image";
import { IoShieldCheckmark, IoStatsChart } from "react-icons/io5";
import { FaUsers, FaLightbulb, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import Link from "next/link";

export default function AboutSction() {
  return (
    <div className="bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#022c22] text-white">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-12 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          About <span className="text-emerald-400">SecureExam</span>
        </h1>

        {/* <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
          SecureExam is a modern online examination platform designed to ensure
          security, fairness, and automation for institutions, coaching centers,
          and online educators. 
          
        </p>  */}

        <div className="mt-8 max-w-6xl mx-auto text-gray-300 text-lg leading-relaxed space-y-6 text-left">
          <p>
            SecureExam is a modern, web-based online examination platform
            designed to deliver a{" "}
            <span className="text-emerald-400 font-medium">
              secure, scalable, and user-friendly
            </span>
            environment for conducting and managing digital assessments. Built
            with advanced technologies like{" "}
            <span className="text-white">Next.js, MongoDB, and NextAuth</span>,
            the platform ensures seamless performance while maintaining strict
            security standards. It supports three key roles —{" "}
            <span className="text-emerald-400">
              Admin, Instructor, and Student
            </span>{" "}
            — each with clearly defined permissions.
          </p>

          <p>
            After authentication, users are redirected to personalized
            dashboards. Instructors can create batches, manage exams, and
            monitor performance through analytics, while students can
            participate in exams, receive results, and track progress. The
            platform also includes features like
            <span className="text-emerald-400">
              {" "}
              real-time results, notifications, and a gem-based reward system
            </span>
            , making the experience more engaging and motivating. SecureExam
            ensures strong data security through protected routes, session
            management, and role-based access control. With its modern design
            and powerful features, it is a reliable solution for institutions
            and online learning platforms.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-4 sm:px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <Image
            src="/images/heroimg.jpg"
            alt="Mission"
            width={400}
            height={400}
            className="rounded-xl shadow-lg"
          />

          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-emerald-400">Our Mission</h2>

            <p className="text-gray-300">
              Our mission is to build a trusted digital examination environment
              where institutions can conduct exams securely without compromising
              fairness.
            </p>

            <p className="text-gray-300">
              We focus on automation, smart monitoring, and instant evaluation
              systems to improve academic efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 sm:px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-emerald-400">
            Why Choose SecureExam?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <IoShieldCheckmark size={40} />,
                title: "Secure Proctoring",
                desc: "AI powered proctoring logs ensure fairness.",
              },
              {
                icon: <IoStatsChart size={40} />,
                title: "Instant Evaluation",
                desc: "Automatic grading reduces workload.",
              },
              {
                icon: <FaUsers size={40} />,
                title: "Scalable Platform",
                desc: "Handle thousands of students.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:scale-105 transition duration-300"
              >
                <div className="text-emerald-400 mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="px-4 sm:px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-emerald-400">Meet Our Team</h2>
          <p className="mt-4 text-gray-300 mb-12">
            Professionals dedicated to making exams fair and efficient.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Saima */}
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:scale-105 transition duration-300">
              <Image
                src="/images/saima.png"
                width={120}
                height={120}
                alt="Saima"
                className="rounded-full object-cover mx-auto mb-4"
              />
              <h4 className="font-bold">Saima Khan</h4>
              <p className="text-gray-400 text-sm">Web Developer</p>

              <div className="flex justify-center gap-4 mt-4">
                <a href="https://github.com/saimakhan1" target="_blank">
                  <FaGithub className="hover:text-emerald-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/saima-khan-77837a128/"
                  target="_blank"
                >
                  <FaLinkedin className="hover:text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Sadia */}
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:scale-105 transition duration-300">
              <Image
                src="/images/sadia.png"
                width={120}
                height={120}
                alt="Sadia"
                className="rounded-full object-cover mx-auto mb-4"
              />
              <h4 className="font-bold">Sadia Rahman</h4>
              <p className="text-gray-400 text-sm">Web Developer</p>

              <div className="flex justify-center gap-4 mt-4">
                <a href="https://github.com/Sadia1609" target="_blank">
                  <FaGithub className="hover:text-emerald-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sadiarahman1609/"
                  target="_blank"
                >
                  <FaLinkedin className="hover:text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Abir */}
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:scale-105 transition duration-300">
              <Image
                src="/images/abir.png"
                width={120}
                height={120}
                alt="Abir"
                className="rounded-full object-cover mx-auto mb-4"
              />
              <h4 className="font-bold">Arafat Alam Abir</h4>
              <p className="text-gray-400 text-sm">Web Developer</p>

              <div className="flex justify-center gap-4 mt-4">
                <a href="https://github.com/abir-11" target="_blank">
                  <FaGithub className="hover:text-emerald-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/md-arafat-alam-abir/"
                  target="_blank"
                >
                  <FaLinkedin className="hover:text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Bakia */}
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:scale-105 transition duration-300">
              <Image
                src="/images/nimmy.png"
                width={120}
                height={120}
                alt="Bakia"
                className="rounded-full object-cover mx-auto mb-4"
              />
              <h4 className="font-bold">Jannatul Bakia</h4>
              <p className="text-gray-400 text-sm">Web Developer</p>

              <div className="flex justify-center gap-4 mt-4">
                <a href="https://github.com/jannatulbakia" target="_blank">
                  <FaGithub className="hover:text-emerald-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jannatul-bakia-456753353/"
                  target="_blank"
                >
                  <FaLinkedin className="hover:text-emerald-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-bold">
          Ready to Transform Your Exam System?
        </h2>

        <p className="mt-4 text-gray-300">
          Join SecureExam and experience secure & automated testing.
        </p>

        <Link
          href="#"
          className="mt-8 inline-block px-8 py-3 bg-emerald-500 text-black font-semibold rounded-lg hover:scale-105 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
