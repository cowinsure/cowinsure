'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExtraData {
  heading: string;
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

const WhyInvestWithUs: React.FC = () => {
  const [whyInvestData, setWhyInvestData] = useState<BaseCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const titleDescRef = useRef<HTMLParagraphElement | null>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);
  

  useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`);
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === 'success') {
          const whyInvestCategory = result.data.find(category => category.name === 'why Invest With Us');
          if (whyInvestCategory) {
            fetchBaseCards(whyInvestCategory.id);
          } else{
            setIsLoading(false)
          }
        } else{
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching base categories:', error);
        setIsLoading(false)
      }
    };

    const fetchBaseCards = async (categoryId: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-category/${categoryId}/base-cards/`);
        const result: BaseCardApiResponse = await response.json();
        if (result.status === 'success') {
          setWhyInvestData(result.data);
        }
      } catch (error) {
        console.error('Error fetching base cards:', error);
      } finally{
        setIsLoading(false)
      }
    };

    fetchBaseCategories();
  }, []);

  useEffect(()=>{
    if(!isLoading && whyInvestData.length>0){
       const ctx = gsap.context(()=>{
        gsap.set([iconRef.current, subtitleRef.current, titleRef.current, titleDescRef.current], {
          opacity: 0,
          y: -100
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
          },});
        tl.to(iconRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        });
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          delay: 0.35,
          ease: "power2.out",
        },
        "-=0.5"
      );
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          delay: 0.35,
          ease: "power2.out",
        },
        "-=0.5"
      );
        tl.to(titleDescRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          delay: 0.35,
          ease: "power2.out",
        },
        "-=0.5"
      );
        tl.to(swiperRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        "-=0.3"
      );
        tl.to(cardRefs.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25,
          delay: 0.5,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.5,
            from: "start",
          },
        },
        "-=0.5"
      );
        tl.to(descriptionRefs.current, {
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
        "-=0.5"
      );
       }, containerRef);
       return () => ctx.revert();
    }
  },[isLoading,whyInvestData]);

    if (isLoading) {
    return (
      <div className="flex flex-col mt-10 justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-[700px] h-auto p-5">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading investing reasons...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-auto h-auto p-5'>
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl text-center w-full">
        <div ref={iconRef}>
          <GiBullHorns className='lg:w-auto w-full text-2xl text-start text-green-700 mb-2' />
        </div>
        <h2 ref={subtitleRef} className="text-xl font-bold text-[#687469] text-start mb-3">our goal</h2>
        <h1 ref={titleRef} className="lg:text-5xl text-2xl min-w-[150px] mb-5 font-bold text-[#334b35] text-start">Why Invest With Us</h1>
        <p ref={titleDescRef} className='text-center font-semibold text-gray-500 mb-10 text-xl lg:text-2xl lg:max-w-[800px]'>
          Our end-to-end value-chain approach unlocks concrete growth opportunities.
        </p>
      </div>
      <div ref={swiperRef} className='w-full'>
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
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="w-full"
      >
        {whyInvestData.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div ref={(el) => { cardRefs.current[index] = el }}
              className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto">
              <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex justify-center items-center">
                  </div>
                </div>
            </div>
            <div ref={(el) => {descriptionRefs.current[index] = el}} className='text-start mt-2'>
              <h1 className="lg:text-2xl text-xl min-w-[150px] mb-2 font-bold text-[#334b35] text-start">{item.extra_data.heading}</h1>
              <p className='text-start font-semibold text-gray-500 text-xl'>
                {item.extra_data.short_description}
              </p>
            </div>
            
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>
  );
};

export default WhyInvestWithUs;
