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

  /* ================= BASE NAV LINKS (NO DASHBOARD) ================= */
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
  ];

  // const dashboardHref =
  //   session?.user?.role === "admin"
  //     ? "/dashboard/admin"
  //     : session?.user?.role === "instructor"
  //       ? "/dashboard/instructor"
  //       : "/dashboard/student";
  const dashboardHref = "/dashboard";

  /* ================= DESKTOP NAV ================= */
  const renderNavLinks = () => (
    <>
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href && pathname.startsWith(link.href));

        if (!link.submenu) {
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "text-primary bg-primary/10 font-bold"
                    : "text-base-content/80 hover:text-primary hover:bg-primary/10"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        }

        return (
          <li key={link.name} className="relative group">
            <span className="cursor-pointer px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/10">
              {link.name}
            </span>
            <ul className="absolute top-full left-0 hidden group-hover:block bg-base-100 shadow-lg rounded-lg border w-48 z-50">
              {link.submenu.map((sub) => (
                <li key={sub.name}>
                  <Link
                    href={sub.href}
                    className="block px-4 py-2 hover:bg-primary/10 hover:text-primary"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        );
      })}

      {/* ✅ DASHBOARD (ONLY WHEN LOGGED IN) */}
      {session && (
        <li>
          <Link
            href={dashboardHref}
            className={`px-4 py-2 rounded-lg transition ${
              pathname.startsWith("/dashboard")
                ? "text-primary bg-primary/10 font-bold"
                : "hover:text-primary hover:bg-primary/10"
            }`}
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  /* ================= MOBILE NAV ================= */
  const renderMobileNavLinks = () => (
    <>
      {navLinks.map((link) => {
        if (!link.submenu) {
          return (
            <li key={link.name}>
              <Link href={link.href} className="btn btn-ghost w-full text-left">
                {link.name}
              </Link>
            </li>
          );
        }

        return (
          <li key={link.name}>
            <details>
              <summary className="btn btn-ghost w-full text-left">
                {link.name}
              </summary>
              <ul className="ml-4">
                {link.submenu.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      href={sub.href}
                      className="btn btn-ghost w-full text-left"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        );
      })}

      {/* ✅ DASHBOARD (ONLY WHEN LOGGED IN) */}
      {session && (
        <li>
          <Link
            href={dashboardHref}
            className="btn w-full text-left bg-primary/10 text-primary font-bold"
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="navbar fixed top-0 z-50 bg-base-100/80 backdrop-blur-md px-4 lg:px-8 border-b">
          <div className="navbar-start">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <IoShield size={22} className="text-primary" />
              SecureExam
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-2">{renderNavLinks()}</ul>
          </div>

          <div className="navbar-end gap-3">
            {session ? (
              <>
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-primary"
                />
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link href="/auth/registration" className="btn btn-primary">
                  Get Started
                </Link>
              </>
            )}

            <label htmlFor="mobile-drawer" className="btn btn-ghost lg:hidden">
              <HiBars3BottomLeft size={28} />
            </label>
          </div>
        </div>
      </div>

      <div className="drawer-side z-[60]">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <ul className="menu p-6 w-72 bg-base-100">{renderMobileNavLinks()}</ul>
      </div>
    </div>
  );
}
