'use client'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi'

import Image from 'next/image';
import Link from 'next/link';
import { formatToBDT } from '@/utils/currencyFormatter';

interface ExtraData {
  color: string;
  cowId: string;
  price: number;
  teeth: number;
  gender: string;
  cowBreed: string;
  currentLiveWeight: number;
  expectedFinalWeight: number;
}

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
  extra_data: ExtraData;
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

const CowPurchaseSection = () => {

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://52.66.196.177:8000/api/v1/portfolio/categories/');
        const result: CategoryApiResponse = await response.json();
        if (result.status === 'success') {
          setCategories(result.data);
          const cowSellCategory = result.data.find(category => category.name === 'Cow for sell');
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
        const response = await fetch(`http://52.66.196.177:8000/api/v1/portfolio/category/${categoryId}/portfolios/`);
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

  return (

    <section className="pb-10 h-auto lg:h-auto  flex flex-col  lg:flex-col lg:justify-start  lg:items-center items-center justify-center bg-[#F6F4EC] pt-10">
      <div className="max-w-4xl text-center">
        <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />

        <h2 className="text-xl font-bold text-[#687469]">Order Now</h2>
        <h1 className="text-5xl font-bold text-[#334b35]">Our Stock</h1>

      </div>

      <div className='mt-10 w-full h-auto container mx-auto flex flex-col gap-4 lg:flex-row items-start justify-center  mb-5 '>

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
          {portfolios.map((portfolio, index) => (
            <SwiperSlide key={index}>

              <Link key={portfolio.id} href={`/project/cow_details/${portfolio.id}`} className='bg-white shadow-lg rounded-lg border-bg-[#F6F4EC] border-2 flex flex-col items-start justify-start'>
                <div className="w-full lg:max-h-[500px] rounded-lg  relative flex flex-col lg:flex-col lg:justify-start lg:items-start">
                  <Image
                    src={portfolio.image_url}
                    alt={portfolio.name}
                    objectFit='cover'
                    className="rounded-lg object-cover w-full h-full "
                    width={400}
                    height={300}
                    unoptimized
                  />
                
                </div>

                <div className='flex flex-row lg:flex-row items-start justify-between w-full px-5 py-3'>
                  <div className='text-md font-semibold'>Cow ID</div>
                  <div className='text-green-700 text-lg font-bold'>{portfolio.extra_data.cowId}</div>
                </div>

                <div className='flex flex-row lg:flex-row items-start justify-between w-full px-5 py-3'>
                  <div className='text-md font-semibold'>Live Weight</div>
                  <div className='text-green-700 text-lg font-bold'> {portfolio.extra_data.currentLiveWeight} KG</div>
                </div>
                <div className='flex flex-row lg:flex-row items-start justify-between w-full px-5 py-3'>
                  <div className='text-md font-semibold'>Expected Final Weight</div>
                  <div className='text-green-700 text-lg font-bold'> {portfolio.extra_data.expectedFinalWeight} KG</div>
                </div>

                <div className='flex flex-row lg:flex-row items-start justify-between w-full px-5 py-3'>
                  <div className='text-md font-semibold'>Price</div>
                  <div className='text-green-700 text-lg font-bold'>{formatToBDT(portfolio.extra_data.price) }</div>
                </div>
              

            

                <div className="h-auto w-full flex flex-col justify-center items-end lg:justify-center lg:items-center bg-white rounded-md p-5">
                  <div className="relative text-end p-3 bg-green-100 text-green-800 font-bold rounded-md overflow-hidden group cursor-pointer">
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Order Now</span>
                    <div className="absolute inset-0 bg-green-800 transform -translate-x-[105px] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>







      </div>


    </section>
  )
}

export default CowPurchaseSection

