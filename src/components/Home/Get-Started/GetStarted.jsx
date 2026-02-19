import Link from "next/link";
import { FaTelegramPlane } from "react-icons/fa";
import React from "react";

const GetStarted = () => {
  return (
    <div className="bg-linear-to-br from-[#0d7c66] via-[#41b3a2] to-[#bde8ca] flex justify-center items-center flex-col text-center py-16 px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
        Ready to Transform Your Exams?
      </h2>

      <p className="text-xl text-white/90">
        Join hundreds of institutions using SecureExam today
      </p>

      <Link href="/" className="bg-white text-[#0D7C66] font-semibold transition-all hover:shadow-xl hover:scale-105 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl mt-4">
        <FaTelegramPlane size={20} /> Get Started for Free
      </Link>

      <p className="text-white/80 mt-2 font-semibold">No credit card required • Free 14-day trial</p>
    </div>
  );
};

export default GetStarted;
