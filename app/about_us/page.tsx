"use client";
// import AppBranding from "@/components/Project/AppBranding";
import React, { Suspense, useEffect, useRef, useState } from "react";
// import banner from "../../public/farmers-with.jpg";
import bannerGenereal from "../../public/farmerfieldimg.jpeg";
import bannerGenereal2 from "../../public/back-view-of-filipino-local-farmers-2025-01-07-23-27-27-utc.jpg";
// import FaqSection from "@/components/Home/FaqSection";
import ContactUs from "@/components/Helper/ContactUs";
import CoreValueSection from "@/components/AboutPage/CoreValueSection";
import BannerGeneral from "@/components/Home/BannerGeneral";
import AwardRecognitionSection from "@/components/Helper/AwardRecognitionSection";
import ServiceHighlighted from "@/components/common/ServiceHighlighted";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutUsDetails from "@/components/AboutPage/AboutUsDetails";
import TechnologyHero from "@/components/AboutPage/OurTechnologySection/TechnologyHero";

import AboutInsurecow from "@/components/AboutPage/AboutInsurecow";
import CompanyIntroductionSection from "@/components/AboutPage/CompanyIntroductionSection";
import MarketContextSection from "@/components/AboutPage/MarketContextSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const mission =
  "Our mission is to promote financial inclusion for smallholder farmers by providing accessible, innovative insurance and financial products. We aim to empower underserved farming communities with technol-ogy-driven solutions, enhancing their ability to mitigate risks, increase productivity, and achieve long-term economic resilience";
const vision =
  "Our vision is to ensure that smallholder farmers in emerging economies have access to financial services, cutting-edge technology, and essential information, fostering a sustainable and prosperous agricultural sector.";

interface ExtraData {
  url: string;
  heading: string;
  description: string;
}

