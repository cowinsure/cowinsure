'use client';
import { motion } from "framer-motion";
import { Fingerprint, Satellite } from "lucide-react";
import { GiBullHorns } from "react-icons/gi";
import { useRef } from "react";
import TechnologyCard from "./TechnologyCard";

const VerificationEngines = () => {
  const iconRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
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
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
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
              Verification Layer
            </h2>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Asset Verification Engines
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
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
