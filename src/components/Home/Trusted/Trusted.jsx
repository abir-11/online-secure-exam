import React from "react";

const Trusted = () => {
  return (
    <div className="bg-linear-to-br from-white via-gray-50 to-white py-9 flex justify-center flex-col items-center">
      <p className="text-gray-600 font-semibold text-center px-6">
        Trusted by leading educational institutions worldwide
      </p>

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-6">
        <span className="text-xl font-bold bg-linear-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">
          UNIVERSITY
        </span>

        <span className="text-xl font-bold bg-linear-to-r from-[#41B3A2] to-[#0D7C66] bg-clip-text text-transparent">
          COLLEGE
        </span>

        <span className="text-xl font-bold bg-linear-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">
          SCHOOL
        </span>

        <span className="text-xl font-bold bg-linear-to-r from-[#41B3A2] to-[#0D7C66] bg-clip-text text-transparent">
          ACADEMY
        </span>
        
        <span className="text-xl font-bold bg-linear-to-r from-[#0D7C66] to-[#41B3A2] bg-clip-text text-transparent">
          INSTITUTE
        </span>
      </div>
    </div>
  );
};

export default Trusted;
