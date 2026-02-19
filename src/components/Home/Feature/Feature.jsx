import { features } from "@/assets/assets";
import React from "react";
import { FaStar } from "react-icons/fa6";

const Feature = () => {
  return (
    <div className="mt-8">
      <div className="heading flex flex-col items-center text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full gradient-badge text-sm font-semibold mb-4">
          <FaStar size={20} className=" mr-2" /> Powerful Features
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-linear-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">
            Everything You Need
          </span>
          <br />
          for Secure Exams
        </h2>
        <p className="text-gray-600 text-lg">
          Comprehensive examination management with advanced security and
          automation
        </p>
      </div>

      {/* feature card added */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 my-12">
        {features.map((feature) => {
          const Icon = feature.icon; 
          return (
            <div key={feature.id} className="feature-card p-6 shadow-lg rounded-xl border border-transparent hover:border-green-700 transition duration-300">
                <div className="gradient-badge w-12 h-12 flex items-center justify-center rounded-full mb-4">
                    <Icon size={25} className="text-primary mb-2" />
                </div>

              <h3 className="font-bold">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feature;
