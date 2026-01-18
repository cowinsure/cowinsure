"use client";

import { motion } from "framer-motion";
import { Building, Globe, TrendingUp, Shield, Users, Target } from "lucide-react";
import { GiBullHorns } from "react-icons/gi";

const MarketContextSection = () => {
  const stats = [
    { icon: Users, value: "500M+", label: "Smallholder Farmers", desc: "Manage livestock and crops globally" },
    { icon: Globe, value: "1.3B+", label: "People Dependent", desc: "On agriculture for livelihoods" },
    { icon: Building, value: "17M", label: "Households", desc: "Agriculture-based in Bangladesh" },
    { icon: TrendingUp, value: "70M", label: "People Engaged", desc: "Directly & indirectly in agriculture" },
  ];

  const challenges = [
    {
      icon: Shield,
      title: "Asset Informality",
      description: "Most agricultural assets remain undocumented and uninsured"
    },
    {
      icon: Target,
      title: "Verification Gap",
      description: "Lack of trusted, verifiable asset data for financial institutions"
    },
    {
      icon: Building,
      title: "Infrastructure Constraints",
      description: "Operating in low-infrastructure, high-informality markets"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-[1480px] mx-auto px-4 relative z-10">
        {/* Section 2: Market Context & Challenges */}
        <div className="bg-gray-50 py-16 rounded-3xl">
          {/* Market Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className=""
          >
            <div className="text-center">
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
                                       Agricultural Landscape
                                      </h2>
                                    </motion.div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Global Agricultural Landscape
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understanding the scale and importance of agricultural assets worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="bg-white p-4 md:p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl hover:border-green-200 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">{stat.value}</div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                    <div className="text-sm text-gray-500 leading-relaxed">{stat.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section Divider */}
          <div className="flex items-center justify-center my-16">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
            </div>
          </div>

          {/* Market Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Addressing the Core Challenges
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The foundational constraints in rural and agricultural finance
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-white p-4 md:p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <challenge.icon className="w-10 h-10 text-red-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">{challenge.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section Divider */}
          <div className="flex items-center justify-center my-16">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
            </div>
          </div>

          {/* Bangladesh Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="">
              {/* <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 rounded-full translate-y-12 -translate-x-12 opacity-20"></div> */}

              <div className="relative z-10">
                <div className="text-center mb-12">
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
                                       Bangladesh Focus
                                      </h2>
                                    </motion.div>
                  {/* <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Globe className="w-4 h-4" />
                    Bangladesh Focus
                  </div> */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Bangladesh: The Proving Ground
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    A demanding environment that tests systems for global deployment
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="space-y-6 text-gray-600 leading-relaxed">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Building className="w-4 h-4 text-blue-600" />
                      </div>
                      <p>
                        Bangladesh serves as the primary proving ground for InsureCows technology.
                        Agriculture supports approximately <strong className="text-blue-700">17 million agriculture-based households</strong>
                        and engages around <strong className="text-blue-700">70 million people</strong> directly and indirectly,
                        making it the countrys largest employment sector.
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <p>
                        Livestock and poultry ownership exceeds <strong className="text-green-700">80% of households</strong>,
                        yet most of these assets remain undocumented and uninsured. This combination
                        of scale, informality, and economic importance makes Bangladesh one of the
                        most demanding environments in which to build systems intended for global use.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 md:p-8 rounded-2xl border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Bangladesh Agriculture Facts</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                        <span className="text-gray-600 font-medium">Agriculture Households</span>
                        <span className="font-bold text-blue-700 text-lg">17 Million</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                        <span className="text-gray-600 font-medium">People Employed</span>
                        <span className="font-bold text-green-700 text-lg">70 Million</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                        <span className="text-gray-600 font-medium">Livestock Ownership</span>
                        <span className="font-bold text-orange-700 text-lg">80%+</span>
                      </div>
                      <div className="flex justify-between items-center py-3 hover:bg-gray-50 px-3 rounded-lg transition-colors">
                        <span className="text-gray-600 font-medium">Economic Sector</span>
                        <span className="font-bold text-purple-700 text-lg">Largest</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketContextSection;