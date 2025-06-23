"use client";
import { useEffect, useState, useRef } from "react";
import type React from "react";
import { GiBullHorns } from "react-icons/gi";
import Image from "next/image";
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
  type: string;
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

const HomeInsuranceSection: React.FC = () => {
  const [insuranceSection, setInsuranceSection] = useState<BaseCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`
        );
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === "success") {
          const insuranceSectionCategory = result.data.find(
            (category) => category.name === "Insurance Preview Section"
          );
          if (insuranceSectionCategory) {
            await fetchBaseCards(insuranceSectionCategory.id);
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
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
          setInsuranceSection(result.data);
        }
      } catch (error) {
        console.error("Error fetching base cards: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBaseCategories();
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!isLoading && insuranceSection.length > 0) {
      const ctx = gsap.context(() => {
        // Set initial states
        // Header elements (icon, subtitle, title) start from top (-100px) and invisible
        gsap.set([iconRef.current, subtitleRef.current, titleRef.current], {
          y: -100,
          opacity: 0,
        });

        // Cards container starts from left (-100px) and invisible
        gsap.set(cardsContainerRef.current, {
          x: -100,
          opacity: 0,
        });

        // Individual cards start invisible and scaled down
        gsap.set(cardRefs.current, {
          opacity: 0,
          scale: 0.8,
          y: 50,
        });

        // Create timeline for sequential animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            // markers: true,
          },
        });

        // Icon animation - falls from top
        tl.to(iconRef.current, {
          duration: 0.35,
          y: 0,
          opacity: 1,
          ease: "power2.out",
        });

        // Subtitle animation - falls from top
        tl.to(
          subtitleRef.current,
          {
            duration: 0.35,
            delay: 0.35,
            y: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.5"
        );

        // Title animation - falls from top
        tl.to(
          titleRef.current,
          {
            duration: 0.35,
            delay: 0.35,
            y: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.5"
        );

        // Cards container animation - slides from left
        tl.to(
          cardsContainerRef.current,
          {
            duration: 0.5,
            x: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.3"
        );

        // Individual cards animation - staggered appearance
        tl.to(
          cardRefs.current,
          {
            duration: 0.25,
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "back.out(1.7)",
            stagger: {
              amount: 0.5, // Total time to stagger all cards
              from: "start", // Start from first card
            },
          },
          "-=0.5"
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isLoading, insuranceSection]);

  if (isLoading) {
    return (
      <section className="pt-[40vh] pb-[35vh] h-auto lg:h-auto flex flex-col lg:flex-col lg:justify-start lg:items-center items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading insurance options...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative pt-[10vh] pb-[10vh] h-auto lg:h-auto flex flex-col lg:flex-col lg:justify-start lg:items-center items-center justify-center bg-white"
    >
      <BackgroundImageLayer imageUrl="/insuranceBG.png" size="70%"/>
      <div className="max-w-4xl text-center">
        <div ref={iconRef}>
          <GiBullHorns className="w-full lg:text-3xl text-xl text-center text-green-700 mb-2" />
        </div>

        <div>
          <h2
            ref={subtitleRef}
            className="text-sm lg:text-xl font-bold text-[#687469] mb-2"
          >
            Digital Insurance Solutions
          </h2>
          <h1
            ref={titleRef}
            className="lg:text-5xl text-3xl font-bold text-[#334b35]"
          >
            Simply compare, order, and get covered.
          </h1>
        </div>
      </div>

      <div
        ref={cardsContainerRef}
        className="mt-10 w-full h-auto container mx-auto flex flex-col gap-4 md:flex-row lg:flex-row items-center justify-center mb-5"
      >
        {insuranceSection.map((item, index) => (
          <div
            key={index}
            ref={(el) => {cardRefs.current[index] = el}}
            className="relative w-[350px] flex-col h-auto justify-center items-center group bg-gray-800 rounded-lg transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-[300px] rounded-lg bg-black overflow-hidden">
              <div className="absolute h-auto rounded-lg inset-0 bg-contain left-0 group-hover:-left-5 transition-all duration-700">
                <Image
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="rounded-lg object-cover object-center"
                  priority
                />
                <div className="absolute rounded-lg bg-green-300 bg-opacity-20 top-[-100%] z-30 right-0 w-full h-full group-hover:top-0 transition-all duration-700 ease-in-out overflow-hidden"></div>
              </div>
            </div>

            <Link
              href={item.extra_data.url}
              className="absolute bottom-0 left-0 right-0 z-50 mx-5 overflow-hidden group-hover:overflow-visible"
            >
              <div className="relative [transform:rotateX(120deg)] z-20 flex flex-col h-[80px] justify-center items-center rounded-t-lg text-2xl font-bold text-white opacity-0 group-hover:opacity-100 group-hover:[transform:rotateX(0deg)] transition-all duration-700">
                <div className="w-full flex flex-col justify-center bg-green-800 items-center h-full rounded-tr-lg">
                  <div className="text-center">{item.name}</div>
                </div>

                <div className="absolute left-0 top-[-32px] rounded-t-md">
                  <div className="bg-yellow-600 text-xs p-2 text-center text-black rounded-t-md">
                    {item.extra_data.type}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeInsuranceSection;
