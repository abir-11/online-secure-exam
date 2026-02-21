// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [role, setRole] = useState("admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (res?.ok) {
//       router.push("/dashboard");
//     } else {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="w-full my-30 max-w-md bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(13,124,102,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(13,124,102,0.25)] transition-all duration-300 p-8">
//       {/* Logo */}
//       <div className="flex flex-col items-center mb-6">
//         <div className="w-14 h-14 rounded-full bg-[#0D7C66] flex items-center justify-center text-white text-xl font-bold">
//           SE
//         </div>
//         <h2 className="mt-3 text-2xl font-bold text-[#0D7C66]">SecureExam</h2>
//         <p className="text-sm text-slate-500">
//           Secure Online Examination Platform
//         </p>
//       </div>

//       {/* Role Pills */}
//       <div className="flex justify-center gap-2 mb-6">
//         {["admin", "instructor", "student"].map((item) => (
//           <button
//             key={item}
//             onClick={() => setRole(item)}
//             className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
//               role === item
//                 ? "bg-[#0D7C66] text-white"
//                 : "bg-slate-100 text-slate-500 hover:bg-slate-200"
//             }`}
//           >
//             {item === "admin" && "👑 Admin"}
//             {item === "instructor" && "📚 Instructor"}
//             {item === "student" && "🎓 Student"}
//           </button>
//         ))}
//       </div>

//       {/* Form */}
//       <form className="space-y-4" onSubmit={handleLogin}>
//         <div>
//           <label className="text-sm text-slate-600">Email Address</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full mt-1 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="text-sm text-slate-600">Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             className="w-full mt-1 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 rounded-lg bg-[#0D7C66] text-white font-medium hover:bg-[#41B3A2]"
//         >
//           Login to Dashboard
//         </button>
//       </form>

//       {/* Divider */}
//       <div className="my-6 flex items-center gap-2">
//         <div className="flex-1 h-px bg-slate-200"></div>
//         <span className="text-slate-400 text-sm">or continue with</span>
//         <div className="flex-1 h-px bg-slate-200"></div>
//       </div>

//       {/* Google Login */}
//       <button
//         onClick={() => signIn("google")}
//         className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 border border-slate-200"
//       >
//         <span className="text-[#DB4437] font-bold">G</span>
//         Continue with Google
//       </button>

//       {/* GitHub Login */}
//       <button
//         onClick={() => signIn("github")}
//         className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 border border-slate-200"
//       >
//         Continue with GitHub
//       </button>

//       <p className="mt-6 text-center text-sm text-slate-500">
//         Don't have an account?{" "}
//         <a
//           href="/auth/register"
//           className="text-[#0D7C66] hover:text-[#41B3A2] font-medium"
//         >
//           Sign up
//         </a>
//       </p>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [role, setRole] = useState("admin"); // default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Credentials signIn
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      alert(result.error);
      setLoading(false);
    } else {
      // Get session info to fetch role
      const sessionRes = await fetch("/api/auth/session");
      const sessionData = await sessionRes.json();

      if (sessionData?.user?.role) {
        const role = sessionData.user.role;
        if (role === "admin") window.location.href = "/dashboard/admin";
        else if (role === "instructor")
          window.location.href = "/dashboard/instructor";
        else window.location.href = "/dashboard/student";
      } else {
        window.location.href = "/dashboard";
      }
    }
  };

  return (
    <div className="w-full my-30 max-w-md bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(13,124,102,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(13,124,102,0.25)] transition-all duration-300 p-8">
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
            type="button"
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
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="text-sm text-slate-600">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-slate-800 placeholder-slate-400"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-slate-800 placeholder-slate-400"
          />
        </div>

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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-[#0D7C66] text-white font-medium hover:bg-[#41B3A2] transition-all transform hover:-translate-y-0.5"
        >
          {loading ? "Logging in..." : "Login to Dashboard"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-2">
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="text-slate-400 text-sm">or continue with</span>
        <div className="flex-1 h-px bg-slate-200"></div>
      </div>

      {/* Google Button */}
      <button
        onClick={() => signIn("google")}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#41B3A2] hover:bg-white transition"
      >
        <span className="text-[#DB4437] font-bold">G</span>
        <span className="text-slate-600 hover:text-slate-800">
          Continue with Google
        </span>
      </button>

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
