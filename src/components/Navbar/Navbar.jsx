// // // // "use client";

// // // // import Link from "next/link";
// // // // import { HiBars3BottomLeft } from "react-icons/hi2";
// // // // import { IoShield } from "react-icons/io5";
// // // // import { useSession, signOut } from "next-auth/react";
// // // // import { usePathname, useRouter } from "next/navigation";

// // // // export default function Navbar() {
// // // //   const { data: session, status } = useSession();
// // // //   const router = useRouter();
// // // //   const pathname = usePathname();

// // // //   const handleLogout = async () => {
// // // //     await signOut({ redirect: false });
// // // //     router.refresh();
// // // //   };

// // // //   if (status === "loading") return null;

// // // //   const navLinks = [
// // // //     { name: "Home", href: "/" },
// // // //     { name: "Features", href: "/features" },
// // // //     { name: "How It Works", href: "/how-it-works" },
// // // //     { name: "Pricing", href: "/pricing" },
// // // //   ];

// // // //   const nav = (
// // // //     <>
// // // //       {navLinks.map((link) => {
// // // //         const isActive = pathname === link.href;
// // // //         return (
// // // //           <li key={link.name}>
// // // //             <Link
// // // //               href={link.href}
// // // //               className={`text-[1rem] transition-all duration-300 rounded-lg px-4 py-2 ${
// // // //                 isActive
// // // //                   ? "text-primary bg-primary/10 font-bold"
// // // //                   : "font-medium text-base-content/80 hover:text-primary hover:bg-primary/10"
// // // //               }`}
// // // //             >
// // // //               {link.name}
// // // //             </Link>
// // // //           </li>
// // // //         );
// // // //       })}
// // // //     </>
// // // //   );

// // // //   const dashboardLink =
// // // //     session?.user?.role === "admin"
// // // //       ? "/dashboard/admin"
// // // //       : session?.user?.role === "instructor"
// // // //         ? "/dashboard/instructor"
// // // //         : "/dashboard/student";

// // // //   // Use default avatar if user doesn't have one
// // // //   const profileImage = session?.user?.image || "/default-avatar.png"; // place this file in /public

// // // //   return (
// // // //     <div className="drawer">
// // // //       <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

// // // //       <div className="drawer-content">
// // // //         {/* Navbar */}
// // // //         <div className="navbar bg-base-100/80 backdrop-blur-md px-4 lg:px-8 fixed top-0 left-0 right-0 z-50 border-b border-base-200/50 shadow-sm transition-all duration-300">
// // // //           <div className="navbar-start">
// // // //             <Link
// // // //               href="/"
// // // //               className="text-xl font-bold flex items-center gap-2 group"
// // // //             >
// // // //               <span className="text-primary bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 p-2 rounded-lg">
// // // //                 <IoShield size={22} />
// // // //               </span>
// // // //               <span className="text-base-content group-hover:text-primary transition-colors duration-300 text-[1.4rem] tracking-tight">
// // // //                 SecureExam
// // // //               </span>
// // // //             </Link>
// // // //           </div>

// // // //           <div className="navbar-center hidden lg:flex">
// // // //             <ul className="menu menu-horizontal px-1 gap-2">{nav}</ul>
// // // //           </div>

// // // //           <div className="navbar-end gap-3 flex items-center">
// // // //             {session ? (
// // // //               <>
// // // //                 {/* Profile Picture */}
// // // //                 <img
// // // //                   src={profileImage}
// // // //                   alt="Profile Picture"
// // // //                   className="w-10 h-10 rounded-full border-2 border-primary object-cover"
// // // //                 />

// // // //                 <Link
// // // //                   href={dashboardLink}
// // // //                   className={`btn btn-ghost hidden lg:inline-flex hover:text-primary hover:bg-primary/10 transition-all duration-300 ${
// // // //                     pathname.startsWith("/dashboard")
// // // //                       ? "text-primary bg-primary/10 font-bold"
// // // //                       : "font-semibold"
// // // //                   }`}
// // // //                 >
// // // //                   Dashboard
// // // //                 </Link>

// // // //                 <button
// // // //                   onClick={handleLogout}
// // // //                   className="btn btn-primary text-white hidden lg:inline-flex hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
// // // //                 >
// // // //                   Logout
// // // //                 </button>
// // // //               </>
// // // //             ) : (
// // // //               <>
// // // //                 <Link
// // // //                   href="/auth/login"
// // // //                   className={`btn btn-ghost hidden lg:inline-flex hover:text-primary hover:bg-primary/10 transition-all duration-300 ${
// // // //                     pathname === "/auth/login"
// // // //                       ? "text-primary bg-primary/10 font-bold"
// // // //                       : "font-semibold"
// // // //                   }`}
// // // //                 >
// // // //                   Login
// // // //                 </Link>

