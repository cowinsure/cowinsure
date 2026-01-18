"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Shield } from "lucide-react";
import { GiBullHorns } from "react-icons/gi";
import Link from "next/link";
import { useRef } from "react";

interface TechnologyHeroProps {
  showKnowMoreButton?: boolean;
}

const TechnologyHero = ({ showKnowMoreButton = false }: TechnologyHeroProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  return (
    <section className="relative min-h-screen bg-[#F6F4EC] from-green-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[#F6F4EC] "></div>
      </div>

      {/* Floating Elements */}
      {/* <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-green-200/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-green-300/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} /> */}

      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5 }}
        className="absolute top-1/4 right-1/4 animate-bounce"
        style={{ animationDelay: '0s', animationDuration: '3s' }}
      >
        <Cpu className="w-16 h-16 text-green-600/40" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-1/3 left-1/5 animate-bounce"
        style={{ animationDelay: '1s', animationDuration: '4s' }}
      >
        <Database className="w-12 h-12 text-green-600/40" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.9 }}
        className="absolute top-1/3 left-1/4 animate-bounce"
        style={{ animationDelay: '2s', animationDuration: '5s' }}
      >
        <Shield className="w-10 h-10 text-green-600/40" />
      </motion.div>

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 mx-auto">
        {/* Icon and Subtitle Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-6"
        >
          <div ref={iconRef}>
            <GiBullHorns className="lg:w-auto w-full text-2xl text-center text-green-700 mb-2" />
          </div>
          <h2
            ref={subtitleRef}
            className="text-xl font-bold text-[#687469] text-start mb-3"
          >
            Agricultural Intelligence Platform
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
        >
          Our Technology
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-medium text-gray-700 mb-8"
        >
          Innovation at Scale
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl text-lg text-gray-600 leading-relaxed"
        >
          InsureCow operates a modular, AI-driven technology stack designed to verify
          agricultural assets, generate financial intelligence, and enable regulated
          institutions to operate at scale.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 pt-12 border-t border-gray-200"
        >
          {[
            { label: "Verification Engines", value: "2" },
            { label: "Operating Systems", value: "3" },
            { label: "API Integration", value: "100%" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Know More Button */}
        {showKnowMoreButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <Link href="/our_tech_section">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Know More About Our Technology
              </button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F7F7F7"
          />
        </svg>
      </div>
    </section>
  );
};

export default TechnologyHero;
