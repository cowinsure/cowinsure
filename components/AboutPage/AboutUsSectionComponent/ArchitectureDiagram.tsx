"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

const ArchitectureDiagram = () => {
  return (
    <section className="py-20 md:py-32 hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      
      <div className=" px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Platform Architecture
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/70">
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
              <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/70 text-xs font-medium uppercase tracking-wider">
                Verification Layer
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/20 text-center">
                <h4 className="font-heading font-semibold text-primary-foreground mb-1">
                  Cattle Digital Twin Engine
                </h4>
                <p className="text-xs text-primary-foreground/60">Biometric Identification</p>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/20 text-center">
                <h4 className="font-heading font-semibold text-primary-foreground mb-1">
                  Crop Intelligence Engine
                </h4>
                <p className="text-xs text-primary-foreground/60">Geospatial Analytics</p>
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
            <ArrowDown className="w-6 h-6 text-primary-foreground/40" />
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
              <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/70 text-xs font-medium uppercase tracking-wider">
                Operating Layer
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/20 text-center">
                <h4 className="font-heading font-semibold text-primary-foreground mb-1">
                  Farm OS
                </h4>
                <p className="text-xs text-primary-foreground/60">Farmer Financial Intelligence</p>
              </div>
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/20 text-center">
                <h4 className="font-heading font-semibold text-primary-foreground mb-1">
                  Insurance & Risk OS
                </h4>
                <p className="text-xs text-primary-foreground/60">Underwriting & Portfolio</p>
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
            <ArrowDown className="w-6 h-6 text-primary-foreground/40" />
          </motion.div>

          {/* Distribution Layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/70 text-xs font-medium uppercase tracking-wider">
                Distribution Layer
              </span>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/20 text-center max-w-md mx-auto">
              <h4 className="font-heading font-semibold text-primary-foreground mb-1">
                Insurance Marketplace
              </h4>
              <p className="text-xs text-primary-foreground/60">Product Access & Distribution</p>
            </div>
          </motion.div>

          {/* Partners Row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-primary-foreground/10"
          >
            <div className="flex flex-wrap justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-accent" />
                <span className="text-sm text-primary-foreground/60">Licensed Insurers</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-accent" />
                <span className="text-sm text-primary-foreground/60">Banks & Lenders</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-accent" />
                <span className="text-sm text-primary-foreground/60">Takaful Operators</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDiagram;