// // // //                 <Link
// // // //                   href="/auth/registration"
// // // //                   className="btn btn-primary text-white hidden lg:inline-flex hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
// // // //                 >
// // // //                   Get Started
// // // //                 </Link>
// // // //               </>
// // // //             )}

// // // //             {/* Mobile Hamburger */}
// // // //             <label
// // // //               htmlFor="mobile-drawer"
// // // //               className="btn btn-ghost lg:hidden hover:bg-primary/10 hover:text-primary transition-colors duration-300"
// // // //             >
// // // //               <HiBars3BottomLeft size={28} />
// // // //             </label>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="drawer-side z-[60]">
// // // //         <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

// // // //         <div className="menu p-6 w-[80%] md:w-[50%] lg:w-72 min-h-full bg-base-100 shadow-2xl">
// // // //           <div className="mb-8 flex items-center gap-3 text-xl font-bold border-b border-base-200 pb-4">
// // // //             <img
// // // //               src={profileImage}
// // // //               alt="Profile Picture"
// // // //               className="w-10 h-10 rounded-full border-2 border-primary object-cover"
// // // //             />
// // // //             <span className="text-base-content">SecureExam</span>
// // // //           </div>

// // // //           <ul className="space-y-2 flex-1">{nav}</ul>

// // // //           <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-base-200">
// // // //             {session ? (
// // // //               <>
// // // //                 <Link
// // // //                   href={dashboardLink}
// // // //                   className={`btn w-full hover:bg-primary/10 hover:text-primary transition-colors ${
// // // //                     pathname.startsWith("/dashboard")
// // // //                       ? "bg-primary/10 text-primary font-bold"
// // // //                       : "btn-ghost"
// // // //                   }`}
// // // //                 >
// // // //                   Dashboard
// // // //                 </Link>

// // // //                 <button
// // // //                   onClick={handleLogout}
// // // //                   className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
// // // //                 >
// // // //                   Logout
// // // //                 </button>
// // // //               </>
// // // //             ) : (
// // // //               <>
// // // //                 <Link
// // // //                   href="/auth/login"
// // // //                   className={`btn w-full hover:bg-primary/10 hover:text-primary transition-colors ${
// // // //                     pathname === "/auth/login"
// // // //                       ? "bg-primary/10 text-primary font-bold"
// // // //                       : "btn-ghost"
// // // //                   }`}
// // // //                 >
// // // //                   Login
// // // //                 </Link>

// // // //                 <Link
// // // //                   href="/auth/registration"
// // // //                   className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
// // // //                 >
// // // //                   Get Started
// // // //                 </Link>
// // // //               </>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import Link from "next/link";
// // // import { HiBars3BottomLeft } from "react-icons/hi2";
// // // import { IoShield } from "react-icons/io5";
// // // import { useSession, signOut } from "next-auth/react";
// // // import { usePathname, useRouter } from "next/navigation";

// // // export default function Navbar() {
// // //   const { data: session, status } = useSession();
// // //   const router = useRouter();
// // //   const pathname = usePathname();

// // //   const handleLogout = async () => {
// // //     await signOut({ redirect: false });
// // //     router.refresh();
// // //   };

// // //   if (status === "loading") return null;

// // //   const navLinks = [
// // //     { name: "Home", href: "/" },
// // //     { name: "Features", href: "/features" },
// // //     { name: "How It Works", href: "/how-it-works" },
// // //     { name: "Pricing", href: "/pricing" },
// // //   ];

// // //   const nav = (
// // //     <>
// // //       {navLinks.map((link) => {
// // //         const isActive = pathname === link.href;
// // //         return (
// // //           <li key={link.name}>
// // //             <Link
// // //               href={link.href}
// // //               className={`text-[1rem] transition-all duration-300 rounded-lg px-4 py-2 ${
// // //                 isActive
// // //                   ? "text-primary bg-primary/10 font-bold"
// // //                   : "font-medium text-base-content/80 hover:text-primary hover:bg-primary/10"
// // //               }`}
// // //             >
// // //               {link.name}
// // //             </Link>
// // //           </li>
// // //         );
// // //       })}
// // //     </>
// // //   );

// // //   const dashboardLink =
// // //     session?.user?.role === "admin"
// // //       ? "/dashboard/admin"
// // //       : session?.user?.role === "instructor"
// // //         ? "/dashboard/instructor"
// // //         : "/dashboard/student";

