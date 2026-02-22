// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";

// export default function RegisterPage() {
//   const [role, setRole] = useState("instructor");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("/api/auth/registration", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           role,
//           phone,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Registration successful");
//         window.location.href = "/auth/login";
//       } else {
//         alert(data.message || "Registration failed");
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="w-full my-30 max-w-md bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(13,124,102,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(13,124,102,0.25)] transition-all duration-300 p-8">
//       {/* Logo */}
//       <div className="flex flex-col items-center mb-6">
//         <div className="w-14 h-14 rounded-full bg-[#0D7C66] flex items-center justify-center text-white text-xl font-bold">
//           SE
//         </div>
//         <h2 className="mt-3 text-2xl font-bold text-[#0D7C66]">SecureExam</h2>
//         <p className="text-sm text-[#4B5563]">
//           Create your account to get started
//         </p>
//       </div>

//       {/* Role Pills */}
//       <div className="flex justify-center gap-2 mb-6">
//         {["admin", "instructor", "student"].map((item) => (
//           <button
//             key={item}
//             type="button"
//             onClick={() => setRole(item)}
//             className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
//               role === item
//                 ? "bg-[#0D7C66] text-white"
//                 : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#334155]"
//             }`}
//           >
//             {item === "admin" && "👑 Admin"}
//             {item === "instructor" && "📚 Instructor"}
//             {item === "student" && "🎓 Student"}
//           </button>
//         ))}
//       </div>

//       {/* Form */}
//       <form className="space-y-4" onSubmit={handleRegister}>
//         {/* Name */}
//         <div>
//           <label className="text-sm text-[#4B5563]">Full Name</label>
//           <input
//             type="text"
//             placeholder="Enter your full name"
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="w-full mt-1 px-4 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-[#1e293b] placeholder-[#94a3b8]"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="text-sm text-[#4B5563]">Email Address</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full mt-1 px-4 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-[#1e293b] placeholder-[#94a3b8]"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="text-sm text-[#4B5563]">Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full mt-1 px-4 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-[#1e293b] placeholder-[#94a3b8]"
//           />
//         </div>

//         {/* Confirm Password */}
//         <div>
//           <label className="text-sm text-[#4B5563]">Confirm Password</label>
//           <input
//             type="password"
//             placeholder="Re-enter your password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className="w-full mt-1 px-4 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-[#1e293b] placeholder-[#94a3b8]"
//           />
//         </div>

//         {/* Phone Number */}
//         <div>
//           <label className="text-sm text-[#4B5563]">Phone Number</label>
//           <input
//             type="tel"
//             placeholder="Enter your phone number"
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full mt-1 px-4 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#41B3A2] focus:outline-none focus:ring-2 focus:ring-[#41B3A2]/20 text-[#1e293b] placeholder-[#94a3b8]"
//           />
//         </div>

//         {/* Terms */}
//         <div className="flex items-center gap-2 text-sm">
//           <input
//             type="checkbox"
//             required
//             className="w-4 h-4 border-[#cbd5e1] rounded focus:ring-[#41B3A2] checked:bg-[#0D7C66]"
//           />
//           <span className="text-[#475569]">
//             I agree to the{" "}
//             <a href="/terms" className="text-[#0D7C66] hover:text-[#41B3A2]">
//               Terms & Conditions
//             </a>
//           </span>
//         </div>

//         {/* Register Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-2 rounded-lg bg-[#0D7C66] text-white font-medium hover:bg-[#41B3A2] transition-all transform hover:-translate-y-0.5"
//         >
//           {loading ? "Creating Account..." : "Register"}
//         </button>
//       </form>

//       {/* Divider */}
//       <div className="my-6 flex items-center gap-2">
//         <div className="flex-1 h-px bg-[#e2e8f0]"></div>
//         <span className="text-[#94a3b8] text-sm">or continue with</span>
//         <div className="flex-1 h-px bg-[#e2e8f0]"></div>
//       </div>

//       {/* Google Button */}
//       <button
//         onClick={() => signIn("google")}
//         className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#41B3A2] hover:bg-white transition"
//       >
//         <span className="text-[#DB4437] font-bold">G</span>
//         <span className="text-[#475569] hover:text-[#1e293b]">
//           Continue with Google
//         </span>
//       </button>

//       {/* Sign In Link */}
//       <p className="mt-6 text-center text-sm text-[#64748b]">
//         Already have an account?{" "}
//         <a
//           href="/auth/login"
//           className="text-[#0D7C66] hover:text-[#41B3A2] font-medium"
//         >
//           Sign in
//         </a>
//       </p>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [role, setRole] = useState("instructor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        // Auto-login after registration
        await signIn("credentials", { email, password, redirect: false });

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
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="w-full my-30 max-w-md bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(13,124,102,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(13,124,102,0.25)] transition-all duration-300 p-8">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-full bg-[#0D7C66] flex items-center justify-center text-white text-xl font-bold">
          SE
        </div>
        <h2 className="mt-3 text-2xl font-bold text-[#0D7C66]">SecureExam</h2>
        <p className="text-sm text-[#4B5563]">
          Create your account to get started
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
                : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#334155]"
            }`}
          >
            {item === "admin" && "👑 Admin"}
            {item === "instructor" && "📚 Instructor"}
            {item === "student" && "🎓 Student"}
          </button>
        ))}
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mt-1 px-4 py-2 rounded-lg ..."
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mt-1 px-4 py-2 rounded-lg ..."
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mt-1 px-4 py-2 rounded-lg ..."
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mt-1 px-4 py-2 rounded-lg ..."
        />
        <input
          type="tel"
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mt-1 px-4 py-2 rounded-lg ..."
        />

        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            required
            className="w-4 h-4 border-[#cbd5e1] rounded focus:ring-[#41B3A2] checked:bg-[#0D7C66]"
          />
          <span className="text-[#475569]">
            I agree to the{" "}
            <a href="/terms" className="text-[#0D7C66] hover:text-[#41B3A2]">
              Terms & Conditions
            </a>
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-[#0D7C66] text-white font-medium hover:bg-[#41B3A2]"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      {/* Divider & Google */}
      <div className="my-6 flex items-center gap-2">
        <div className="flex-1 h-px bg-[#e2e8f0]"></div>
        <span className="text-[#94a3b8] text-sm">or continue with</span>
        <div className="flex-1 h-px bg-[#e2e8f0]"></div>
      </div>
      <button
        onClick={() => signIn("google")}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#41B3A2] hover:bg-white transition"
      >
        <span className="text-[#DB4437] font-bold">G</span>
        <span className="text-[#475569] hover:text-[#1e293b]">
          Continue with Google
        </span>
      </button>

      <p className="mt-6 text-center text-sm text-[#64748b]">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-[#0D7C66] hover:text-[#41B3A2] font-medium"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
