"use client";

import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function PricingPage() {
  const { data: session } = useSession();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const plans = [
    {
      name: "Free",
      price: "Free",
      dropdownType: null,
      features: [
        "Create Exams",
        "Up to 10 Students",
        "Basic Analytics",
        "Email Support",
      ],
    },
    {
      name: "Basic",
      monthlyPrice: 9,
      yearlyPrice: 90,
      dropdownType: "billing",
      features: [
        "Create Exams",
        "Up to 50 Students",
        "Basic Analytics",
        "Email Support",
      ],
    },
    {
      name: "Pro",
      monthlyPrice: 19,
      yearlyPrice: 190,
      dropdownType: "billing",
      features: [
        "Unlimited Students",
        "Advanced Security Monitoring",
        "Detailed Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      dropdownType: "contact",
      features: [
        "University Level Deployment",
        "Dedicated Server",
        "Custom Features",
        "24/7 Support",
      ],
    },
  ];

  const handleChoosePlan = (index) => {
    // Problem 2: user not logged in
    if (!session) {
      window.location.href = `/auth/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    // Problem 1: Only update selected plan if logged in
    if (selectedPlan !== index) {
      setSelectedPlan(index);
      Swal.fire({
        icon: "info",
        title: "Plan Selected",
        text: `You selected the ${plans[index].name} plan. Click again to confirm.`,
        confirmButtonColor: "#0D7C66",
      });
      return;
    }

    // Confirm plan choice
    Swal.fire({
      icon: "success",
      title: "Plan Confirmed",
      text: `You have chosen the ${plans[index].name} plan!`,
      confirmButtonColor: "#0D7C66",
    }).then(() => {
      const plan = plans[index];
      if (plan.name === "Free") {
        window.location.href = "/dashboard/student";
      } else if (plan.name === "Enterprise") {
        window.location.href = "/support/contact";
      } else {
        window.location.href = `/pricing/${plan.name.toLowerCase()}`;
      }
    });
  };

  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 py-16 px-6">
      <div className="text-center py-20 px-6 bg-emerald-900 text-emerald-50">
        <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-emerald-200">
          Choose the best plan for your institution or classroom.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mt-10">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === index;
          return (
            <div
              key={index}
              className={`bg-emerald-900/50 border border-emerald-500/20 shadow-lg transform transition-all duration-300 cursor-pointer rounded-2xl p-6 ${
                isSelected ? "scale-105 shadow-2xl border-emerald-400" : ""
              }`}
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-emerald-50 mb-4">{plan.name}</h2>
                <p className="text-3xl font-extrabold text-emerald-400 mb-4">
                  {plan.dropdownType === 'billing'
                    ? `$${selectedOptions[index] === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice} / ${selectedOptions[index] === 'yearly' ? 'year' : 'month'}`
                    : plan.price}
                </p>
                {plan.dropdownType === 'billing' && (
                  <select
                    className="select select-bordered bg-emerald-800 text-emerald-50 border-emerald-500 mb-4"
                    value={selectedOptions[index] || 'monthly'}
                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, [index]: e.target.value }))}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly (Save 20%)</option>
                  </select>
                )}
                {plan.dropdownType === 'contact' && (
                  <select
                    className="select select-bordered bg-emerald-800 text-emerald-50 border-emerald-500 mb-4"
                    value={selectedOptions[index] || 'contact'}
                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, [index]: e.target.value }))}
                  >
                    <option value="contact">Contact Sales</option>
                  </select>
                )}
                <div className="divider bg-emerald-500/20"></div>

                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FiCheck className="text-emerald-400" />
                      <span className="text-emerald-100">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-emerald-50 border-emerald-500 ${
                    isSelected ? "bg-emerald-500" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChoosePlan(index);
                  }}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