// // //   // Use default avatar if user doesn't have one
// // //   const profileImage = session?.user?.image || "/default-avatar.png"; // place this file in /public

// // //   // Minimal change: add title attribute to show name + email on hover
// // //   const profileTitle = session
// // //     ? `${session.user.name || "User"}\n${session.user.email}`
// // //     : "";

// // //   return (
// // //     <div className="drawer">
// // //       <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

// // //       <div className="drawer-content">
// // //         {/* Navbar */}
// // //         <div className="navbar bg-base-100/80 backdrop-blur-md px-4 lg:px-8 fixed top-0 left-0 right-0 z-50 border-b border-base-200/50 shadow-sm transition-all duration-300">
// // //           <div className="navbar-start">
// // //             <Link
// // //               href="/"
// // //               className="text-xl font-bold flex items-center gap-2 group"
// // //             >
// // //               <span className="text-primary bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 p-2 rounded-lg">
// // //                 <IoShield size={22} />
// // //               </span>
// // //               <span className="text-base-content group-hover:text-primary transition-colors duration-300 text-[1.4rem] tracking-tight">
// // //                 SecureExam
// // //               </span>
// // //             </Link>
// // //           </div>

// // //           <div className="navbar-center hidden lg:flex">
// // //             <ul className="menu menu-horizontal px-1 gap-2">{nav}</ul>
// // //           </div>

// // //           <div className="navbar-end gap-3 flex items-center">
// // //             {session ? (
// // //               <>
// // //                 {/* Profile Picture with hover info */}
// // //                 <img
// // //                   src={profileImage}
// // //                   alt="Profile Picture"
// // //                   title={profileTitle} // <--- added here
// // //                   className="w-10 h-10 rounded-full border-2 border-primary object-cover"
// // //                 />

// // //                 <Link
// // //                   href={dashboardLink}
// // //                   className={`btn btn-ghost hidden lg:inline-flex hover:text-primary hover:bg-primary/10 transition-all duration-300 ${
// // //                     pathname.startsWith("/dashboard")
// // //                       ? "text-primary bg-primary/10 font-bold"
// // //                       : "font-semibold"
// // //                   }`}
// // //                 >
// // //                   Dashboard
// // //                 </Link>

// // //                 <button
// // //                   onClick={handleLogout}
// // //                   className="btn btn-primary text-white hidden lg:inline-flex hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
// // //                 >
// // //                   Logout
// // //                 </button>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <Link
// // //                   href="/auth/login"
// // //                   className={`btn btn-ghost hidden lg:inline-flex hover:text-primary hover:bg-primary/10 transition-all duration-300 ${
// // //                     pathname === "/auth/login"
// // //                       ? "text-primary bg-primary/10 font-bold"
// // //                       : "font-semibold"
// // //                   }`}
// // //                 >
// // //                   Login
// // //                 </Link>

// // //                 <Link
// // //                   href="/auth/registration"
// // //                   className="btn btn-primary text-white hidden lg:inline-flex hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
// // //                 >
// // //                   Get Started
// // //                 </Link>
// // //               </>
// // //             )}

// // //             {/* Mobile Hamburger */}
// // //             <label
// // //               htmlFor="mobile-drawer"
// // //               className="btn btn-ghost lg:hidden hover:bg-primary/10 hover:text-primary transition-colors duration-300"
// // //             >
// // //               <HiBars3BottomLeft size={28} />
// // //             </label>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="drawer-side z-[60]">
// // //         <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

// // //         <div className="menu p-6 w-[80%] md:w-[50%] lg:w-72 min-h-full bg-base-100 shadow-2xl">
// // //           <div className="mb-8 flex items-center gap-3 text-xl font-bold border-b border-base-200 pb-4">
// // //             <img
// // //               src={profileImage}
// // //               alt="Profile Picture"
// // //               title={profileTitle} // <--- added here
// // //               className="w-10 h-10 rounded-full border-2 border-primary object-cover"
// // //             />
// // //             <span className="text-base-content">SecureExam</span>
// // //           </div>

// // //           <ul className="space-y-2 flex-1">{nav}</ul>

// // //           <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-base-200">
// // //             {session ? (
// // //               <>
// // //                 <Link
// // //                   href={dashboardLink}
// // //                   className={`btn w-full hover:bg-primary/10 hover:text-primary transition-colors ${
// // //                     pathname.startsWith("/dashboard")
// // //                       ? "bg-primary/10 text-primary font-bold"
// // //                       : "btn-ghost"
// // //                   }`}
// // //                 >
// // //                   Dashboard
// // //                 </Link>

