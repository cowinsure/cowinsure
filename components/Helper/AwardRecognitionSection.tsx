"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { GiBullHorns } from "react-icons/gi";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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

interface ExtraData {
  status?: string;
  event?: string;
  prize?: string;
  url: string;
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

const AwardRecognitionSection = () => {
  const [partners, setPartners] = useState<BaseCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`
        );
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === "success") {
          const partnersCategory = result.data.find(
            (category) => category.name === "Award"
          );
          if (partnersCategory) {
            fetchBaseCards(partnersCategory.id);
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching base categories:", error);
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
          setPartners(result.data);
        }
      } catch (error) {
        console.error("Error fetching base cards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBaseCategories();
  }, []);

  useEffect(() => {
    if (!isLoading && partners.length > 0) {
      const ctx = gsap.context(() => {
        // Set initial states
        // Header elements (icon, subtitle, title) start from top (-100px) and invisible
        gsap.set([iconRef.current, subtitleRef.current, titleRef.current], {
          y: -100,
          opacity: 0,
        });

        // Swiper container starts from left (-100px) and invisible
        gsap.set(swiperRef.current, {
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
          ease: "bounce.out",
        });

        // Subtitle animation - falls from top
        tl.to(
          subtitleRef.current,
          {
            duration: 0.35,
            y: 0,
            opacity: 1,
            delay: 0.5,
            ease: "bounce.out",
          },
          "-=0.5"
        );

        // Title animation - falls from top
        tl.to(
          titleRef.current,
          {
            duration: 0.35,
            y: 0,
            opacity: 1,
            delay: 0.5,
            ease: "bounce.out",
          },
          "-=0.5"
        );

        // Swiper container animation - slides from left
        tl.to(
          swiperRef.current,
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
              amount: 1, // Total time to stagger all cards
              from: "start", // Start from first card
            },
          },
          "-=0.5"
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isLoading, partners]);

  if (isLoading) {
    return (
      <div className="flex flex-col mt-10 justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-[700px] h-auto p-5">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading awards...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className=" flex flex-col mt-10 justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-[700px] h-auto p-5"
    >
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl text-center w-full mb-2">
        <div ref={iconRef}>
          <GiBullHorns className="lg:w-auto w-full text-2xl text-start text-green-700 mb-2" />
        </div>
        <h2
          ref={subtitleRef}
          className="text-xl font-bold text-[#687469] text-start mb-3"
        >
          achivement
        </h2>
        <h1
          ref={titleRef}
          className="lg:text-5xl text-2xl min-w-[150px] font-bold text-[#334b35]  text-start"
        >
          Award & Recognitions
        </h1>
      </div>
      <div ref={swiperRef} className="w-full">
        <Swiper
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          spaceBetween={50}
          loop={true}
          pagination={{ clickable: false }}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className="flex-1 w-full lg:h-auto flex justify-center items-center lg:justify-center lg:items-center "
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={partner.id}>
              <div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              >
                <Link href={partner.extra_data.url} passHref>
                  <div className="relative flex justify-center h-[200px] items-center lg:w-auto lg:h-[300px] cursor-pointer group rounded-md bg-white">
                    <Image
                      src={partner.image_url}
                      alt={partner.name}
                      className="rounded-md object-fit"
                      width={300}
                      height={300}
                      priority
                    />
                    {/* <Link href={partner.extra_data.url} className='absolute  bottom-0 left-0 right-0 z-50 mx-5 overflow-hidden group-hover:overflow-visible'/> */}
                    <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-md flex flex-col justify-center items-center">
                      {partner.extra_data.event && (
                        <p className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {partner.extra_data.event}
                        </p>
                      )}
                      {partner.extra_data.status && (
                        <p className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {partner.extra_data.status}
                        </p>
                      )}
                      {partner.extra_data.prize && (
                        <p className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {partner.extra_data.prize}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative max-w-3xl max-h-3xl w-full h-full p-4">
            <button className="absolute top-2 right-2 text-white text-2xl" onClick={closeOverlay}>×</button>
            <Image
              src={selectedImage}
              alt="Selected"
              objectFit='contain'
              className="rounded-md"
              layout="responsive"
              width={800}
              height={600}
              unoptimized // Add this line to bypass Next.js image optimization
            />
          </div>
        </div>
      )} */}
      </div>
    </div>
  );
};

export default AwardRecognitionSection;
