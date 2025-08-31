"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { GiBullHorns } from "react-icons/gi";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParentProps {
  serviceName: string;
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
  short_description: string;
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

const OurServicesCommon = ({ serviceName }: ParentProps) => {
  const [services, setServices] = useState<BaseCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const titleDescRef = useRef<HTMLParagraphElement | null>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Memoize the fetch functions to prevent unnecessary re-renders
  const fetchBaseCards = useCallback(async (categoryId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/base-category/${categoryId}/base-cards/`
      );
      const result: BaseCardApiResponse = await response.json();
      if (result.status === "success") {
        console.log(result.data[0]?.image_url);
        setServices(result.data);
      }
    } catch (error) {
      console.error("Error fetching base cards:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchBaseCategories = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`
      );
      const result: BaseCategoryApiResponse = await response.json();
      if (result.status === "success") {
        const partnersCategory = result.data.find(
          (category) => category.name === serviceName
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
  }, [serviceName, fetchBaseCards]);

  // Fixed: Added proper dependency array with serviceName
  useEffect(() => {
    fetchBaseCategories();
  }, [fetchBaseCategories]);

  // Fixed: Only run animation once when data is loaded
  useEffect(() => {
    if (!isLoading && services.length > 0 && !hasAnimated) {
      const ctx = gsap.context(() => {
        // Set initial states
        gsap.set(
          [
            iconRef.current,
            subtitleRef.current,
            titleRef.current,
            titleDescRef.current,
          ],
          {
            opacity: 0,
            y: -100,
          }
        );

        gsap.set(swiperRef.current, {
          opacity: 0,
          x: -100,
        });

        gsap.set(cardRefs.current, {
          opacity: 0,
          y: 50,
          scale: 0.8,
        });

        gsap.set(descriptionRefs.current, {
          opacity: 0,
          y: 50,
          scale: 0.8,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          onComplete: () => setHasAnimated(true), // Prevent re-animation
        });

        tl.to(iconRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        })
          .to(
            subtitleRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.2"
          )
          .to(
            titleRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.2"
          )
          .to(
            titleDescRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.2"
          )
          .to(
            swiperRef.current,
            {
              opacity: 1,
              x: 0,
              duration: 0.25,
              ease: "power2.out",
            },
            "-=0.1"
          )
          .to(
            cardRefs.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.25,
              ease: "back.out(1.7)",
              stagger: {
                amount: 0.5,
                from: "start",
              },
            },
            "-=0.2"
          )
          .to(
            descriptionRefs.current,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.25,
              ease: "back.out(1.7)",
              stagger: {
                amount: 0.5,
                from: "start",
              },
            },
            "-=0.4"
          );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isLoading, services.length, hasAnimated]); // Changed dependency to services.length instead of services array

  // Reset animation state when serviceName changes
  useEffect(() => {
    setHasAnimated(false);
    setServices([]);
    setIsLoading(true);
  }, [serviceName]);

  if (isLoading) {
    return (
      <div className="relative flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-[700px] h-auto p-5">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Services...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full py-10 px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col justify-center items-center text-center mb-12">
          <div ref={iconRef}>
            <GiBullHorns className="text-2xl text-green-700 mb-2" />
          </div>
          <h2
            ref={subtitleRef}
            className="text-xl font-bold text-[#687469] mb-3"
          >
            Services
          </h2>
          <h1
            ref={titleRef}
            className="text-3xl lg:text-5xl font-bold text-[#334b35] mb-5"
          >
            What We Offer
          </h1>
          <p
            ref={titleDescRef}
            className="text-center font-semibold text-gray-500 text-lg lg:text-xl max-w-3xl"
          >
            Our services are tailored to overcome challenges.
          </p>
        </div>

        {/* Swiper Section */}
        <div ref={swiperRef} className="w-full">
          <Swiper
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 1, spaceBetween: 30 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
            loop={true}
            pagination={{ clickable: false }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Navigation, Autoplay]}
            className="w-full !pb-4"
          >
            {services.map((s, index) => (
              <SwiperSlide key={s.id} className="h-auto">
                <div className="flex flex-col h-full">
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="mb-4"
                  >
                    <div className="relative w-full cursor-pointer group">
                      <Image
                        src={s.image_url || "/placeholder.svg"}
                        alt={s.name}
                        className="rounded-md object-cover w-full h-48 lg:h-56"
                        width={300}
                        height={224}
                        unoptimized
                        priority
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg flex justify-center items-center">
                        <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          +
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    ref={(el) => {
                      descriptionRefs.current[index] = el;
                    }}
                    className="flex-1 text-left"
                  >
                    <h3 className="text-xl lg:text-2xl font-bold text-[#334b35] mb-2 line-clamp-2">
                      {s.name}
                    </h3>
                    <p className="text-gray-500 font-medium text-base lg:text-md line-clamp-5">
                      {s.extra_data.short_description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default OurServicesCommon;