// // //                 <button
// // //                   onClick={handleLogout}
// // //                   className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
// // //                 >
// // //                   Logout
// // //                 </button>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <Link
// // //                   href="/auth/login"
// // //                   className={`btn w-full hover:bg-primary/10 hover:text-primary transition-colors ${
// // //                     pathname === "/auth/login"
// // //                       ? "bg-primary/10 text-primary font-bold"
// // //                       : "btn-ghost"
// // //                   }`}
// // //                 >
// // //                   Login
// // //                 </Link>

// // //                 <Link
// // //                   href="/auth/registration"
// // //                   className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
// // //                 >
// // //                   Get Started
// // //                 </Link>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import Link from "next/link";
// // import { HiBars3BottomLeft } from "react-icons/hi2";
// // import { IoShield } from "react-icons/io5";
// // import { useSession, signOut } from "next-auth/react";
// // import { usePathname, useRouter } from "next/navigation";

// // export default function Navbar() {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();
// //   const pathname = usePathname();

// //   const handleLogout = async () => {
// //     await signOut({ redirect: false });
// //     router.refresh();
// //   };

// //   if (status === "loading") return null;

// //   const profileImage = session?.user?.image || "/default-avatar.png";
// //   const profileTitle = session
// //     ? `${session.user.name || "User"}\n${session.user.email}`
// //     : "";

// //   // Main menu items
// //   const navLinks = [
// //     { name: "Home", href: "/" },
// //     { name: "Features", href: "/features" },
// //     { name: "How It Works", href: "/how-it-works" },
// //     { name: "Pricing", href: "/pricing" },
// //     {
// //       name: "Dashboard",
// //       href: session
// //         ? session.user.role === "admin"
// //           ? "/dashboard/admin"
// //           : session.user.role === "instructor"
// //             ? "/dashboard/instructor"
// //             : "/dashboard/student"
// //         : "/auth/login",
// //     },
// //     {
// //       name: "Resources",
// //       submenu: [
// //         { name: "Documentation", href: "/resources/docs" },
// //         { name: "Tutorials", href: "/resources/tutorials" },
// //         { name: "API Reference", href: "/resources/api" },
// //       ],
// //     },
// //     {
// //       name: "Community",
// //       submenu: [
// //         { name: "Forum", href: "/community/forum" },
// //         { name: "Events", href: "/community/events" },
// //         { name: "Blog", href: "/community/blog" },
// //       ],
// //     },
// //     {
// //       name: "Support",
// //       submenu: [
// //         { name: "Contact Us", href: "/support/contact" },
// //         { name: "FAQ", href: "/support/faq" },
// //         { name: "Report Issue", href: "/support/report" },
// //       ],
// //     },
// //   ];

// //   // Render nav items with optional submenus
// //   const renderNavLinks = () =>
// //     navLinks.map((link) => {
// //       const isActive = pathname === link.href || pathname.startsWith(link.href);

// //       if (!link.submenu) {
// //         // Single link
// //         return (
// //           <li key={link.name}>
// //             <Link
// //               href={link.href}
// //               className={`text-[1rem] transition-all duration-300 rounded-lg px-4 py-2 ${
// //                 isActive
// //                   ? "text-primary bg-primary/10 font-bold"
// //                   : "font-medium text-base-content/80 hover:text-primary hover:bg-primary/10"
// //               }`}
// //             >
// //               {link.name}
// //             </Link>
// //           </li>
// //         );
// //       }

// //       // Dropdown menu for desktop
// //       return (
// //         <li key={link.name} className="relative group">
// //           <span
// //             className={`cursor-pointer text-[1rem] rounded-lg px-4 py-2 inline-flex items-center transition-all duration-300 ${
// //               isActive
// //                 ? "text-primary bg-primary/10 font-bold"
// //                 : "font-medium text-base-content/80 hover:text-primary hover:bg-primary/10"
// //             }`}
// //           >
// //             {link.name}
// //           </span>
// //           <ul className="absolute left-0 hidden group-hover:block bg-base-100 shadow-lg rounded-lg mt-2 min-w-[180px] border border-base-200 z-50">
// //             {link.submenu.map((sub) => (
// //               <li key={sub.name}>
// //                 <Link
// //                   href={sub.href}
// //                   className="block px-4 py-2 text-base-content/80 hover:bg-primary/10 hover:text-primary transition-all duration-300"
// //                 >
// //                   {sub.name}
// //                 </Link>
// //               </li>
// //             ))}
// //           </ul>
// //         </li>
// //       );
// //     });

