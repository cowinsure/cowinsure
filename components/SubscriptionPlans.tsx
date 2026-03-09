"use client";

import React from "react";
import {
  MessageCircle,
  Check,
  Crown,
  Zap,
  Rocket,
  Building2,
} from "lucide-react";

interface SubscriptionPlan {
  name: string;
  price: string;
  description: string;
  icon: React.ReactNode;
  features: {
    included: string[];
    excluded: string[];
  };
  popular?: boolean;
  color: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Starter",
    price: "99 tk",
    description: "Perfect for small farm owners",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-amber-500",
    features: {
      included: [
        "Livestock Inventory",
        "Basic Animal Registration",
        "Health Status Tracking",
        "Dashboard Overview",
        "5 Animals Limit",
        "Basic Support",
      ],
      excluded: [
        "Vaccination Tracking",
        "Breeding Management",
        "Production Recording",
        "Financial Transactions",
        "AI Muzzle Identification",
      ],
    },
  },
  {
    name: "Plus",
    price: "199 tk",
    description: "Ideal for growing farm owners",
    icon: <Rocket className="w-5 h-5" />,
    color: "bg-emerald-500",
    popular: true,
    features: {
      included: [
        "Everything in Starter",
        "Vaccination Scheduling",
        "Milk Production Tracking",
        "Weight Monitoring",
        "Feed Consumption Logging",
        "Vet Selection",
        "50 Animals Limit",
        "Priority Support",
      ],
      excluded: [
        "Breeding Management",
        "Financial Transactions",
        "AI Muzzle Identification",
        "Advanced Reports",
      ],
    },
  },
  {
    name: "Pro",
    price: "299 tk",
    description: "Complete solution for farm owners",
    icon: <Crown className="w-5 h-5" />,
    color: "bg-violet-500",
    features: {
      included: [
        "Everything in Plus",
        "Breeding & Birth Tracking",
        "AI Records",
        "Financial Management",
        "Income & Expense Reports",
        "QR Code Generation",
        "Unlimited Animals",
        "24/7 Support",
      ],
      excluded: ["AI Muzzle Identification", "Custom Integrations"],
    },
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for enterprise",
    icon: <Building2 className="w-5 h-5" />,
    color: "bg-slate-700",
    features: {
      included: [
        "Everything in Pro",
        "AI-Powered Identification",
        "Muzzle Pattern Recognition",
        "Custom API Integrations",
        "White-label Solutions",
        "Dedicated Manager",
        "On-premise Deployment",
        "Advanced Analytics",
      ],
      excluded: [],
    },
  },
];

export default function SubscriptionPlans() {
  // const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handleWhatsAppClick = (planName: string) => {
    const message = `Hello, I'm interested in the ${planName} subscription plan. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/8801999467873?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-24 bg-[#F8FAFC]" id="subscription">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Simple, transparent{" "}
            <span className="text-emerald-600">pricing</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Choose the perfect plan for your farm management needs. Scale
            seamlessly as your business grows, with no hidden fees.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl bg-white border transition-all duration-300 ease-out
        ${
          plan.popular
            ? "border-emerald-500 shadow-2xl shadow-emerald-900/10 scale-105 z-10"
            : "border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1"
        }
      `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg ring-1 ring-emerald-600/20">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 pb-0">
                {/* Icon and Title Row */}
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${plan.color} text-white shadow-lg shadow-slate-200 flex-shrink-0`}
                  >
                    {plan.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight text-left">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed text-left">
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Price Row */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-sm text-slate-400 font-medium">
                    MONTHLY
                  </span>
                  <div>
                    <span className="text-4xl font-bold tracking-tight text-slate-900">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <small className="text-xs font-medium text-slate-400">
                        {" "} /cattle
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100 my-6 mx-6" />

              {/* Features List */}
              <div className="px-6 flex-1">
                <ul className="space-y-3">
                  {plan.features.included.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        <Check
                          className="w-5 h-5 text-emerald-600"
                          strokeWidth={2.5}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-700 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer / CTA */}
              <div className="p-6 pt-6 mt-auto">
                <button
                  onClick={() => handleWhatsAppClick(plan.name)}
                  className={`group w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 
            ${
              plan.popular
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg"
            }
          `}
                >
                  <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Get via WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
