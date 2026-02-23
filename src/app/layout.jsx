// // src/app/layout.jsx
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/Components/Navbar/Navbar";
// import Footer from "@/Components/Footer/Footer";
// import Script from "next/script";
// import Providers from "./Providers"; // <-- import the wrapper

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "SecureExam",
//   description: "Secure Online Examination Platform",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Navbar />
//         <Providers>{children}</Providers>{" "}
//         {/* wrap everything with SessionProvider */}
//         <Footer />
//       </body>

//       <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></Script>
//     </html>
//   );
// }
//---------------------------------------------------------------
// // src/app/layout.jsx
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/Components/Navbar/Navbar";
// import Footer from "@/Components/Footer/Footer";
// import Script from "next/script";
// import { SessionProvider } from "next-auth/react"; // ✅ import SessionProvider
// import Providers from "./Providers"; // optional wrapper

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "SecureExam",
//   description: "Secure Online Examination Platform",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {/* Wrap Navbar + children + Footer inside SessionProvider */}
//         <SessionProvider>
//           <Navbar />
//           <Providers>{children}</Providers>
//           <Footer />
//         </SessionProvider>
//       </body>

//       <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></Script>
//     </html>
//   );
// }

//------------

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";
import Providers from "./Providers";

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
        <Providers>
          {/* Navbar must be inside SessionProvider */}
          <NavbarWrapper />

          {children}

          <Footer />
        </Providers>
      </body>

      <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></Script>
    </html>
  );
}
