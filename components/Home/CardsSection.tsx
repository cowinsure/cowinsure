"use client";
import { useEffect, useState, useRef } from "react";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { GiBullHorns } from "react-icons/gi";
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

const CardsSection: React.FC = () => {
  const [whatWeOfferData, setWhatWeOfferData] = useState<BaseCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`
        );
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === "success") {
          const whatWeOfferCategory = result.data.find(
            (category) => category.name === "What We Offer - Home Section"
          );
          if (whatWeOfferCategory) {
            await fetchBaseCards(whatWeOfferCategory.id);
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
          setWhatWeOfferData(result.data);
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
    if (!isLoading && whatWeOfferData.length > 0) {
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
  }, [isLoading, whatWeOfferData]);

  if (isLoading) {
    return (
      <div className="min-h-[700px] relative flex items-center justify-center">
      <BackgroundImageLayer imageUrl='/village3.png' opacity={0.1} size="80%"/>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative py-10">
      <BackgroundImageLayer imageUrl='/village3.png' opacity={0.1} size="80%"/>
      <div className="flex flex-col justify-center items-center text-center w-full pt-10 mb-10">
        <div ref={iconRef}>
          <GiBullHorns className="lg:w-auto w-full text-2xl text-start text-green-700 mb-2" />
        </div>
        <h2
          ref={subtitleRef}
          className="text-xl font-bold text-[#687469] text-start mb-3"
        >
          Services
        </h2>
        <h1
          ref={titleRef}
          className="lg:text-5xl text-2xl min-w-[150px] font-bold text-[#334b35] text-start"
        >
          What we offer
        </h1>
      </div>

      <div
        ref={cardsContainerRef}
        className="p-5 min-h-[300px] h-auto lg:h-auto flex justify-center items-center overflow-auto lg:items-center lg:justify-center flex-col mt-14 mb-20 lg:mt-14 lg:mb-20 lg:flex-row w-full lg:w-auto gap-8 lg:px-24"
      >
        {whatWeOfferData.length > 0 ? (
          whatWeOfferData.map((item, index) => (
            <Link
              href={item.extra_data.url}
              key={index}
              ref={(el) => {cardRefs.current[index] = el}}
              className="rounded-md relative h-[300px] lg:h-[300px] w-full group cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={item.image_url || "/placeholder.svg"}
                alt={item.name}
                fill
                className="rounded-lg object-cover"
              />

              <div className="absolute inset-0 rounded-lg group-hover:bg-black/50 transition duration-500 bg-black/20 flex justify-start items-start"></div>

              <div className="absolute inset-0 lg:bottom-10 flex justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-green-900 text-white p-4 rounded-lg cursor-pointer transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  Learn More
                </div>
              </div>

              <div className="absolute inset-0 top-16 left-10 rounded-lg bg-opacity-50 flex justify-start items-start">
                <div className="flex flex-col space-y-4 text-start group-hover:opacity-15 transition-opacity duration-300">
                  <h2 className="text-white text-xl font-light italic">
                    {item.extra_data.heading}
                  </h2>
                  <h2 className="text-white text-2xl lg:text-3xl font-bold">
                    {item.name}
                  </h2>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-400 text-center">No services available</div>
        )}
      </div>
    </div>
  );
};

export default CardsSection;
