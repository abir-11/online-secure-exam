// "use client";

// import { useSession } from "next-auth/react";
// import Link from "next/link";

// export default function AdminDashboard() {
//   const { data: session } = useSession();

//   return (
//     <div className="p-6">
//       {/* <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
//       <p>Welcome, {session?.user?.name}!</p>
//       <p>Role: {session?.user?.role}</p> */}

//       {/* Quick Actions - Now Clickable */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Link href="/dashboard/admin/users">
//           <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
//             <h3 className="text-xl font-semibold text-[#0D7C66] mb-2">
//               👥 Manage Users
//             </h3>
//             <p className="text-gray-600">
//               View, add, edit, and manage all users
//             </p>
//           </div>
//         </Link>

//         <Link href="/dashboard/admin/deleted-users">
//           <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
//             <h3 className="text-xl font-semibold text-[#0D7C66] mb-2">
//               👥 Deleted Users
//             </h3>
//             <p className="text-gray-600">
//               View the issues reported by users and take necessary actions
//             </p>
//           </div>
//         </Link>
//         <Link href="/dashboard/admin/reports">
//           <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
//             <h3 className="text-xl font-semibold text-[#0D7C66] mb-2">
//               👥 Reports
//             </h3>
//             <p className="text-gray-600">
//               View the issues reported by users and take necessary actions
//             </p>
//           </div>
//         </Link>
//         <Link href="/dashboard/admin/analytics">
//           <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
//             <h3 className="text-xl font-semibold text-[#0D7C66] mb-2">
//               👥 Analytics
//             </h3>
//             <p className="text-gray-600">
//               View the issues reported by users and take necessary actions
//             </p>
//           </div>
//         </Link>
//         <Link href="/dashboard/admin/reportissue">
//           <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
//             <h3 className="text-xl font-semibold text-[#0D7C66] mb-2">
//               👥 Report Issues
//             </h3>
//             <p className="text-gray-600">
//               View the issues reported by users and take necessary actions
//             </p>
//           </div>
//         </Link>

//         {/* <Link href="/dashboard/admin/reports">
//           <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
//             <h3 className="text-xl font-semibold text-[#0D7C66] mb-2">
//               📊 Reports & Analytics
//             </h3>
//             <p className="text-gray-600">
//               View exam reports and system analytics
//             </p>
//           </div>
//         </Link> */}
//       </div>
//     </div>
//   );
// }

// icons

"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  FiUsers,
  FiTrash2,
  FiAlertCircle,
  FiBarChart2,
  FiFlag,
} from "react-icons/fi";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="p-6">
      {/* Quick Actions - Now Clickable */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/admin/users">
          <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
            <div className="flex items-center mb-2">
              <FiUsers size={28} className="text-[#0D7C66] mr-2" />
              <h3 className="text-xl font-semibold text-[#0D7C66]">
                Manage Users
              </h3>
            </div>
            <p className="text-gray-600">
              View, add, edit, and manage all users
            </p>
          </div>
        </Link>

        <Link href="/dashboard/admin/deleted-users">
          <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
            <div className="flex items-center mb-2">
              <FiTrash2 size={28} className="text-[#0D7C66] mr-2" />
              <h3 className="text-xl font-semibold text-[#0D7C66]">
                Deleted Users
              </h3>
            </div>
            <p className="text-gray-600">
              View deleted users and restore or permanently remove them
            </p>
          </div>
        </Link>

        <Link href="/dashboard/admin/reports">
          <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
            <div className="flex items-center mb-2">
              <FiAlertCircle size={28} className="text-[#0D7C66] mr-2" />
              <h3 className="text-xl font-semibold text-[#0D7C66]">Reports</h3>
            </div>
            <p className="text-gray-600">
              View the issues reported by users and take necessary actions
            </p>
          </div>
        </Link>

        <Link href="/dashboard/admin/analytics">
          <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
            <div className="flex items-center mb-2">
              <FiBarChart2 size={28} className="text-[#0D7C66] mr-2" />
              <h3 className="text-xl font-semibold text-[#0D7C66]">
                Analytics
              </h3>
            </div>
            <p className="text-gray-600">
              View reports and analytics for exams and system performance
            </p>
          </div>
        </Link>

        <Link href="/dashboard/admin/reportissue">
          <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-[#0D7C66] group">
            <div className="flex items-center mb-2">
              <FiFlag size={28} className="text-[#0D7C66] mr-2" />
              <h3 className="text-xl font-semibold text-[#0D7C66]">
                Report Issues
              </h3>
            </div>
            <p className="text-gray-600">
              View the issues reported by users and take necessary actions
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
