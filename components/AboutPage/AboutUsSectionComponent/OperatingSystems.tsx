'use client';
import { motion } from "framer-motion";
import { Tractor, ShieldCheck, Store } from "lucide-react";
import TechnologyCard from "./TechnologyCard";

const OperatingSystems = () => {
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
    <section className="py-20 md:py-32 relative overflow-hidden" style={{ background: 'var(--gradient-subtle)' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className=" px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Operating Systems
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Intelligence & Distribution
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
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
          className="text-center text-sm text-muted-foreground mt-12 max-w-3xl mx-auto"
        >
          InsureCow provides technology, analytics, and integration. All underwriting, 
          lending, and risk-bearing activities remain with regulated partner institutions.
        </motion.p>
      </div>
    </section>
  );
};

export default OperatingSystems;
