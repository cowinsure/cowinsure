'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import BackgroundImageLayer from '../common/BackgroundImageLayer';
import farm from '@/public/Farm.png'

if(typeof window !== 'undefined'){
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryData {
  id: number;
  title: string;
  image_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: GalleryData[];
}

const GallerySection = () => {
  const [galleryData, setGalleryData] = useState<GalleryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const swiperRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery/`);
        const result: ApiResponse = await response.json();
        if (result.status === 'success') {
          setGalleryData(result.data);
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally{
        setIsLoading(false)
      }
    };

    fetchGalleryData();
  }, []);

  useEffect(() => {
    if(!isLoading && galleryData.length > 0) {
      const ctx = gsap.context(()=>{
        gsap.set([iconRef.current, subtitleRef.current, titleRef.current],{
          y: -100,
          opacity: 0,
        });
        gsap.set(swiperRef.current, {
          x: -100,
          opacity: 0,
        }
        );
        gsap.set(cardRefs.current, {
          y: 50,
          scale: 0.1,
          opacity: 0,
        });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });
      tl.to(iconRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });
      tl.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        delay: 0.5,
        ease: "power2.out",
      },
    "-=0.5"
  );
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        delay: 0.5,
        ease: "power2.out",
      },
    "-=0.5"
  );

      tl.to(
          swiperRef.current,
          {
            duration: 0.25,
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
              amount: 1, // Total time to stagger all cards
              from: "start", // Start from first card
            },
          },
          "-=0.5"
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [isLoading, galleryData]);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeOverlay = () => {
    setSelectedImage(null);
  };

    if (isLoading) {
    return (
      <div className="container mt-8 mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-[700px] h-auto p-5">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className='relative container mx-auto mt-20 flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-[70vh] h-auto p-5'>
      <BackgroundImageLayer imageUrl={farm.src} opacity={0.1} position='bottom' size='70%' />
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl text-center w-full">
        <div ref={iconRef}><GiBullHorns className='lg:w-auto w-full text-2xl text-start text-green-700 mb-2' /></div>
        <h2 ref={subtitleRef} className="text-xl font-bold text-[#687469] text-start mb-3">organic food</h2>
        <h1 ref={titleRef} className="lg:text-5xl text-2xl min-w-[150px] font-bold text-[#334b35] mb-10 text-start">Watch Our Gallery</h1>
      </div>

      <div ref={swiperRef} className='max-[767px]:w-[85%] w-full mt-10 mb-20'>
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
        className="flex-1 w-full lg:h-auto justify-center items-center lg:justify-center lg:items-center"
      >
        {galleryData.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div ref={(el) => {cardRefs.current[index] = el}} className="relative mt-2 mb-5 mr-3 ml-3 shadow-lg shadow-gray-800 rounded-lg lg:w-auto lg:sh-auto cursor-pointer group" onClick={() => handleImageClick(item.image_url)}>
              <Image
              src={item.image_url}
              alt={item.title}
              objectFit='cover'
              className="rounded-md object-cover"
              width={500}
              height={300}
              unoptimized={true} // Add this line to bypass Next.js image optimization
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-md flex justify-center items-center">
              <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper></div>

      {selectedImage && (
        <>
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
        </>
      )}
    </div>
  );
};

export default GallerySection;
