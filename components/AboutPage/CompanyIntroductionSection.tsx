"use client";

import { motion } from "framer-motion";
import { GiBullHorns } from "react-icons/gi";
import { useRef } from "react";
import { Building } from "lucide-react";

const CompanyIntroductionSection = () => {
  const iconRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section className="py-20 md:py-32 bg-[#F6F4EC] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[#F6F4EC]"></div>
      </div>

      <div className="max-w-[1480px] mx-auto px-4 relative z-10">
        {/* Section 1: Introduction & Company Overview */}
        <div className="mb-32 bg-white py-16 rounded-3xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            {/* Icon and Subtitle Section */}
            <motion.div className="flex flex-col items-center mb-8">
              <div ref={iconRef}>
                <GiBullHorns className="lg:w-auto w-full text-3xl text-center text-green-700 mb-3" />
              </div>
              <h2
                ref={subtitleRef}
                className="text-2xl font-bold text-[#687469] text-center mb-4"
              >
                About InsureCow
              </h2>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Building Financial Infrastructure<br />
              <span className="text-green-700">for Rural Economies</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Bridging the Worlds Most Overlooked Asset Financing Gap
            </p>
          </motion.div>

          {/* Company Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Deep-Technology Fintech & Insurtech Infrastructure
                  </h3>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      InsureCow is a deep-technology–led fintech and insurtech infrastructure company
                      operating under a global holding structure. The parent entity, <strong>InsureCow Tech Pte. Ltd.</strong>,
                      is incorporated in Singapore, is venture capital–backed, and owns the groups core AI technology,
                      data models, and intellectual property.
                    </p>
                    <p>
                      <strong>InsureCow Ltd.</strong> is the operating company, originally established in Bangladesh,
                      where the platform was built, tested, and scaled in close collaboration with licensed banks,
                      insurers, fintechs, and development partners.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Building className="w-8 h-8 text-green-600" />
                    <h4 className="text-xl font-semibold text-gray-900">Global Structure</h4>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span><strong>Singapore HQ:</strong> Technology ownership & international partnerships</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <span><strong>Bangladesh Operations:</strong> Platform development & market validation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntroductionSection;