"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe2, Cpu, Map, Lock } from "lucide-react";
import { GiBullHorns } from "react-icons/gi";

const features = [
  {
    icon: Cpu,
    title: "AI Asset Intelligence",
    desc: "Proprietary computer vision and risk models for livestock and crop verification.",
  },
  {
    icon: Map,
    title: "Geospatial Analytics",
    desc: "Satellite and field-level intelligence for location-aware risk assessment.",
  },
  {
    icon: Lock,
    title: "Audit-Ready by Design",
    desc: "Tamper-resistant records that meet insurer and bank compliance needs.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function AboutInsurecow() {
  return (
    <section className="relative overflow-hidden bg-[#F6F4EC]  py-24 md:py-32">
      {/* Decorative blur */}
      {/* <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" /> */}

      <div className="relative mx-auto max-w-[1480px] px-4">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
               <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex flex-col items-center mb-6"
                    >
                      <div 
                    //   ref={iconRef
                      >
                        <GiBullHorns className="lg:w-auto w-full text-2xl text-center text-green-700 mb-2" />
                      </div>
                      <h2
                        // ref={subtitleRef}
                        className="text-xl font-bold text-[#687469] text-start mb-3"
                      >
                       Platform Overview
                      </h2>
                    </motion.div>
          {/* <span className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
            Platform Overview
          </span> */}
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Technology Built for Trust at Scale
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            AI-powered verification, geospatial intelligence, and compliance-ready infrastructure
            for insurance and financial services.
          </p>
        </motion.div>

        {/* Technology Solution */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-28"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div className="rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-10 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600">
                <ShieldCheck className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-gray-900">
                Digital Verification & Auditability
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                InsureCow combines proprietary AI-based asset identification, geospatial intelligence,
                and risk analytics to make livestock and crop assets digitally verifiable and auditable.
                This enables banks and insurers to launch insurance, credit, and risk products with
                lower operational friction and stronger controls.
              </p>
              <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                Zero Balance-Sheet Risk for InsureCow
              </div>
            </div>

            {/* Right */}
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <f.icon className="mb-4 h-8 w-8 text-green-600" />
                  <h4 className="mb-2 text-lg font-semibold text-gray-900">
                    {f.title}
                  </h4>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Global Deployment */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-10 text-white shadow-xl md:p-14"
        >
          <div className="mx-auto max-w-4xl text-center">
            <Globe2 className="mx-auto mb-6 h-16 w-16 text-green-400" />
            <h3 className="mb-6 text-4xl font-bold">
              Engineered for Global Deployment
            </h3>
            <p className="mb-10 text-lg leading-relaxed text-gray-300">
              Built first for low-infrastructure, high-informality markets, InsureCow operates
              end-to-end where financial rails are incomplete. In developed markets, it integrates
              selectively with existing systems; in underserved regions, it functions as a full
              enablement layer. This makes InsureCow deployment-ready across geographies.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="rounded-full bg-green-600 px-4 py-1">Low-Infrastructure Markets</span>
              <span className="rounded-full bg-green-600 px-4 py-1">Developed Markets</span>
              <span className="rounded-full bg-green-600 px-4 py-1">International Scale</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
