// "use client";

// import { useState } from "react";

// export default function Login() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
//       <div className="w-full max-w-md px-6">
//         <div className="bg-white dark:bg-neutral-800 shadow-2xl rounded-2xl p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold">Welcome Back</h1>
//             <p className="text-gray-500 mt-2">Sign in to continue</p>
//           </div>
//           <form className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 placeholder="example@email.com"
//                 className="w-full px-4 py-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Password</label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full px-4 py-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
//               />
//             </div>
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input type="checkbox" className="accent-black" />
//                 Remember me
//               </label>
//               <a href="#" className="text-gray-500 hover:underline">
//                 Forgot password?
//               </a>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
//             >
//               Login
//             </button>
//           </form>
//           <p className="text-sm text-center text-gray-500 mt-6">
//             Don’t have an account?{" "}
//             <a href="#" className="underline">
//               Register Now
//             </a>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState("admin");

  return (
    <div className="w-full mt-20 max-w-md bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(13,124,102,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(13,124,102,0.25)] transition-all duration-300 p-8">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-full bg-[#0D7C66] flex items-center justify-center text-white text-xl font-bold">
          SE
        </div>
        <h2 className="mt-3 text-2xl font-bold text-[#0D7C66]">SecureExam</h2>
        <p className="text-sm text-slate-500">
          Secure Online Examination Platform
        </p>
      </div>

      {/* Role Pills */}
      <div className="flex justify-center gap-2 mb-6">
        {["admin", "instructor", "student"].map((item) => (
          <button
            key={item}
            onClick={() => setRole(item)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
              role === item
                ? "bg-[#0D7C66] text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {item === "admin" && "👑 Admin"}
            {item === "instructor" && "📚 Instructor"}
            {item === "student" && "🎓 Student"}
          </button>
        ))}
      </div>

      {/* Form */}
      <form className="space-y-4">
        {/* Email */}
        <div>
          <label className="text-sm text-slate-600">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-slate-600">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-1 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              className="w-4 h-4 border-slate-300 rounded focus:ring-[#41B3A2] checked:bg-[#0D7C66]"
            />
            Remember me
          </label>

          <a
            href="#"
            className="text-slate-500 hover:text-[#0D7C66] transition"
          >
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-[#0D7C66] text-white font-medium hover:bg-[#41B3A2] transition-all transform hover:-translate-y-0.5"
        >
          Login to Dashboard
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-2">
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="text-slate-400 text-sm">or continue with</span>
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>

      {/* Google Button */}
      <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#41B3A2] hover:bg-white transition">
        <span className="text-[#DB4437] font-bold">G</span>
        <span className="text-slate-600 hover:text-slate-800">
          Continue with Google
        </span>
      </button>

      {/* Sign Up */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <a
          href="/auth/register"
          className="text-[#0D7C66] hover:text-[#41B3A2] font-medium"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
