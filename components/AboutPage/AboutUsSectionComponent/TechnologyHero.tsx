"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Shield } from "lucide-react";

const TechnologyHero = () => {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-glow/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse-slow delay-200" />
      
      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.5 }}
        className="absolute top-1/4 right-1/4 animate-float"
      >
        <Cpu className="w-16 h-16 text-primary-foreground/30" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-1/3 left-1/5 animate-float delay-300"
      >
        <Database className="w-12 h-12 text-primary-foreground/30" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 0.9 }}
        className="absolute top-1/3 left-1/4 animate-float delay-500"
      >
        <Shield className="w-10 h-10 text-primary-foreground/30" />
      </motion.div>

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-primary-foreground/90">
            Agricultural Intelligence Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 tracking-tight"
        >
          Our Technology
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-heading font-medium text-primary-foreground/80 mb-8"
        >
          Innovation at Scale
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl text-lg text-primary-foreground/70 leading-relaxed"
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
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 pt-12 border-t border-primary-foreground/10"
        >
          {[
            { label: "Verification Engines", value: "2" },
            { label: "Operating Systems", value: "3" },
            { label: "API Integration", value: "100%" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/60 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default TechnologyHero;
