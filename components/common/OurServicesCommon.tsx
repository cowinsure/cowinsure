'use client'
import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image, {  } from 'next/image';
import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi';

interface ParentProps {

    serviceName: string,
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



const OurServicesCommon = ({ serviceName}: ParentProps) => {

    
//   const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);
  const [services, setServices] = useState<BaseCard[]>([]);

 useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-categories/`);
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === 'success') {
          const partnersCategory = result.data.find(category => category.name === serviceName);
          if (partnersCategory) {
            fetchBaseCards(partnersCategory.id);
          }
        }
      } catch (error) {
        console.error('Error fetching base categories:', error);
      }
    };

    const fetchBaseCards = async (categoryId: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/base-category/${categoryId}/base-cards/`);
        const result: BaseCardApiResponse = await response.json();
        if (result.status === 'success') {
            console.log(result.data[0].image_url);
            
            setServices(result.data);
        }
      } catch (error) {
        console.error('Error fetching base cards:', error);
      }
    };

    fetchBaseCategories();
  }, );




  return (
    <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-auto h-auto p-5'>
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl text-center w-full">
        <GiBullHorns className='lg:w-auto w-full text-2xl text-start text-green-700 mb-2' />
        <h2 className="text-xl font-bold text-[#687469] text-start mb-3">Services</h2>
        <h1 className="lg:text-5xl text-2xl min-w-[150px] mb-5 font-bold text-[#334b35]  text-start">What We Offer</h1>
        <p className='text-center font-semibold text-gray-500 mb-10 text-xl lg:text-2xl lg:max-w-[80vh]'>
            Our services are tailored to overcome challenges.
        </p>
      </div>
      
     

      <Swiper
      // centeredSlides={true}
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
        className=" w-full lg:h-auto justify-center items-center lg:justify-center lg:items-center"
      >
        {services.map((s, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex-col lg:w-auto lg:h-auto cursor-pointer group">
              <Image
              src={s.image_url}
              alt="Profile"
              className="rounded-md object-cover w-full h-48"
              width={300}
              height={200}
              unoptimized
              priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-md flex justify-center items-center">
              <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
              </div>
            </div>

            <div className='text-start'>
            <h1 className="lg:text-2xl text-xl min-w-[150px] my-2  font-bold text-[#334b35]  text-start">{s.name}</h1>
        <p className='text-start font-semibold text-gray-500  text-xl '>
        {s.extra_data.short_description}

            </p>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
{/* 
      {selectedImage && (
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
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default OurServicesCommon;
