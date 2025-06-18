'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GiBullHorns } from 'react-icons/gi';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if(typeof window !== 'undefined'){
  gsap.registerPlugin(ScrollTrigger)
}

interface ExtraData {
  url: string;
  date: string;
  headline: string;
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

const FeaturedNewsSection: React.FC = () => {
    const [newsData, setNewsData] = useState<BaseCard[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLDivElement>(null)
    const subtitleRef = useRef<HTMLHeadingElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const cardsContainerRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])
  
  const [visibleItems, setVisibleItems] = useState(4);


  useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`);
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === 'success') {
          const newsCategory = result.data.find(category => category.name === 'news');
          if (newsCategory) {
            fetchBaseCards(newsCategory.id);
          }
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
          setNewsData(result.data);
        }
      } catch (error) {
        console.error('Error fetching base cards:', error);
      } finally{
        setIsLoading(false)
      }
    };

    fetchBaseCategories();
  }, []);

  const showMoreItems = () => {
    setVisibleItems((prev) => prev + 4);
  };
        useEffect(()=>{
        if(!isLoading && newsData.length > 0){
          const ctx = gsap.context(()=>{
            gsap.set([iconRef.current,subtitleRef.current,titleRef.current, descriptionRef.current],{
              y: -100,
              opacity: 0,
            });
            gsap.set(cardsContainerRef.current, {
              x: -100,
              opacity: 0,
            });
            gsap.set(cardRefs.current,{
              y: 50,
              scale: 0.5,
              opacity: 0,
            });
            const tl = gsap.timeline({
            scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
            });
            tl.to([iconRef.current,subtitleRef.current,titleRef.current,descriptionRef.current], {
          duration: 0.5,
          y: 0,
          opacity: 1,
          ease: "power2.out",
          stagger: {
              amount: 0.5, // Total time to stagger all cards
              from: "start", // Start from first card
            },
        });
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
        tl.to(
          cardRefs.current,
          {
            duration: 0.5,
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
          }, containerRef)
          return () => ctx.revert();
        }
      }, [isLoading,newsData])
    
      if (isLoading) {
    return (
      <section className="pt-[50vh] pb-[50vh] h-auto lg:h-auto flex flex-col lg:flex-col lg:justify-start lg:items-center items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading News...</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="w-full container mx-auto py-8 flex flex-col items-center space-y-10">
      <div className="max-w-4xl text-center">
        <div ref={iconRef}>
          <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />
        </div>
        <h2 ref={subtitleRef} className="text-xl font-bold text-[#687469]">Strength and Vision</h2>
        <h1 ref={titleRef} className="text-5xl font-bold text-[#334b35]">Featured News</h1>
      </div>
      <p ref={descriptionRef} className='text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[800px]'>
      InsureCow connects investors with smallholder farmers for sustainable growth and food security
      </p>
      <div ref={cardsContainerRef} className="w-full p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.slice(0, visibleItems).map((news, index) => (
          <Link ref={(el) => {cardRefs.current[index] = el}} href={news.extra_data.url} key={index} className="relative bg-white p-20 rounded-lg shadow-md overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center -right-full group-hover:right-0 transition-all duration-500">
              <Image
                src={news.image_url}
                alt={news.name}
                layout="fill"
                objectFit="cover"
                objectPosition='center'
                className="rounded-lg w-full h-full"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 rounded-md flex justify-center items-center"></div>
            <div className="relative z-10 group-hover:visible">
              <h3 className="text-2xl font-semibold mb-2 text-white">{news.extra_data.headline}</h3>
              <p className="text-white mb-4">{news.name}</p>
              <p className="text-white text-sm">{news.extra_data.date}</p>
            </div>
          </Link>
        ))}
      </div>
      {visibleItems < newsData.length && (
        <div className="text-center mt-6">
          <button
            onClick={showMoreItems}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedNewsSection;
