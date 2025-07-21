"use client";
import { useEffect, useState, useRef } from "react";
import type React from "react";

import Image from "next/image";
import { GiBullHorns } from "react-icons/gi";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundImageLayer from "../common/BackgroundImageLayer";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

const AboutUsSection: React.FC = () => {
  const [aboutUsData, setAboutUsData] = useState<BaseCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subtitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const headingRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`
        );
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === "success") {
          const AboutUsCategory = result.data.find(
            (category) => category.name === "About Us - Home Section"
          );
          if (AboutUsCategory) {
            fetchBaseCards(AboutUsCategory.id);
          }
        }
      } catch (error) {
        console.error("Error fetching base categories: ", error);
        setIsLoading(false);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchBaseCategories();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!isLoading && aboutUsData.length > 0) {
      const ctx = gsap.context(() => {
        aboutUsData.forEach((_, index) => {
          const imageElement = imageRefs.current[index];
          const iconElement = iconRefs.current[index];
          const subtitleElement = subtitleRefs.current[index];
          const titleElement = titleRefs.current[index];
          const headingElement = headingRefs.current[index];
          const descriptionElement = descriptionRefs.current[index];
          const buttonElement = buttonRefs.current[index];

          if (
            imageElement &&
            iconElement &&
            subtitleElement &&
            titleElement &&
            headingElement &&
            descriptionElement &&
            buttonElement
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
                buttonElement,
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
                ease: "power2.out",
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

            // Button animation - falls from top
            tl.to(
              buttonElement,
              {
                duration: 0.75,
                y: 0,
                opacity: 1,
                ease: "back.out(1.7)",
              },
              "-=0.4"
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
  }, [isLoading, aboutUsData]);

  if (isLoading) {
    return (
      <div className="min-h-[600px] min-w-[98%] relative flex items-center justify-center">
        <div className="text-center">
          <BackgroundImageLayer imageUrl="/village2.png" opacity={0.08} />
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading about us...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-[600px] relative">
      <BackgroundImageLayer imageUrl="/village2.png" opacity={0.08} />
      {aboutUsData.map((item, index) => (
        <div
          key={index}
          className="about-section-item flex flex-col lg:flex-row lg:justify-around md:flex-col w-full lg:pt-8 mt-[200px] min-[768px]:mt-[150px] lg:mt-8"
        >
          <div
            ref={(el) => {imageRefs.current[index] = el}}
            className="flex-1 w-full lg:w-1/2 lg:pr-10 pb-10 flex justify-center lg:justify-center items-center relative"
          >
            <div className="relative px-10">
              <div className="relative z-30 h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] overflow-hidden border-gray-300 rounded-[5px] group">
                <div className="image-inner w-full h-full">
                  <Image
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    height={500}
                    width={500}
                    className="w-full h-full rounded-md object-cover"
                    unoptimized
                    priority
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-0 h-full bg-white bg-opacity-20 transform group-hover:w-full transition-all duration-500 ease-in-out"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pl-2 pr-2 flex-1 w-full lg:w-1/2 text-start">
            <div ref={(el) => {iconRefs.current[index] = el}}>
              <GiBullHorns className="w-auto text-3xl text-green-700 mb-3 pl-2 pr-2" />
            </div>

            <span
              ref={(el) => {subtitleRefs.current[index] = el}}
              className="pl-2 pr-2 text-sm text-[#687469] uppercase font-semibold"
            >
              get to know about us
            </span>

            <h2
              ref={(el) => {titleRefs.current[index] = el}}
              className="text-4xl lg:text-5xl font-bold text-[#334b35] mt-2 max-w-xl pl-2 pr-2"
            >
              {item.name}
            </h2>

            <p
              ref={(el) => {headingRefs.current[index] = el}}
              className="mt-5 pl-2 pr-2 text-xl text-[#687469]"
            >
              {item.extra_data.heading}
            </p>

            <p
              ref={(el) => {descriptionRefs.current[index] = el}}
              className="space-y-3 mb-8 pt-5 pl-2 pr-2 text-[18px] text-[#334b35]"
            >
              {item.extra_data.description}
            </p>

            <div className="flex items-center pl-2 pr-2">
              <Link
                ref={(el) => {buttonRefs.current[index] = el}}
                href="/about_us#about"
                scroll={true}
                className="relative text-center p-3 lg:w-[150px] lg:h-[50px] bg-green-300 text-green-800 font-semibold rounded-md overflow-hidden group cursor-pointer flex items-center justify-center"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Learn more
                </span>
                <div className="absolute inset-0 bg-green-800 transform -translate-x-[-145px] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUsSection;
