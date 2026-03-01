// src/app/loading.js
"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0D7C66] to-[#41B3A2] text-white">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Loading Text */}
      <h1 className="text-3xl font-bold mb-2">Loading...</h1>
      <p className="text-center max-w-xs">
        Please wait while we prepare your page. Good things take a moment!
      </p>
    </div>
  );
}