// //   // Mobile menu
// //   const renderMobileNavLinks = () =>
// //     navLinks.map((link) => {
// //       if (!link.submenu) {
// //         return (
// //           <li key={link.name}>
// //             <Link
// //               href={link.href}
// //               className={`btn w-full text-left hover:bg-primary/10 hover:text-primary transition-colors ${
// //                 pathname === link.href
// //                   ? "bg-primary/10 text-primary font-bold"
// //                   : "btn-ghost"
// //               }`}
// //             >
// //               {link.name}
// //             </Link>
// //           </li>
// //         );
// //       }

// //       // Submenu for mobile (collapsible)
// //       return (
// //         <li key={link.name} tabIndex={0}>
// //           <details className="group">
// //             <summary className="btn w-full text-left justify-between hover:bg-primary/10 hover:text-primary transition-colors">
// //               {link.name}
// //               <span className="ml-2">&#9662;</span>
// //             </summary>
// //             <ul className="ml-4 mt-1 space-y-1">
// //               {link.submenu.map((sub) => (
// //                 <li key={sub.name}>
// //                   <Link
// //                     href={sub.href}
// //                     className="btn btn-ghost w-full text-left hover:bg-primary/10 hover:text-primary transition-colors"
// //                   >
// //                     {sub.name}
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </details>
// //         </li>
// //       );
// //     });

// //   return (
// //     <div className="drawer">
// //       <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

// //       <div className="drawer-content">
// //         {/* Navbar */}
// //         <div className="navbar bg-base-100/80 backdrop-blur-md px-4 lg:px-8 fixed top-0 left-0 right-0 z-50 border-b border-base-200/50 shadow-sm transition-all duration-300">
// //           <div className="navbar-start">
// //             <Link
// //               href="/"
// //               className="text-xl font-bold flex items-center gap-2 group"
// //             >
// //               <span className="text-primary bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 p-2 rounded-lg">
// //                 <IoShield size={22} />
// //               </span>
// //               <span className="text-base-content group-hover:text-primary transition-colors duration-300 text-[1.4rem] tracking-tight">
// //                 SecureExam
// //               </span>
// //             </Link>
// //           </div>

// //           <div className="navbar-center hidden lg:flex">
// //             <ul className="menu menu-horizontal px-1 gap-2">
// //               {renderNavLinks()}
// //             </ul>
// //           </div>

// //           <div className="navbar-end gap-3 flex items-center">
// //             {session ? (
// //               <>
// //                 <img
// //                   src={profileImage}
// //                   alt="Profile Picture"
// //                   title={profileTitle}
// //                   className="w-10 h-10 rounded-full border-2 border-primary object-cover hover:scale-105 transition-transform duration-300"
// //                 />
// //                 <button
// //                   onClick={handleLogout}
// //                   className="btn btn-primary text-white hidden lg:inline-flex hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
// //                 >
// //                   Logout
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link
// //                   href="/auth/login"
// //                   className={`btn btn-ghost hidden lg:inline-flex hover:text-primary hover:bg-primary/10 transition-all duration-300 ${
// //                     pathname === "/auth/login"
// //                       ? "text-primary bg-primary/10 font-bold"
// //                       : "font-semibold"
// //                   }`}
// //                 >
// //                   Login
// //                 </Link>
// //                 <Link
// //                   href="/auth/registration"
// //                   className="btn btn-primary text-white hidden lg:inline-flex hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
// //                 >
// //                   Get Started
// //                 </Link>
// //               </>
// //             )}
// //             {/* Mobile Hamburger */}
// //             <label
// //               htmlFor="mobile-drawer"
// //               className="btn btn-ghost lg:hidden hover:bg-primary/10 hover:text-primary transition-colors duration-300"
// //             >
// //               <HiBars3BottomLeft size={28} />
// //             </label>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Drawer */}
// //       <div className="drawer-side z-[60]">
// //         <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
// //         <div className="menu p-6 w-[80%] md:w-[50%] lg:w-72 min-h-full bg-base-100 shadow-2xl">
// //           <div className="mb-8 flex items-center gap-3 text-xl font-bold border-b border-base-200 pb-4">
// //             <img
// //               src={profileImage}
// //               alt="Profile Picture"
// //               title={profileTitle}
// //               className="w-10 h-10 rounded-full border-2 border-primary object-cover"
// //             />
// //             <span className="text-base-content">SecureExam</span>
// //           </div>
// //           <ul className="space-y-2 flex-1">{renderMobileNavLinks()}</ul>

