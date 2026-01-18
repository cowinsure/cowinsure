"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { GiBullHorns } from "react-icons/gi";
import { useRef } from "react";

const ArchitectureDiagram = () => {
  const iconRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
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
              Platform Architecture
            </h2>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Platform Architecture
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            A unified technology stack with distinct, purpose-built components
          </p>
        </motion.div>

        {/* Architecture Flow */}
        <div className="max-w-4xl mx-auto">
          {/* Verification Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium uppercase tracking-wider">
                Verification Layer
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-5 border border-green-200 text-center">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Cattle Digital Twin Engine
                </h4>
                <p className="text-xs text-gray-600">Biometric Identification</p>
              </div>
              <div className="bg-green-50 rounded-xl p-5 border border-green-200 text-center">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Crop Intelligence Engine
                </h4>
                <p className="text-xs text-gray-600">Geospatial Analytics</p>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </motion.div>

          {/* Operating Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium uppercase tracking-wider">
                Operating Layer
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-5 border border-green-200 text-center">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Farm OS
                </h4>
                <p className="text-xs text-gray-600">Farmer Financial Intelligence</p>
              </div>
              <div className="bg-green-50 rounded-xl p-5 border border-green-200 text-center">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Insurance & Risk OS
                </h4>
                <p className="text-xs text-gray-600">Underwriting & Portfolio</p>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </motion.div>

          {/* Distribution Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium uppercase tracking-wider">
                Distribution Layer
              </span>
            </div>
            <div className="bg-green-50 rounded-xl p-5 border border-green-200 text-center max-w-md mx-auto">
              <h4 className="font-semibold text-gray-900 mb-1">
                Insurance Marketplace
              </h4>
              <p className="text-xs text-gray-600">Product Access & Distribution</p>
            </div>
          </motion.div>

          {/* Partners Row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex flex-wrap justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                {/* <ArrowRight className="w-4 h-4 text-green-500" /> */}
                <span className="text-sm text-gray-600">Licensed Insurers</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Banks & Lenders</span>
              </div> */}
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Takaful Operators</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDiagram;
