// "use client";

// import { useState } from "react";
// import { FiCheck } from "react-icons/fi";
// import PaymentModal from "@/components/PaymentModal";

// export default function BasicPlanPage() {
//   const [billing, setBilling] = useState("monthly");
//   const [showModal, setShowModal] = useState(false);

//   const price = billing === "monthly" ? 9 : 90;
//   const period = billing === "monthly" ? "month" : "year";

//   const planData = {
//     _id: "basic",
//     title: "Basic Plan",
//     price: price * 100, // in cents
//     description: `Basic Plan - ${billing} billing`,
//   };

//   return (
//     <div className="min-h-screen bg-emerald-950 text-emerald-50 py-16 px-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold mb-4">Basic Plan</h1>
//           <p className="text-emerald-200">
//             Perfect for small classrooms and institutions.
//           </p>
//         </div>

//         <div className="bg-emerald-900/50 border border-emerald-500/20 rounded-2xl p-8">
//           <div className="text-center mb-8">
//             <div className="text-5xl font-extrabold text-emerald-400 mb-4">
//               ${price} / {period}
//             </div>
//             <select
//               className="select select-bordered bg-emerald-800 text-emerald-50 border-emerald-500"
//               value={billing}
//               onChange={(e) => setBilling(e.target.value)}
//             >
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly (Save 20%)</option>
//             </select>
//           </div>

//           <ul className="space-y-4 mb-8">
//             <li className="flex items-center gap-2">
//               <FiCheck className="text-emerald-400" />
//               <span>Create Exams</span>
//             </li>
//             <li className="flex items-center gap-2">
//               <FiCheck className="text-emerald-400" />
//               <span>Up to 50 Students</span>
//             </li>
//             <li className="flex items-center gap-2">
//               <FiCheck className="text-emerald-400" />
//               <span>Basic Analytics</span>
//             </li>
//             <li className="flex items-center gap-2">
//               <FiCheck className="text-emerald-400" />
//               <span>Email Support</span>
//             </li>
//           </ul>

//           <button
//             className="btn w-full bg-emerald-600 hover:bg-emerald-500 text-emerald-50"
//             onClick={() => setShowModal(true)}
//           >
//             Purchase Basic Plan
//           </button>
//         </div>
//       </div>

//       {showModal && (
//         <PaymentModal
//           course={planData}
//           onClose={() => setShowModal(false)}
//           itemType="plan"
//         />
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import PaymentModal from "@/components/PaymentModal";

export default function BasicPlanPage() {
  const [billing, setBilling] = useState("monthly");
  const [showModal, setShowModal] = useState(false);

  const price = billing === "monthly" ? 9 : 90;
  const period = billing === "monthly" ? "month" : "year";

  const planData = {
    _id: "basic",
    title: "Basic Plan",
    price: price * 100, // in cents
    description: `Basic Plan - ${billing} billing`,
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Basic Plan</h1>
          <p className="text-emerald-200">
            Perfect for small classrooms and institutions.
          </p>
        </div>

        <div className="bg-emerald-900/50 border border-emerald-500/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-5xl font-extrabold text-emerald-400 mb-4">
              ${price} / {period}
            </div>
            <select
              className="select select-bordered bg-emerald-800 text-emerald-50 border-emerald-500"
              value={billing}
              onChange={(e) => setBilling(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly (Save 20%)</option>
            </select>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" />
              <span>Create Exams</span>
            </li>
            <li className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" />
              <span>Up to 50 Students</span>
            </li>
            <li className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" />
              <span>Basic Analytics</span>
            </li>
            <li className="flex items-center gap-2">
              <FiCheck className="text-emerald-400" />
              <span>Email Support</span>
            </li>
          </ul>

          <button
            className="btn w-full bg-emerald-600 hover:bg-emerald-500 text-emerald-50"
            onClick={() => setShowModal(true)}
          >
            Purchase Basic Plan
          </button>
        </div>
      </div>

      {showModal && (
        <PaymentModal
          course={planData}
          onClose={() => setShowModal(false)}
          itemType="plan"
        />
      )}
    </div>
  );
}
