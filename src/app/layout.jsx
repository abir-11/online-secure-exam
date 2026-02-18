// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" data-theme="secureexam">
//       <body className="bg-base-200 min-h-screen">{children}</body>
//     </html>
//   );
// }

import "./globals.css";

export const metadata = {
  title: "My App",
  description: "Next.js App with Tailwind v4 + DaisyUI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen bg-base-200">{children}</body>
    </html>
  );
}
