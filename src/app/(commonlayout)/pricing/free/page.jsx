// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function FreePlanPage() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (session) {
//       router.push("/dashboard/student");
//     }
//   }, [session, router]);

//   return (
//     <div className="min-h-screen bg-emerald-950 text-emerald-50 flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">Free Plan</h1>
//         <p className="text-emerald-200 mb-8">Get started with our free plan!</p>
//         <button
//           onClick={() => router.push("/auth/login")}
//           className="btn bg-emerald-600 hover:bg-emerald-500 text-emerald-50"
//         >
//           Sign Up for Free
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FreePlanPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Free Plan</h1>
        <p className="text-emerald-200 mb-8">Get started with our free plan!</p>
        {!session ? (
          <button
            onClick={() => router.push("/auth/login")}
            className="btn bg-emerald-600 hover:bg-emerald-500 text-emerald-50"
          >
            Sign Up for Free
          </button>
        ) : (
          <button
            onClick={() => router.push("/dashboard/student")}
            className="btn bg-emerald-600 hover:bg-emerald-500 text-emerald-50"
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
