'use client'
import React, { useEffect, useState } from 'react';
import { GiBullHorns } from 'react-icons/gi';
import Image from 'next/image';
import FaqSection from '@/components/Home/FaqSection';
import Link from 'next/link';
import WhyInvestWithUs from '@/components/Home/WhyInvestWithUsSection';
import { formatToBDT } from '@/utils/currencyFormatter';
import { FaArrowRightLong } from 'react-icons/fa6';
import CowPurchaseSlider from '@/components/Project/cowSellProject/CowPurchaseSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

interface Portfolio {
  id: string;
  name: string;
  location: string;
  investment_value: string;
  currency: string;
  investment_period: string;
  expected_return_min: string;
  expected_return_max: string;
  total_return_min: string;
  total_return_max: string;
  image_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Portfolio[];
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryApiResponse {
  status: string;
  message: string;
  data: Category[];
}

const Project = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/categories/`);
        const result: CategoryApiResponse = await response.json();
        if (result.status === 'success') {
          setCategories(result.data);
          const cowSellCategory = result.data.find(category => category.name === 'Short Term Investment');
          if (cowSellCategory) {
            fetchPortfolios(cowSellCategory.id);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchPortfolios = async (categoryId: string) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/category/${categoryId}/portfolios/`);
        const result: ApiResponse = await response.json();
        if (result.status === 'success') {
          setPortfolios(result.data);
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    };

    fetchCategories();
  }, []);

  const renderCard = (portfolio: Portfolio, index: number) => (
    <div key={index} className='relative w-full'>
      <div className='relative flex flex-col w-full h-[600px] justify-start items-center group bg-[#263c28] rounded-lg overflow-hidden'>
  
        {/* Image Section */}
        <div className='relative h-[200px] w-full rounded-t-lg overflow-hidden'>
          <div className='absolute h-full inset-0 bg-contain left-0 group-hover:-left-4 transition-all duration-700'>
            <Image
              src={portfolio.image_url}
              alt='cover'
              width={800}
              height={600}
              quality={50}
              loading="eager"
              unoptimized={true}
              priority
              objectPosition='top'
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className='absolute rounded-t-lg bg-green-800 bg-opacity-40 top-0 left-[50%] transform -translate-x-[50%] w-0 h-full group-hover:w-full transition-all duration-500 ease-in-out'></div>
          </div>
        </div>
  
        {/* Name Badge (Half above the image, half inside the card) */}
        <div className='absolute top-[150px] left-0 right-0 z-40 mx-5 flex justify-center'>
  <div
    className='relative flex flex-col h-[100px] w-[100px] justify-center items-center 
               bg-[rgb(38,60,40)] rounded-full text-2xl font-bold text-white
               shadow-[0_4px_10px_rgba(72,187,120,0.4)] group-hover:shadow-none
               transition-shadow duration-500'
  >
    <span className='z-40 group-hover:text-white text-center transition-all duration-500'>
      {portfolio.name}
    </span>
    <div className='absolute inset-0 flex justify-center items-center'>
      <div className='w-0 h-0 z-30 bg-yellow-500 rounded-full group-hover:w-full group-hover:h-full transition-all duration-500'></div>
    </div>
  </div>
</div>

  
        {/* Content */}
        <div className='flex flex-col w-full px-4 mt-24'>
  
          {/* Details */}
          <div className='flex flex-row justify-between py-2'>
            <div className='text-md text-white font-semibold'>Invest</div>
            <div className='text-white text-md font-bold'>{formatToBDT(parseInt(portfolio.investment_value))}</div>
          </div>
  
          <div className='flex flex-row justify-between py-2'>
            <div className='text-md text-white font-semibold'>Location</div>
            <div className='text-white text-md font-bold'>{portfolio.location}</div>
          </div>
  
          <div className='flex flex-row justify-between py-2'>
            <div className='text-md text-white font-semibold'>Period</div>
            <div className='text-white text-md font-bold'>{portfolio.investment_period}</div>
          </div>
  
          <div className='flex flex-row justify-between py-2'>
            <div className='text-md text-white font-semibold'>Return</div>
            <div className='text-white text-md font-bold'>{portfolio.expected_return_min}% - {portfolio.expected_return_max}%</div>
          </div>
  
          <div className='flex flex-row justify-between py-2'>
            <div className='text-md text-white font-semibold'>Total Return</div>
            <div className='text-white text-sm font-bold'>{formatToBDT(parseInt(portfolio.total_return_min))} - {formatToBDT(parseInt(portfolio.total_return_max))}</div>
          </div>
  
          {/* Button */}
          <div className='flex justify-center mt-6'>
            <Link href={`/project/project_details/${portfolio.id}`} className='flex justify-center items-center cursor-pointer'>
              <div className='relative flex h-[50px] w-[50px] justify-center items-center bg-yellow-500 rounded-full text-2xl text-white group-hover:bg-white transition-all duration-500'>
                <span className='z-50 group-hover:text-green-800 transition-all duration-500'>
                  <FaArrowRightLong />
                </span>
              </div>
            </Link>
          </div>
  
        </div>
      </div>
    </div>
  );
  
  
  return (
    <div className='pt-16 lg:pt-0 overflow-hidden lg:mt-[2vh]'>
      <section className="h-screen pb-10 lg:mt-14 lg:h-auto flex flex-col items-center justify-center bg-[#F6F4EC] pt-10">
        <div className="max-w-4xl text-center">
          <GiBullHorns className='w-full text-3xl text-green-700 mb-3' />
          <h2 className="text-xl font-bold text-[#687469]">Invest Now</h2>
          <h1 className="text-5xl font-bold text-[#334b35]">Our Projects</h1>
        </div>

        {/* Desktop Grid */}
        <div className='hidden sm:grid mt-10 w-full h-auto container mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5 p-2'>
          {portfolios.map((portfolio, index) => renderCard(portfolio, index))}
        </div>

        {/* Mobile Swiper */}
        <div className='block sm:hidden mt-10 w-full h-auto container mx-auto p-2'>
          <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            pagination={{ clickable: true }}
          >
            {portfolios.map((portfolio, index) => (
              <SwiperSlide key={index}>
                {renderCard(portfolio, index)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <div className='mt-20'>
        <CowPurchaseSlider />
      </div>

      <div className='my-20'>
        <WhyInvestWithUs />
      </div>

      <section className='bg-[#F6F4EC] py-10'>
        <FaqSection />
      </section>
    </div>
  );
};

export default Project;
