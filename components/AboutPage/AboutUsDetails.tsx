"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { GiBullHorns } from "react-icons/gi"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const AboutUsDetailedSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const imageElement = imageRefs.current[index]
          const contentElement = contentRefs.current[index]

          if (imageElement && contentElement) {
            // Set initial states
            gsap.set(imageElement, {
              x: index % 2 === 0 ? -100 : 100,
              opacity: 0,
            })

            gsap.set(contentElement.children, {
              y: 50,
              opacity: 0,
            })

            // Create timeline with scroll trigger
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            })

            // Image animation
            tl.to(imageElement, {
              duration: 1.2,
              x: 0,
              opacity: 1,
              ease: "power2.out",
            })

            // Content animation
            tl.to(
              contentElement.children,
              {
                duration: 0.8,
                y: 0,
                opacity: 1,
                ease: "power2.out",
                stagger: 0.1,
              },
              "-=0.8",
            )
          }
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const sections = [
    {
      id: "company-overview",
      title: "Transforming Rural Economies",
      subtitle: "About InsureCow",
      heading: "Bridging the World's Most Overlooked Financing Gap",
      description: `InsureCow is a Singapore-based fintech and insurtech company, originally founded in Bangladesh, that is transforming rural economies by bridging the world's most overlooked financing gap: livestock. In emerging markets, over 500 million smallholder farmers rely on cattle and other animals as their primary asset. Yet, these animals remain undocumented, uninsured, and financially invisible—locking millions out of affordable credit, protection, and opportunity.`,
      image: "/farmer-cow.png",
      reverse: false,
    },
    {
      id: "technology",
      title: "Innovation at Scale",
      subtitle: "Our Technology",
      heading: "AI-Driven Digital Twins for Livestock",
      description: `At the core of InsureCow is a proprietary AI-driven platform that creates tamper-proof Digital Twins for livestock using our patent-pending Muzzle Printometry technology. This innovation powers our Know Your Cow™ (KYC) system, which verifies and transforms cattle into traceable, financeable digital collateral. With this foundation, we offer a seamless bundle of livestock ID, microinsurance, health and life coverage for farmers, financing, veterinary services, and verified cattle trading—all integrated into one inclusive ecosystem.`,
      image: "/farmer-cow1.png",
      reverse: true,
    },
    {
      id: "impact",
      title: "Proven Impact",
      subtitle: "Our Achievements",
      heading: "Supporting 5,000+ Smallholder Farmers",
      description: `So far, we've already supported 5,000+ smallholder farmers, enhancing their income, security, and resilience while reducing dependency on high-interest informal lenders and ensuring fair market access. In Bangladesh alone, more than 16.6 million farmers face these challenges daily, with over 11.9 million still unbanked and less than 0.3% of livestock insured. We're changing that—at scale.`,
      image: "/farmer-cow2.png",
      reverse: false,
    },
    {
      id: "scalability",
      title: "Global Reach",
      subtitle: "Scalable Solutions",
      heading: "API-First Architecture for Worldwide Impact",
      description: `InsureCow is proven, scalable, and globally relevant. We're operationally active and revenue-generating in Bangladesh, with real-world validation and fast-growing demand. Our API-first architecture enables rapid integration with insurers, banks, MFIs, agri-input companies, and digital veterinary platforms. Designed for expansion into South Asia, Africa, the MENA region, Latin America, and beyond—while addressing climate adaptation, food security, and inclusive growth.`,
      image: "/field-cow.png",
      reverse: true,
    },
    {
      id: "partnerships",
      title: "Strategic Partnerships",
      subtitle: "Collaboration",
      heading: "Building Together for Greater Impact",
      description: `InsureCow has established strong partnerships with both national and international stakeholders to drive innovation and scale. Our model is validated by ecosystem enablers such as Swisscontact's BMMDP and Biniyog Briddhi (SDC-backed). We've partnered with cutting-edge organizations like MIC Global, Blade Labs, and Monak E-Services, enabling us to co-develop parametric, digital-first, and Shariah-compliant insurance and financing solutions.`,
      image: "/training-farmer.png",
      reverse: false,
    },
  ]

  const points = [
            {
              title: "Proven Track Record",
              description: "Operationally active and revenue-generating in Bangladesh with real-world validation",
              icon: "📈",
            },
            {
              title: "Scalable Technology",
              description: "API-first architecture enables rapid integration with financial institutions worldwide",
              icon: "🔗",
            },
            {
              title: "Global Relevance",
              description: "Designed for expansion across South Asia, Africa, MENA, and Latin America",
              icon: "🌍",
            },
            {
              title: "Inclusive Solutions",
              description: "Support for Shariah-compliant models, parametric insurance, and gender-focused programs",
              icon: "🤝",
            },
            {
              title: "AI-Powered Innovation",
              description: "Patent-pending Muzzle Printometry technology creates tamper-proof Digital Twins",
              icon: "🤖",
            },
            {
              title: "Comprehensive Ecosystem",
              description: "Integrated platform covering ID, insurance, financing, veterinary services, and trading",
              icon: "🔄",
            },
          ]

  return (
    <div ref={containerRef} className="py-8 lg:py-16 bg-white">
      {/* Detailed Sections */}
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => {
            sectionRefs.current[index] = el
          }}
          className={`flex flex-col lg:flex-row lg:justify-around md:flex-col w-full px-4 md:px-6 lg:px-8 py-8 lg:py-16 ${
            index > 0 ? "border-t border-gray-100" : ""
          }`}
        >
          <div
            ref={(el) => {
              imageRefs.current[index] = el
            }}
            className={`flex-1 w-full lg:w-1/2 lg:pr-10 pb-6 lg:pb-10 flex justify-center lg:justify-center items-center relative ${
              section.reverse ? "lg:order-2 lg:pl-10 lg:pr-0" : ""
            }`}
          >
            <div className="relative px-4 sm:px-6 lg:px-10">
              <div className="relative z-30 h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] lg:h-[500px] lg:w-[500px] overflow-hidden border-gray-300 rounded-[5px] group">
                <div className="image-inner w-full h-full">
                  <Image
                    src={section.image || "/placeholder.svg"}
                    alt={section.title}
                    height={500}
                    width={500}
                    className="w-full h-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                    priority={index < 2}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-0 h-full bg-white bg-opacity-20 transform group-hover:w-full transition-all duration-500 ease-in-out"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={(el) => {
              contentRefs.current[index] = el
            }}
            className={`px-4 sm:px-6 lg:px-2 flex-1 w-full lg:w-1/2 text-start ${section.reverse ? "lg:order-1" : ""}`}
          >
            <div>
              <GiBullHorns className="w-auto text-2xl lg:text-3xl text-green-700 mb-2 lg:mb-3" />
            </div>
            <span className="text-xs sm:text-sm text-[#687469] uppercase font-semibold">{section.subtitle}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#334b35] mt-2 max-w-xl">
              {section.title}
            </h2>
            <p className="mt-3 lg:mt-5 text-lg sm:text-xl text-[#687469] font-medium">{section.heading}</p>
            <p className="space-y-3 mb-6 lg:mb-8 pt-3 lg:pt-5 text-base sm:text-lg lg:text-[18px] text-[#334b35] leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      ))}

      {/* Key Features Section */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 bg-[#F7F7F7] rounded-xl lg:rounded-2xl mt-8 lg:mt-16">
        <div className="text-center mb-8 lg:mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#334b35] mb-3 lg:mb-4 px-2">
            Why Choose InsureCow?
          </h3>
          <p className="text-base sm:text-lg text-[#687469] max-w-3xl mx-auto px-4">
            Our comprehensive platform addresses every aspect of livestock finance and insurance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {points.map((feature, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl sm:text-4xl mb-3 lg:mb-4">{feature.icon}</div>
              <h4 className="text-lg sm:text-xl font-bold text-[#334b35] mb-2 lg:mb-3">{feature.title}</h4>
              <p className="text-sm sm:text-base text-[#687469] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 text-center">
        <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-xl lg:rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 px-2">
            Ready to Transform Livestock Finance?
          </h3>
          <p className="text-base sm:text-lg lg:text-xl mb-6 lg:mb-8 max-w-3xl mx-auto opacity-90 px-2">
           {` If you're an insurer, bank, development agency, agri-business, or tech platform looking to solve real-world
            problems with measurable impact—InsureCow is your gateway to transforming livestock into a sustainable,
            financeable, digital asset class.`}
          </p>
          
          <p className="mt-6 lg:mt-8 text-base sm:text-lg font-medium px-2">
            {`Let's reimagine rural finance. Let's build a future where every farmer and every animal counts.`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUsDetailedSection
