// "use client";

// import Link from "next/link";
// import { HiBars3BottomLeft } from "react-icons/hi2";
// import { IoShield } from "react-icons/io5";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const handleLogout = async () => {
//     await signOut({
//       redirect: false,
//     });

//     router.refresh(); // important
//   };

//   if (status === "loading") return null;

//   const nav = (
//     <>
//       <li className="text-[1rem]">
//         <Link href="/">Home</Link>
//       </li>
//       <li className="text-[1rem]">
//         <Link href="/features">Features</Link>
//       </li>
//       <li className="text-[1rem]">
//         <Link href="/how-it-works">How It Works</Link>
//       </li>
//       <li className="text-[1rem]">
//         <Link href="/pricing">Pricing</Link>
//       </li>
//     </>
//   );

//   return (
//     <div className="drawer">
//       <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

//       <div className="drawer-content">
//         <div className="navbar bg-base-100 px-4 lg:px-8 fixed top-0 left-0 right-0 z-50">
//           <div className="navbar-start">
//             <Link
//               href="/"
//               className="text-xl font-bold flex items-center gap-2"
//             >
//               <span className="text-primary gradient-badge p-2 rounded-lg">
//                 <IoShield />
//               </span>
//               <span className="text-primary text-[1.5rem]">SecureExam</span>
//             </Link>
//           </div>

//           <div className="navbar-center hidden lg:flex">
//             <ul className="menu menu-horizontal px-1 gap-4">{nav}</ul>
//           </div>

//           <div className="navbar-end gap-3">
//             {session ? (
//               <>
//                 <Link
//                   href="/dashboard"
//                   className="btn btn-ghost hidden lg:inline-flex"
//                 >
//                   Dashboard
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="btn btn-primary text-white hidden lg:inline-flex"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/login"
//                   className="btn btn-ghost hidden lg:inline-flex"
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   href="/auth/registration"
//                   className="btn btn-primary text-white hidden lg:inline-flex"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}

//             <label htmlFor="mobile-drawer" className="btn btn-ghost lg:hidden">
//               <HiBars3BottomLeft size={25} />
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="drawer-side z-[60]">
//         <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

//         <div className="menu p-6 w-[80%] md:w-[50%] lg:w-72 min-h-full bg-base-100">
//           <div className="mb-8 flex items-center gap-2 text-xl font-bold">
//             <span className="text-primary gradient-badge p-2 rounded-lg">
//               <IoShield />
//             </span>
//             <span className="text-primary">SecureExam</span>
//           </div>

//           <ul className="space-y-2">{nav}</ul>

//           <div className="mt-6 flex flex-col gap-2">
//             {session ? (
//               <>
//                 <Link href="/dashboard" className="btn btn-ghost w-full">
//                   Dashboard
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="btn btn-primary w-full text-white"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link href="/auth/login" className="btn btn-ghost w-full">
//                   Login
//                 </Link>

//                 <Link
//                   href="/auth/registration"
//                   className="btn btn-primary w-full text-white"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { IoShield } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation"; // usePathname ইম্পোর্ট করা হয়েছে

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // বর্তমান রাউট পাওয়ার জন্য

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });

    router.refresh(); // important
  };

  if (status === "loading") return null;

  // Nav links array
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
  ];

  const nav = (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href; // চেক করা হচ্ছে লিংকটি অ্যাকটিভ কি না

        return (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`text-[1rem] transition-all duration-300 rounded-lg px-4 py-2 ${
                isActive
                  ? "text-primary bg-primary/10 font-bold" // অ্যাকটিভ অবস্থার ডিজাইন
                  : "font-medium text-base-content/80 hover:text-primary hover:bg-primary/10" // নরমাল অবস্থার ডিজাইন
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );

  // Determine role-based dashboard link
  const dashboardLink =
    session?.user?.role === "admin"
      ? "/dashboard/admin"
      : session?.user?.role === "instructor"
      ? "/dashboard/instructor"
      : "/dashboard/student";

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Glassmorphism Navbar with Shadow */}
        <div className="navbar bg-base-100/80 backdrop-blur-md px-4 lg:px-8 fixed top-0 left-0 right-0 z-50 border-b border-base-200/50 shadow-sm transition-all duration-300">
          <div className="navbar-start">
            <Link
              href="/"
              className="text-xl font-bold flex items-center gap-2 group"
            >
              <span className="text-primary bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 p-2 rounded-lg">
                <IoShield size={22} />
              </span>
              <span className="text-base-content group-hover:text-primary transition-colors duration-300 text-[1.4rem] tracking-tight">
                SecureExam
              </span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">{nav}</ul>
          </div>

          <div className="navbar-end gap-3">
            {session ? (
              <>
                <Link
                  href={dashboardLink}
                  className={`btn btn-ghost hidden lg:inline-flex hover:text-primary hover:bg-primary/10 transition-all duration-300 ${
                    pathname.startsWith("/dashboard") ? "text-primary bg-primary/10 font-bold" : "font-semibold"
                  }`}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-primary text-white hidden lg:inline-flex hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`btn btn-ghost hidden lg:inline-flex hover:text-primary hover:bg-primary/10 transition-all duration-300 ${
                    pathname === "/auth/login" ? "text-primary bg-primary/10 font-bold" : "font-semibold"
                  }`}
                >
                  Login
                </Link>

                <Link
                  href="/auth/registration"
                  className="btn btn-primary text-white hidden lg:inline-flex hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
                >
                  Get Started
                </Link>
              </>
            )}

            <label
              htmlFor="mobile-drawer"
              className="btn btn-ghost lg:hidden hover:bg-primary/10 hover:text-primary transition-colors duration-300"
            >
              <HiBars3BottomLeft size={28} />
            </label>
          </div>
        </div>
      </div>

      <div className="drawer-side z-[60]">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

        <div className="menu p-6 w-[80%] md:w-[50%] lg:w-72 min-h-full bg-base-100 shadow-2xl">
          <div className="mb-8 flex items-center gap-3 text-xl font-bold border-b border-base-200 pb-4">
            <span className="text-primary bg-primary/10 p-2 rounded-lg">
              <IoShield size={24} />
            </span>
            <span className="text-base-content">SecureExam</span>
          </div>

          <ul className="space-y-2 flex-1">{nav}</ul>

          <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-base-200">
            {session ? (
              <>
                <Link
                  href={dashboardLink}
                  className={`btn w-full hover:bg-primary/10 hover:text-primary transition-colors ${
                    pathname.startsWith("/dashboard") ? "bg-primary/10 text-primary font-bold" : "btn-ghost"
                  }`}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`btn w-full hover:bg-primary/10 hover:text-primary transition-colors ${
                    pathname === "/auth/login" ? "bg-primary/10 text-primary font-bold" : "btn-ghost"
                  }`}
                >
                  Login
                </Link>

                <Link
                  href="/auth/registration"
                  className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
                >
                Get Started
                   </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}