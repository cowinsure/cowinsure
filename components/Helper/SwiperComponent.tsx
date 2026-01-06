"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
// import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { gsap } from "gsap";
import type { Swiper as SwiperType } from "swiper";

interface SliderData {
  id: number;
  title: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data: SliderData[];
  status: string;
}

const SwiperComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderData, setSliderData] = useState<SliderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/slider/`
        );
        const result: ApiResponse = await response.json();
        if (result.status === "success") {
          setSliderData(result.data);
        }
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  // GSAP animations for slide content
  useEffect(() => {
    if (!isLoading && sliderData.length > 0) {
      const ctx = gsap.context(() => {
        // Initial entrance animation for stats
        gsap.fromTo(
          statsRef.current,
          // {
          //   y: 100,
          //   opacity: 0,
          // },
          // {
          //   y: 0,
          //   opacity: 1,
          //   duration: 1.5,
          //   ease: "power2.out",
          //   delay: 2,
          // }

          // For development purpose
          {
            y: 0,
            opacity: 1,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            delay: 2,
          }
        );

        // Initialize all slides with proper starting positions
        sliderData.forEach((_, index) => {
          const titleElement = titleRefs.current[index];
          const lineElement = lineRefs.current[index];
          const buttonElement = buttonRefs.current[index];

          if (titleElement && lineElement && buttonElement) {
            // Set initial states for all slides
            gsap.set(titleElement, { y: 100, opacity: 0 });
            gsap.set(lineElement, { width: 0, opacity: 0 });
            gsap.set(buttonElement, { y: 30, opacity: 0 });
          }
        });

        // Animate the first slide immediately
        animateSlideContent(0);
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isLoading, sliderData]);

  // Function to animate slide content
  const animateSlideContent = (slideIndex: number) => {
    const titleElement = titleRefs.current[slideIndex];
    const lineElement = lineRefs.current[slideIndex];
    const buttonElement = buttonRefs.current[slideIndex];

    if (titleElement && lineElement && buttonElement) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // Reset positions for this slide
        gsap.set([titleElement, lineElement, buttonElement], {
          opacity: 0,
        });

        gsap.set(titleElement, { y: 100 });
        gsap.set(lineElement, { width: 0 });
        gsap.set(buttonElement, { y: 30 });

        // Animate in sequence
        tl.to(titleElement, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.5,
        })
          .to(
            lineElement,
            {
              width: "50%",
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
            },
            "-=0.5"
          )
          .to(
            buttonElement,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
            },
            "-=0.8"
          );
      });
      return ctx;
    }
  };

  // Animate slide content when slide changes
  useEffect(() => {
    if (sliderData.length > 0) {
      animateSlideContent(activeIndex);
    }
  }, [activeIndex, sliderData]);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[80vh] flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Loading slides...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[100vh]">
      {/* Navigation Buttons */}
      {/* <div className="absolute right-4 top-10 lg:right-16 lg:top-10 z-40 flex gap-3 lg:flex-col">
        <button
          ref={nextRef}
          className="group hover:border-white text-white p-2 lg:p-4 rounded-full border-2 border-gray-500/20 transition-all duration-300 hover:bg-white/10"
        >
          <HiMiniArrowLongLeft className="text-lg lg:text-xl hover:text-white text-gray-500 transition-colors duration-300" />
        </button>
        <button
          ref={prevRef}
          className="group hover:border-white text-white p-2 lg:p-4 rounded-full border-2 border-gray-500/20 transition-all duration-300 hover:bg-white/10"
        >
          <HiMiniArrowLongLeft className="text-lg lg:text-xl hover:text-white rotate-180 text-gray-500 transition-colors duration-300" />
        </button>
      </div> */}

      {/* Swiper Container */}
      <div className="relative">
        <Swiper
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            setTimeout(() => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            });
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          className="w-full h-[60vh] md:h-[70vh] lg:h-[90vh] bg-black"
        >
          {sliderData.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.image_url || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  quality={75}
                  priority={index === 0}
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4 pb-20">
                  <p
                    ref={(el) => {
                      titleRefs.current[index] = el;
                    }}
                    className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl leading-tight"
                  >
                    {slide.title}
                  </p>

                  <div
                    ref={(el) => {
                      lineRefs.current[index] = el;
                    }}
                    className="h-1 bg-white mb-8 opacity-0"
                  />

                  <div
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    className="opacity-0 z-20 relative"
                  >
                    <Link
                      href="/project"
                      className="relative inline-flex items-center justify-center px-8 py-4 bg-green-300 text-green-800 font-bold text-lg rounded-md overflow-hidden group transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Discover Now
                      </span>
                      <div className="absolute inset-0 bg-green-800 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Statistics Section - Now properly responsive */}
      <div
        ref={statsRef}
        className="relative mt-[-22] min-[768px]:mt-[-64] z-10 px-4 md:px-8 lg:px-20 opacity-0"
      >
        <div className="bg-gradient-to-tr from-[#f6eec7] via-[#ffffff] to-[#f6eec7] rounded-lg shadow-lg overflow-hidden lg:max-w-[1450px] lg:h-40 mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 h-full">
            {/* Farmers Impacted */}
            <div className="p-6 text-center border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center justify-center">
              <h3 className="font-normal text-lg lg:text-xl text-green-700/70 mb-2">
                Farmers Impacted
              </h3>
              <p className="text-2xl lg:text-4xl text-green-950/70 font-semibold">
                7,500+
              </p>
              {/* <small className="text-sm text-green-700/70">
                MSME Farms and Farmers
              </small> */}
            </div>

            {/* Livestock Registered */}
            <div className="p-6 text-center border-b md:border-b-0 lg:border-r border-gray-200 flex flex-col items-center justify-center">
              <h3 className="font-normal text-lg lg:text-xl text-green-700/70 mb-2">
                Livestock Registered
              </h3>
              <p className="text-2xl lg:text-4xl text-green-950/70 font-semibold">
                16,500+
              </p>
              {/* <small className="text-sm text-green-700/70">
                Cattle Registered
              </small> */}
            </div>

            {/* Fraudulent Claims */}
            <div className="p-6 text-center border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col items-center justify-center">
              <h3 className="font-normal text-lg lg:text-xl text-green-700/70 mb-2">
                Fraudulent Claims
              </h3>
              <p className="text-2xl lg:text-4xl text-green-950/70 font-semibold">0</p>
              {/* <small className="text-sm text-green-700/70">False Claims</small> */}
            </div>

            {/* Capacity Building */}
            <div className="p-6 text-center flex flex-col items-center justify-center">
              <h3 className="font-normal text-lg lg:text-xl text-green-700/70 mb-2">
                Capacity Building
              </h3>
              <p className="text-2xl lg:text-4xl text-green-950/70 font-semibold">
                2,000+
              </p>
              {/* <small className="text-sm text-green-700/70">Farmers Trained</small> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperComponent;
