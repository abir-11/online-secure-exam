import { FiCheck } from "react-icons/fi";

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Create Exams",
        "Up to 50 Students",
        "Basic Analytics",
        "Email Support",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19 / month",
      features: [
        "Unlimited Students",
        "Advanced Security Monitoring",
        "Detailed Analytics",
        "Priority Support",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "University Level Deployment",
        "Dedicated Server",
        "Custom Features",
        "24/7 Support",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 py-16 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-base-content/70">
          Choose the best plan for your institution or classroom.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`card border ${
              plan.highlight
                ? "border-primary shadow-xl scale-105"
                : "border-base-300 shadow-lg"
            }`}
          >
            <div className="card-body">
              <h2 className="text-2xl font-bold">{plan.name}</h2>

              <p className="text-3xl font-extrabold text-primary">
                {plan.price}
              </p>

              <div className="divider"></div>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FiCheck className="text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`btn mt-6 ${
                  plan.highlight ? "btn-primary" : "btn-outline btn-primary"
                }`}
              >
                Choose Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