// //           <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-base-200">
// //             {session ? (
// //               <button
// //                 onClick={handleLogout}
// //                 className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
// //               >
// //                 Logout
// //               </button>
// //             ) : (
// //               <>
// //                 <Link
// //                   href="/auth/login"
// //                   className={`btn w-full hover:bg-primary/10 hover:text-primary transition-colors ${
// //                     pathname === "/auth/login"
// //                       ? "bg-primary/10 text-primary font-bold"
// //                       : "btn-ghost"
// //                   }`}
// //                 >
// //                   Login
// //                 </Link>
// //                 <Link
// //                   href="/auth/registration"
// //                   className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
// //                 >
// //                   Get Started
// //                 </Link>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { HiBars3BottomLeft } from "react-icons/hi2";
// import { IoShield } from "react-icons/io5";
// import { useSession, signOut } from "next-auth/react";
// import { usePathname, useRouter } from "next/navigation";

// export default function Navbar() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleLogout = async () => {
//     await signOut({ redirect: false });
//     router.refresh();
//   };

//   if (status === "loading") return null;

//   const profileImage = session?.user?.image || "/default-avatar.png";
//   const profileTitle = session
//     ? `${session.user.name || "User"}\n${session.user.email}`
//     : "";

//   // Menu items
//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Features", href: "/features" },
//     { name: "How It Works", href: "/how-it-works" },
//     { name: "Pricing", href: "/pricing" },
//     {
//       name: "Dashboard",
//       href: session
//         ? session.user.role === "admin"
//           ? "/dashboard/admin"
//           : session.user.role === "instructor"
//             ? "/dashboard/instructor"
//             : "/dashboard/student"
//         : "/auth/login",
//     },
//     {
//       name: "Resources",
//       submenu: [
//         { name: "Documentation", href: "/resources/docs" },
//         { name: "Tutorials", href: "/resources/tutorials" },
//         { name: "API Reference", href: "/resources/api" },
//       ],
//     },
//     {
//       name: "Community",
//       submenu: [
//         { name: "Forum", href: "/community/forum" },
//         { name: "Events", href: "/community/events" },
//         { name: "Blog", href: "/community/blog" },
//       ],
//     },
//     {
//       name: "Support",
//       submenu: [
//         { name: "Contact Us", href: "/support/contact" },
//         { name: "FAQ", href: "/support/faq" },
//         { name: "Report Issue", href: "/support/report" },
//       ],
//     },
//   ];

//   // Desktop nav links with hover dropdown
//   const renderNavLinks = () =>
//     navLinks.map((link) => {
//       const isActive = pathname === link.href || pathname.startsWith(link.href);

//       if (!link.submenu) {
//         return (
//           <li key={link.name}>
//             <Link
//               href={link.href}
//               className={`text-[1rem] transition-all duration-300 rounded-lg px-4 py-2 ${
//                 isActive
//                   ? "text-primary bg-primary/10 font-bold"
//                   : "font-medium text-base-content/80 hover:text-primary hover:bg-primary/10"
//               }`}
//             >
//               {link.name}
//             </Link>
//           </li>
//         );
//       }

//       return (
//         <li key={link.name} className="relative group">
//           <span
//             className={`cursor-pointer text-[1rem] rounded-lg px-4 py-2 inline-flex items-center transition-all duration-300 ${
//               isActive
//                 ? "text-primary bg-primary/10 font-bold"
//                 : "font-medium text-base-content/80 hover:text-primary hover:bg-primary/10"
//             }`}
//           >
//             {link.name}
//           </span>
//           {/* Dropdown submenu: position below parent */}
//           <ul className="absolute top-full left-0 hidden group-hover:block bg-base-100 shadow-lg rounded-lg mt-1 min-w-[180px] border border-base-200 z-50">
//             {link.submenu.map((sub) => (
//               <li key={sub.name}>
//                 <Link
//                   href={sub.href}
//                   className="block px-4 py-2 text-base-content/80 hover:bg-primary/10 hover:text-primary transition-all duration-300"
//                 >
//                   {sub.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </li>
//       );
//     });

//   // Mobile nav
//   const renderMobileNavLinks = () =>
//     navLinks.map((link) => {
//       if (!link.submenu) {
//         return (
//           <li key={link.name}>
//             <Link
//               href={link.href}
//               className={`btn w-full text-left hover:bg-primary/10 hover:text-primary transition-colors ${
//                 pathname === link.href
//                   ? "bg-primary/10 text-primary font-bold"
//                   : "btn-ghost"
//               }`}
//             >
//               {link.name}
//             </Link>
//           </li>
//         );
//       }

