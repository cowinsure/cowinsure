'use client';
import { motion } from "framer-motion";
import { Fingerprint, Satellite } from "lucide-react";
import TechnologyCard from "./TechnologyCard";

const VerificationEngines = () => {
  const engines = [
    {
      icon: Fingerprint,
      title: "Cattle Digital Twin Engine",
      description:
        "Creates tamper-proof digital identities for individual animals using proprietary, AI-driven identification technology. Our patent-pending Muzzle Printometry system enables non-replicable biometric identification, establishing a persistent digital identity across the animal's lifecycle.",
      features: [
        "Non-replicable biometric identification via Muzzle Printometry",
        "Traceable, auditable, and financeable digital assets",
        "Lifecycle data: health events, vaccinations, mortality indicators",
        "Transaction history and ownership tracking",
      ],
    },
    {
      icon: Satellite,
      title: "Crop Intelligence & Verification Engine",
      description:
        "Provides AI-driven verification for crop assets combining geospatial intelligence, field-level data, and analytics to verify crop type, cultivated area, crop condition, and yield proxies across the growing cycle.",
      features: [
        "Satellite imagery and geospatial analysis",
        "Historical production pattern analysis",
        "On-ground validation integration",
        "Auditable digital representations of crop assets",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 dot-pattern opacity-30" />
      
      <div className=" px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Verification Layer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Asset Verification Engines
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Independent verification systems that create trusted, auditable digital 
            representations of agricultural assets.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {engines.map((engine, index) => (
            <TechnologyCard
              key={index}
              index={index}
              icon={engine.icon}
              title={engine.title}
              description={engine.description}
              features={engine.features}
              variant="highlight"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerificationEngines;
