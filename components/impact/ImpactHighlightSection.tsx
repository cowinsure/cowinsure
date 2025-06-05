'use client'

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { GiBullHorns } from 'react-icons/gi'

import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

if(typeof window !== 'undefined'){
  gsap.registerPlugin(ScrollTrigger)
}

interface ExtraData{
    value: string;
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

const ImpactHighlightSection: React.FC = () => {
      const [impactHighlightSection, setImpactHighlightSection] = useState<BaseCard[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const containerRef = useRef<HTMLDivElement>(null)
      const iconRef = useRef<HTMLDivElement>(null)
      const subtitleRef = useRef<HTMLHeadingElement>(null)
      const titleRef = useRef<HTMLHeadingElement>(null)
      const descriptionRef = useRef<HTMLParagraphElement>(null)
      const cardsContainerRef = useRef<HTMLDivElement>(null)
      const cardRefs = useRef<(HTMLDivElement | null)[]>([])
      useEffect(()=>{
        const fetchBaseCategories = async()=>{
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`);
            const result: BaseCategoryApiResponse = await response.json();
            if (result.status==='success'){
              const impactHighlightSectionCategory = result.data.find(category => category.name === 'Impact Scoring');
              if(impactHighlightSectionCategory){
                fetchBaseCards(impactHighlightSectionCategory.id);
              }
            }
          }catch(error){
            console.error("Error fetching base categories: ",error);
            setIsLoading(false);
          }
        };
        const fetchBaseCards = async(categoryId: string) => {
          try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-category/${categoryId}/base-cards/`);
            const result: BaseCardApiResponse = await response.json();
            if(result.status === 'success'){
              setImpactHighlightSection(result.data);
            }
          } catch(error){
            console.error('Error fetching base cards: ',error);
          } finally{
            setIsLoading(false);
          }
        };
        fetchBaseCategories();
        },
      []);

      useEffect(()=>{
        if(!isLoading && impactHighlightSection.length > 0){
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
      }, [isLoading,impactHighlightSection])
        if (isLoading) {
    return (
      <section className="pt-[50vh] pb-[50vh] h-auto lg:h-auto flex flex-col lg:flex-col lg:justify-start lg:items-center items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading InsureCow Impact...</p>
        </div>
      </section>
    );
  }

    return (
        <div ref={containerRef} className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center py-20'>

            <div className="max-w-4xl text-center">
                <div ref={iconRef}>
                  <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />
                </div>

                <h2 ref={subtitleRef} className="text-xl font-bold text-[#687469]">Impact Scoring</h2>
                <h1 ref={titleRef} className="text-5xl font-bold text-[#334b35]">InsureCow Impact</h1>

            </div>

            <p ref={descriptionRef} className='text-center font-semibold text-gray-500 mt-10 text-2xl lg:max-w-[80vh]'>
                While ensuring access to finance, resources, and markets, we remain driven by our mission to place simplified agriculture in the hands of every farmer. 

            </p>

            <div ref={cardsContainerRef} className='rounded-lg flex flex-col justify-center items-center gap-2 lg:gap-14 lg:flex-row lg:justify-center lg:items-center p-2'>


            {impactHighlightSection.map((item,index)=>(
                <>
                <div
                key={index}
                ref={(el) => {cardRefs.current[index] = el}}
                className="mt-20 w-auto max-w-md md:max-w-lg lg:max-w-xl cursor-pointer shadow-lg rounded-lg flex flex-col items-center justify-center"
              >
                {/* Image container */}
                <div className="relative w-auto h-56 sm:h-72 md:h-80 lg:h-[45vh] overflow-hidden rounded-lg">
                  <Image
                    src={item.image_url}
                    alt="Profile"
                    height={300}
                    width={200}
                    objectFit="cover" // legacy prop, adapt if you're on Next 13+
                    className="rounded-lg object-cover w-full h-full"
                  />
                  {/* Overlay for text */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-end justify-end p-4 sm:p-5">
                    <div className="w-full text-start font-bold text-2xl sm:text-3xl text-white">
                      {item.extra_data.value}
                    </div>
                    <div className="w-full text-start font-bold text-xl sm:text-2xl text-white">
                      {item.name}
                    </div>
                    <div className="w-auto text-white font-bold text-sm sm:text-base pb-4">
                      {item.extra_data.description}
                    </div>
                  </div>
                </div>
              </div>
                </>
            ))} 
            

            </div>



        </div>
    )
}
export default ImpactHighlightSection
