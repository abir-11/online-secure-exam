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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
  ];

  const nav = (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
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
      })}
    </>
  );

  const dashboardLink =
    session?.user?.role === "admin"
      ? "/dashboard/admin"
      : session?.user?.role === "instructor"
        ? "/dashboard/instructor"
        : "/dashboard/student";

  // Use default avatar if user doesn't have one
  const profileImage = session?.user?.image || "/default-avatar.png"; // place this file in /public

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        {/* Navbar */}
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

          <div className="navbar-end gap-3 flex items-center">
            {session ? (
              <>
                {/* Profile Picture */}
                <img
                  src={profileImage}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                />

                <Link
                  href={dashboardLink}
                  className={`btn btn-ghost hidden lg:inline-flex hover:text-primary hover:bg-primary/10 transition-all duration-300 ${
                    pathname.startsWith("/dashboard")
                      ? "text-primary bg-primary/10 font-bold"
                      : "font-semibold"
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

            {/* Mobile Hamburger */}
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

          <ul className="space-y-2 flex-1">{nav}</ul>

          <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-base-200">
            {session ? (
              <>
                <Link
                  href={dashboardLink}
                  className={`btn w-full hover:bg-primary/10 hover:text-primary transition-colors ${
                    pathname.startsWith("/dashboard")
                      ? "bg-primary/10 text-primary font-bold"
                      : "btn-ghost"
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
