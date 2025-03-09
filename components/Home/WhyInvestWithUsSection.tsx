'use client'
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi';

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

  useEffect(() => {
    const fetchBaseCategories = async () => {
      try {
        const response = await fetch('http://52.66.196.177:8000/api/v1/base-categories/');
        const result: BaseCategoryApiResponse = await response.json();
        if (result.status === 'success') {
          const whyInvestCategory = result.data.find(category => category.name === 'why Invest With Us');
          if (whyInvestCategory) {
            fetchBaseCards(whyInvestCategory.id);
          }
        }
      } catch (error) {
        console.error('Error fetching base categories:', error);
      }
    };

    const fetchBaseCards = async (categoryId: string) => {
      try {
        const response = await fetch(`http://52.66.196.177:8000/api/v1/base-category/${categoryId}/base-cards/`);
        const result: BaseCardApiResponse = await response.json();
        if (result.status === 'success') {
          setWhyInvestData(result.data);
        }
      } catch (error) {
        console.error('Error fetching base cards:', error);
      }
    };

    fetchBaseCategories();
  }, []);

  return (
    <div className='container mx-auto flex flex-col justify-center items-center lg:flex-col lg:justify-center lg:items-center w-full lg:h-auto h-auto p-5'>
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl text-center w-full">
        <GiBullHorns className='lg:w-auto w-full text-2xl text-start text-green-700 mb-2' />
        <h2 className="text-xl font-bold text-[#687469] text-start mb-3">our goal</h2>
        <h1 className="lg:text-5xl text-2xl min-w-[150px] mb-5 font-bold text-[#334b35] text-start">Why Invest With Us</h1>
        <p className='text-center font-semibold text-gray-500 mb-10 text-xl lg:text-2xl lg:max-w-[800px]'>
          Our full value-chain model offers tangible growth opportunities
        </p>
      </div>

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
        {whyInvestData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex-col lg:w-auto lg:h-auto cursor-pointer group">
              <Image
              src={item.image_url}
              alt={item.name}
              className="rounded-md object-cover w-full h-48"
              width={300}
              height={200}
              unoptimized
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-md flex justify-center items-center">
              {/* <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span> */}
              </div>
            </div>
            <div className='text-start'>
              <h1 className="lg:text-2xl text-xl min-w-[150px] mb-5 font-bold text-[#334b35] text-start">{item.extra_data.heading}</h1>
              <p className='text-start font-semibold text-gray-500 text-xl'>
                {item.extra_data.short_description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WhyInvestWithUs;
