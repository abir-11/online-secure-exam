"use client";

import Link from "next/link";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { IoShield, IoChevronDown } from "react-icons/io5"; // Added Chevron icon
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

  const profileImage = session?.user?.image || "https://ui-avatars.com/api/?name=User&background=random";
  const profileName = session?.user?.name || "User";
  const profileEmail = session?.user?.email || "";

  /* ================= BASE NAV LINKS ================= */
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
  ];

  const dashboardHref =
    session?.user?.role === "admin"
      ? "/dashboard/admin"
      : session?.user?.role === "instructor"
      ? "/dashboard/instructor"
      : "/dashboard/student";

  /* ================= DESKTOP NAV ================= */
  const renderNavLinks = () => (
    <>
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href || (link.href && pathname.startsWith(link.href) && link.href !== "/");

        if (!link.submenu) {
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-base-content/80"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        }

        return (
          <li key={link.name} className="dropdown dropdown-hover dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-1 font-medium text-base-content/80 hover:text-primary transition-colors bg-transparent border-none m-0 p-2"
            >
              {link.name}
              <IoChevronDown size={14} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-50 menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200"
            >
              {link.submenu.map((sub) => (
                <li key={sub.name}>
                  <Link href={sub.href} className="hover:bg-primary/10 hover:text-primary rounded-md">
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </>
  );

  /* ================= MOBILE NAV ================= */
  const renderMobileNavLinks = () => (
    <>
      {navLinks.map((link) => {
        if (!link.submenu) {
          return (
            <li key={link.name}>
              <Link href={link.href} className="font-medium">
                {link.name}
              </Link>
            </li>
          );
        }

        return (
          <li key={link.name}>
            <details>
              <summary className="font-medium">{link.name}</summary>
              <ul className="ml-4 border-l border-base-300">
                {link.submenu.map((sub) => (
                  <li key={sub.name}>
                    <Link href={sub.href} className="text-base-content/80">
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        );
      })}
    </>
  );

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full sticky top-0 z-50 bg-base-100/90 backdrop-blur-md px-4 lg:px-8 border-b border-base-200 shadow-sm">
          <div className="navbar-start">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <IoShield size={26} className="text-primary" />
              SecureExam
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-6">{renderNavLinks()}</ul>
          </div>

          <div className="navbar-end gap-2 lg:gap-4">
            {session ? (
              /* User Profile Dropdown (Professional Way) */
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full border-2 border-primary/20 hover:border-primary transition-colors">
                    <img src={profileImage} alt="Profile" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-50 p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-56 border border-base-200"
                >
                  <li className="px-4 py-2 pointer-events-none">
                    <p className="font-bold text-base block">{profileName}</p>
                    <span className="text-xs text-base-content/60 truncate">{profileEmail}</span>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <Link href={dashboardHref} className="hover:bg-primary/10 hover:text-primary">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-error hover:bg-error/10">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden lg:flex gap-2">
                <Link href="/auth/login" className="btn btn-ghost font-medium">
                  Login
                </Link>
                <Link href="/auth/registration" className="btn btn-primary text-white shadow-md">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="flex-none lg:hidden">
              <label htmlFor="mobile-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <HiBars3BottomLeft size={28} className="text-base-content" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="drawer-side z-[60]">
        <label htmlFor="mobile-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu p-4 w-72 min-h-full bg-base-100 text-base-content flex flex-col gap-2">
          {/* Mobile Header */}
          <div className="flex items-center gap-2 font-bold text-xl mb-4 px-4 py-2 border-b border-base-200">
            <IoShield size={24} className="text-primary" />
            SecureExam
          </div>

          {/* Mobile Links */}
          {renderMobileNavLinks()}

          {/* Mobile Auth/Dashboard Buttons */}
          <div className="mt-auto px-4 py-6 border-t border-base-200 flex flex-col gap-2">
            {session ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full border border-primary" />
                  <div>
                    <p className="font-bold text-sm">{profileName}</p>
                    <p className="text-xs text-base-content/60">{profileEmail}</p>
                  </div>
                </div>
                <Link href={dashboardHref} className="btn btn-outline btn-primary w-full">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-error w-full text-white">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn btn-outline w-full mb-2">
                  Login
                </Link>
                <Link href="/auth/registration" className="btn btn-primary w-full">
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