// // Navbar.jsx
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
//     await signOut({ redirect: false }); // ✅ no redirect
//     router.refresh(); // ✅ refresh the page to update navbar session state
//   };

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
//         <div className="menu p-6 w-[80%] sm:w-[80%] md:w-[50%] lg:w-72 min-h-full bg-base-100 text-base-content">
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
//               <Link
//                 href="/auth/registration"
//                 className="btn btn-primary w-full text-white"
//               >
//                 Get Started
//               </Link>
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
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });

    router.refresh(); // important
  };

  if (status === "loading") return null;

  const nav = (
    <>
      <li className="text-[1rem]">
        <Link href="/">Home</Link>
      </li>
      <li className="text-[1rem]">
        <Link href="/features">Features</Link>
      </li>
      <li className="text-[1rem]">
        <Link href="/how-it-works">How It Works</Link>
      </li>
      <li className="text-[1rem]">
        <Link href="/pricing">Pricing</Link>
      </li>
    </>
  );

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="navbar bg-base-100 px-4 lg:px-8 fixed top-0 left-0 right-0 z-50">
          <div className="navbar-start">
            <Link
              href="/"
              className="text-xl font-bold flex items-center gap-2"
            >
              <span className="text-primary gradient-badge p-2 rounded-lg">
                <IoShield />
              </span>
              <span className="text-primary text-[1.5rem]">SecureExam</span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-4">{nav}</ul>
          </div>

          <div className="navbar-end gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="btn btn-ghost hidden lg:inline-flex"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-primary text-white hidden lg:inline-flex"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="btn btn-ghost hidden lg:inline-flex"
                >
                  Login
                </Link>

                <Link
                  href="/auth/registration"
                  className="btn btn-primary text-white hidden lg:inline-flex"
                >
                  Get Started
                </Link>
              </>
            )}

            <label htmlFor="mobile-drawer" className="btn btn-ghost lg:hidden">
              <HiBars3BottomLeft size={25} />
            </label>
          </div>
        </div>
      </div>

      <div className="drawer-side z-[60]">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

        <div className="menu p-6 w-[80%] md:w-[50%] lg:w-72 min-h-full bg-base-100">
          <div className="mb-8 flex items-center gap-2 text-xl font-bold">
            <span className="text-primary gradient-badge p-2 rounded-lg">
              <IoShield />
            </span>
            <span className="text-primary">SecureExam</span>
          </div>

          <ul className="space-y-2">{nav}</ul>

          <div className="mt-6 flex flex-col gap-2">
            {session ? (
              <>
                <Link href="/dashboard" className="btn btn-ghost w-full">
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-primary w-full text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn btn-ghost w-full">
                  Login
                </Link>

                <Link
                  href="/auth/registration"
                  className="btn btn-primary w-full text-white"
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
