import Image from "next/image";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { HiPlayCircle } from "react-icons/hi2";
import { FaEye } from "react-icons/fa";
import { assets } from "@/assets/assets";

const HomeHero = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 hero-gradient pt-20 lg:pt-32 pb-12">

      {/* ================= LEFT SIDE ================= */}
      <section className="left-side space-y-5 w-full  text-center lg:text-left">

        {/* Badge */}
        <div className="flex items-center justify-center lg:justify-start gap-2 px-4 py-2 gradient-badge rounded-full w-fit mx-auto lg:mx-0 hidden md:flex">
          <IoIosCheckmarkCircle size={20} />
          <span className="text-sm sm:text-base">
            Trusted by 500+ Institutions Worldwide
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold   bg-linear-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">
          Secure, <br />
          <span className="text-black">Fair, &</span> <br />
          Automated <br />
          <span className="text-black">Online Exams</span>
        </h1>

        {/* Paragraph */}
        <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
          From automatic proctoring logs to instant grading— 
          SecureExam provides a seamless examination 
          experience for universities, coaching centers, and online platforms.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6">

          <Link
            href="/"
            className="flex gap-2 items-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-white font-semibold text-base sm:text-lg gradient-button-primary w-full sm:w-auto justify-center"
          >
            <HiPlayCircle size={22} />
            Start free trial
          </Link>

          <Link
            href="/"
            className="flex gap-2 items-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-white font-semibold text-base sm:text-lg gradient-button-secondary w-full sm:w-auto justify-center"
          >
            <FaEye size={20} />
            View Demo
          </Link>

        </div>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 items-center lg:items-start justify-center lg:justify-start">

          <div className="rounded-xl px-6 py-4 bg-white/80 backdrop-blur-md border border-[#41B3A2]/20 text-center">
            <div className="text-[1.3rem] md:text-2xl font-bold bg-linear-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">
              50K+
            </div>
            <div className="text-gray-600 text-sm sm:text-base">
              Active Students
            </div>
          </div>

          <div className="rounded-xl px-6 py-4 bg-white/80 backdrop-blur-md border border-[#41B3A2]/20 text-center">
            <div className="text-[1.3rem] md:text-2xl font-bold bg-linear-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-gray-600 text-sm sm:text-base">
              Exams Conducted
            </div>
          </div>

          <div className="rounded-xl px-6 py-4 bg-white/80 backdrop-blur-md border border-[#41B3A2]/20 text-center">
            <div className="text-[1.3rem] md:text-2xl font-bold bg-linear-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">
              98%
            </div>
            <div className="text-gray-600 text-sm sm:text-base">
              Satisfaction
            </div>
          </div>

        </div>
      </section>

      {/* ================= RIGHT SIDE ================= */}
      <section className="right-side w-full  flex justify-center mb-12 lg:mb-0">
        <Image
          src={assets.home_hero_img}
          alt="Hero Image"
          width={600}
          height={500}
          className="w-70 sm:w-87.5 md:w-112.5 lg:w-150 h-auto"
          priority
        />
      </section>

    </div>
  );
};

export default HomeHero;
