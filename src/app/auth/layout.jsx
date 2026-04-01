export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 bg-emerald-950 bg-gradient-to-br from-emerald-950 via-[#022c22] to-emerald-900 selection:bg-teal-500/30 overflow-hidden">
      {children}
    </div>
  );
}