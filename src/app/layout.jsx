// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" data-theme="secureexam">
//       <body className="bg-base-200 min-h-screen">{children}</body>
//     </html>
//   );
// }
//-----------------------------------------------
// import "./globals.css";

// export const metadata = {
//   title: "My App",
//   description: "Next.js App with Tailwind v4 + DaisyUI",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" data-theme="light">
//       <body className="min-h-screen bg-base-200">{children}</body>
//     </html>
//   );
// }

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SecureExam",
  description: "Secure Online Examination Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>

      <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></Script>
    </html>
  );
}
