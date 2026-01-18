'use client';
import { motion } from "framer-motion";
import { Globe, Layers, Building, CheckCircle } from "lucide-react";
import { GiBullHorns } from "react-icons/gi";
import { useRef } from "react";

const GlobalDeployment = () => {
  const iconRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const benefits = [
    {
      icon: Layers,
      title: "Modular Architecture",
      description: "Separating verification engines, operating systems, and distribution layers",
    },
    {
      icon: Globe,
      title: "Global Scalability",
      description: "Deploy across geographies, asset classes, and institutional models",
    },
    {
      icon: Building,
      title: "Regulatory Clarity",
      description: "Clear separation between technology provider and regulated activities",
    },
  ];

  const capabilities = [
    "End-to-end operation in low-infrastructure environments",
    "Selective integration with existing systems in mature markets",
    "Cross-border deployment with local compliance",
    "Multi-asset class support within single platform",
  ];

  return (
    <section className="py-20 md:py-32 bg-[#F6F4EC] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
                Enterprise Ready
              </h2>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Built for Global Deployment
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              By separating verification engines, operating systems, and distribution 
              layers, InsureCows architecture remains modular and scalable—without 
              compromising regulatory clarity.
            </p>

            {/* Capabilities List */}
            <ul className="space-y-4">
              {capabilities.map((capability, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-900">{capability}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="group flex items-start gap-5 p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalDeployment;
