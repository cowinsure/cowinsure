'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaArrowRightLong } from "react-icons/fa6";

import { Autoplay, Navigation } from 'swiper/modules';
import { GiBullHorns } from 'react-icons/gi'

import Image from 'next/image';
import Link from 'next/link';
import { formatToBDT } from '@/utils/currencyFormatter';

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

const InvestmentSection = () => {

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const memoizedPortfolios = useMemo(() => portfolios, [portfolios]);
  // const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio/categories/`);
        const result: CategoryApiResponse = await response.json();
        if (result.status === 'success') {
          // setCategories(result.data);
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



  return (

    <section className="pb-10 px-5 h-auto lg:h-auto  flex flex-col  lg:flex-col lg:justify-start  lg:items-center items-center justify-center bg-[#F6F4EC] pt-10">
      <div className="max-w-4xl text-center">
        <GiBullHorns className='w-full text-3xl text-center text-green-700 mb-3' />

        <h2 className="text-xl font-bold text-[#687469]">Invest Now</h2>
        <h1 className="text-5xl font-bold text-[#334b35]">Our Projects</h1>

      </div>

      <div className='mt-10 w-full h-auto container mx-auto flex flex-col gap-4 lg:flex-row items-center justify-center  mb-5 '>

        <Swiper
         centeredSlides={true}
         slidesPerView={1}
        
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
          }}
          spaceBetween={60}
          loop={memoizedPortfolios.length > 1}
          pagination={{ clickable: false }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className=" lg:h-auto w-full md:w-full flex-1  justify-center flex items-center lg:justify-center lg:items-center"
        >
          {memoizedPortfolios.map((portfolio) => (
            <SwiperSlide key={portfolio.id}>

              <div  className='relative flex-col w-full   h-[600px]  justify-center items-center group  bg-[#263c28] rounded-lg'>

                <div className='relative h-auto w-full round-lg '>
                  <div className='relative h-[200px]  rounded-t-lg   overflow-hidden'>
                    <div className='absolute h-auto rounded-t-lg inset-0 bg-contain left-0 group-hover:-left-4 transition-all duration-700'>
                      <Image
                        src={portfolio.image_url}
                        alt='cover'
                        height={200}
                        width={300}
                        objectFit="cover"
                        className="rounded-t-lg w-full "
                        quality={50}
                        loading="eager"
                        priority
                      /> <div className='absolute rounded-t-lg bg-green-800 bg-opacity-40 top-0 left-[50%] transform -translate-x-[50%] w-0 h-full group-hover:w-full transition-all duration-500 ease-in-out overflow-hidden'>


                      </div>


                    </div>



                  </div>
                  {/* project title */}
                  <div className=' absolute bottom-[-55px] left-0 right-0 z-40  mx-5  overflow-hidden group-hover:overflow-visible flex justify-center items-center'>
                    <div className='relative z-20 flex flex-col h-[100px] w-[100px] justify-center items-center bg-[#263c28] rounded-full text-2xl font-bold text-white'>
                      <span className='z-40 text-white group-hover:text-white transition-all duration-500'>{portfolio.name}</span>

                      <div className='absolute inset-0 flex justify-center items-center'>
                        <div className='w-0 h-0 z-30 bg-yellow-500 rounded-full group-hover:w-full group-hover:h-full  transition-all duration-500'></div>
                      </div>
                    </div>


                  </div>
                  <div className=' absolute bottom-[-60px] left-0 right-0 z-30  mx-5  overflow-hidden group-hover:overflow-visible flex justify-center items-center'>
                    <div className='relative z-20 flex flex-col h-[100px] w-[100px] justify-center items-center bg-[#2b442d] rounded-full text-2xl font-bold text-white'>

                    </div>


                  </div>
                </div>
                <div className='w-0 shadow-lg group-hover:w-full transition-all duration-500 border-2 border-transparent group-hover:border-yellow-400 mx-auto'></div>
                <div className='mt-10'>

                  {/* period */}
                <div className='flex flex-row lg:flex-row items-end justify-between w-full px-2'>
                                      <div className='text-xl text-white font-semibold'>Invest</div>
                                      <div className='text-white text-xl font-bold'> {formatToBDT(parseInt(portfolio.investment_value))}</div>
                                    </div>

                  {/* Return */}
                  <div className='flex flex-row lg:flex-row items-start justify-between w-full px-2  py-3'>
                    <div className='text-md text-white font-semibold'>{portfolio.location}</div>
                    <div className='text-white text-md font-bold'>{portfolio.currency}</div>
                  </div>
                </div>

                <div className='flex flex-row lg:flex-row items-start justify-between w-full px-2  py-3'>
                  <div className='text-md text-white font-semibold'>Period</div>
                  <div className='text-white text-md font-bold'>{portfolio.investment_period}</div>
                </div>

                <div className='flex flex-row lg:flex-row items-start justify-between w-full px-2 py-3'>
                  <div className='text-md text-white font-semibold'>Return</div>
                  <div className='text-white text-md font-bold'>{portfolio.expected_return_min}% - {portfolio.expected_return_max}%</div>
                </div>

                   <div className='flex flex-row lg:flex-row items-start justify-between w-full px-2 py-3'>
                                  <div className='text-md text-white font-semibold'>Total Return</div>
                                  <div className='text-xm font-bold text-white'> {formatToBDT(parseInt(portfolio.total_return_min))} - {formatToBDT(parseInt(portfolio.total_return_max))}</div>
                                </div>

              </div>

              <Link href={`/project/project_details/${portfolio.id}`} className='absolute w-full lg:w- auto bottom-[50px] left-0 right-0 z-30  group flex justify-center items-center cursor-pointer'>
                <div className='relative z-20 flex flex-col h-[50px] w-[50px] justify-center items-center bg-yellow-500 rounded-full text-2xl font-bold text-white group-hover:bg-white transition-all duration-500'>
                  <span className='z-50 text-white text-center group-hover:text-green-800 transition-all duration-500'><FaArrowRightLong/></span>
                </div>
                </Link>


            </SwiperSlide>
          ))}
        </Swiper>








      </div>


    </section>
  )
}

export default InvestmentSection