interface BaseCard {
  id: number;
  name: string;
  category: string;
  image_url: string;
  extra_data: ExtraData;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface BaseCardApiResponse {
  status: string;
  message: string;
  data: BaseCard[];
}

interface BaseCategory {
  id: string;
  name: string;
  description: string;
}

interface BaseCategoryApiResponse {
  status: string;
  message: string;
  data: BaseCategory[];
}

const AboutUs: React.FC = () => {
  const [aboutUsData, setAboutUsData] = useState<BaseCard[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subtitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const headingRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`
        );
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === "success") {
          const AboutUsCategory = result.data.find(
            (category) => category.name === "About Us - About Section"
          );
          if (AboutUsCategory) {
            fetchBaseCards(AboutUsCategory.id);
          }
        }
      } catch (error) {
        console.error("Error fetching base categories: ", error);
      }
    };
    const fetchBaseCards = async (categoryId: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/base-category/${categoryId}/base-cards/`
        );
        const result: BaseCardApiResponse = await response.json();
        if (result.status === "success") {
          setAboutUsData(result.data);
        }
      } catch (error) {
        console.error("Error fetching base cards: ", error);
      }
    };
    fetchBaseCategories();
  }, []);

  useEffect(() => {
    if (aboutUsData.length > 0) {
      const ctx = gsap.context(() => {
        aboutUsData.forEach((_, index) => {
          const imageElement = imageRefs.current[index];
          const iconElement = iconRefs.current[index];
          const subtitleElement = subtitleRefs.current[index];
          const titleElement = titleRefs.current[index];
          const headingElement = headingRefs.current[index];
          const descriptionElement = descriptionRefs.current[index];

          if (
            imageElement &&
            iconElement &&
            subtitleElement &&
            titleElement &&
            headingElement &&
            descriptionElement
          ) {
            // Set initial states
            // Image comes from left
            gsap.set(imageElement, {
              x: -100,
              opacity: 0,
            });

            // Text elements come from top
            gsap.set(
              [
                iconElement,
                subtitleElement,
                titleElement,
                headingElement,
                descriptionElement,
              ],
              {
                y: -50,
                opacity: 0,
              }
            );

            // Create timeline with scroll trigger
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: imageElement.closest(".about-section-item"),
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                // markers: true, // Uncomment for debugging
              },
            });

            // Image animation - slides from left
            tl.to(imageElement, {
              duration: 1.25,
              x: 0,
              opacity: 1,
              ease: "power2.out",
            });

            // Icon animation - falls from top
            tl.to(
              iconElement,
              {
                duration: 0.75,
                y: 0,
                opacity: 1,
                ease: "bounce.out",
              },
              "-=0.8"
            );

            // Subtitle animation - falls from top
            tl.to(
              subtitleElement,
              {
                duration: 0.75,
                y: 0,
                opacity: 1,
                ease: "power2.out",
              },
              "-=0.6"
            );

            // Title animation - falls from top
            tl.to(
              titleElement,
              {
                duration: 0.75,
                y: 0,
                opacity: 1,
                ease: "power2.out",
              },
              "-=0.6"
            );

            // Heading animation - falls from top
            tl.to(
              headingElement,
              {
                duration: 0.75,
                y: 0,
                opacity: 1,
                ease: "power2.out",
              },
              "-=0.6"
            );

            // Description animation - falls from top
            tl.to(
              descriptionElement,
              {
                duration: 0.75,
                y: 0,
                opacity: 1,
                ease: "power2.out",
              },
              "-=0.6"
            );

            // Add hover animation for image
            const imageInner = imageElement.querySelector(".image-inner");
            if (imageInner) {
              imageElement.addEventListener("mouseenter", () => {
                gsap.to(imageInner, {
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out",
                });
              });

              imageElement.addEventListener("mouseleave", () => {
                gsap.to(imageInner, {
                  scale: 1,
                  duration: 0.8,
                  ease: "power2.out",
                });
              });
            }
          }
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [aboutUsData]);

  return (
    <div className=" lg:h-auto w-auto h-auto overflow-hidden bg-[#F7F7F7]">
      {/* Technology Sections */}
      {/* <div className="bg-white">
        <TechnologyHero />
        <VerificationEngines />
        <OperatingSystems />
        <ArchitectureDiagram />
        <GlobalDeployment />
      </div> */}
      <CompanyIntroductionSection />
        <MarketContextSection />
     
      <AboutInsurecow />
           <TechnologyHero showKnowMoreButton={true} />


    

    

      {/* About Us Details */}

      <Suspense fallback={<div>Loading About section...</div>}>
        <div id="about" className="bg-[#F6F4EC]">
          <AboutUsDetails/>
        </div>
      </Suspense>

      {/* Mission and Vision */}
      <div className="bg-white">
        <ServiceHighlighted
          url=""
          image={bannerGenereal}
          title="Our Mission"
          description={mission}
          reverse
        />
        <ServiceHighlighted
          url=""
          image={bannerGenereal2}
          title="Our Vision"
          description={vision}
        />
      </div>

      <div className="h-auto lg:h-auto lg:pt-10 md:h-auto bg-[#F6F4EC]">
        <CoreValueSection />

        {/* <TeamSection /> */}

        <BannerGeneral bannerUrl={bannerGenereal}>
          <div className="relative z-10 flex flex-row items-center justify-center h-full bg-black bg-opacity-50 text-white text-center ">
            <div className="flex flex-1 item-center  lg:justify-center lg:items-center    justify-center ">
              <h1 className=" text-xs lg:text-6xl font-semibold ">
                {" "}
                <span className="text-white">
                  JOIN US ON THE PATH TO SUSTAINABLE AGRICULTURE
                </span>
              </h1>
            </div>
            <div
              className="flex flex-col item-center flex-1 lg:justify-center lg:items-center  backdrop-blur-lg bg-gradient-to-r from-green-900/80 to-[#16351810]  h-full justify-center text-center gap-4"
              style={{ clipPath: "ellipse(90% 90% at 50% 50%)" }}
            >
              <p className=" lg:text-2xl text-xs mb-6 lg:max-w-[70vh]">
                We transform rural economies through innovation, financial
                empowerment, and sustainable development. Partner with us to
                promote financial inclusion and global food security, one farmer
                at a time
              </p>
              <div className="flex space-x-4"></div>
            </div>
          </div>
        </BannerGeneral>

        <AwardRecognitionSection />

        {/* <div className="text-center bg-white">
          <FaqSection />
        </div> */}
        <div className="text-center bg-[#F6F4EC]">
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
