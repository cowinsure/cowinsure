'use client';
import { motion } from "framer-motion";
import { Tractor, ShieldCheck, Store } from "lucide-react";
import { GiBullHorns } from "react-icons/gi";
import { useRef } from "react";
import TechnologyCard from "./TechnologyCard";

const OperatingSystems = () => {
  const iconRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const systems = [
    {
      icon: Tractor,
      title: "Farm OS",
      subtitle: "Operations & Farmer Financial Intelligence",
      description:
        "InsureCow's operational layer for managing farm activities and generating farmer-level financial intelligence. It consumes verified asset data from the cattle and crop engines and combines it with day-to-day operational information.",
      features: [
        "Farm inputs, expenses, and production events",
        "Livestock care activities and crop operations",
        "Sales, purchases, and cash-flow data",
        "Agentic AI guiding structured workflows",
        "OCR-based document ingestion",
        "Mobile-first tools for low-literacy environments",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Insurance & Risk OS",
      subtitle: "Underwriting, Risk & Portfolio Intelligence",
      description:
        "The decision layer used by licensed insurers, banks, and financial institutions. It consumes verified asset data along with farmer-level insights from Farm OS.",
      features: [
        "Underwrite livestock and crop insurance",
        "Assess credit risk for agricultural lending",
        "Monitor portfolios with real-time signals",
        "Data-backed claims assessment",
      ],
    },
    {
      icon: Store,
      title: "Insurance Marketplace",
      subtitle: "Product Distribution",
      description:
        "The distribution layer that connects verified assets and farmers to insurance and takaful products offered by licensed insurers and takaful operators.",
      features: [
        "Efficient product distribution using verified eligibility",
        "Bundling with finance, inputs, or services",
        "Lower acquisition and servicing costs",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-[#F6F4EC]">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* Icon and Subtitle Section */}
          <motion.div className="flex flex-col items-center mb-6">
            <div ref={iconRef}>
              <GiBullHorns className="lg:w-auto w-full text-2xl text-center text-green-700 mb-2" />
            </div>
            <h2
              ref={subtitleRef}
              className="text-xl font-bold text-[#687469] text-center mb-3"
            >
              Operating Systems
            </h2>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Intelligence & Distribution
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Purpose-built operating systems that transform verified data into
            actionable intelligence and scalable distribution.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((system, index) => (
            <TechnologyCard
              key={index}
              index={index}
              icon={system.icon}
              title={system.title}
              subtitle={system.subtitle}
              description={system.description}
              features={system.features}
            />
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-gray-500 mt-12 max-w-3xl mx-auto"
        >
          InsureCow provides technology, analytics, and integration. All underwriting,
          lending, and risk-bearing activities remain with regulated partner institutions.
        </motion.p>
      </div>
    </section>
  );
};

export default OperatingSystems;