//       return (
//         <li key={link.name} tabIndex={0}>
//           <details className="group">
//             <summary className="btn w-full text-left justify-between hover:bg-primary/10 hover:text-primary transition-colors">
//               {link.name} <span className="ml-2">&#9662;</span>
//             </summary>
//             <ul className="ml-4 mt-1 space-y-1">
//               {link.submenu.map((sub) => (
//                 <li key={sub.name}>
//                   <Link
//                     href={sub.href}
//                     className="btn btn-ghost w-full text-left hover:bg-primary/10 hover:text-primary transition-colors"
//                   >
//                     {sub.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </details>
//         </li>
//       );
//     });

//   return (
//     <div className="drawer">
//       <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

//       <div className="drawer-content">
//         <div className="navbar bg-base-100/80 backdrop-blur-md px-4 lg:px-8 fixed top-0 left-0 right-0 z-50 border-b border-base-200/50 shadow-sm transition-all duration-300">
//           <div className="navbar-start">
//             <Link
//               href="/"
//               className="text-xl font-bold flex items-center gap-2 group"
//             >
//               <span className="text-primary bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 p-2 rounded-lg">
//                 <IoShield size={22} />
//               </span>
//               <span className="text-base-content group-hover:text-primary transition-colors duration-300 text-[1.4rem] tracking-tight">
//                 SecureExam
//               </span>
//             </Link>
//           </div>

//           <div className="navbar-center hidden lg:flex">
//             <ul className="menu menu-horizontal px-1 gap-2">
//               {renderNavLinks()}
//             </ul>
//           </div>

//           <div className="navbar-end gap-3 flex items-center">
//             {session ? (
//               <>
//                 <img
//                   src={profileImage}
//                   alt="Profile Picture"
//                   title={profileTitle}
//                   className="w-10 h-10 rounded-full border-2 border-primary object-cover hover:scale-105 transition-transform duration-300"
//                 />
//                 <button
//                   onClick={handleLogout}
//                   className="btn btn-primary text-white hidden lg:inline-flex hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/login"
//                   className={`btn btn-ghost hidden lg:inline-flex hover:text-primary hover:bg-primary/10 transition-all duration-300 ${
//                     pathname === "/auth/login"
//                       ? "text-primary bg-primary/10 font-bold"
//                       : "font-semibold"
//                   }`}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/auth/registration"
//                   className="btn btn-primary text-white hidden lg:inline-flex hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}
//             <label
//               htmlFor="mobile-drawer"
//               className="btn btn-ghost lg:hidden hover:bg-primary/10 hover:text-primary transition-colors duration-300"
//             >
//               <HiBars3BottomLeft size={28} />
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="drawer-side z-[60]">
//         <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
//         <div className="menu p-6 w-[80%] md:w-[50%] lg:w-72 min-h-full bg-base-100 shadow-2xl">
//           <div className="mb-8 flex items-center gap-3 text-xl font-bold border-b border-base-200 pb-4">
//             <img
//               src={profileImage}
//               alt="Profile Picture"
//               title={profileTitle}
//               className="w-10 h-10 rounded-full border-2 border-primary object-cover"
//             />
//             <span className="text-base-content">SecureExam</span>
//           </div>
//           <ul className="space-y-2 flex-1">{renderMobileNavLinks()}</ul>

//           <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-base-200">
//             {session ? (
//               <button
//                 onClick={handleLogout}
//                 className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   href="/auth/login"
//                   className={`btn w-full hover:bg-primary/10 hover:text-primary transition-colors ${
//                     pathname === "/auth/login"
//                       ? "bg-primary/10 text-primary font-bold"
//                       : "btn-ghost"
//                   }`}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/auth/registration"
//                   className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
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
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  if (status === "loading") return null;

  const profileImage = session?.user?.image || "/default-avatar.png";
  const profileName = session?.user?.name || "User";
  const profileEmail = session?.user?.email || "";

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Features",
      submenu: [
        { name: "Exam Builder", href: "/features/exam-builder" },
        { name: "Analytics Dashboard", href: "/features/analytics" },
        { name: "Question Bank", href: "/features/question-bank" },
        { name: "Notifications", href: "/features/notifications" },
        { name: "Integrations", href: "/features/integrations" },
      ],
    },
    {
      name: "How It Works",
      submenu: [
        { name: "For Students", href: "/how-it-works/students" },
        { name: "For Instructors", href: "/how-it-works/instructors" },
        { name: "Security Measures", href: "/how-it-works/security" },
        { name: "Reporting & Analytics", href: "/how-it-works/reporting" },
      ],
    },
    {
      name: "Pricing",
      submenu: [
        { name: "Free Plan", href: "/pricing/free" },
        { name: "Starter Plan", href: "/pricing/starter" },
        { name: "Pro Plan", href: "/pricing/pro" },
        { name: "Enterprise Plan", href: "/pricing/enterprise" },
      ],
    },
    {
      name: "Resources",
      submenu: [
        { name: "Documentation", href: "/resources/docs" },
        { name: "Tutorials", href: "/resources/tutorials" },
        { name: "API Reference", href: "/resources/api" },
      ],
    },
    {
      name: "Community",
      submenu: [
        { name: "Forum", href: "/community/forum" },
        { name: "Events", href: "/community/events" },
        { name: "Blog", href: "/community/blog" },
      ],
    },
    {
      name: "Support",
      submenu: [
        { name: "Contact Us", href: "/support/contact" },
        { name: "FAQ", href: "/support/faq" },
        { name: "Report Issue", href: "/support/report" },
      ],
    },
    {
      name: "Dashboard",
      href: session
        ? session.user.role === "admin"
          ? "/dashboard/admin"
          : session.user.role === "instructor"
            ? "/dashboard/instructor"
            : "/dashboard/student"
        : "/auth/login",
    },
  ];

  // Desktop nav links
  const renderNavLinks = () =>
    navLinks.map((link) => {
      const isActive = pathname === link.href || pathname.startsWith(link.href);

      if (!link.submenu) {
        return (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`text-[1rem] transition-all duration-300 rounded-lg px-4 py-2 ${
                isActive
                  ? "text-primary bg-primary/10 font-bold"
                  : "font-medium text-base-content/80 hover:text-primary hover:bg-primary/10"
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      }

      return (
        <li key={link.name} className="relative group">
          <span
            className={`cursor-pointer text-[1rem] rounded-lg px-4 py-2 inline-flex items-center transition-all duration-300 ${
              isActive
                ? "text-primary bg-primary/10 font-bold"
                : "font-medium text-base-content/80 hover:text-primary hover:bg-primary/10"
            }`}
          >
            {link.name}
          </span>
          <ul className="absolute top-full left-0 hidden group-hover:block bg-base-100 shadow-lg rounded-lg border border-base-200 z-50 w-48 pointer-events-auto">
            {link.submenu?.map((sub) => (
              <li key={sub.name}>
                <Link
                  href={sub.href}
                  className="block px-4 py-2 text-base-content/80 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  {sub.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    });

  // Mobile nav
  const renderMobileNavLinks = () =>
    navLinks.map((link) => {
      if (!link.submenu) {
        return (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`btn w-full text-left hover:bg-primary/10 hover:text-primary transition-colors ${
                pathname === link.href
                  ? "bg-primary/10 text-primary font-bold"
                  : "btn-ghost"
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      }

      return (
        <li key={link.name} tabIndex={0}>
          <details className="group">
            <summary className="btn w-full text-left justify-between hover:bg-primary/10 hover:text-primary transition-colors">
              {link.name} <span className="ml-2">&#9662;</span>
            </summary>
            <ul className="ml-4 mt-1 space-y-1">
              {link.submenu?.map((sub) => (
                <li key={sub.name}>
                  <Link
                    href={sub.href}
                    className="btn btn-ghost w-full text-left hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </li>
      );
    });

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
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
            <ul className="menu menu-horizontal px-1 gap-2">
              {renderNavLinks()}
            </ul>
          </div>

          <div className="navbar-end gap-3 flex items-center">
            {session ? (
              <>
                {/* Profile with custom tooltip */}
                <div className="relative group">
                  <img
                    src={profileImage}
                    alt="Profile Picture"
                    className="w-10 h-10 rounded-full border-2 border-primary object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full hidden group-hover:block bg-base-100 text-base-content p-3 rounded-lg shadow-lg w-48 text-center border border-base-200 z-50 pointer-events-none">
                    <p className="font-semibold">{profileName}</p>
                    <p className="text-sm text-base-content/70 break-words">
                      {profileEmail}
                    </p>
                  </div>
                </div>

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
                    pathname === "/auth/login"
                      ? "text-primary bg-primary/10 font-bold"
                      : "font-semibold"
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
            <img
              src={profileImage}
              alt="Profile Picture"
              className="w-10 h-10 rounded-full border-2 border-primary object-cover"
            />
            <span className="text-base-content">SecureExam</span>
          </div>
          <ul className="space-y-2 flex-1">{renderMobileNavLinks()}</ul>

          <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-base-200">
            {session ? (
              <button
                onClick={handleLogout}
                className="btn btn-primary w-full text-white hover:shadow-lg hover:shadow-primary/30 transition-all rounded-xl"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`btn w-full hover:bg-primary/10 hover:text-primary transition-colors ${
                    pathname === "/auth/login"
                      ? "bg-primary/10 text-primary font-bold"
                      : "btn-ghost"
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
